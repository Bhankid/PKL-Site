// src/routes/shipment.js
const express = require("express");
const Shipment = require("../models/Shipment");
const router = express.Router();

// POST route to create a shipment
router.post("/", async (req, res) => {
  const {
    shippingCode,
    status,
    estimatedArrival,
    location,
    destination,
    details,
  } = req.body;

  try {
    const shipment = await Shipment.create({
      shippingCode,
      status,
      estimatedArrival,
      location,
      destination,
      details,
    });
    res
      .status(201)
      .json({ message: "Shipment created successfully", shipment });
  } catch (error) {
    console.error("Error creating shipment:", error);
    res.status(500).json({ error: "Error creating shipment" });
  }
});

// GET route to retrieve a shipment by shipping code
router.get("/", async (req, res) => {
  const { shippingCode } = req.query; // Get shipping code from query parameters

  try {
    let shipments;
    if (shippingCode) {
      shipments = await Shipment.findAll({ where: { shippingCode } }); // Fetch shipment by shipping code
    } else {
      shipments = await Shipment.findAll(); // Fetch all shipments if no shipping code is provided
    }
    res.status(200).json(shipments); // Return the shipments as JSON
  } catch (error) {
    console.error("Error retrieving shipments:", error);
    res.status(500).json({ error: "Error retrieving shipments" });
  }
});

module.exports = router;
