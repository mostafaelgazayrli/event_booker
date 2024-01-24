const express = require("express");
const mainRoutes = require("./mainRoutes");
const authRoutes = require("./authRoutes");
const eventRoutes = require("./eventRoutes");

const router = express.Router();

router.use("/", mainRoutes);
router.use("/", authRoutes);
router.use("/", eventRoutes);

module.exports = router;
