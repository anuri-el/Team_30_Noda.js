const Users = require("../database/models/users.js");

exports.getUserByEmail = async (email) => {
	try {
		const user = await Users.findOne({ where: { email } });
		return user ? user.get({ plain: true }) : null;
	} catch (err) {
		throw err;
	}
};

exports.getUserById = async (id) => {
	try {
		const user = await Users.findByPk(id);
		return user ? user.get({ plain: true }) : null;
	} catch (err) {
		throw err;
	}
};

exports.createUser = async ({ name, email, password }) => {
	try {
		const user = await Users.create({ name, email, password });
		return user.get({ plain: true });
	} catch (err) {
		throw err;
	}
};

exports.updateUserName = async (id, newName) => {
	try {
		const user = await Users.findByPk(id);
		if (!user) return null;
		user.name = newName;
		await user.save();
		return user.get({ plain: true });
	} catch (err) {
		throw err;
	}
};

exports.getAllUsers = async () => {
	try {
		const users = await Users.findAll();
		return users.map((user) => user.get({ plain: true }));
	} catch (err) {
		throw err;
	}
};