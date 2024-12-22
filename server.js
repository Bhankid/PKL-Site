const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const sequelize = require("./src/config/database");
const User = require("./src/models/User");
require("dotenv").config();

const signupRoute = require("./src/routes/signup");
const loginRoute = require("./src/routes/login");
const logoutRoute = require("./src/routes/logout");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use("/api/signup", signupRoute);
app.use("/api/login", loginRoute);
app.use("/api/logout", logoutRoute);

// const isAuthenticated = (req, res, next) => {
//   if (req.session && req.session.userId) {
//     next(); // User is authenticated, proceed to the next middleware or route
//   } else {
//     res.redirect("/api/login"); // Redirect to login page if not authenticated
//   }
// };


// Serve index.html as the homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serve admin.html at the /api/admin route
app.get("/api/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});
// app.get("/api/admin", isAuthenticated, (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "admin.html"));
// });


// Handle undefined routes with a custom message
app.use((req, res, next) => {
  res.status(404).send("404: Resource Not Found");
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
const startServer = async () => {
  try {
    await sequelize.sync();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
