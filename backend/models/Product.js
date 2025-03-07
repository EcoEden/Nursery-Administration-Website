const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  price: String,
  image: String,
  category: String,
  description: String,
});

module.exports = mongoose.model("Product", productSchema);
