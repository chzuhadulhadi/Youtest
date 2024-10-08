const bcrypt = require('bcryptjs');
const saltRounds = 10;
const userService = require('../service/userService');
const mailService = require('../service/mailService');
const paymentService = require('../service/paymentService');
const config = require('../config.json');
var jwt = require('jsonwebtoken');
const Sequelize = require("../common/databaseConnection");


module.exports = {
	handleIPN: async function (obj) {
		try {
			const data=await paymentService.handlePayment(obj);
			return data;
		}
		catch (e) {
		}
	},
	updateUser: async function (obj) {
		try {
			await userService.updateAgent(obj, obj.id);
		} catch (e) {
			throw new Error(e);
		}
	},
	getUser: async function (id)
	{
		try{
			return await userService.getAgentById(id);
		}catch(e)
		{
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
	forgotPass: async function (email) {
		var t=await Sequelize.transaction();
		try {
			const filter = await userService.otherloginFilter(0, 1, email);
			
			var userLogin = await userService.getUsers(filter);
			if (!userLogin.length) {
				throw new Error('Not registered');
			}
			const verificationToken = await userService.generateVerificationToken(32).then(async (token) => {
				var user = await mailService.sendForgotVerificationToken(userLogin[0], token);
				await userService.updateToken(token,email,t);	

			}
			);
		} catch (e) {
			throw new Error(e);
		}
	},
	signUp: async function (obj) {
		console.log('hiii');
		var t = await Sequelize.transaction();
		try {
			const filter = await userService.loginFilter(0, 1, obj.email);
			var userLogin = await userService.getUsers(filter);
			if (userLogin.length) {
				throw new Error('already registered');
			}
			console.log('hiii');
			const verificationToken = await userService.generateVerificationToken(32).then(async (token) => {
				obj.verificationToken = token;
				console.log('all ok');
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
			console.log(emailObj);
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
		// var user = await userService.getuserByAny(obj);
		// if (!user) {
			// throw new Error('Not registered');
		// }
		let pass = await bcrypt.hashSync(obj.password, saltRounds);
		return await userService.resetPassword(pass, obj.token);
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
			const user = await userService.getUsers();
			for (var i = 0; i < user.length; i++) {
				const userpackage = await paymentService.getPackage(user[i].id);
				if (userpackage) {
					user[i].dataValues.package = userpackage;
				}
			}
			return user;
		} catch (e) {
			throw new Error(e);
		}
	},

};
