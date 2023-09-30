
const Joi = require('joi');
const {
	StatusCodes,
} = require('http-status-codes');
const userTestModel = require('../../model/userTestModel');
module.exports = async function login(req, res) {
	try {

		// if (validate.error) {
		// 	res.status(StatusCodes.BAD_REQUEST).send({
		// 		data: {},
		// 		message: err.message,
		// 		error: err.stack,
		// 	});
		// }
		const data = await userTestModel.getResults();
		res.status(StatusCodes.OK).send({ message: 'Recieved Data', data, error: {} });
	} catch (err) {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).send({
			data: {},
			message: err.message,
			error: err.stack,
		});
	}
};
