const express = require("express");
const router = express.Router();
const tripController = require("../controllers/tripController");
const bookingController = require("../controllers/bookingController");
const { ensureAuthenticated } = require("../middleware/authMiddleware");

router.get("/", tripController.getHomePage);
router.get("/trips", tripController.getAllTrips);

router.get(
	"/trips/:id/book",
	ensureAuthenticated,
	bookingController.getBookingRequestForm
);

router.post(
	"/trips/:id/book",
	ensureAuthenticated,
	bookingController.createBookingRequest
);

router.get(
	"/trips/:id/edit",
	ensureAuthenticated,
	tripController.getEditTripForm
);
router.post("/trips/:id/edit", ensureAuthenticated, tripController.updateTrip);

router.post(
	"/trips/:id/delete",
	ensureAuthenticated,
	tripController.deleteTrip
);

module.exports = router;
