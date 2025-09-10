const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const User = require("../models/User");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Google reCAPTCHA verification
async function verifyRecaptcha(token) {
  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
    );
    return response.data.success;
  } catch (error) {
    console.error("reCAPTCHA error:", error.message);
    return false;
  }
}

// Registration
router.post("/register", async (req, res) => {
  const { username, email, password, profile, recapToken } = req.body;

  if (!recapToken) {
    return res.status(400).json({ error: "reCAPTCHA token missing" });
  }

  const isCaptchaValid = await verifyRecaptcha(recapToken);
  if (!isCaptchaValid) {
    return res.status(400).json({ error: "reCAPTCHA verification failed" });
  }

  try {
    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profile,
    });

    const savedUser = await newUser.save();

    res.status(201).json({ message: "User registered", userId: savedUser._id });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email }, { username: email }], // still allow username login just in case
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login error" });
  }
});

// Protected route
router.get("/protected", authenticateToken, (req, res) => {
  res.json({
    message: "This is protected",
    user: req.user,
  });
});

module.exports = router;
