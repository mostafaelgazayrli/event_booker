const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

// Define routes
router.get("/", mainController.homePage);
router.get("/about", mainController.aboutPage);
router.get("/contact", mainController.contactPage);

module.exports = router;
