const tripService = require("../services/tripService");

exports.getHomePage = (req, res) => {
	res.render("index");
};

exports.getAllTrips = (req, res) => {
	try {
		const filters = {
			search: (req.query.search || "").toLowerCase(),
			from: (req.query["filter-dest-from"] || "").toLowerCase(),
			to: (req.query["filter-dest-to"] || "").toLowerCase(),
			dateFrom: req.query["filter-date-from"] || "",
			dateTo: req.query["filter-date-to"] || "",
			freeSpots: req.query["filter-free-spots"] || 1,
		};
		const trips = tripService.fetchTrips(filters);
		const { fromList, toList } = tripService.fetchLocations();
		res.render("trips/trips", {
			title: "Trips",
			trips,
			filters,
			fromList,
			toList,
		});
	} catch (err) {
		console.log(err);
		res.status(500).send("Error");
	}
};

exports.createTrip = async (req, res) => {
	const driverId = parseInt(req.params.id);
	const { from, to, date, seats } = req.body;

	const newTrip = {
		id: Date.now(),
		from,
		to,
		date,
		seats: parseInt(seats),
		driverId: driverId,
	};

	try {
		await tripService.createTrip(newTrip);
		res.redirect(`/users/${driverId}/driver`);
	} catch (err) {
		console.error("Error:", err);
		res.status(500).send("Error");
	}
};

exports.getDriverDashboard = async (req, res) => {
	const userId = parseInt(req.params.id);

	try {
		const allTrips = await tripService.getAllTrips();
		const userTrips = allTrips.filter((trip) => trip.driverId === userId);

		const user = {
			id: userId,
			name: `User #${userId}`,
		};

		res.render("driver", { user, trips: userTrips });
	} catch (err) {
		res.status(500).send("Error");
	}
};

exports.deleteTrip = async (req, res) => {
	const tripId = req.params.id;
	const userId = req.body.userId;

	try {
		await tripService.deleteTrip(tripId);
		res.redirect(`/users/${userId}/driver`);
	} catch (err) {
		console.error("Error:", err);
		res.status(500).send("Error");
	}
};

exports.getEditTripForm = async (req, res) => {
	const tripId = parseInt(req.params.id);
	const trip = await tripService.getTripById(tripId);

	if (!trip) return res.status(404).send("Рейс не знайдено");

	res.render("trips/edit_trip", { trip, title: "Editing trip" });
};

exports.getBookingRequestForm = (req, res) => {
	console.log("Bokking req form");
	const tripId = parseInt(req.params.id);

	tripService.getTripById(tripId, (err, trip) => {
		if (err) {
			console.error("Error fetching trip:", err);
			return res.status(500).send("Помилка отримання рейсу");
		}
		if (!trip) return res.status(404).send("Рейс не знайдено");

		console.log("trip received for form", trip);
		res.render("trips/booking_request", {
			trip,
			title: "Placing a booking request on a trip",
		});
	});
};
exports.createBookingRequest = async (req, res) => {};

exports.updateTrip = async (req, res) => {
	const tripId = parseInt(req.params.id);
	const { from, to, date, seats } = req.body;

	try {
		await tripService.updateTrip(tripId, {
			from,
			to,
			date,
			seats: parseInt(seats),
		});
		const trips = await tripService.getAllTrips();
		const updatedTrip = trips.find((t) => t.id === tripId);
		const driverId = updatedTrip?.driverId || 0;
		res.redirect(`/users/${driverId}/driver`);
	} catch (err) {
		res.status(500).send("Error");
	}
};
