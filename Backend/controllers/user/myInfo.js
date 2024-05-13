const userModel = require('../../model/userModel');
const Joi = require('joi');
const schema = Joi.object().keys({
});
const {
	StatusCodes,
} = require('http-status-codes');
module.exports = async function myInfo(req, res) {
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
		const data = await userModel.getUser(req.headers.userId);
		res
			.status(StatusCodes.OK)
			.send({ message: 'User data', data, error: {} });
	} catch (err) {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).send({
			data: {},
			message: err.message,
			error: err.stack,
		});
	}
};
