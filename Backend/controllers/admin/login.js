const userModel = require('../../model/userModel');
const Joi = require('joi');
const schema = Joi.object().keys({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required(),
	password: Joi.string().required(),
	role: Joi.number().integer().min(1).max(2).required()
});
const {
	StatusCodes,
} = require('http-status-codes');
module.exports = async function login(req, res) {
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
		const data = await userModel.adminLogin(validate.email, validate.password);
		res.status(StatusCodes.OK).send({ message: 'Successfull Login', data, error: {} });
	} catch (err) {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).send({
			data: {},
			message: err.message,
			error: err.stack,
		});
	}
};
