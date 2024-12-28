// src/routes/image.js
const express = require("express");
const multer = require("multer");
const Image = require("../models/Image");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

// POST route to upload an image
router.post("/", upload.single("image"), async (req, res) => {
  const { description, location } = req.body;
  const filePath = req.file.path; // Get the file path from the uploaded file

  try {
    const image = await Image.create({ description, location, filePath });

    // Return the full URL to the image
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    res
      .status(201)
      .json({ message: "Image uploaded successfully", image, imageUrl });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Error uploading image" });
  }
});

// GET route to retrieve all images
const path = require("path");

router.get("/", async (req, res) => {
  try {
    const images = await Image.findAll(); // Fetch all images from the database

    if (!images) {
      return res.status(404).json({ error: "No images found" });
    }

    // Include full URL for each image
    const imagesWithUrls = images.map((image) => ({
      ...image.toJSON(),
      fileUrl: `${req.protocol}://${req.get("host")}/uploads/${path.basename(
        image.filePath
      )}`,
    }));

    res.status(200).json(imagesWithUrls); // Return the images with full URLs
  } catch (error) {
    console.error("Error fetching images:", error.message, error.stack); // Log detailed error
    res.status(500).json({ error: "Error fetching images" }); // Return an appropriate message
  }
});

// PUT route to update an image
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { description, location } = req.body;

  try {
    const image = await Image.findByPk(id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Update the image details
    image.description = description;
    image.location = location;
    await image.save();

    res.status(200).json({ message: "Image updated successfully", image });
  } catch (error) {
    console.error("Error updating image:", error);
    res.status(500).json({ error: "Error updating image" });
  }
});

// DELETE route to delete an image
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findByPk(id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    await image.destroy(); // Delete the image from the database
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Error deleting image" });
  }
});

module.exports = router;
