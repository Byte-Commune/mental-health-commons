const jwt = require("jsonwebtoken");

// Token verification middleware
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // Verify token with JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // Pass to the next route
  } catch (err) {
    res.status(400).json({ error: "Invalid or expired token." });
  }
};

module.exports = authenticateToken;
