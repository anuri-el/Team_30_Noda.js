const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "tripshare.sqlite3");
const db = new sqlite3.Database(dbPath, (err) => {
	if (err) {
		console.error("Помилка підключення до бази даних:", err.message);
	} else {
		console.log("Підключено до SQLite бази.");
	}
});

module.exports = db;
db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, rows) => {
	if (err) {
		console.error("Помилка при запиті таблиць:", err.message);
	} else {
		console.log("Список таблиць:", rows);
	}
});