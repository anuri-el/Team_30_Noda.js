const express = require("express");
const router = express.Router();
const tripController = require("../../controllers/tripController");
const bookingController = require("../../controllers/bookingController");
const { ensureAuthenticated } = require("../../middleware/authMiddleware");

router.get("/", tripController.getAllTrips);

router.get(
	"/:id/book",
	ensureAuthenticated,
	bookingController.getBookingRequestForm
);

router.post(
	"/:id/book",
	ensureAuthenticated,
	bookingController.createBookingRequest
);

router.get("/:id/edit", ensureAuthenticated, tripController.getEditTripForm);
router.post("/:id/edit", ensureAuthenticated, tripController.updateTrip);

router.post("/:id/delete", ensureAuthenticated, tripController.deleteTrip);

module.exports = router;
