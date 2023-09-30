const testService = require('../service/testService');

module.exports = {

	createTest: async function (obj) {
		const testObj = await testService.makeCreateTestObj(obj)
		return await testService.createTest({ testObj, ...obj });
	},
	deleteTest: async function (obj) {
		return await testService.deleteTest(obj);
	},
	getMyTestSingle: async function (obj) {
		console.log('getmysingletest');
		// const rows = await testService.getAllTest({ where: { id: obj.id } });
		const getobj = await testService.getMyTestSingle({ where: { id: obj.id } });
		// console.log(getobj);
		// return getobj;
		const qobj = await testService.makeEditTestObj(getobj.dataValues);
		// console.log(qobj);
		return {  obj,...qobj }
		// return { rows }
	},
	getMyTest: async function (obj) {
		const offset = obj.page * obj.limit - obj.limit;

		const rows = await testService.getMyTest(offset, obj.limit, { where: { createdById: obj.userId } });
		const count = await testService.getMyTestCount({ where: { createdById: obj.userId } });

		return { rows, count }
	},
	getTests:async function (obj) {
		// const offset = obj.page * obj.limit - obj.limit;

		const rows = await testService.getTests();
		// const count = await testService.getTestsCount();

		return { rows}
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
