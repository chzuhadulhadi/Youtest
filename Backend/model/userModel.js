const bcrypt = require('bcryptjs');
const saltRounds = 10;
const userService = require('../service/userService');
const mailService = require('../service/mailService');
const config = require('../config.json');
var jwt = require('jsonwebtoken');
const Sequelize = require("../common/databaseConnection");


module.exports = {
	updateUser: async function (obj) {
		try {
			await userService.updateAgent(obj, obj.id);
		} catch (e) {
			throw new Error(e);
		}
	},
	deleteUser: async function (id) {
		try {
			await userService.deleteUser(id);
		} catch (e) {
			throw new Error(e);
		}
	},

	adminLogin: async function (email, password) {
		try {
			const filter = await userService.loginFilter(0, 1, email);
			// filter.where.role=1;
			// console.log(filter);
			// console.log(filter);
			// await userService.updateAgent({emailVerified:1},10);
			var userLogin = await userService.getUsers(filter);
			// console.log(userLogin);
			if (!userLogin.length) {
				throw new Error('Not registered');
			}
			const hash = await bcrypt.compareSync(password, userLogin[0].password);
			if (hash == false) {
				throw new Error('Invalid Credentials');
			}
			let token = jwt.sign(
				{
					id: userLogin[0].id,
				},
				config.jwt.secret,
				{ expiresIn: '12D' }
			);

			return {
				token,
			};
		} catch (e) {
			throw new Error(e);
		}
	},
	login: async function (email, password) {
		try {
			const filter = await userService.loginFilter(0, 1, email);
			var userLogin = await userService.getUsers(filter);
			if (!userLogin.length) {
				throw new Error('Not registered');
			}
			const hash = await bcrypt.compareSync(password, userLogin[0].password);
			if (hash == false) {
				throw new Error('Invalid Credentials');
			}
			let token = jwt.sign(
				{
					id: userLogin[0].id,
				},
				config.jwt.secret,
				{ expiresIn: '12D' }
			);

			return {
				token,
			};
		} catch (e) {
			throw new Error(e);
		}
	},

	signUp: async function (obj) {

		var t = await Sequelize.transaction();
		try {
			const filter = await userService.loginFilter(0, 1, obj.email);
			var userLogin = await userService.getUsers(filter);
			if (userLogin.length) {
				throw new Error('already registered');
			}
			const verificationToken = await userService.generateVerificationToken(32).then(async (token) => {
				obj.verificationToken = token;
				var user = await mailService.sendVerificationToken(obj, token);
			});

			obj.password = await bcrypt.hashSync(obj.password, saltRounds);
			obj = { ...obj, emailVerified: false };

			const emailObj = {
				type: "signUp",
				to: obj.email,
				body: {
					name: obj.firstName + " " + obj.lastName
				}
			}
			await mailService.create(emailObj, t);
			await userService.signUp({ ...obj, fullName: obj.firstName + " " + obj.lastName }, t);

			t.commit();

		} catch (e) {
			if (t) {
				await t.rollback();
			}
			throw new Error(e);
		}
	},

	addMinutes: function (date, minutes) {
		const dateCopy = new Date(date);
		dateCopy.setMinutes(date.getMinutes() + minutes);

		return dateCopy;
	},

	checkOtp: async function (otp, email) {
		var user = await userService.getuserByAny(email);
		if (!user) {
			throw new Error('Not registered');
		}
		var checkOtp = await userService.checkOtp(otp, email);
		if (!checkOtp) {
			return { response: false, message: 'Invalid Otp' };
		}

		var currentdate = new Date();
		const expiredAt = this.addMinutes(checkOtp.createdAt, 5);

		const utcStr1 = currentdate.toUTCString();
		const utcStr2 = expiredAt.toUTCString();

		if (utcStr1 < utcStr2) {
			const respomse = await userService.updateOtp(otp);
			return {
				response: true,
				message: 'valid otp',
			};
		} else {
			return {
				response: false,
				message: 'Invalid otp',
			};
		}
	},

	sendOtp: async function (email) {
		var user = await userService.getuserByAny(email);
		if (!user) {
			throw new Error('Not registered');
		}

		var otp = Math.floor(1000 + Math.random() * 9000);
		var user = await mailService.sendOtpEmail(otp, email);

		return await userService.sendOtp(otp, email);
	},
	resetPassword: async function (obj) {
		var user = await userService.getuserByAny(obj.email);
		if (!user) {
			throw new Error('Not registered');
		}
		obj.newPassword = await bcrypt.hashSync(obj.newPassword, saltRounds);
		return await userService.resetPassword(obj.newPassword, obj.email);
	},
	verifyEmail: async function (token) {
		try {
			await userService.updateAgentBytoken({ emailVerified: 1 }, token);
		} catch (e) {
			throw new Error(e);
		}
	},
	getUsers: async function () {
		try {
			return await userService.getUsers();
		} catch (e) {
			throw new Error(e);
		}
	},

};
