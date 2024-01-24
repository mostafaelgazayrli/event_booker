const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Event = sequelize.define("Event", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  eventTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  venueName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  venueAddressLine: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  venueState: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  venueCity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  venueZipCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalTickets: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  availableTickets: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ticketPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});
Event.belongsTo(User, { foreignKey: "createdByUserId", as: "creator" });

// Sync the model with the database
sequelize.sync();

module.exports = Event;
