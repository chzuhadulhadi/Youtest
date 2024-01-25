const packageModel = require('../../model/packageModel');

const Joi = require('joi');
const {
	StatusCodes,
} = require('http-status-codes');

const schema = Joi.object().keys({
	id: Joi.number().integer().min(1).required(),
	packageName: Joi.string(),
	packagePrice: Joi.string(),
	packageDuration: Joi.string(),
	numberOfTests: Joi.string(),
	support: Joi.string(),
	createdAt: Joi.allow(),
	updatedAt: Joi.allow(),
	deletedAt: Joi.allow(),
});
module.exports = async function updatePackage(req, res) {
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
		const data = await packageModel.updatePackage(validate);
		res.status(StatusCodes.OK).send({ message: 'Recieved Data', data, error: {} });
	} catch (err) {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).send({
			data: {},
			message: err.message,
			error: err.stack,
		});
	}
};
