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

exports.showRegistrationForm = (req, res) => {
	res.render("auth/register", { title: "Register", error: null });
};

exports.registerUser = async (req, res) => {
	const { name, email, password, role } = req.body;
	const users = await getAllUsers();
	const existingUser = users.find(user => user.email === email);
	if (existingUser) {
		return res.render("auth/register", { error: "Email вже використовується" });
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser = {
		id: Date.now(),
		name,
		email,
		password: hashedPassword,
		role
	};
	users.push(newUser);
	await fs.promises.writeFile(userFilePath, JSON.stringify(users, null, 2));
	req.session.user = newUser;
	res.redirect("/users/profile");
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
	res.render('profile-edit', { user });
};

exports.updateProfile = async (req, res) => {
	const { name } = req.body;
	await userService.updateUserName(req.user.id, name);
	req.user.name = name; // Оновлюємо в сесії
	res.redirect('/users/profile');
};