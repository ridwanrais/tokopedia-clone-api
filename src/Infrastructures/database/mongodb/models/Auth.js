const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
  _id: String,
  refreshToken: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Auth", AuthSchema);
