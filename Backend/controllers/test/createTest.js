const testModel = require('../../model/testModel');
const Joi = require('joi');
const translation = require("../../translation.json");

const schema = Joi.object().keys({
	id: Joi.number().integer().allow(""),
	sendAll: Joi.boolean().allow(""),
	language: Joi.string(),
	showuser: Joi.boolean().allow(""),
	name: Joi.string(),
	orientation: Joi.number().integer().min(0).max(2),
	beforeTestText: Joi.string(),
	afterTestText: Joi.string(),
	scoringType: Joi.number().integer().min(0).max(2),
	randomOrder: Joi.number().integer().min(0).max(1),
	questions: Joi.object(),
	resultStructure: Joi.object(),
	automaticText: Joi.object(),
	layout: Joi.object(),
	freeText: Joi.object(),
	timeLimit: Joi.number().integer().allow(""),
	categoryStore: Joi.object(),
});

const {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} = require('http-status-codes');
module.exports = async function createTest(req, res) {
	language = req.headers.language ? req.headers.language : "english";

	try {
		const validate = await schema.validateAsync(req.body, {
			abortEarly: false,
		});
		if (validate.error) {
			res.status(StatusCodes.BAD_REQUEST).send({
				data: {},
				message: translation["createTest"][language].errorMessage,
				error: err.stack,
			});
		}
		console.log('validate', validate);
		const data = await testModel.createTest({ ...validate, createdById: req.headers.userId });
		res
			.status(StatusCodes.OK)
			.send({ message: translation["createTest"][language].successMessage, data, error: {} });
	} catch (err) {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).send({
			data: {},
			message: translation["createTest"][language].errorMessage,
			error: err.stack,
		});
	}
};
