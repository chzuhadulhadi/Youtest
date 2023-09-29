const mailingListModel = require('../../model/mailingListModel');
const Joi = require('joi');
const translation = require("../../translation.json");

const schema = Joi.object().keys({
	limit: Joi.number().integer().min(1).required(),
	page: Joi.number().integer().min(1).required(),
});

const {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} = require('http-status-codes');
module.exports = async function getMailingList(req, res) {
	language = req.headers.language ? req.headers.language : "english"

	try {

		const validate = await schema.validateAsync(req.body, {
			abortEarly: false,
		});
		if (validate.error) {
			res.status(StatusCodes.BAD_REQUEST).send({
				data: {},
				message: translation["getMyTest"][language].errorMessage,
				error: err.stack,
			});
		}
		const data = await mailingListModel.getMailingList(validate);
		res
			.status(StatusCodes.OK)
			.send({ message: translation["getMyTest"][language].successMessage, data, error: {} });
	} catch (err) {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).send({
			data: {},
			message: translation["getMyTest"][language].errorMessage,
			error: err.stack,
		});
	}
};
