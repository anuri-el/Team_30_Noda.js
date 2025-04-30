const tripRepository = require("../repositories/tripRepository");

exports.fetchTrips = async (filters) => {
	const allTrips = await tripRepository.getAll();
	console.log(filters);

	return allTrips.filter((trip) => {
		const matchesSearch =
			!filters.search ||
			trip.from.toLowerCase().includes(filters.search) ||
			trip.to.toLowerCase().includes(filters.search) ||
			trip.title.toLowerCase().includes(filters.search);

		const matchesFrom = !filters.from || trip.from === filters.from;
		const matchesTo = !filters.to || trip.to === filters.to;

		console.log(matchesTo);

		const matchesDateFrom =
			!filters.dateFrom ||
			new Date(trip.date) >= new Date(filters.dateFrom);
		const matchesDateTo =
			!filters.dateTo || new Date(trip.date) <= new Date(filters.dateTo);

		const matchesFreeSpots =
			!filters.freeSpots || trip.seats >= Number(filters.freeSpots);

		console.log(matchesFreeSpots);

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

exports.createTrip = async (tripData) => {
	return await tripRepository.add(tripData);
};

exports.deleteTrip = async (id) => {
	return await tripRepository.delete(id);
};

exports.getTripById = async (id) => await tripRepository.getById(id);
exports.updateTrip = async (id, data) => await tripRepository.update(id, data);
