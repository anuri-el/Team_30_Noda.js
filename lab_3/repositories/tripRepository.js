const fs = require("fs").promises;
const path = require("path");
const tripsFilePath = path.join(__dirname, "../data/trips.json");

exports.getAll = async () => {
	const data = await fs.readFile(tripsFilePath, "utf-8");
	return JSON.parse(data);
};

exports.add = async (trip) => {
	// async-await
	const data = await fs.readFile(tripsFilePath, "utf-8");
	const trips = JSON.parse(data);
	trip.id = Date.now();
	trips.push(trip);
	await fs.writeFile(tripsFilePath, JSON.stringify(trips, null, 2));
};

exports.delete = (id) => {
	// Promise
	fs.readFile(tripsFilePath, "utf-8").then((data) => {
		let trips = JSON.parse(data);
		id = parseInt(id);
		trips = trips.filter((trip) => trip.id !== id);
		fs.writeFile(tripsFilePath, JSON.stringify(trips, null, 2));
	});
};

exports.getById = async (id) => {
	const data = await fs.readFile(tripsFilePath, "utf-8");
	const trips = JSON.parse(data);
	return trips.find((t) => t.id === id);
};

exports.update = async (id, newData) => {
	const data = await fs.readFile(tripsFilePath, "utf-8");
	const trips = JSON.parse(data);
	const index = trips.findIndex((t) => t.id === id);
	if (index !== -1) {
		trips[index] = { ...trips[index], ...newData };
		await fs.writeFile(tripsFilePath, JSON.stringify(trips, null, 2));
	}
};
