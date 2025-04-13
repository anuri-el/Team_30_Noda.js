const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/users.json');

const getAllUsers = async () => {
    const data = await fs.promises.readFile(dataPath, 'utf8');
    return JSON.parse(data);
};

const getUserById = async (id) => {
    const users = await getAllUsers();
    return users.find(u => u.id === id);
};

module.exports = {
    getAllUsers,
    getUserById
};