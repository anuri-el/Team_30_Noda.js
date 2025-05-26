const axios = require("axios");

const { apiBase } = require("../config");

exports.getBookingRequestForm = async (req, res) => {
	const tripId = parseInt(req.params.id);

	try {
		const apiRes = await axios.get(`${apiBase}/trips/${tripId}/book`);
		const { trip, driverName } = apiRes.data;

		res.render("trips/booking_request", {
			trip,
			driverName,
			title: "Placing a booking request on a trip",
		});
	} catch (err) {
		if (err.response && err.response.status === 404) {
			return res.status(404).send("Рейс не знайдено");
		}
		console.error(err);
		res.status(500).send("Error fetching booking data");
	}
};

exports.createBookingRequest = async (req, res) => {
	const tripId = parseInt(req.params.id);
	const sessionUser = req.session.passport.user;
	const { seatsRequested, notes } = req.body;

	try {
		await axios.post(`${apiBase}/trips/${tripId}/book`, {
			passengerId: sessionUser,
			seatsRequested,
			notes,
		});

		res.redirect(`/trips`);
	} catch (err) {
		console.error(err);
		res.status(500).send("Error placing booking request");
	}
};
