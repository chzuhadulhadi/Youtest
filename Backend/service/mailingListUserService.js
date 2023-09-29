const { Op } = require("sequelize");
const model = require("../model");

module.exports = {

	getMailingListUser: async function (offset, limit, filter) {
		return await model.mailingListUser.findAll({
			offset,
			limit,
			...filter
		});
	},

	addMailingListUser: async function (obj, t) {
		return await model.mailingListUser.create(obj, { transaction: t });
	},

	deleteMailingListUser: async function (obj, t) {
		return await model.mailingListUser.destroy({ where: { id: obj.id } });
	},
	updateMailingListUser: async function (obj, filter) {
		return await model.mailingListUser.update(obj, filter);
	},


};
