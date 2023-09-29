const mailingListService = require('../service/mailingListService');

module.exports = {

	getMailingList: async function (obj) {
		const offset = obj.page * obj.limit - obj.limit;
		var count = await mailingListService.getMailingListCount();

		const rows = await mailingListService.getMailingList(offset, obj.limit);
		return { rows, count }
	},

	addMailingList: async function (obj) {
		return await mailingListService.addMailingList(obj)
	},
	deleteMailingList: async function (obj) {
		return await mailingListService.deleteMailingList(obj)
	},
	updateMailingList: async function (obj) {
		return await mailingListService.updateMailingList(obj, { where: { id: obj.id } })
	},
};
