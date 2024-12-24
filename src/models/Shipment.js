// src/models/Shipment.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Shipment = sequelize.define("Shipment", {
  shippingCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estimatedArrival: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Shipment;
