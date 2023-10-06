const { Op } = require("sequelize");
const model = require("../model");
const crypto = require("crypto");



module.exports = {
	generateVerificationToken: function generateVerificationToken(length) {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(length, (err, buffer) => {
				if (err) {
					reject(err);
				} else {
					const token = buffer.toString("hex");
					resolve(token);
				}
			});
		});
	},
	verifyEmail: async function (token) {
		const user = await model.user.findOne({
			where: {
				verificationToken: token,
			},
		});
		if (!user) {
			throw new Error("Invalid Token");
		}
		await model.user.updateAgent({ verificationToken: null, verifyEmail: 1 }, {
			where: {
				id: user.id,
			},
		});
		return 'Verified';
	},


	getUsers: async function (filter) {
		return await model.user.findAll(filter);
	},
	loginFilter(offset, limit, email) {
		return {
			limit,
			offset: offset,
			attributes: ['id', 'email', 'password'],
			where: {
				emailVerified: 1,
				email,
				deletedAt: null,
			},
		};
	},
	deleteUser: async function (id) {
		return await model.user.destroy({
			where: {
				id: id,
			},
			truncate: false,
		});
	},
	addAgent: async function (obj, t) {
		return await model.user.create(obj, { transaction: t });
	},
	getAllAgent: async function (offset, limit, filter) {
		var response = await model.user.findAll({
			limit,
			offset: offset,
			where: { ...filter, deletedAt: null, deletedBy: null },
			include: [
				{
					model: model.user,

					include: [
						{
							model: model.categoryMapping,
							where: {
								deletedAt: null,
							},
							required: false,
							include: [
								{
									model: model.category,
								},
								{
									model: model.subCategory,
								},
							],
						},
					],
				},
				{
					model: model.place,
					as: 'country',
				},
				{
					model: model.place,
					as: 'state',
				},
				{
					model: model.place,
					as: 'city',
				},
				{
					model: model.user,
					as: 'updated',
					attributes: ['id'],
					include: [
						{
							model: model.agent,
							attributes: ['id', 'userId', 'companyName'],
						},
						{
							model: model.member,
							attributes: [
								'id',
								'userId',
								'firstName',
								'middleName',
								'lastName',
							],
						},
						{
							model: model.salisAdmin,
							attributes: [
								'id',
								'userId',
								'firstName',
								'middleName',
								'lastName',
							],
						},
					],
				},
			],
			order: [['id', 'desc']],
		});
		return response;
	},
	getSingleAgent: async function (filter) {
		var response = await model.user.findOne({
			where: { ...filter, deletedAt: null, deletedBy: null },
			include: [
				{
					model: model.user,

					include: [
						{
							model: model.categoryMapping,
							where: {
								deletedAt: null,
							},
							required: false,
							include: [
								{
									model: model.category,
								},
								{
									model: model.subCategory,
								},
							],
						},
					],
				},
				{
					model: model.place,
					as: 'country',
				},
				{
					model: model.place,
					as: 'state',
				},
				{
					model: model.place,
					as: 'city',
				},
				{
					model: model.user,
					as: 'updated',
					attributes: ['id'],
					include: [
						{
							model: model.agent,
							attributes: ['id', 'userId', 'companyName'],
						},
						{
							model: model.member,
							attributes: [
								'id',
								'userId',
								'firstName',
								'middleName',
								'lastName',
							],
						},
						{
							model: model.salisAdmin,
							attributes: [
								'id',
								'userId',
								'firstName',
								'middleName',
								'lastName',
							],
						},
					],
				},
			],
			order: [['id', 'desc']],
		});
		return response;
	},
	getAgent: async function (filter) {
		var response = await model.user.findOne({
			where: { ...filter, deletedAt: null, deletedBy: null },
		});
		return response;
	},
	getAgents: async function (offset, limit, filter) {
		var response = await model.user.findAll({
			limit,
			offset: offset,
			where: {
				...filter,
				deletedAt: null,
				deletedBy: null,
			},
		});
		return response;
	},
	// getAgentSuggestion: async function (limit, offset, name) {
	//   return await model.user.findAll({
	//     limit,
	//     offset: offset,
	//     attributes: ["companyName", "id"],
	//     companyName: {
	//       [Op.like]: "%" + name + "%",
	//     },
	//     order: [['companyName', 'asc']]
	//   });
	// },
	getAgentCount: async function (filter) {
		return await model.user.count({
			where: { ...filter, deletedAt: null, deletedBy: null },
		});
	},
	getWhereClause(obj) {
		return {
			...(obj.id && { id: { [Op.eq]: obj.id } }),
			...(obj.companyName && {
				companyName: { [Op.like]: '%' + obj.companyName + '%' },
			}),
			...(obj.companyTradeNumber && {
				companyTradeNumber: { [Op.like]: '%' + obj.companyTradeNumber + '%' },
			}),
			...(obj.phone && { phone: { [Op.like]: '%' + obj.phone + '%' } }),
			...(obj.cityId &&
				obj.cityId.length > 0 && { cityId: { [Op.in]: obj.cityId } }),
			...(obj.stateId &&
				obj.stateId.length > 0 && { stateId: { [Op.in]: obj.stateId } }),
			...(obj.countryId &&
				obj.countryId.length > 0 && { countryId: { [Op.in]: obj.countryId } }),
		};
	},
	updateAgentInfo: async function (obj, t) {
		if (obj.hash !== null) {
			var userid = await model.user.findOne({
				attributes: ['userId'],
				where: {
					id: obj.id,
				},
			});

			await model.user.update(
				{ password: obj.password },
				{
					where: {
						id: userid['dataValues'].userId,
					},
				},
				{ transaction: t }
			);
			await model.user.update(
				obj,
				{
					where: {
						id: obj.id,
					},
				},
				{ transaction: t }
			);

			return userid['dataValues'].userId;
		}

		var userid = await model.user.findOne({
			attributes: ['userId'],
			where: {
				id: obj.id,
			},
		});

		await model.user.update(
			obj,
			{
				where: {
					id: obj.id,
				},
			},
			{ transaction: t }
		);
		return userid['dataValues'].userId;
	},
	getAgentById: async function (id) {
		return await model.user.findOne({
			where: {
				id: id,
			},
		});
	},
	updateAgentBytoken: async function (obj, token) {
		console.log(obj, token);
		const data=await model.user.update(obj, {
			where: {
				verificationToken:token,
			},
		});
		console.log(data);
	},
	updateAgent: async function (obj, id) {
		console.log(obj, id);
		const data=await model.user.update(obj, {
			where: {
				id,
			},
		});
		console.log(data);
	},
	updateAgentByIds: async function (obj, ids) {
		await model.user.update(obj, {
			where: {
				id: {
					[Op.in]: ids,
				},
			},
		});
	},
	addImages: async function (obj, id) {
		for (var i = 0; i < obj.length; i++) {
			return await model.imagesMapping.create({
				userId: id,
				typeof: obj[i].e,
				image: obj[i].image,
				type: 'agentDocumentImages',
				table: 'Agent',
			});
		}

		// return await model.imagesMapping.create(obj, { transaction: t }
		//);
	},
	getAgentImages: async function (id) {
		return await model.imagesMapping.findAll({
			where: {
				userId: id,
			},
		});
	},
	deleteAgentImagesById: async function (obj) {
		return await model.imagesMapping.destroy({
			where: {
				image: obj.path,
				[Op.and]: {
					type: 'AdminDocument',
				},
			},
		});
	},

	// return await model.user.destroy({
	//   where: {
	//     id: userid['dataValues'].userId
	//   },
	//   truncate: false
	// })

	signUp: async function (obj, t) {
		return await model.user.create(obj, { transaction: t });
	},

	sendOtp: async function (otp, email) {
		return await model.otp.create({ otp: otp, active: true, email: email });
	},
	sendVerification: async function (token, email) {
		return await model.otp.create({ token: token, active: true, email: email });
	},

	checkOtp: async function (otp, email) {
		const otpCheck = await model.otp.findOne({
			where: { otp: otp, email: email, deletedAt: null, active: true },
		});
		return otpCheck;
	},

	resetPassword: async function (password, email) {
		const check = await model.user.update(
			{
				password: password,
			},
			{ where: { email: email } }
		);
		if (check) {
			return {
				response: true,
				message: "Password Reset",
			};
		} else {
			return {
				response: false,
				message: "something went wrong",
			};
		}
	},

	getuserByAny: async function (email) {
		return await model.user.findOne({
			where: {
				email: email,
				deletedAt: null,
			},
		});
	},
	getuserById: async function (id) {
		return await model.user.findOne({
			where: {
				id: id,
			},
		});
	},
	updateOtp: async function (otp) {
		return await model.otp.update(
			{
				active: false,
			},
			{
				where: { otp: otp },
			}
		);
	},
};
