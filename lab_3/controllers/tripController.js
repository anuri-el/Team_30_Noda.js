const tripService = require('../services/tripService');

exports.getHomePage = (req, res) => {
    res.render('index');
};

exports.getAllTrips = async (req, res) => {
    try {
        const trips = await tripService.getAllTrips();
        res.render('trips', { trips });
    } catch (err) {
        res.status(500).send('Error');
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
        driverId: driverId
    };

    try {
        await tripService.createTrip(newTrip);
        res.redirect(`/users/${driverId}/driver`);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error');
    }
};

exports.getDriverDashboard = async (req, res) => {
    const userId = parseInt(req.params.id);

    try {
        const allTrips = await tripService.getAllTrips();
        const userTrips = allTrips.filter(trip => trip.driverId === userId);

        const user = {
            id: userId,
            name: `User #${userId}`
        };

        res.render('driver', { user, trips: userTrips });
    } catch (err) {
        res.status(500).send('Error');
    }
};

exports.deleteTrip = async (req, res) => {
    const tripId = req.params.id;
    const userId = req.body.userId;

    try {
        await tripService.deleteTrip(tripId);
        res.redirect(`/users/${userId}/driver`);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error');
    }
};

exports.getEditTripForm = async (req, res) => {
    const tripId = parseInt(req.params.id);
    const trips = await tripService.getAllTrips();
    const trip = trips.find(t => t.id === tripId);

    if (!trip) return res.status(404).send('Рейс не знайдено');

    res.render('edit_trip', { trip });
};

exports.updateTrip = async (req, res) => {
    const tripId = parseInt(req.params.id);
    const { from, to, date, seats } = req.body;

    try {
        await tripService.updateTrip(tripId, { from, to, date, seats: parseInt(seats) });
        const trips = await tripService.getAllTrips();
        const updatedTrip = trips.find(t => t.id === tripId);
        const driverId = updatedTrip?.driverId || 0;
        res.redirect(`/users/${driverId}/driver`);
    } catch (err) {
        res.status(500).send('Error');
    }
};