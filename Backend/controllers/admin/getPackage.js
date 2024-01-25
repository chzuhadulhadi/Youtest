const packageModel = require('../../model/packageModel');

const Joi = require('joi');
const {
	StatusCodes,
} = require('http-status-codes');

const schema = Joi.object().keys({
});
module.exports = async function createPackage(req, res) {
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
		const data = await packageModel.getPackages();
		res.status(StatusCodes.OK).send({ message: 'Recieved Data', data, error: {} });
	} catch (err) {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).send({
			data: {},
			message: err.message,
			error: err.stack,
		});
	}
};
