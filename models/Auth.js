const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
  accessToken: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Auth", AuthSchema);
