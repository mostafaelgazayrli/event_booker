// controllers/eventController.js

const Event = require("../models/event");
const Booking = require("../models/booking");
const storeImageFunction = require("../storeImageFunction");
const formatEvent = require("../formatEvent");
const User = require("../models/user");

module.exports = {
  createEventPage: (req, res) => {
    try {
      const userLoggedIn = req.user.id;
      const username = req.user.firstName;
      const userEmail = req.user.email;

      const categories = [
        "Music",
        "Sports",
        "Conference",
        "Party",
        "Workshop",
        "Other",
      ];

      res.render("pages/createEvent", {
        categories,
        userLoggedIn,
        username,
        userEmail,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  createEvent: async (req, res) => {
    const {
      eventName,
      description,
      category,
      eventDate,
      eventTime,
      duration,
      venueName,
      venueAddressLine,
      venueCity,
      venueState,
      venueZipCode,
      ticketPrice,
      totalTickets,
    } = req.body;
    // Assuming you have middleware or multer handling file uploads and providing req.file
    const imageUrl = req.file ? await storeImageFunction(req.file) : null;

    try {
      // Format eventDate and eventTime
      const formattedEventDate = new Date(eventDate)
        .toISOString()
        .split("T")[0];

      const createdByUserId = req.user.id;

      const availableTickets = totalTickets;

      // Create the event in the database
      await Event.create({
        eventName,
        description,
        category,
        eventDate: formattedEventDate,
        eventTime,
        duration,
        venueName,
        venueAddressLine,
        venueCity,
        venueState,
        venueZipCode,
        ticketPrice,
        totalTickets,
        availableTickets,
        image: imageUrl,
        createdByUserId,
      });

      res.redirect("/");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  viewEvents: async (req, res) => {
    try {
      const userLoggedIn = req.user?.id || false;
      const username = req.user?.firstName || undefined;
      const userEmail = req.user?.email || undefined;
      const events = await Event.findAll();
      res.render("pages/events", { events, userLoggedIn, username, userEmail });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  viewEventDetails: async (req, res) => {
    const eventId = req.params.id;
    const userLoggedIn = req.user?.id || false;
    const username = req.user?.firstName || undefined;
    const userEmail = req.user?.email || undefined;
    try {
      const event = await Event.findByPk(eventId, {
        include: [{ model: User, as: "creator" }],
      });
      if (!event) {
        return res.status(404).send("Event not found");
      }

      const formattedEvent = formatEvent(event);

      res.render("pages/event", {
        event: formattedEvent,
        userLoggedIn,
        username,
        userEmail,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  bookEvent: async (req, res) => {
    const eventId = req.params.id;
    const userId = req.user.id;

    try {
      const event = await Event.findByPk(eventId);

      if (!event) {
        return res.status(404).send("Event not found");
      }

      if (event.availableTickets <= 0) {
        return res.status(400).send("No available tickets");
      }

      // Check if the user has already booked this event
      const existingBooking = await Booking.findOne({
        where: {
          userId,
          eventId,
        },
      });

      // if (existingBooking) {
      //   return res.status(400).send("You have already booked this event");
      // }

      // Calculate total price based on ticket quantity (assuming ticketQuantity is available in req.body)
      const ticketQuantity = req.body.ticketQuantity || 1;
      const totalPrice = event.ticketPrice * ticketQuantity;

      // Create a new booking
      const booking = await Booking.create({
        userId,
        eventId,
        ticketQuantity,
        totalPrice,
      });

      // Update available tickets
      await Event.update(
        {
          availableTickets: event.availableTickets - ticketQuantity,
        },
        {
          where: {
            id: eventId,
          },
        }
      );

      res.redirect(`/ticket/${booking.dataValues.id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  checkout: async (req, res) => {
    const eventId = req.params.id;
    const userLoggedIn = req.user.id;
    const username = req.user.firstName;
    const userEmail = req.user.email;

    try {
      const event = await Event.findByPk(eventId);
      if (!event) {
        return res.status(404).send("Event not found");
      }
      res.render("pages/checkout", {
        event: event.dataValues,
        userLoggedIn,
        userEmail,
        username,
      });
    } catch (error) {}
  },
  viewTicket: async (req, res) => {
    const bookingId = req.params.id;
    const userLoggedIn = req.user.id;
    const username = req.user.firstName;
    const userEmail = req.user.email;
    try {
      const booking = await Booking.findByPk(bookingId);

      if (!booking) {
        return res.status(404).send("Booking not found");
      }

      // Find associated User and Event separately
      const user = await User.findByPk(booking.userId);
      const event = await Event.findByPk(booking.eventId);

      if (!user || !event) {
        return res.status(404).send("User or Event not found");
      }

      const invoiceData = {
        invoiceTo: `${user.firstName} ${user.lastName}`,
        invoiceId: booking.id,
        orderDate: booking.createdAt,
        nearLocation: "Near MBD Mall",
        items: [
          {
            number: 1,
            eventDetails: event.eventName,
            type: "Online",
            quantity: booking.ticketQuantity,
            unitPrice: `$${event.ticketPrice.toFixed(2)}`,
            total: `$${booking.totalPrice.toFixed(2)}`,
          },
        ],
        invoiceTotal: `$${booking.totalPrice.toFixed(2)}`,
        paymentMethod: "Paid via Card",
      };

      const ticketData = {
        eventName: event.eventName,
        eventDateTime: `${event.eventDate} ${event.eventTime}`,
        duration: `${event.duration}h`,
        userName: `${user.firstName} ${user.lastName}`,
        userEmail: user.email,
        ticketQuantity: booking.ticketQuantity,
        totalAmount: `$${booking.totalPrice.toFixed(2)}`,
        image: event.image,
      };

      const combinedData = {
        invoiceData,
        ticketData,
        userLoggedIn,
        username,
        userEmail,
      };

      res.render("pages/ticket", combinedData);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};
