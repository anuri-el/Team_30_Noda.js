const db = require("../database/database.js");

exports.getAll = async () => {
	return new Promise((resolve, reject) => {
		db.all("SELECT * FROM trips", (err, rows) => {
			if (err) return reject(err);
			resolve(rows);
		});
	});
};

exports.add = async (trip) => {
	const { from, to, date, seats, driverId } = trip;

	return new Promise((resolve, reject) => {
		db.serialize(() => {
			db.run("BEGIN TRANSACTION");
			db.run(
				'INSERT INTO trips ("from", "to", date, seats, driverId) VALUES (?, ?, ?, ?, ?)',
				[from, to, date, seats, driverId],
				function (err) {
					if (err) {
						db.run("ROLLBACK");
						return reject(err);
					}

					db.get("SELECT * FROM trips WHERE ID = ?", [this.lastID], (err, row) => {
						if (err) {
							db.run("ROLLBACK");
							return reject(err);
						}

						db.run("COMMIT");
						resolve(row);
					});
				}
			);
		});
	});
};

exports.delete = async (id) => {
	return new Promise((resolve, reject) => {
		db.serialize(() => {
			db.run("BEGIN TRANSACTION");

			db.run("DELETE FROM trips WHERE ID = ?", [id], function (err) {
				if (err) {
					db.run("ROLLBACK");
					return reject(err);
				}

				db.run("COMMIT");
				resolve();
			});
		});
	});
};

exports.fetchTrip = async (id) => {
	// console.log("fetching trip");
	return new Promise((resolve, reject) => {
		db.get("SELECT * FROM trips WHERE ID = ?", [id], (err, row) => {
			if (err) return reject(err);
			// console.log(row);
			resolve(row);
		});
	});
};

exports.update = async (id, newData) => {
	const { from, to, date, seats, occupiedSeats, title } = newData;

	return new Promise((resolve, reject) => {
		db.serialize(() => {
			db.run("BEGIN TRANSACTION");

			db.run(
				'UPDATE trips SET "from" = ?, "to" = ?, date = ?, seats = ?, occupiedSeats = ?, title = ? WHERE ID = ?',
				[from, to, date, seats, occupiedSeats, title, id],
				function (err) {
					if (err) {
						db.run("ROLLBACK");
						return reject(err);
					}

					db.run("COMMIT");
					resolve();
				}
			);
		});
	});
};