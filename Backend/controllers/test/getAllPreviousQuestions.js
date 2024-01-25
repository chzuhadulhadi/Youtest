const Joi = require('joi');
const translation = require("../../translation.json");
const testModel = require('../../model/testModel');

const schema = Joi.object().keys({
});

const {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} = require('http-status-codes');
module.exports = async function getAllPreviousQuestions(req, res) {
	language = req.headers.language ? req.headers.language : "english";
	try {
		const validate = await schema.validateAsync(req.body, {
			abortEarly: false,
		});
		if (validate.error) {
			res.status(StatusCodes.BAD_REQUEST).send({
				data: {},
				message: translation["questionbank"][language].errorMessage,
				error: err.stack,
			});
		}
		const data = await testModel.getUserAllPreviousQuestions(req.headers.userId );
		res
			.status(StatusCodes.OK)
			.send({ message: translation["questionbank"][language].successMessage, data, error: {} });
	} catch (err) {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).send({
			data: {
				specificError: err.message
			},
			message: translation["questionbank"][language].errorMessage,
			error: err.stack,
		});
	}
};
