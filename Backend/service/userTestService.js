const { Op } = require('sequelize');
const model = require('../model');

module.exports = {
	createUserTest: async function (obj, t) {
		return await model.userTest.create(obj, { transaction: t });
	},
	updateUserTest: async function (obj, filter) {
		return await model.userTest.update(obj, filter);
	},
	getUserTest: async function (offset, limit, filter) {
		console.log(filter);
		return await model.userTest.findAll({
			limit,
			offset,
			...filter,
		});
	},
	getUserTestCount: async function (filter) {
		return await model.userTest.count(filter);
	},
	initiateBulkTest: async function (obj, t) {
		console.log('obj', obj);
		return await model.userTest.bulkCreate(obj, {
			transaction: t,
		});
	},
	shuffle: async function (array) {
		let currentIndex = array.length,
			randomIndex;

		// While there remain elements to shuffle.
		while (currentIndex != 0) {
			// Pick a remaining element.
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			];
		}

		return array;
	},
};
