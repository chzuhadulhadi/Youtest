const userModel = require('../../model/userModel');
const paymentModel=require('../../model/PaymentModel');
const Joi = require('joi');
const schema = Joi.object().keys({
	id: Joi.number().integer().min(1).required(),
	countryCode: Joi.string().required(),
});
const {
	StatusCodes,
} = require('http-status-codes');
module.exports = async function handlePayment(req, res) {
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
		const data = await paymentModel.handlePayment(validate.id, req.headers.userId, validate.countryCode);
		res
			.status(StatusCodes.OK)
			.send({ message: 'Successfull Login', data, error: {} });
	} catch (err) {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).send({
			data: {},
			message: err.message,
			error: err.stack,
		});
	}
};
