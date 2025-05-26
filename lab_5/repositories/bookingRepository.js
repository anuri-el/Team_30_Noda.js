const Booking = require("../database/models/bookings.js");

exports.insertBooking = async (booking) => {
	const newBooking = await Booking.create(booking);

	return newBooking;
};
