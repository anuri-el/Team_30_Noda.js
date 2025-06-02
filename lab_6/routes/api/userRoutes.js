const express = require("express");
const router = express.Router();
const userController = require("../../controllers/api/userController");

// GET /api/users?search=&page=&limit=
router.get("/", userController.getAllUsers);

// POST /api/users
router.post("/", userController.createUser);

// GET /api/users/:id
router.get("/:id", userController.getUserById);

// PUT /api/users/:id
router.put("/:id", userController.updateUser);

// GET /api/users/:id/trips
router.get("/:id/trips", userController.getTripsByDriver);

module.exports = router;
