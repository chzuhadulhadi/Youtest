const packageService = require('../service/packageService');

module.exports = {
	createPackage: async function createPackage(data) {
		return await packageService.createPackage(data);
	},
	getPackages: async function getPackages() {
		return await packageService.getPackages();
	},
	updatePackage: async function updatePackage(data) {
		return await packageService.updatePackage(data);
	},
	deletePackage: async function deletePackage(data) {
		return await packageService.deletePackage(data);
	},
};
