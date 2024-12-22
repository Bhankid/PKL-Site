// src/routes/logout.js
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  // Implement logout logic (e.g., destroy session)
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
