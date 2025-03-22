const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserProfile = require("./models/Profile");
const Product = require("./models/Product");
const Cart = require("./models/cartModel");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, { serverSelectionTimeoutMS: 30000 })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(" Database Connection Error:", err));

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// Middleware for Authentication
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // console.log(" Incoming Authorization Header:", authHeader);
  // console.log(" JWT_SECRET in Backend:", process.env.JWT_SECRET || "NOT SET");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // console.log(" No token or incorrect format");
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  const token = authHeader.split(" ")[1];
  // console.log(" Extracted Token:", token);

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(" Decoded Token:", decoded);
    // Fetch user from DB and exclude password
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      // console.log("User not found in database");
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    // Attach user & role to req
    req.user = { id: user._id, email: user.email, role: decoded.role }; // Ensure role is passed
    // console.log(" User authenticated:", req.user);

    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
          return res.status(403).json({ message: "Access denied" });
      }
      next();
  };
};

// Signup Route
app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, image, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, email, password: password, image, role });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found. Please sign up!" });
    if ((user.role || "").toLowerCase() !== (role || "").toLowerCase()) {
      return res.status(400).json({ message: "Invalid role selected!" });
    }
    // Compare plain text input password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password!" });
    const token = generateToken(user._id);
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.json({ message: "Login successful", token, user: userWithoutPassword });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

//  Get User Details (Protected)
app.get("/users/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.get('/plants', async (req, res) => {
  const plants = await Product.find({});
  res.json(plants);
});

app.get('/decor-pots', async (req, res) => {
  const product = await Product.find({ category: 'Decor Pots' });
  res.json(product);
});

app.get('/indoor-plants', async (req, res) => {
  const product = await Product.find({ category: 'Indoor Plant' });
  res.json(product);
});

app.get('/outdoor-plants', async (req, res) => {
  const product = await Product.find({ category: 'Outdoor Plant' });
  res.json(product);
});

app.get('/herbs', async (req, res) => {
  const product = await Product.find({ category: 'Herbs' });
  res.json(product);
});

app.get('/gardening-equipment', async (req, res) => {
  const product = await Product.find({ category: 'Gardening Equipment' });
  res.json(product);
});

app.get('/plant-care-products', async (req, res) => {
  const product = await Product.find({ category: 'Plant Care Product' });
  res.json(product);
});

app.get('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

app.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
      ],
    });
    res.json(products); // Returns empty array if no matches.
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add item to cart
app.post("/cart/add", authMiddleware, async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    let cartItem = await Cart.findOne({ userId, productId });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = new Cart({ userId, productId, quantity });
      await cartItem.save();
    }
    res.status(200).json({ message: "Item added to cart", cartItem });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/cart", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from token
    const cartItems = await Cart.find({ userId }).populate("productId"); // Populate product details
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart items" });
  }
});

app.put("/cart/:id", authMiddleware, async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const { quantity } = req.body;
    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }
    const updatedCartItem = await Cart.findByIdAndUpdate(
      cartItemId,
      { quantity },
      { new: true }
    );
    if (!updatedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.status(200).json(updatedCartItem);
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/cart/:id", authMiddleware, async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const userId = req.user.id; // Extract user ID from auth middleware
    const cartItem = await Cart.findOne({ _id: cartItemId, userId });
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    await Cart.findByIdAndDelete(cartItemId);
    res.status(200).json({ message: "Item removed successfully" });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add new product by selller
app.post("/new-product", authMiddleware, async (req, res) => {
  try {
    const { name, category, image, price, description } = req.body;
    const sellerId = req.user.id; // Extract seller ID from JWT token
    if (!name || !category || !image || !price || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newProduct = new Product({ sellerId, name, category, image, price, description });
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/seller-products", authMiddleware, async (req, res) => {
  try {
    const sellerId = req.user.id; // Get seller's ID from the authenticated request
    if (!sellerId) {
      return res.status(401).json({ error: "Unauthorized: Seller ID missing" });
    }
    const products = await Product.find({ sellerId });
    res.json(products);
  } catch (error) {
    console.error("Error fetching seller products:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Update product by ID
app.put("/edit-product/:id", authMiddleware, async (req, res) => {
  try {
      const { id } = req.params;
      const { name, category, price, image, description } = req.body;
      if (!req.user || !req.user.id) {  // Change `userId` to `id`
          return res.status(401).json({ error: "Unauthorized: No user ID found in token." });
      }
      const updatedProduct = await Product.findOneAndUpdate(
          { _id: id, sellerId: req.user.id }, // Use `req.user.id`
          { name, category, price, image, description },
          { new: true }
      );
      if (!updatedProduct) {
          console.log("Product not found or unauthorized");
          return res.status(404).json({ error: "Product not found or unauthorized" });
      }
      res.json(updatedProduct);
  } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Server error" });
  }
});

app.delete("/seller-products/:id", authMiddleware, async (req, res) => {
  try {
    const productId = req.params.id;
    const sellerId = req.user.id; // Extract seller's ID from JWT
    const product = await Product.findOne({ _id: productId, sellerId });
    if (!product) {
      return res.status(404).json({ message: "Product not found or unauthorized" });
    }
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error, could not delete product" });
  }
});

app.get("/admin/users", async (req, res) => {
  try {
    const users = await User.find({ role: "user" }); // Fetch only users with role "User"
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

app.delete("/admin/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details", error });
  }
});

app.get("/admin/sellers", async (req, res) => {
  try {
    const users = await User.find({ role: "seller" }); // Fetch only users with role "User"
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

app.delete("/admin/sellers/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "Seller not found" });
    }
    res.json({ message: "Seller deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

app.get("/admin/sellers-product/:sellerId", async (req, res) => {
  try {
    const { sellerId } = req.user.id;
    const products = await Product.find({ sellerId });
    if (!products.length) {
      return res.status(404).json({ message: "No products found for this seller." });
    }
    res.json(products);
  } catch (error) {
    console.error("Error fetching seller products:", error);
    res.status(500).json({ message: "Server error while fetching products." });
  }
});

app.get("/admin/sellers/:sellerId/products", async (req, res) => {
  try {
    const { sellerId } = req.params;
    if (!sellerId) {
      return res.status(400).json({ message: "Seller ID is required" });
    }
    const products = await Product.find({ sellerId: sellerId });
    if (!products.length) {
      return res.status(404).json({ message: "No products found for this seller." });
    }
    res.json(products);
  } catch (error) {
    console.error("Error fetching seller's products:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/admin/products/:productId", authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/admin/users/:userId/cart", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const cartItems = await Cart.find({ userId }).populate("productId");
    if (!cartItems.length) {
      return res.status(404).json({ message: "No cart items found for this user." });
    }
    res.json(cartItems);
  } catch (error) {
    console.error("Error fetching user's cart items:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/admin/users/:userId/cart/:cartItemId",async(req,res)=>{
  try {
    const { userId, cartItemId } = req.params;

    // Check if the cart item exists
    const cartItem = await Cart.findOne({ _id: cartItemId, userId });

    if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
    }

    // Remove the item
    await Cart.findByIdAndDelete(cartItemId);
    res.json({ message: "Item removed from cart successfully" });

} catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ message: "Server error" });
}
});
//  Start the Server
app.listen(PORT, () => console.log(` Server running on PORT ${PORT}`));
