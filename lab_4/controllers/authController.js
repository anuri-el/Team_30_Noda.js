const bcrypt = require("bcrypt");
const fs = require("fs");
const userService = require("../services/userService");
const userFilePath = "./data/users.json";

exports.registerUser = async (req, res) => {
	const { name, email, password, role } = req.body;
	const users = await userService.getAllUsers();
	const existingUser = users.find((user) => user.email === email);
	if (existingUser) {
		return res.render("auth/register", {
			error: "Email вже використовується",
		});
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser = {
		id: Date.now(),
		name,
		email,
		password: hashedPassword,
		role,
	};
	users.push(newUser);
	await fs.promises.writeFile(userFilePath, JSON.stringify(users, null, 2));
	req.session.user = newUser;
	res.redirect("/users/profile");
};
