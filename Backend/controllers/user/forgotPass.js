const userModel = require('../../model/userModel');
const Joi = require('joi');
const schema = Joi.object().keys({
	email: Joi.string().required(),
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
		console.log(validate);

		if (validate.error) {
			res.status(StatusCodes.BAD_REQUEST).send({
				data: {},
				message: err.message,
				error: err.stack,
			});
		}
		const data = await userModel.forgotPass(validate.email);
		res
			.status(StatusCodes.OK)
			.send({ message: 'Successfully Send Link', data, error: {} });
	} catch (err) {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).send({
			data: {},
			message: err.message,
			error: err.stack,
		});
	}
};
