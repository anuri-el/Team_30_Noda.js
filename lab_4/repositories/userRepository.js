const db = require('../database/database.js');

exports.getUserByEmail = async (email) => {
	return new Promise((resolve, reject) => {
		db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
			if (err) return reject(err);
			resolve(row);
		});
	});
};

exports.getUserById = async (id) => {
	return new Promise((resolve, reject) => {
		db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
			if (err) return reject(err);
			resolve(row);
		});
	});
};

exports.createUser = async (user) => {
	const { name, email, password } = user;
	return new Promise((resolve, reject) => {
		db.run(
			"INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
			[name, email, password],
			function (err) {
				if (err) return reject(err);
				resolve({ id: this.lastID, name, email });
			}
		);
	});
};

exports.getAllUsers = async () => {
	return new Promise((resolve, reject) => {
		db.all("SELECT * FROM users", (err, rows) => {
			if (err) return reject(err);
			resolve(rows);
		});
	});
};