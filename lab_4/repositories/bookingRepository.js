const db = require("../database/database.js");

exports.insertBooking = async (booking) => {
	const { passengerId, tripId, seatsBooked, notes } = booking;

	return new Promise((resolve, reject) => {
		db.run("BEGIN");
		db.run(
			`INSERT INTO bookings (passengerId, tripId, seatsBooked, notes) VALUES (?, ?, ?, ?)`,
			[passengerId, tripId, seatsBooked, notes],
			(err, row) => {
				if (err) {
					db.rollback;
					return reject(err);
				}
				db.run("commit");
				resolve(row);
			}
		);
	});
};
