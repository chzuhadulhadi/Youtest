const mailingListUserService = require('../service/mailingListUserService');

module.exports = {

	getMailingListUser: async function (obj) {
		const offset = obj.page * obj.limit - obj.limit;
		return await mailingListUserService.getMailingListUser(offset, obj.limit,
			{ where: { userId: obj.userId } }
		)
	},

	addMailingListUser: async function (obj) {
		return await mailingListUserService.addMailingListUser(obj)
	},

	deleteMailingListUser: async function (obj) {
		return await mailingListUserService.deleteMailingListUser(obj)
	},
	updateMailingListUser: async function (obj) {
		return await mailingListUserService.updateMailingListUser(obj, { where: { id: obj.id } })
	},
};
