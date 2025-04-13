const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

router.get('/', tripController.getHomePage);
router.get('/trips', tripController.getAllTrips);
router.post('/users/:id/driver/trips', tripController.createTrip);
router.get('/users/:id/driver', tripController.getDriverDashboard);
router.post('/trips/:id/delete', tripController.deleteTrip);
router.get('/trips/:id/edit', tripController.getEditTripForm);
router.post('/trips/:id/edit', tripController.updateTrip);

module.exports = router;