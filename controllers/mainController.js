const userModel = require("../models/user");
const eventModel = require("../models/event");

module.exports = {
  homePage: async (req, res) => {
    const userLoggedIn = req.user?.id || false;
    const username = req.user?.firstName || undefined;
    const userEmail = req.user?.email || undefined;

    // Fetch data from the model (userModel in this case)
    const categories = [
      "All",
      "Music",
      "Sports",
      "Conference",
      "Party",
      "Workshop",
      "Other",
    ]; // Render the view with data

    let events = await eventModel.findAll({
      attributes: [
        "id",
        "image",
        "eventName",
        "eventDate",
        "eventTime",
        "duration",
        "venueName",
        "totalTickets",
        "availableTickets",
        "ticketPrice",
      ],
    });
    events = events.map((eventInstance) => eventInstance.dataValues);
    console.log({ events });
    res.render("pages/home", {
      categories,
      events,
      userLoggedIn,
      userEmail,
      username,
    });
  },
  aboutPage: (req, res) => {
    res.render("pages/about");
  },
  contactPage: (req, res) => {
    res.render("pages/contact");
  },
};
