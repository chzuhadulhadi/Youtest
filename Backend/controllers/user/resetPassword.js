const userModel = require('../../model/userModel');
const Joi = require('joi');
const schema = Joi.object().keys({
	token: Joi.required(),
	password: Joi.string().required(),
});
const {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} = require('http-status-codes');
module.exports = async function resetPassword(req, res) {
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
		const data = await userModel.resetPassword(validate);
		res
			.status(StatusCodes.OK)
			.send({ message: 'Successfull Reset', data, error: {} });
	} catch (err) {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).send({
			data: {},
			message: err.message,
			error: err.stack,
		});
	}
};
