const express = require("express");
const Product = require("../models/Product");
const authMiddleware= require("../middleware/authMiddleware")

const router = express.Router();  

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

// New Product route
router.post("/new-product", authMiddleware, async (req, res) => {
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

// Fetch Seller All products
router.get("/seller-products", authMiddleware, async (req, res) => {
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

// Edit seller product using id
router.put("/edit-product/:id", authMiddleware, async (req, res) => {
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

// Delete seller product using the id
router.delete("/seller-products/:id", authMiddleware, async (req, res) => {
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


module.exports = router;