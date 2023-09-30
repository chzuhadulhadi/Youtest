const userModel = require('../../model/userModel');

const Joi = require('joi');
const {
	StatusCodes,
} = require('http-status-codes');
const testModel = require('../../model/testModel');
module.exports = async function login(req, res) {
	try {

		// if (validate.error) {
		// 	res.status(StatusCodes.BAD_REQUEST).send({
		// 		data: {},
		// 		message: err.message,
		// 		error: err.stack,
		// 	});
		// }
		const data = await testModel.getTests();
		res.status(StatusCodes.OK).send({ message: 'Recieved Data', data, error: {} });
	} catch (err) {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).send({
			data: {},
			message: err.message,
			error: err.stack,
		});
	}
};
