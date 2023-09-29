const userTestModel = require('../../model/userTestModel');
const Joi = require('joi');
const translation = require("../../translation.json");

const schema = Joi.object().keys({
	id: Joi.string().required(),
	firstName: Joi.string().allow(null),
	lastName: Joi.string().allow(null),
	email: Joi.string().allow(null),
	phoneNumber: Joi.string().allow(null),
	termAndCondition: Joi.string().allow(null),
});

const {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} = require('http-status-codes');
module.exports = async function submitLandingPageDetail(req, res) {
	var language = req.headers.language ? req.headers.language : "english";

	try {
		const validate = await schema.validateAsync(req.body, {
			abortEarly: false,
		});
		if (validate.error) {
			res.status(StatusCodes.BAD_REQUEST).send({
				data: {},
				message: translation["startTest"][language].errorMessage,
				error: err.stack,
			});
		}
		const data = await userTestModel.submitLandingPageDetail(validate);
		res
			.status(StatusCodes.OK)
			.send({ message: translation["startTest"][language].successMessage, data, error: {} });
	} catch (err) {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).send({
			data: {},
			message: translation["startTest"][language].errorMessage,
			error: err.stack,
		});
	}
};
