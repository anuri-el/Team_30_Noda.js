const db = require("../database/database.js");

exports.getUserByEmail = async (email) => {
	user = new Promise((resolve, reject) => {
		db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
			if (err) return reject(err);
			resolve(row);
		});
	});
	console.log("rep", user);
	return user;
};

exports.getUserById = async (id) => {
	console.log("get user by id");
	return new Promise((resolve, reject) => {
		db.get("SELECT * FROM users WHERE ID = ?", [id], (err, row) => {
			if (err) return reject(err);
			resolve(row);
		});
	});
};

exports.createUser = async (user) => {
	// console.log("create user");
	const { name, email, password } = user;
	return new Promise((resolve, reject) => {
		db.run(
			"INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
			[name, email, password],
			function (err) {
				if (err) return reject(err);
				db.get(
					"SELECT * FROM users WHERE ID = ?",
					[this.lastID],
					(err, row) => {
						if (err) return reject(err);
						resolve(row);
					}
				);
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
