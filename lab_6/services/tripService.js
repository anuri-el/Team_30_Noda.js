const tripRepository = require("../repositories/tripRepository");

exports.fetchTrips = async (filters) => {
	const allTrips = await tripRepository.getAll();
	filters.search = filters.search ? filters.search.toLowerCase() : undefined;
	filters.from = filters.from ? filters.from.toLowerCase() : undefined;
	filters.to = filters.to ? filters.to.toLowerCase() : undefined;

	return allTrips.filter((trip) => {
		const title = !trip.title ? "" : trip.title;

		const matchesSearch =
			!filters.search ||
			trip.from.toLowerCase().includes(filters.search) ||
			trip.to.toLowerCase().includes(filters.search) ||
			title.toLowerCase().includes(filters.search);

		const matchesFrom =
			!filters.from || trip.from.toLowerCase() === filters.from;
		const matchesTo = !filters.to || trip.to.toLowerCase() === filters.to;

		const matchesDateFrom =
			!filters.dateFrom ||
			new Date(trip.date) >= new Date(filters.dateFrom);
		const matchesDateTo =
			!filters.dateTo || new Date(trip.date) <= new Date(filters.dateTo);

		const matchesFreeSpots =
			!filters.freeSpots ||
			trip.seats - trip.occupiedSeats >= Number(filters.freeSpots);

		return (
			matchesSearch &&
			matchesFrom &&
			matchesTo &&
			matchesDateFrom &&
			matchesDateTo &&
			matchesFreeSpots
		);
	});
};

exports.fetchTripsPaginated = async (filters, page, limit) => {
	const allTrips = await this.fetchTrips(filters);

	const totalCount = allTrips.length;
	const offset = (page - 1) * limit;
	const trips = allTrips.slice(offset, offset + limit);
	console.log(trips);

	return { trips, totalCount };
};

exports.getAllTrips = async () => {
	const trips = await tripRepository.getAll();
	return trips.map((trip) => ({
		id: trip.ID,
		from: trip.from,
		to: trip.to,
		date: trip.date,
		seats: trip.seats,
		occupiedSeats: trip.occupiedSeats,
		driverId: trip.driverId,
	}));
};

exports.fetchLocations = async () => {
	const allTrips = await tripRepository.getAll();

	const fromList = [...new Set(allTrips.map((trip) => trip.from))];
	const toList = [...new Set(allTrips.map((trip) => trip.to))];

	return { fromList, toList };
};

exports.createTrip = async (tripData) => {
	return await tripRepository.add(tripData);
};

exports.deleteTrip = async (id) => {
	return await tripRepository.delete(id);
};

exports.getTripById = async (id) => {
	return await tripRepository.fetchTrip(id);
};

exports.updateTrip = async (id, data) => await tripRepository.update(id, data);

exports.occupySeats = async (id, seatsBooked) => {
	let trip = await tripRepository.fetchTrip(id);
	console.log(trip);
	trip.occupiedSeats = trip.occupiedSeats + seatsBooked;
	console.log(trip.occupiedSeats);
	if (trip.occupiedSeats > trip.seats) {
		throw new Error("not enough free seats on a trip.");
	}
	await tripRepository.update(id, trip);
};
