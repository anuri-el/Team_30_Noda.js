const bcrypt = require("bcrypt");
const userService = require("../services/userService");

exports.registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const existingUser = await userService.getUserByEmail(email);
		if (existingUser) {
			return res.render("auth/register", {
				title: "Register",
				error: "Email вже використовується",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await userService.createUser({
			name,
			email,
			password: hashedPassword,
		});

		// автоматичний логін після реєстрації
		req.login(newUser, (err) => {
			if (err) {
				console.error("Login after register error:", err);
				return res.redirect("/login");
			}
			res.redirect("/profile");
		});
	} catch (err) {
		console.error("Registration error:", err);
		res.status(500).render("auth/register", {
			title: "Register",
			error: "Помилка при реєстрації",
		});
	}
};
