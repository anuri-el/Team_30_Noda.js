const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const tripRoutes = require("./tripRoutes");
const tripController = require("../../controllers/api/tripController");
// const authRoutes = require("./authRoutes");
// router.use("/", authRoutes);
router.use("/users", userRoutes);
router.use("/trips", tripRoutes);
router.get("/locations", tripController.getLocations);

module.exports = router;
