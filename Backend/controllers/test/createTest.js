const testModel = require('../../model/testModel');
const Joi = require('joi');
const translation = require("../../translation.json");

const schema = Joi.object().keys({
	name: Joi.string().required(),
	orientation: Joi.number().integer().min(0).max(2).required(),
	beforeTestText: Joi.string().required(),
	afterTestText: Joi.string().required(),
	scoringType: Joi.number().integer().min(0).max(2).required(),
	randomOrder: Joi.number().integer().min(0).max(1).required(),
	questions: Joi.object().required(),
	resultStructure: Joi.object().required(),
	automaticText: Joi.object().required(),
	layout: Joi.object().required(),
	freeText: Joi.object().required(),
	timeLimit: Joi.number().integer().allow(""),
	categoryStore: Joi.object().required(),


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
