const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { registerSchema } = require("../validation/userValidation");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// User Registration Route
router.post("/register", async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { username, email, password, profile } = req.body;

  try {
    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) return res.status(409).json({ error: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profile,
    });

    const savedUser = await newUser.save();
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

// User Login Route (accepts username or email as 'identifier')
router.post("/login", async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res
      .status(400)
      .json({ error: "Identifier and password are required." });
  }

  try {
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      console.log(`Failed login attempt: Invalid identifier - ${identifier}`);
      return res
        .status(401)
        .json({ error: "Invalid username/email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`Failed login attempt: Incorrect password for ${identifier}`);
      return res
        .status(401)
        .json({ error: "Invalid username/email or password." });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log(`Login successful for ${identifier}`);
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login." });
  }
});

// Protected Route (requires valid token)
router.get("/protected", authenticateToken, (req, res) => {
  res.json({
    message: "This is a protected route",
    user: req.user,
  });
});

module.exports = router;
