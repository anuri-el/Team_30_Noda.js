const fs = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const dataPath = path.join(__dirname, "../data/users.json");

const getAllUsers = async () => {
	const data = await fs.readFile(dataPath, "utf8");
	return JSON.parse(data);
};

const getUserById = async (id) => {
	const users = await getAllUsers();
	return users.find((u) => u.id === id);
};

const getUserByEmail = async (email) => {
	const users = await getAllUsers();
	return users.find((u) => u.email === email);
};

const createUser = async ({ name, email, password, role }) => {
	const users = await getAllUsers();
	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = {
		id: Date.now(),
		name,
		email,
		password: hashedPassword,
		role,
	};

	users.push(newUser);
	await fs.writeFile(dataPath, JSON.stringify(users, null, 2));
	return newUser;
};

const updateUserName = async (id, newName) => {
	const users = await getAllUsers();
	const index = users.findIndex(u => u.id === id);
	if (index !== -1) {
		users[index].name = newName;
		await fs.promises.writeFile(dataPath, JSON.stringify(users, null, 2));
	}
};

module.exports = {
	getAllUsers,
	getUserById,
	getUserByEmail,
	createUser,
	updateUserName
};
