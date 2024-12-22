// src/routes/signup.js
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User  created successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

module.exports = router;
