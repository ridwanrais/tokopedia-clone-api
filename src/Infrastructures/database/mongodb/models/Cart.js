const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    _id: String,
    userId: { type: String, required: true, unique: true },
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
