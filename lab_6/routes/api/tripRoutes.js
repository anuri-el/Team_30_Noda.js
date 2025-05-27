const express = require("express");
const router = express.Router();
const tripController = require("../../controllers/api/tripController");
const bookingController = require("../../controllers/api/bookingController");
// const { ensureAuthenticated } = require("../../middleware/authMiddleware");

router.get("/", tripController.getAllTrips);

router.get(
	"/:id/book",
	// ensureAuthenticated,
	bookingController.getBookingRequestData
);

router.post(
	"/:id/book",
	// ensureAuthenticated,
	bookingController.createBookingRequest
);

router.get(
	"/:id",
	//ensureAuthenticated,
	tripController.getTripById);

router.post(
	"/",
	//ensureAuthenticated,
	tripController.createTrip);

router.put(
	"/:id",
	//ensureAuthenticated,
	tripController.updateTrip);

router.delete(
	"/:id",
	//ensureAuthenticated,
	tripController.deleteTrip);

module.exports = router;
