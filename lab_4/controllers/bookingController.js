const tripService = require("../services/tripService");
const userService = require("../services/userService");
const bookingService = require("../services/bookingService");

exports.getBookingRequestForm = async (req, res) => {
	// console.log("Bokking req form");
	const tripId = parseInt(req.params.id);

	tripService.getTripById(tripId, async (err, trip) => {
		if (err) {
			console.error("Error fetching trip:", err);
			return res.status(500).send("Помилка отримання рейсу");
		}
		if (!trip) return res.status(404).send("Рейс не знайдено");

		const driver = await userService.getUserById(trip.driverId);
		// console.log(driver);

		res.render("trips/booking_request", {
			trip,
			driverName: driver.name,
			title: "Placing a booking request on a trip",
		});
	});
};

exports.createBookingRequest = async (req, res) => {
	const tripId = parseInt(req.params.id);
	const sessionUser = req.session.passport.user;
	// console.log(sessionUser);
	// console.log(session);
	const { seatsRequested, notes } = req.body;
	try {
		const newBooking = await bookingService.createBooking({
			tripId,
			passengerId: sessionUser,
			seatsBooked: seatsRequested,
			notes,
		});
		res.redirect(`/trips`);
	} catch (err) {
		console.error("Error placing booking request:", err);
		res.status(500);
	}
};
