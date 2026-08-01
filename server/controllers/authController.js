const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
};

exports.login = async (req, res) => {
  const user = await User.findOne(req.body);

  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret123");
  res.json({ token });
};