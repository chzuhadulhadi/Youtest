const Joi = require('joi');
const translation = require("../../translation.json");
const mailingListModel = require('../../model/mailingListModel');

const schema = Joi.object().keys({
	name: Joi.string().required()
});

const {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} = require('http-status-codes');
module.exports = async function addMailingList(req, res) {
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
		const data = await mailingListModel.addMailingList({ ...validate, userId: req.headers.userId });
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
