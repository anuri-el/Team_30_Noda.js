const axios = require("axios");
const { apiBase } = require("../config");

exports.getUserDashboard = async (req, res) => {
	const userId = parseInt(req.params.id, 10);

	try {
		const apiRes = await axios.get(`${apiBase}/users/${userId}`);
		const user = apiRes.data;

		if (!user) return res.status(404).send("User not found");
		res.render("user_dashboard", { user, title: user.name });
	} catch (err) {
		console.error("Error fetching user dashboard:", err.response?.data || err.message);
		res.status(500).send("Error");
	}
};

exports.getProfile = async (req, res) => {
	const sessionUser = req.session.user;
	if (!sessionUser) return res.redirect("/login");

	try {
		const apiRes = await axios.get(`${apiBase}/users/${sessionUser.id}`);
		const user = apiRes.data;
		res.render("profile", { title: "My Profile", user });
	} catch (err) {
		console.error("Error fetching profile:", err.response?.data || err.message);
		res.status(500).send("Error");
	}
};

exports.logout = (req, res) => {
	req.session.destroy((err) => {
		if (err) console.error("Session destruction error:", err);
		res.redirect("/");
	});
};

exports.showEditProfileForm = async (req, res) => {
	const sessionUser = req.session.user;
	if (!sessionUser) return res.redirect("/login");

	try {
		const apiRes = await axios.get(`${apiBase}/users/${sessionUser.id}`);
		const user = apiRes.data;
		if (!user) return res.status(404).send("User not found");
		res.render("profile-edit", { user });
	} catch (err) {
		console.error("Error showing edit profile form:", err.response?.data || err.message);
		res.status(500).send("Error");
	}
};

exports.updateProfile = async (req, res) => {
	const { name } = req.body;
	const sessionUser = req.session.user;

	if (!sessionUser) return res.redirect("/login");

	try {
		const apiRes = await axios.put(`${apiBase}/users/${sessionUser.id}`, {name});
		req.session.user.name = apiRes.data.name;
		res.redirect("/profile");
	} catch (err) {
		console.error("Error updating profile:", err.response?.data || err.message);
		if (err.response && err.response.status === 404) {
			return res.status(404).send("User not found");
		}
		res.status(500).send("Error updating profile");
	}
};
