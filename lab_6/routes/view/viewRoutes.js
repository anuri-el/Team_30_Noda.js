const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const tripRoutes = require("./tripRoutes");
const authRoutes = require("./authRoutes");
router.use("/", authRoutes);
router.use("/users", userRoutes);
router.use("/trips", tripRoutes);

module.exports = router;
