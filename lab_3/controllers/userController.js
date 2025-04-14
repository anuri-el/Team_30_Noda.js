const userService = require("../services/userService");

exports.getUserDashboard = async (req, res) => {
	const userId = parseInt(req.params.id);

	try {
		const user = await userService.getUserById(userId);
		if (!user) return res.status(404).send("User not found");
		// res.locals.title = user.name;
		res.render("user_dashboard", { user, title: user.name });
	} catch (err) {
		console.error("Error:", err);
		res.status(500).send("Error");
	}
};
