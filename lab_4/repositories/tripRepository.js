const db = require("../database/database.js");

// Отримати всі поїздки
exports.getAll = async () => {
	return new Promise((resolve, reject) => {
		db.all("SELECT * FROM trips", (err, rows) => {
			if (err) return reject(err);
			resolve(rows);
		});
	});
};

// Додати нову поїздку
exports.add = async (trip) => {
	const { from, to, date, seats, driverId } = trip;
	return new Promise((resolve, reject) => {
		db.run(
			"INSERT INTO trips (from, to, date, seats, driverId) VALUES (?, ?, ?, ?, ?)",
			[from, to, date, seats, driverId],
			function (err) {
				if (err) return reject(err);
				db.get(
					"SELECT * FROM trips WHERE ID = ?",
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

// Видалити поїздку за ID
exports.delete = async (id) => {
	return new Promise((resolve, reject) => {
		db.run("DELETE FROM trips WHERE ID = ?", [id], function (err) {
			if (err) return reject(err);
			resolve();
		});
	});
};

// Отримати поїздку за ID
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

// Оновити поїздку
exports.update = async (id, newData) => {
	const { from, to, date, seats, occupiedSeats, title } = newData;
	return new Promise((resolve, reject) => {
		db.run(
			'UPDATE trips SET "from" = ?, "to" = ?, date = ?, seats = ?, occupiedSeats = ?, title = ? WHERE ID = ?',
			[from, to, date, seats, occupiedSeats, title, id],
			function (err) {
				if (err) return reject(err);
				resolve();
			}
		);
	});
};
