const express = require('express');
const router = express.Router();
const userController = require('../../controllers/api/userController');

// GET /api/users?search=&page=&limit=
router.get('/', userController.getAllUsers);

// GET /api/users/:id
router.get('/:id', userController.getUserById);

// POST /api/users
router.post('/', userController.createUser);

// PUT /api/users/:id
router.put('/:id', userController.updateUser);

module.exports = router;
