const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

//Fetch all product in OurCollection
router.get('/plants', async (req, res) => {
    try {
      const products = await Product.find({});
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Server error" });
    }
});

// Fetch all products or filter by category
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {}; // Filter by category if provided
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch product for the product page using the id
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

module.exports = router;
