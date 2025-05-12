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
	const { name, email, password } = user;

	return new Promise((resolve, reject) => {
		db.serialize(() => {
			db.run("BEGIN TRANSACTION");

			db.run(
				"INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
				[name, email, password],
				function (err) {
					if (err) {
						db.run("ROLLBACK");
						return reject(err);
					}

					const insertedId = this.lastID;

					db.get("SELECT * FROM users WHERE ID = ?", [insertedId], (err, row) => {
						if (err) {
							db.run("ROLLBACK");
							return reject(err);
						}

						db.run("COMMIT", (err) => {
							if (err) return reject(err);
							resolve(row);
						});
					});
				}
			);
		});
	});
};

exports.updateUserName = async (id, newName) => {
	return new Promise((resolve, reject) => {
		db.serialize(() => {
			db.run("BEGIN TRANSACTION");

			db.run(
				"UPDATE users SET name = ? WHERE ID = ?",
				[newName, id],
				function (err) {
					if (err) {
						db.run("ROLLBACK");
						return reject(err);
					}

					db.get("SELECT * FROM users WHERE ID = ?", [id], (err, row) => {
						if (err) {
							db.run("ROLLBACK");
							return reject(err);
						}

						db.run("COMMIT", (err) => {
							if (err) return reject(err);
							resolve(row);
						});
					});
				}
			);
		});
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
