
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Image = sequelize.define("Image", {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Image;
