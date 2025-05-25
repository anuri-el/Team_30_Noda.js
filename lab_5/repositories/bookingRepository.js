const db = require("../database/database.js");
const Booking = require("../database/models/bookings.js");

exports.insertBooking = async (booking) => {
	// const { passengerId, tripId, seatsBooked, notes } = booking;

	const newBooking = await Booking.create(booking);

	// return new Promise((resolve, reject) => {
	// 	db.run("BEGIN");
	// 	db.run(
	// 		`INSERT INTO bookings (passengerId, tripId, seatsBooked, notes) VALUES (?, ?, ?, ?)`,
	// 		[passengerId, tripId, seatsBooked, notes],
	// 		(err, row) => {
	// 			if (err) {
	// 				db.rollback;
	// 				return reject(err);
	// 			}
	// 			db.run("commit");
	// 			resolve(row);
	// 		}
	// 	);
	// });
	return newBooking;
};
