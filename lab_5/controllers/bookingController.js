const tripService = require("../services/tripService");
const userService = require("../services/userService");
const bookingService = require("../services/bookingService");

exports.getBookingRequestForm = async (req, res) => {
	// console.log("Booking req form");
	const tripId = parseInt(req.params.id);
	// console.log(tripId);
	const trip = await tripService.getTripById(tripId);
	console.log("fetched trip", trip);

	if (!trip) return res.status(404).send("Рейс не знайдено");

	const driver = await userService.getUserById(trip.driverId);
	// console.log(driver);

	res.render("trips/booking_request", {
		trip,
		driverName: driver.name,
		title: "Placing a booking request on a trip",
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
			seatsBooked: parseInt(seatsRequested),
			notes: notes || null,
		});
		await tripService.occupySeats(tripId, parseInt(seatsRequested));
		res.redirect(`/trips`);
	} catch (err) {
		res.status(500).send("Error placing booking request: " + err);
	}
};
