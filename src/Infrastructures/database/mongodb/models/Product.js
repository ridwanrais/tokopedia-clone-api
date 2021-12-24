const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    rating: { type: Number },
    cashback: { type: Boolean, default: false },
    sold: { type: Number, default: 0 },
    sellerId: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
