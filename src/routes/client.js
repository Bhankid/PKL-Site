// src/routes/client.js
const express = require("express");
const Client = require("../models/Client");
const router = express.Router();

// POST route to add a new client
router.post("/", async (req, res) => {
  const { name, trackingCode, email, phone, address } = req.body;

  try {
    const client = await Client.create({
      name,
      trackingCode,
      email,
      phone,
      address,
    });
    res.status(201).json({ message: "Client added successfully", client });
  } catch (error) {
    console.error("Error adding client:", error);
    res.status(500).json({ error: "Error adding client" });
  }
});

// GET route to retrieve all clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.findAll(); // Fetch all clients from the database
    res.status(200).json(clients); // Return the clients as JSON
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ error: "Error fetching clients" });
  }
});

module.exports = router;
