const Joi = require('joi');
const translation = require("../../translation.json");
const landingPageModel = require('../../model/landingPageModel');

const schema = Joi.object().keys({
	id: Joi.number().integer().min(0).required(),
	html: Joi.string().required(),
	testId: Joi.number().integer().min(0),

});

const {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} = require('http-status-codes');
module.exports = async function updateLandingPage(req, res) {
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
		const data = await landingPageModel.updateLandingPage(validate);
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
