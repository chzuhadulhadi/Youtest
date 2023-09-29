const testModel = require('../../model/testModel');
const Joi = require('joi');
const translation = require("../../translation.json");


const {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} = require('http-status-codes');
module.exports = async function signUp(req, res) {
	language = req.headers.language ? req.headers.language : "english";

	try {

		console.log("-------------", req.headers.file)

		console.log("-------------", req.files)
		if (!req.files.file) {
			res.status(StatusCodes.BAD_REQUEST).end({
				data: {},
				message: translation["createTest"][language].errorMessage,
				error: "Please attach a file",
			});
		}

		const data = await testModel.uploadFile(req.files.file);
		res
			.status(StatusCodes.OK)
			.send({ message: translation["createTest"][language].successMessage, data, error: {} });
	} catch (err) {
		console.log(err)
		res.status(StatusCodes.METHOD_NOT_ALLOWED).send({
			data: {},
			message: translation["createTest"][language].errorMessage,
			error: err.stack,
		});
	}
};
