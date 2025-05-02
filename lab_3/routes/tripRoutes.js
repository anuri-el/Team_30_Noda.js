const express = require("express");
const router = express.Router();
const tripController = require("../controllers/tripController");
const { ensureAuthenticated } = require("../middleware/authMiddleware");

router.get("/", tripController.getHomePage);
router.get("/trips", tripController.getAllTrips);

router.get(
	"/trips/:id/book",
	ensureAuthenticated,
	tripController.getBookingRequestForm
);

router.post(
	"/trips/:id/book",
	ensureAuthenticated,
	tripController.createBookingRequest
);

router.get(
	"/users/:id/driver",
	ensureAuthenticated,
	tripController.getDriverDashboard
);
router.post(
	"/users/:id/driver/trips",
	ensureAuthenticated,
	tripController.createTrip
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
