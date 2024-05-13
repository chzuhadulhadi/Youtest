const userModel = require('../../model/userModel');

const Joi = require('joi');
const {
	StatusCodes,
} = require('http-status-codes');

const schema = Joi.object().keys({
	firstName: Joi.string(),
	lastName: Joi.string(),
	fullName: Joi.string(),
	package: Joi.allow(),
	id: Joi.number().integer().min(1).required(),
	phoneNumber: Joi.string(),
	phoneNumberCode: Joi.string(),
	termsAndService: Joi.number().integer(),
	promotions: Joi.number().integer(),
	emailVerified: Joi.number().integer(),
	updatedAt: Joi.allow(),
	deletedAt: Joi.allow(),
	createdAt: Joi.allow(),
	verificationToken: Joi.allow(),
	remainingTests: Joi.number().integer(),
	expireDate: Joi.allow(),
	
	
	email: Joi.string()
		.email({ tlds: { allow: false } }),
	password: Joi.string(),
	role: Joi.number().integer().min(1).max(2),
});
module.exports = async function updateUsers(req, res) {
	try {
		const validate = await schema.validateAsync(req.body, {
			abortEarly: false,
		});
		if (validate.error) {
			res.status(StatusCodes.BAD_REQUEST).send({
				data: {},
				message: err.message,
				error: err.stack,
			});
		}
		const data = await userModel.updateUser(validate);
		res.status(StatusCodes.OK).send({ message: 'Recieved Data', data, error: {} });
	} catch (err) {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).send({
			data: {},
			message: err.message,
			error: err.stack,
		});
	}
};
