const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { registerSchema } = require("../validation/userValidation");

const router = express.Router();

router.post("/register", async (req, res) => {
  // Validate input
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { username, email, password, profile } = req.body;

  try {
    // Check for existing user
    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists)
      return res
        .status(409)
        .json({ error: "User with email or username already exists." });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profile,
    });

    const savedUser = await newUser.save();

    // Simple audit log (can improve later)
    console.log(
      `[REGISTER] User registered: ${savedUser._id} (${savedUser.email})`
    );

    res
      .status(201)
      .json({ message: "User registered successfully", userId: savedUser._id });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Server error during registration" });
  }
});

module.exports = router;
