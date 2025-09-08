const express = require("express");
const app = express();

app.use(express.json()); // For parsing JSON request body

// Import routes
const authRoutes = require("./routes/auth"); // Import auth routes (register, login, and protected)

// Mount routes
app.use("/api/auth", authRoutes); // Use auth routes under /api/auth

module.exports = app;
