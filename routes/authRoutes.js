const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// Define authentication routes
router.get("/login", authController.loginPage);
router.post("/login", authController.login);
router.get("/signup", authController.signupPage);
router.post("/signup", authController.signup);
router.get("/logout", authController.logout);

module.exports = router;
