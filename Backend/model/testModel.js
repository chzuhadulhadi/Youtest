const testService = require('../service/testService');

module.exports = {

	createTest: async function (obj) {
		const testObj = await testService.makeCreateTestObj(obj)
		return await testService.createTest({ testObj, ...obj });
	},
	getMyTestSingle: async function (obj) {
		// const rows = await testService.getAllTest({ where: { id: obj.id } });
		const getobj = await testService.getMyTestSingle({ where: { id: obj.id } });
		// console.log(getobj);
		const qobj = await testService.makeEditTestObj(getobj.dataValues);
		// console.log(qobj);
		return { ...qobj, getobj }
		// return { rows }
	},
	getMyTest: async function (obj) {
		const offset = obj.page * obj.limit - obj.limit;

		const rows = await testService.getMyTest(offset, obj.limit, { where: { createdById: obj.userId } });
		const count = await testService.getMyTestCount({ where: { createdById: obj.userId } });

		return { rows, count }
	},

	uploadFile: async function (fl) {
		var ext = fl.name.split(".");
		ext = ext[ext.length - 1];
		fileName = "est-" + Date.now() + "." + ext;
		const path = "/files/";
		let temp = await fl.mv("./public/files/" + fileName);
		return path + fileName;
	},
};
