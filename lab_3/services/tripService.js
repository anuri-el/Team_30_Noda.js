const tripRepository = require('../repositories/tripRepository');

exports.getAllTrips = async () => {
    return await tripRepository.getAll();
};

exports.createTrip = async (tripData) => {
    return await tripRepository.add(tripData);
};

exports.deleteTrip = async (id) => {
    return await tripRepository.delete(id);
};

exports.getTripById = async (id) => await tripRepository.getById(id);
exports.updateTrip = async (id, data) => await tripRepository.update(id, data);