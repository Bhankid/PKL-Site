const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

// Serve signUp.html at the base route "/api/signup"
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/signUp.html"));
});

// Handle user signup (POST request to "/api/signup")
router.post("/", async (req, res) => {
  const { username, email, password } = req.body;

  // Input validation
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

module.exports = router;
