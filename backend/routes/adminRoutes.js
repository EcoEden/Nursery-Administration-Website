const express = require("express");
const User = require("../models/User");
const Cart = require("../models/cartModel");
const Product= require("../models/Product");

const router = express.Router();

// Fetch buyer in the admin panel
router.get("/admin/users", async (req, res) => {
    try {
      const users = await User.find({ role: "user" }); // Fetch only users with role "User"
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
});

// Delete buyer 
router.delete("/admin/users/:id", async (req, res) => {
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

// router.get("/users/:id", async (req, res) => {
//     try {
//       const user = await User.findById(req.params.id);
//       if (!user) return res.status(404).json({ message: "User not found" });
//       res.json(user);
//     } catch (error) {
//       res.status(500).json({ message: "Error fetching user details", error });
//     }
//   });


// Fetch buyers cart product

router.get("/admin/users/:userId/cart", async (req, res) => {
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

// Delete buyer cart product by admin
router.delete("/admin/users/:userId/cart/:cartItemId",async(req,res)=>{
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

// Fetch the Seller Details
router.get("/admin/sellers", async (req, res) => {
    try {
      const users = await User.find({ role: "seller" }); // Fetch only users with role "User"
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
});

// Delete Seller by admin
router.delete("/admin/sellers/:id", async (req, res) => {
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

// Fetch all seller products
router.get("/admin/sellers/:sellerId/products", async (req, res) => {
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

// Delete Seller product by admin
router.delete("/admin/products/:productId", async (req, res) => {
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


module.exports = router;
