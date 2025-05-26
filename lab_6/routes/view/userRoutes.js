const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const tripController = require("../../controllers/tripController");
const { ensureAuthenticated } = require("../../middleware/authMiddleware");

router.get("/profile", ensureAuthenticated, userController.getProfile);
router.get(
	"/profile/edit",
	ensureAuthenticated,
	userController.showEditProfileForm
);
router.post("/profile/edit", ensureAuthenticated, userController.updateProfile);
router.get("/logout", userController.logout);

router.get("/:id", ensureAuthenticated, userController.getUserDashboard);

router.get(
	"/:id/driver",
	ensureAuthenticated,
	tripController.getDriverDashboard
);
router.post(
	"/:id/driver/trips",
	ensureAuthenticated,
	tripController.createTrip
);

module.exports = router;
