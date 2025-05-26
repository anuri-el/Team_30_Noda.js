const tripService = require("../../services/tripService");
const userService = require("../../services/userService");
const bookingService = require("../../services/bookingService");

exports.getBookingRequestData = async (req, res) => {
	const tripId = parseInt(req.params.id);
	const trip = await tripService.getTripById(tripId);
	if (!trip) return res.status(404).json({ error: "Trip not found" });

	const driver = await userService.getUserById(trip.driverId);

	res.status(200).json({
		trip,
		driverName: driver.name,
	});
};

exports.createBookingRequest = async (req, res) => {
	const tripId = parseInt(req.params.id);
	const { passengerId, seatsRequested, notes } = req.body;

	try {
		const newBooking = await bookingService.createBooking({
			tripId,
			passengerId,
			seatsBooked: parseInt(seatsRequested),
			notes: notes || null,
		});

		await tripService.occupySeats(tripId, parseInt(seatsRequested));

		res.status(201).json({
			message: "Booking successful",
			booking: newBooking,
		});
	} catch (err) {
		res.status(500).json({ error: "Booking failed", details: err.message });
	}
};
