const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Middleware to authenticate users based on their role
const authMiddleware = (allowedRoles) => async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Check if the user's role is allowed
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { email, name, mobile, password, role } = req.body;
    console.log("Signup Request:", req.body);

    if (!email || !name || !mobile || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      name,
      mobile,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    // Generate JWT Token
    const token = jwt.sign({ id: newUser._id, role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(201)
      .json({ message: "User registered successfully", token, role });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log("Login Request:", { email, role });

    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email, role });

    if (!user) {
      console.log("User not found:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid password:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("Login successful:", email);
    res.json({ message: "Login successful", token, role });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Protected Admin Dashboard Route
router.get("/admin/dashboard", authMiddleware(["admin"]), (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard" });
});

// Protected Organizer Dashboard Route
router.get(
  "/organizer/dashboard",
  authMiddleware(["organizer"]),
  (req, res) => {
    res.json({ message: "Welcome to the Organizer Dashboard" });
  }
);

// Protected Participant Dashboard Route
router.get(
  "/participant/dashboard",
  authMiddleware(["participant"]),
  (req, res) => {
    res.json({ message: "Welcome to the Participant Dashboard" });
  }
);

module.exports = router;
