const db = require("../database/database.js");
const Trips = require("../database/models/trips");

exports.getAll = async () => {
	// return new Promise((resolve, reject) => {
	// 	db.all("SELECT * FROM trips", (err, rows) => {
	// 		if (err) return reject(err);
	// 		resolve(rows);
	// 	});
	// });
	try {
		const trips = await Trips.findAll();
		return trips.map((trip) => trip.get({ plain: true }));
	} catch (err) {
		throw err;
	}
};

exports.add = async (tripData) => {
	const { from, to, date, seats, driverId, title = null } = tripData;
	const t = await Trips.sequelize.transaction();

	try {
		const newTrip = await Trips.create(
			{ from, to, date, seats, driverId, title },
			{ transaction: t }
		);
		await t.commit();
		return newTrip.get({ plain: true });
	} catch (err) {
		await t.rollback();
		throw err;
	}

};

exports.delete = async (id) => {
	const t = await Trips.sequelize.transaction();

	try {
		await Trips.destroy({ where: { ID: id }, transaction: t });
		await t.commit();
	} catch (err) {
		await t.rollback();
		throw err;
	}
};

exports.fetchTrip = async (id) => {
	try {
		const trip = await Trips.findByPk(id);
		return trip ? trip.get({ plain: true }) : null;
	} catch (err) {
		throw err;
	}

};

exports.update = async (id, newData) => {
	const t = await Trips.sequelize.transaction();
	try {
		const trip = await Trips.findByPk(id, { transaction: t });
		if (!trip) {
			await t.rollback();
			return null;
		}

		const updatedTrip = await trip.update(newData, { transaction: t });
		await t.commit();
		return updatedTrip.get({ plain: true });
	} catch (err) {
		await t.rollback();
		throw err;
	}

};