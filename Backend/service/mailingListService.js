const { Op } = require("sequelize");
const model = require("../model");

module.exports = {

	getMailingList: async function (offset, limit, filter) {
		return await model.mailingList.findAll({
			offset,
			limit,
			...filter
		});
	},
	getMailingListCount: async function () {
		return await model.mailingList.count();
	},
	addMailingList: async function (obj, t) {
		return await model.mailingList.create(obj, { transaction: t });
	},
	deleteMailingList: async function (obj, t) {
		return await model.mailingList.destroy({ where: { id: obj.id } });
	},
	updateMailingList: async function (obj, filter) {
		return await model.mailingList.update(obj, filter);
	},


};
