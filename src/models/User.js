const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User ", // Removed extra space
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 30], // Username must be between 3 and 30 characters
          msg: "Username must be between 3 and 30 characters long.",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email address already in use.",
      },
      validate: {
        isEmail: {
          msg: "Must be a valid email address.",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 100], 
          msg: "Password must be at least 6 characters long.",
        },
      },
    },
  },
  {
    tableName: "Users",
  }
);

module.exports = User;
