const userModel = require('../../model/userModel');

const Joi = require('joi');
const {
	StatusCodes,
} = require('http-status-codes');
const testModel = require('../../model/testModel');
const schema = Joi.object().keys({
	id: Joi.number().integer().min(1).required(),
});
module.exports = async function deleteTest(req, res) {
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
		
		const data = await testModel.deleteTest(validate.id);
		res.status(StatusCodes.OK).send({ message: 'Recieved Data', data, error: {} });
	} catch (err) {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).send({
			data: {},
			message: err.message,
			error: err.stack,
		});
	}
};
