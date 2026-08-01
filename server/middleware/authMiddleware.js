const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    console.log("TOKEN:", token); // 🔥 DEBUG

    if (!token) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");

    req.user = decoded;

    next();

  } catch (err) {
    console.error("AUTH ERROR:", err);
    return res.status(401).json({ msg: "Invalid token" });
  }
};