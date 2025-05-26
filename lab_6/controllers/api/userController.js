const userService = require("../../services/userService");

// Отримати всіх користувачів з фільтрацією та пагінацією
exports.getAllUsers = async (req, res) => {
  try {
    const { name, page = 1, limit = 10 } = req.query;
    const users = await userService.getAllUsers();

    // Фільтрація (по імені)
    let filteredUsers = users;
    if (name) {
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    // Пагінація
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    res.status(200).json({
      data: paginatedUsers,
      total: filteredUsers.length,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Отримати одного користувача за id
exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Створити користувача
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newUser = await userService.createUser({ name, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Оновити користувача
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    console.log("Update user request:", id, name);

    const updatedUser = await userService.updateUserName(id, name);
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
      console.error("Update user error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
