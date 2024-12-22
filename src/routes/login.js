const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

// Serve login.html at the "/api/login" route
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/login.html"));
});

// Handle user login (POST request to "/api/login")
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // Successful login
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Error logging in" });
  }
});

module.exports = router;
