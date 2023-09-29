const landingPageService = require('../service/landingPageService');
const model = require("../model");

module.exports = {

	getLandingPage: async function (obj) {
		const offset = obj.page * obj.limit - obj.limit;
		const count = await landingPageService.getLandingPageCount();

		const rows = await landingPageService.getLandingPage(offset, obj.limit, {
			where: {
				...(obj.id && { id: obj.id })
			}
		});
		return { rows, count }
	},
	getAttachedTest: async function (obj) {
		const offset = obj.page * obj.limit - obj.limit;
		const count = await landingPageService.getLandingPageCount();

		const rows = await landingPageService.getLandingPage(offset, obj.limit, {
			attributes: ["id"],
			where: {
				...(obj.id && { id: obj.id })
			},
			include: {
				model: model.userTest,
				attributes: ["id", "name"],
				include: {
					model: model.user,
					attributes: ["fullName", "email"],

				}

			}
		});
		return { rows, count }
	},

	addLandingPage: async function (obj) {
		return await landingPageService.addLandingPage(obj)
	},
	deleteLandingPage: async function (obj) {
		return await landingPageService.deleteLandingPage(obj)
	},
	updateLandingPage: async function (obj) {
		return await landingPageService.updateLandingPage(obj, { where: { id: obj.id } })
	},
};
