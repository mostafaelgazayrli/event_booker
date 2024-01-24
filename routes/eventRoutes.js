const express = require("express");
const eventController = require("../controllers/eventController");
const { ensureAuthenticated } = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

// Create Event
router.get(
  "/create-event",
  ensureAuthenticated,
  eventController.createEventPage
);
router.post(
  "/create-event",
  ensureAuthenticated,
  upload.single("file-upload"),
  eventController.createEvent
);

// View Events
router.get("/events", eventController.viewEvents);
router.get("/events/:id", eventController.viewEventDetails);

// Book Event
router.post("/events/:id/book", ensureAuthenticated, eventController.bookEvent);
router.get("/checkout/:id", ensureAuthenticated, eventController.checkout);

router.get("/ticket/:id", ensureAuthenticated, eventController.viewTicket);

module.exports = router;
