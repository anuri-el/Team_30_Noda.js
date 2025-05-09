const fs = require("fs").promises;
const fsSyncOnly = require("fs");
const path = require("path");
const tripsFilePath = path.join(__dirname, "../data/trips.json");

exports.getAll = () => {
	// sync
	const data = fsSyncOnly.readFileSync(tripsFilePath, "utf-8");
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

exports.fetchTrip = (id, callback) => {
	// Callback
	console.log("fetch trip");
	fsSyncOnly.readFile(tripsFilePath, "utf-8", (err, data) => {
		// console.log("read file");
		if (err) {
			console.log("error reading file");
			callback(err);
		}

		try {
			const trips = JSON.parse(data);
			// console.log(trips);
			const trip = trips.find((t) => t.id === id);
			// console.log(trip);
			if (trip) {
				callback(null, trip); // success
			} else {
				callback(new Error("Trip not found")); // not found
			}
		} catch (parseErr) {
			callback(parseErr); // JSON parse error
		}
	});
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
