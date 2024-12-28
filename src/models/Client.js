// src/models/Client.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Client = sequelize.define(
  "Client",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // Automatically increment the ID
      primaryKey: true, // Set as primary key
      allowNull: false, // Cannot be null
    },
    name: {
      type: DataTypes.STRING(255), // Match varchar(255)
      allowNull: false, // Cannot be null
    },
    trackingCode: {
      type: DataTypes.STRING(255), // Match varchar(255)
      allowNull: false, // Cannot be null
      unique: true, // Ensure tracking code is unique
    },
    email: {
      type: DataTypes.STRING(255), // Match varchar(255)
      allowNull: false, // Cannot be null
      validate: {
        isEmail: true, // Validate that the value is an email
      },
    },
    phone: {
      type: DataTypes.STRING(255), // Match varchar(255)
      allowNull: false, // Cannot be null
    },
    address: {
      type: DataTypes.TEXT, // Match text
      allowNull: true, // Can be null
    },
  },
  {
    timestamps: true, // Enable timestamps
    createdAt: "createdAt", // Custom name for createdAt
    updatedAt: "updatedAt", // Custom name for updatedAt
    tableName: "clients", // Specify the table name if it differs from the model name
  }
);

module.exports = Client;
