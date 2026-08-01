const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  name: String,
  bloodGroup: String,
  quantity: Number,
  city: String
}, { timestamps: true });

module.exports = mongoose.model("Request", requestSchema);