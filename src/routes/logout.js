const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

// Serve login.html at the "/api/logout" route
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/logout.html"));
});

router.post("/", (req, res) => {
  // Implement logout logic (e.g., destroy session)
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
