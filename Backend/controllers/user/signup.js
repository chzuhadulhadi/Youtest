const userModel = require('../../model/userModel');
const Joi = require('joi');
const schema = Joi.object().keys({
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	phoneNumber: Joi.string().required().min(5).max(20),
	phoneNumberCode: Joi.string().required().min(1).max(5),
	email: Joi.string().required(),
	password: Joi.string().required(),
	termsAndService: Joi.number().integer().min(0).max(1).required(),
	promotions: Joi.number().integer().min(0).max(1).required(),
	role: Joi.number().integer().min(0).max(2).required(),
});
const {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} = require('http-status-codes');
module.exports = async function signUp(req, res) {
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
		const data = await userModel.signUp(validate);
		res
			.status(StatusCodes.OK)
			.send({ message: 'Successfully signUp', data, error: {} });
	} catch (err) {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).send({
			data: {},
			message: err.message,
			error: err.stack,
		});
	}
};
