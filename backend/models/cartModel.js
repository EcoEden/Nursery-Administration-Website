const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, default: 1 },
});

// Auto-populate product details
cartSchema.pre(/^find/, function (next) {
  this.populate("productId");
  next();
});

module.exports = mongoose.model("Cart", cartSchema);
