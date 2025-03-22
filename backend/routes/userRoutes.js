const express = require("express");
const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/cartModel");
const authMiddleware= require("../middleware/authMiddleware")


const router = express.Router();

// Middleware for Authentication
// const authMiddleware = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   // console.log(" Incoming Authorization Header:", authHeader);
//   // console.log(" JWT_SECRET in Backend:", process.env.JWT_SECRET || "NOT SET");
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     // console.log(" No token or incorrect format");
//     return res.status(401).json({ message: "Unauthorized: No token provided" });
//   }
//   const token = authHeader.split(" ")[1];
//   // console.log(" Extracted Token:", token);

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // console.log(" Decoded Token:", decoded);
//     // Fetch user from DB and exclude password
//     const user = await User.findById(decoded.id).select("-password");
//     if (!user) {
//       // console.log("User not found in database");
//       return res.status(401).json({ message: "Unauthorized: User not found" });
//     }
//     // Attach user & role to req
//     req.user = { id: user._id, email: user.email, role: decoded.role }; // Ensure role is passed
//     // console.log(" User authenticated:", req.user);

//     next();
//   } catch (error) {
//     console.error("JWT verification failed:", error.message);
//     return res.status(401).json({ message: "Not authorized, token failed" });
//   }
// };

// Fetch the user details for the profile
router.get("/users/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Route for the search
router.get('/search/:query', async (req, res) => {
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

// Add the product in the cart
router.post("/cart/add", authMiddleware, async (req, res) => {
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

// Fetch all cart products
router.get("/cart", authMiddleware, async (req, res) => {
    try {
      const userId = req.user.id; 
      const cartItems = await Cart.find({ userId }).populate("productId"); 
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: "Error fetching cart items" });
    }
});

// Edit cart product quantity
router.put("/cart/:id", authMiddleware, async (req, res) => {
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

// Delete product from the cart
router.delete("/cart/:id", authMiddleware, async (req, res) => {
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
 
// router.get("/", async (req, res) => {
//     try {
//       const { category } = req.query;
//       const query = category ? { category } : {}; // If category is provided, filter; otherwise, get all
//       const products = await Product.find(query);
      
//       res.json(products);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       res.status(500).json({ message: "Server error", error });
//     }
// });

module.exports = router;