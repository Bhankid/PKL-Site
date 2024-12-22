// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name
  },
});

const upload = multer({ storage: storage });

// Routes
app.post("/upload", upload.single("image"), (req, res) => {
  res.json({ message: "Image uploaded successfully", file: req.file });
});

app.post("/shipping", (req, res) => {
  const {
    shippingCode,
    shippingStatus,
    estimatedArrival,
    shippingLocation,
    destinationName,
    shipmentDetails,
  } = req.body;
  // Handle shipment update logic here
  console.log("Shipment Updated:", {
    shippingCode,
    shippingStatus,
    estimatedArrival,
    shippingLocation,
    destinationName,
    shipmentDetails,
  });
  res.json({ message: "Shipment updated successfully" });
});

app.post("/add-client", (req, res) => {
  const { clientName, clientEmail, clientPhone, clientAddress } = req.body;
  // Handle adding client logic here
  console.log("Client Added:", {
    clientName,
    clientEmail,
    clientPhone,
    clientAddress,
  });
  res.json({ message: "Client added successfully" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
