// const fs = require("fs").promises;
// const path = require("path");
const bcrypt = require("bcrypt");
const userRepository = require("../repositories/userRepository");

const getAllUsers = () => {
	return userRepository.getAllUsers();
};

const getUserById = (id) => {
	return userRepository.getUserById(id);
};

const getUserByEmail = (email) => {
	return userRepository.getUserByEmail(email);
};

const createUser = async ({ name, email, password }) => {
	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser = {
		name,
		email,
		password: hashedPassword,
	};
	return userRepository.createUser(newUser);
};

const updateUserName = async (id, newName) => {
	return userRepository.updateUserName(id, newName);
};

module.exports = {
	getAllUsers,
	getUserById,
	getUserByEmail,
	createUser,
	updateUserName
};
