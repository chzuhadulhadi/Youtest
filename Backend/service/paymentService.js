const { Op } = require("sequelize");
const model = require("../model");
const crypto = require("crypto");



module.exports = {
	handlePayment: async function handlePayment(obj) {
		try {
			// {
			// id: {
			//   primaryKey: true,
			//   allowNull: false,
			//   type: DataTypes.UUID,
			//   defaultValue: DataTypes.UUIDV4,
			// },
			// userId: {
			//   type: DataTypes.INTEGER,
			//   allowNull: false,
			// },
			// packageId: {
			//   type: DataTypes.INTEGER,
			//   allowNull: true,
			// },
			// paymentId: {
			//   type: DataTypes.STRING(100),
			//   allowNull: true,
			// },
			// paymentStatus: {
			//   type: DataTypes.STRING(100),
			//   allowNull: true,
			// },
			// expireDate: {
			//   type: DataTypes.DATE,
			//   allowNull: true,
			// },
			// RemainingNumberOfTests: {
			// 	type: DataTypes.INTEGER,
			// 	allowNull: true,
			//   },
			// createdAt: {
			//   allowNull: false,
			//   defaultValue: sequelize.fn("now"),
			//   type: DataTypes.DATE,
			// },
			// updatedAt: {
			//   allowNull: false,
			//   defaultValue: sequelize.fn("now"),
			//   type: DataTypes.DATE,
			// },
			// deletedAt: {
			//   type: DataTypes.DATE,
			// },

			// SaleId: Joi.string(),
			// GroupPrivateToken: Joi.string().required(),
			// NumberOfItmes: Joi.number(),
			// ItemIdN: Joi.string(),
			// ItemCatalogNumberN: Joi.string(),
			// ItemQuantityN: Joi.number(),
			// ItemUnitPriceN: Joi.number(),
			// ItemDescriptionN: Joi.string(),
			// Reference: Joi.string(),
			// Order: Joi.string(),
			// CustomerLastName: Joi.string(),
			// CustomerFirstName: Joi.string(),
			// Address: Joi.string(),
			// POB: Joi.string(),
			// City: Joi.string(),
			// Zipcode: Joi.string(),
			// PhoneNumber: Joi.string(),
			// PhoneNumber2: Joi.string(),
			// FaxNumber: Joi.string(),
			// IdNumber: Joi.string(),
			// VatNumber: Joi.string(),
			// Custom1: Joi.string().required(),
			// Custom2: Joi.string().required(),
			// Custom3: Joi.string(),
			// Custom4: Joi.string(),
			// Custom5: Joi.string(),
			// Custom6: Joi.string(),
			// Custom7: Joi.string(),
			// Custom8: Joi.string(),
			// Custom9: Joi.string(),
			// CustomerId: Joi.string(),
			// DocumentURL: Joi.string(),
			// DocumentNum: Joi.string(),
			// DocumentType: Joi.string(),
			// TransactionAmount: Joi.number(),
			// TransactionAuthNum: Joi.string(),
			// TransactionCardName: Joi.string(),
			// TransactionCardNum: Joi.string(),
			// TransactionCreditTerms: Joi.string(),
			// TransactionCreditTermsDescription: Joi.string(),
			// TransactionFirstAmount: Joi.number(),
			// TransactionNonFirstAmount: Joi.number(),
			// TransactionNumOfPayment: Joi.number(),
			// TransactionForeignSign: Joi.string(),
			// TransactionSolekSapak: Joi.string(),
			// TransactionStatus: Joi.string(),
			// TransactionTerminalName: Joi.string(),
			// TransactionTerminalNum: Joi.string(),
			// TransactionTransAmount: Joi.number(),
			// TransactionDateTime: Joi.date(),
			// TransactionType: Joi.string(),
			// TransactionTypeDescription: Joi.string(),
			// TransactionCurrency: Joi.string(),
			// TransactionCurrencyDescription: Joi.string(),
			// TransactionToken: Joi.string(),
			const packageData = await model.PricingPackage.findOne({
				where: {
					id: obj.Custom2,
				},
			});

			if (!packageData) {
				throw new Error("Invalid package");
			}

			const paymentData = await model.UserPackagePlan.create({
				userId: obj.Custom1,
				packageId: obj.Custom2,
				paymentId: obj.SaleId,
				paymentStatus: obj.TransactionStatus,
				expireDate: new Date(new Date().getTime() + packageData.packageDuration * 24 * 60 * 60 * 1000),
				RemainingNumberOfTests: packageData.numberOfTests,
			});
			console.log(paymentData);
			return paymentData;
		} catch (err) {
			throw err;
		}

	},
	getPackage: async function getPackage(userId) {
		try {
			const paymentData = await model.UserPackagePlan.findOne({
				where: {
					userId: userId,
					// expireDate: {
					// [Op.gte]: new Date(),
					// },
				},
			});
			//all the packages
			// const paymentData = await model.UserPackagePlan.findAll();

			// console.log(paymentData);
			if (!paymentData) {
				return null;
			}
			const packageData = await model.PricingPackage.findOne({
				where: {
					id: paymentData.packageId,
				},
			});
			return { payment: paymentData, package: packageData };
		} catch (err) {
			throw err;
		}
	},
	updateRemainingTests: async function updateRemainingTests(userId) {
		try {
			const paymentData = await model.UserPackagePlan.findOne({
				where: {
					userId: userId,
					expireDate: {
						[Op.gte]: new Date(),
					},
				},
			});
			const packageData = await model.PricingPackage.findOne({
				where: {
					id: paymentData.packageId,
				},
			});
			const remainingTests = paymentData.RemainingNumberOfTests - 1;
			await model.UserPackagePlan.update({
				RemainingNumberOfTests: remainingTests
			},
				{
					where: {
						id: paymentData.id
					}
				});
			return remainingTests;

		}
		catch (err) {
			throw err;
		}
	},
	updatePackage: async function updatePackage(userId, remaingTests, expireDate) {
		try {
			const paymentData = await model.UserPackagePlan.findOne({
				where: {
					userId: userId,
				},
			});
			if (!paymentData)
				await model.UserPackagePlan.create({
					userId: userId,
					packageId: 1,
					paymentId: "Trial",
					paymentStatus: "Trial",
					expireDate: expireDate,
					RemainingNumberOfTests: remaingTests,
				});
			else
				await model.UserPackagePlan.update({
					RemainingNumberOfTests: remaingTests,
					expireDate: expireDate
				},
					{
						where: {
							id: paymentData.id
						}
					});
			return true;
		}
		catch (err) {
			throw err;
		}
	},
};
