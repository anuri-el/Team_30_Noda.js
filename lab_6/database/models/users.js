const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const Users = sequelize.define(
	"users",
	{
		ID: {
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		email: {
			type: DataTypes.TEXT,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: "users",
		timestamps: false,
		indexes: [
			{
				name: "sqlite_autoindex_users_1",
				unique: true,
				fields: [{ name: "ID" }],
			},
			{
				name: "sqlite_autoindex_users_2",
				unique: true,
				fields: [{ name: "email" }],
			},
		],
	}
);
module.exports = Users;
