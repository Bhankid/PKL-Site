// src/server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/database");
const User = require("./models/User");

const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login"); 
const logoutRoute = require("./routes/logout");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/signup", signupRoute);
app.use("/api/login", loginRoute);
app.use("/api/logout", logoutRoute);

const startServer = async () => {
  try {
    await sequelize.sync(); // Sync database
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
