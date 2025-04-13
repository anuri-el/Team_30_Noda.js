const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// /users/:id
router.get('/:id', userController.getUserDashboard);

module.exports = router;