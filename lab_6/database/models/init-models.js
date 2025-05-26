var DataTypes = require("sequelize").DataTypes;
var _bookings = require("./bookings");
var _trips = require("./trips");
var _users = require("./users");

function initModels(sequelize) {
  var bookings = _bookings(sequelize, DataTypes);
  var trips = _trips(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  bookings.belongsTo(trips, { as: "trip", foreignKey: "tripId"});
  trips.hasMany(bookings, { as: "bookings", foreignKey: "tripId"});
  bookings.belongsTo(users, { as: "passenger", foreignKey: "passengerId"});
  users.hasMany(bookings, { as: "bookings", foreignKey: "passengerId"});

  return {
    bookings,
    trips,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
