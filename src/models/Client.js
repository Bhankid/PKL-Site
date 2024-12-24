// src/models/Client.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Client = sequelize.define("Client", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  trackingCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Client;
