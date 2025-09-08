const express = require("express");
const app = express();

//middleware before routes
app.use(express.json());

// Your routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

module.exports = app;
