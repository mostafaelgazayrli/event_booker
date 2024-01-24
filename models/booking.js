const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");
const Event = require("./event");

const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ticketQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Define associations
Booking.belongsTo(User, { foreignKey: "userId" });
Booking.belongsTo(Event, { foreignKey: "eventId" });

// Sync the model with the database
sequelize.sync();

module.exports = Booking;
