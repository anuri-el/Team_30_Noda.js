const axios = require("axios");
const { apiBase } = require("../config");

exports.getHomePage = (req, res) => {
	res.render("index", {
		user: req.session.user || null,
	});
};

exports.getAllTrips = async (req, res) => {
	try {
		const filters = {
			search: req.query.search || "",
			from: req.query["filter-dest-from"] || "",
			to: req.query["filter-dest-to"] || "",
			dateFrom: req.query["filter-date-from"] || "",
			dateTo: req.query["filter-date-to"] || "",
			freeSpots: req.query["filter-free-spots"] || 1,
		};

		const page = parseInt(req.query.page) || 1;
		const limit = 10;

		// console.log(filters);
		const response = await axios.get(`${apiBase}/trips`, {
			params: {
				...filters,
				page,
				limit,
			},
		});
		const { trips, totalPages } = response.data;
		// console.log(trips);
		const locationResponse = await axios.get(`${apiBase}/trips/locations`);
		const { fromList, toList } = locationResponse.data;

		const filtersQuery = Object.entries(filters)
			.filter(([_, val]) => val)
			.map(([key, val]) => `&${key}=${encodeURIComponent(val)}`)
			.join("");
		res.render("trips/trips", {
			title: "Trips",
			trips,
			filters,
			fromList,
			toList,
			currentPage: page,
			totalPages,
			filtersQuery,
		});
	} catch (err) {
		console.log(err);
		res.status(500).send("Error");
	}
};

exports.createTrip = async (req, res) => {
	const driverId = parseInt(req.params.id);
	const { from, to, date, seats } = req.body;
	try {
		await axios.post(`${apiBase}/trips`, {
			from,
			to,
			date,
			seats: parseInt(seats),
			driverId,
			title,
		});
		res.redirect(`/users/${driverId}/driver`);
	} catch (err) {
		console.error("Error:", err.response?.data || err.message);
		res.status(500).send("Error");
	}
};

exports.getDriverDashboard = async (req, res) => {
	const userId = parseInt(req.params.id);

	try {
		const userResponse = await axios.get(`${apiBase}/users/${userId}/`);
		const user = userResponse.data;

		const userIdAndName = {
			id: userId,
			name: user.name,
		};

		const tripsResponse = await axios.get(
			`${apiBase}/users/${userId}/trips`
		);
		const userTrips = tripsResponse.data;

		res.render("driver", { user: userIdAndName, trips: userTrips });
	} catch (err) {
		console.error(err);
		res.status(500).send("Error");
	}
};

exports.deleteTrip = async (req, res) => {
	const tripId = req.params.id;
	const userId = req.body.userId;

	try {
		await axios.delete(`${apiBase}/trips/${tripId}`);
		res.redirect(`/users/${userId}/driver`);
	} catch (err) {
		console.error("Error:", err.response?.data || err.message);
		res.status(500).send("Error");
	}
};

exports.getEditTripForm = async (req, res) => {
	const tripId = parseInt(req.params.id);
	try {
		const response = await axios.get(`${apiBase}/trips/${tripId}`);
		const trip = response.data;

		if (!trip) return res.status(404).send("Рейс не знайдено");

		res.render("trips/edit_trip", { trip, title: "Editing trip" });
	} catch (err) {
		console.error("Error:", err.response?.data || err.message);
		res.status(500).send("Error");
	}
};

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
