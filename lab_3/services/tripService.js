const tripRepository = require("../repositories/tripRepository");

exports.fetchTrips = (filters) => {
	const allTrips = tripRepository.getAll();

	return allTrips.filter((trip) => {
		const matchesSearch =
			!filters.search ||
			trip.from.toLowerCase().includes(filters.search) ||
			trip.to.toLowerCase().includes(filters.search) ||
			trip.title.toLowerCase().includes(filters.search);

		const matchesFrom = !filters.from || trip.from === filters.from;
		const matchesTo = !filters.to || trip.to === filters.to;

		const matchesDateFrom =
			!filters.dateFrom ||
			new Date(trip.date) >= new Date(filters.dateFrom);
		const matchesDateTo =
			!filters.dateTo || new Date(trip.date) <= new Date(filters.dateTo);

		const matchesFreeSpots =
			!filters.freeSpots || trip.seats >= Number(filters.freeSpots);

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

exports.fetchLocations = () => {
	const allTrips = tripRepository.getAll();

	const fromList = allTrips.map((trip) => trip.from);
	const toList = allTrips.map((trip) => trip.to);

	return { fromList, toList };
};

exports.createTrip = async (tripData) => {
	return await tripRepository.add(tripData);
};

exports.deleteTrip = async (id) => {
	return await tripRepository.delete(id);
};

exports.getTripById = (id) =>
	tripRepository.fetchUser(id, (err, trip) => {
		if (err) {
			console.error("Error fetching trip:", err);
			return;
		}
		return trip;
	});
exports.updateTrip = async (id, data) => await tripRepository.update(id, data);
