const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { ensureAuthenticated } = require("../middleware/authMiddleware");

router.get("/profile", ensureAuthenticated, userController.getProfile);
router.get("/logout", userController.logout);

router.get(
	"/profile/edit",
	ensureAuthenticated,
	userController.showEditProfileForm
);
router.post("/profile/edit", ensureAuthenticated, userController.updateProfile);

router.get("/:id", ensureAuthenticated, userController.getUserDashboard);

module.exports = router;
