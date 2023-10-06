const landingPageService = require('../service/landingPageService');
const testService=require('../service/testService');
const userTestService=require('../service/userTestService');
const mailService = require('../service/mailService');
const userService = require('../service/userService');
const model = require("../model");
const { Op } = require("sequelize");

module.exports = {
	sendUserInfo:async function(obj)
	{
		// console.log(obj.testId);
		const test=await testService.getMyTest(0,1,{where:{id:obj.testId}});
		// console.log(test[0].dataValues.createdById);
		
		const ownerId=test[0].dataValues.createdById;
		const testname=test[0].dataValues.name;
		// console.log(ownerId);
		const user=await userService.getuserById(ownerId);
		// console.log(user.dataValues.email);
		const email=user.dataValues.email;
		const data=await mailService.sendUserInfo(email,testname,obj);
		// const data=await testService.sendMail(allTest[0],obj);
		// console.log(data);
		// console.log(obj);
	},

	getSinglelandingPage: async function (obj) {
		return await landingPageService.getSingleLandingPage(obj)
	},
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
		console.log(obj);
		return await landingPageService.addLandingPage(obj)
	},
	attachLandingPagetoTest: async function (obj) {
		console.log(obj);
		return await landingPageService.attachLandingPagetoTest(obj)
	},
	deleteLandingPage: async function (obj) {
		return await landingPageService.deleteLandingPage(obj)
	},
	updateLandingPage: async function (obj) {
		console.log(obj.testId);
		return await landingPageService.updateLandingPage(obj, { where: { id: obj.id } })
	},
};
