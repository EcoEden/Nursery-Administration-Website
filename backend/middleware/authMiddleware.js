const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
    
        if (!token) {
          return res.status(401).json({ message: "Access Denied. No token provided." });
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
    
        if (!user) {
          return res.status(404).json({ message: "User not found." });
        }
    
        if (user.role !== "admin") {
          return res.status(403).json({ message: "Access Denied. Only admins can perform this action." });
        }
    
        req.admin = user; // Store admin details in `req.admin`
        next();
      } catch (error) {
        res.status(401).json({ message: "Invalid or expired token." });
      }
    };


module.exports = authMiddleware;
