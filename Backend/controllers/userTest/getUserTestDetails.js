const userTestModel = require('../../model/userTestModel');
const Joi = require('joi');
const translation = require("../../translation.json");

const schema = Joi.object().keys({
	id: Joi.string().required(),
});

const {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} = require('http-status-codes');
module.exports = async function getUserTestDetails(req, res) {
	language = req.headers.language ? req.headers.language : "english";
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
		const data = await userTestModel.getUserTestDetails(validate);
		res
			.status(StatusCodes.OK)
			.send({ message: translation["startTest"][language].successMessage, data, error: {} });
	} catch (err) {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).send({
			data: {
				specificError: err.message
			},
			message: translation["startTest"][language].errorMessage,
			error: err.stack,
		});
	}
};
