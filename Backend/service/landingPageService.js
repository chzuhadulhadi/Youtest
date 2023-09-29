const { Op } = require("sequelize");
const model = require("../model");

module.exports = {

	getLandingPage: async function (offset, limit, filter) {
		return await model.landingPage.findAll({
			offset,
			limit,
			...filter
		});
	},
	getLandingPageCount: async function () {
		return await model.landingPage.count();
	},
	addLandingPage: async function (obj, t) {
		return await model.landingPage.create(obj, { transaction: t });
	},
	deleteLandingPage: async function (obj, t) {
		return await model.landingPage.destroy({ where: { id: obj.id } });
	},
	updateLandingPage: async function (obj, filter) {
		return await model.landingPage.update(obj, filter);
	},


};
