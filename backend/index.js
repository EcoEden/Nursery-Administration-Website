const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserProfile = require("./models/Profile");
const Product = require("./models/Product");
const Cart = require("./models/cartModel");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, { serverSelectionTimeoutMS: 30000 })
  .then(() => console.log("✅ Connected to database"))
  .catch((err) => console.log("❌ Database Connection Error:", err));

// ✅ User Schema & Model
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  image: String,
});

const User = mongoose.model("User", userSchema);

// ✅ Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// ✅ Middleware for Authentication
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// ✅ Signup Route
app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, image } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, email, password: hashedPassword, image });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(user._id);
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.json({ message: "Login successful", token, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Get User Details (Protected)
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


// 🔹 ADD TO CART ROUTE
// ✅ Add item to cart
app.post("/cart/add", authMiddleware, async (req, res) => {
  try {
    console.log("Received Cart Request:", req.body);

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
    const cartItems = await Cart.find({ userId }).populate("productId"); // ✅ Populate product details

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

    // ✅ Check if the cart item exists and belongs to the user
    const cartItem = await Cart.findOne({ _id: cartItemId, userId });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // ✅ Delete the cart item
    await Cart.findByIdAndDelete(cartItemId);

    res.status(200).json({ message: "Item removed successfully" });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// ✅ Start the Server
app.listen(PORT, () => console.log(`🚀 Server running on PORT ${PORT}`));
