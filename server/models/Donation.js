const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  name: String,
  bloodGroup: String,
  quantity: Number,
  city: String,
  bloodBank: String   // 🔥 NEW FIELD
}, { timestamps: true });

module.exports = mongoose.model("Donation", donationSchema);