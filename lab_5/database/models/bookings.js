const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const Bookings = sequelize.define(
	"bookings",
	{
		ID: {
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		passengerId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "users",
				key: "ID",
			},
		},
		tripId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "trips",
				key: "ID",
			},
		},
		seatsBooked: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: 1,
		},
		notes: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		approved: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: 0,
		},
	},
	{
		sequelize,
		tableName: "bookings",
		timestamps: false,
		indexes: [
			{
				name: "sqlite_autoindex_bookings_1",
				unique: true,
				fields: [{ name: "ID" }],
			},
		],
	}
);

module.exports = Bookings;
