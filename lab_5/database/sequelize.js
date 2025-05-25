const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "D:\\КПІ\\Team_30_Noda.js\\lab_5\\database\\tripshare.sqlite3",
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
