const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    _id: String,
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    address: { type: String },
    merchantLevel: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
