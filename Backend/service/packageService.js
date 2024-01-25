const { Op } = require("sequelize");
const model = require("../model");
const crypto = require("crypto");



module.exports = {
	createPackage: async function createPackage(data) {
		try {
			const packageData = await model.PricingPackage.create(data);
			return packageData;
		} catch (err) {
			throw err;
		}
	},
	getPackages: async function getPackages() {
		try {
			const packageData = await model.PricingPackage.findAll();
			return packageData;
		} catch (err) {
			throw err;
		}
	},
	getPackageById: async function getPackageById(id) {
		try {
			const packageData = await model.PricingPackage.findOne({
				where: {
					id: id,
				},
			});
			return packageData;
		} catch (err) {
			throw err;
		}
	},

	updatePackage: async function updatePackage(data){
		try {
			const packageData = await model.PricingPackage.update(data, {
				where: {
					id: data.id,
				},
			});
			return packageData;
		} catch (err) {
			throw err;
		}
	},
	deletePackage: async function deletePackage(data){
		try {
			const packageData = await model.PricingPackage.destroy({
				where: {
					id: data.id,
				},
			});
			return packageData;
		} catch (err) {
			throw err;
		}
	},

};
