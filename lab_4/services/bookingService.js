const bookingRepository = require("../repositories/bookingRepository");

const createBooking = async ({ passengerId, tripId, seatsBooked, notes }) => {
	const newBooking = {
		passengerId,
		tripId,
		seatsBooked,
		notes,
	};
	return bookingRepository.insertBooking(newBooking);
};

module.exports = { createBooking };
