const userService = require("../services/userService");

exports.getUserDashboard = async (req, res) => {
	const userId = parseInt(req.params.id);

	try {
		const user = await userService.getUserById(userId);
		if (!user) return res.status(404).send("User not found");
		res.render("user_dashboard", { user, title: user.name });
	} catch (err) {
		console.error("Error:", err);
		res.status(500).send("Error");
	}
};

exports.getProfile = (req, res) => {
	const user = req.session.user;
	if (!user) return res.redirect("/users/login");
	res.render("profile", { title: "My Profile", user });
};

exports.logout = (req, res) => {
	req.session.destroy((err) => {
		if (err) console.error(err);
		res.redirect("/");
	});
};

exports.showEditProfileForm = async (req, res) => {
	const user = req.user;
	res.render("profile-edit", { user });
};

exports.updateProfile = async (req, res) => {
	const { name } = req.body;
	await userService.updateUserName(req.user.id, name);
	req.user.name = name; // Оновлюємо в сесії
	res.redirect("/users/profile");
};
