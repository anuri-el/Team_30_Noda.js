// controllers/api/tripController.js
const tripService = require("../../services/tripService");

// GET /api/trips — Отримати всі поїздки з фільтрами
exports.getAllTrips = async (req, res) => {
	try {
		const filters = {
			search: req.query.search || "",
			from: req.query.from || "",
			to: req.query.to || "",
			dateFrom: req.query.dateFrom || "",
			dateTo: req.query.dateTo || "",
			freeSpots: req.query.freeSpots || 0,
		};
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 15;

		const { trips, totalCount } = await tripService.fetchTripsPaginated(
			filters,
			page,
			limit
		);
		res.status(200).json({
			trips,
			page,
			limit,
			totalCount,
			totalPages: Math.ceil(totalCount / limit),
		});
	} catch (err) {
		console.error("Error fetching trips:", err);
		res.status(500).json({ error: "Server error" });
	}
};

// GET /api/trips/:id — Отримати одну поїздку за ID
exports.getTripById = async (req, res) => {
	const tripId = parseInt(req.params.id);
	try {
		const trip = await tripService.getTripById(tripId);
		if (!trip) {
			return res.status(404).json({ error: "Trip not found" });
		}
		res.status(200).json(trip);
	} catch (err) {
		console.error("Error fetching trip:", err);
		res.status(500).json({ error: "Server error" });
	}
};

// POST /api/trips — Створити нову поїздку
exports.createTrip = async (req, res) => {
	try {
		const { from, to, date, seats, driverId, title } = req.body;
		if (!from || !to || !date || !seats || !driverId) {
			return res.status(400).json({ error: "Missing required fields" });
		}
		const newTrip = await tripService.createTrip({
			from,
			to,
			date,
			seats: parseInt(seats || 1),
			driverId: parseInt(driverId),
			title,
		});
		res.status(201).json(newTrip);
	} catch (err) {
		console.error("Error creating trip:", err);
		res.status(500).json({ error: "Server error" });
	}
};

// PUT /api/trips/:id — Оновити поїздку
exports.updateTrip = async (req, res) => {
	try {
		const tripId = parseInt(req.params.id);
		const { from, to, date, seats } = req.body;

		const updatedTrip = await tripService.updateTrip(tripId, {
			from,
			to,
			date,
			seats: parseInt(seats),
		});

		if (!updatedTrip) {
			return res.status(404).json({ error: "Trip not found" });
		}

		res.status(200).json(updatedTrip);
	} catch (err) {
		console.error("Error updating trip:", err);
		res.status(500).json({ error: "Server error" });
	}
};

// DELETE /api/trips/:id — Видалити поїздку
exports.deleteTrip = async (req, res) => {
	try {
		const tripId = parseInt(req.params.id);
		await tripService.deleteTrip(tripId);
		res.status(204).send(); // No content
	} catch (err) {
		console.error("Error deleting trip:", err);
		res.status(500).json({ error: "Server error" });
	}
};

// GET /api/trips/locations — Отримати унікальні значення `from` і `to`
exports.getLocations = async (req, res) => {
	try {
		const { fromList, toList } = await tripService.fetchLocations();

		res.status(200).json({ fromList, toList });
	} catch (err) {
		console.error("Error fetching locations:", err);
		res.status(500).json({ error: "Server error" });
	}
};
