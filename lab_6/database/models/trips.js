const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");
const Trips = sequelize.define(
	"trips",
	{
		ID: {
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		from: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		to: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		date: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		seats: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: 1,
		},
		driverId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		title: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		occupiedSeats: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: 0,
		},
	},
	{
		sequelize,
		tableName: "trips",
		timestamps: false,
		indexes: [
			{
				name: "sqlite_autoindex_trips_1",
				unique: true,
				fields: [{ name: "ID" }],
			},
		],
	}
);
module.exports = Trips;
