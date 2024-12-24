const express = require("express");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");
const Contact = require("../models/Contact");

const router = express.Router();

// Configure rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: { error: "Too many requests, please try again later." },
});

// POST /api/contact
router.post("/", limiter, async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Validate the request body
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Create a new Contact instance
  const contact = new Contact(name, email, phone, message);

  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // Email content
  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL, // Send to yourself
    subject: `New Inquiry from ${contact.name}`,
    html: `
            <h2>Contact Form Submission</h2>
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Phone:</strong> ${contact.phone}</p>
            <p><strong>Message:</strong></p>
            <p>${contact.message}</p>
        `,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email." });
  }
});

module.exports = router;
