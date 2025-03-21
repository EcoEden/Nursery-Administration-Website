const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("🟢 Incoming Authorization Header:", authHeader); // Debugging
  console.log("🛠️ JWT_SECRET in Backend:", process.env.JWT_SECRET);


  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ No token or incorrect format");
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("🟡 Extracted Token:", token); // Debugging

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔵 Decoded Token:", decoded); // Debugging


    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      console.log("❌ User not found in database");
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    console.log("✅ User authenticated:", req.user.email);
    next();
  } catch (error) {
    console.error("🔴 JWT verification failed:", error.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = authMiddleware;
