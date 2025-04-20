const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { ensureAuthenticated } = require("../middleware/authMiddleware");

router.get("/register", userController.showRegistrationForm);
router.post("/register", userController.registerUser);

router.get("/login", userController.showLoginForm);
router.post("/login", userController.loginUser);

router.get("/profile", ensureAuthenticated, userController.getProfile);
router.get("/logout", userController.logout);

router.get('/profile/edit', authMiddleware, userController.showEditProfileForm);
router.post('/profile/edit', authMiddleware, userController.updateProfile);

router.get("/:id", ensureAuthenticated, userController.getUserDashboard);

module.exports = router;
