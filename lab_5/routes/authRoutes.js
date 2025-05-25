const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");
const tripController = require("../controllers/tripController");
const router = express.Router();

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect("/login");
}

router.get("/", tripController.getHomePage);

router.get("/login", (req, res) => {
	res.render("auth/login", { title: "Login", error: null });
});

router.post(
	"/login",
	passport.authenticate("local", {
		failureRedirect: "/login?error=1",
		successRedirect: "/profile",
	})
);

router.get("/logout", (req, res) => {
	req.logout((err) => {
		if (err) return res.status(500).send("Logout error");
		res.redirect("/");
	});
});

router.get("/profile", ensureAuthenticated, (req, res) => {
	res.render("profile", { title: "Profile", user: req.user });
});

router.get("/register", (req, res) => {
	res.render("auth/register", { title: "Register", error: null });
});
router.post("/register", authController.registerUser);

module.exports = router;
