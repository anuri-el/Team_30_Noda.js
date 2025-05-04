const userService = require("../services/userService");

exports.getUserDashboard = async (req, res) => {
	const userId = parseInt(req.params.id, 10);
	try {
		const user = await userService.getUserById(userId);
		if (!user) return res.status(404).send("User not found");
		res.render("user_dashboard", { user, title: user.name });
	} catch (err) {
		console.error("Error:", err);
		res.status(500).send("Error");
	}
};

exports.getProfile = async (req, res) => {
	const sessionUser = req.session.user;
	if (!sessionUser) return res.redirect("/users/login");

	try {
		const user = await userService.getUserById(sessionUser.id);
		res.render("profile", { title: "My Profile", user });
	} catch (err) {
		console.error(err);
		res.status(500).send("Error");
	}
};

exports.logout = (req, res) => {
	req.session.destroy((err) => {
		if (err) console.error(err);
		res.redirect("/");
	});
};

exports.showEditProfileForm = async (req, res) => {
	const sessionUser = req.session.user;
	if (!sessionUser) return res.redirect("/users/login");

	try {
		const user = await userService.getUserById(sessionUser.id);
		if (!user) return res.status(404).send("User not found");
		res.render("profile-edit", { user });
	} catch (err) {
		console.error(err);
		res.status(500).send("Error");
	}
};

exports.updateProfile = async (req, res) => {
	const { name } = req.body;
	const sessionUser = req.session.user;

	if (!sessionUser) return res.redirect("/users/login");

	try {
		await userService.updateUserName(sessionUser.id, name);
		sessionUser.name = name; // Оновлюємо в сесії
		res.redirect("/users/profile");
	} catch (err) {
		console.error(err);
		res.status(500).send("Error updating profile");
	}
};
