const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: path.join(__dirname, "./tripshare.sqlite3"),
});

async function test_db() {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
}

test_db();
module.exports = sequelize;
