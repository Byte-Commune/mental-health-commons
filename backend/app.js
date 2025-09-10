const express = require("express");
const cors = require("cors"); // Import cors package
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // allow your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"], // allowed methods
    credentials: true, // if you send cookies or auth headers
  })
);

app.use(express.json());

// Import routes
const authRoutes = require("./routes/auth");

// Mount routes
app.use("/api/auth", authRoutes);

module.exports = app;
