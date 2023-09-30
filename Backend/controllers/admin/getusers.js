const userModel = require('../../model/userModel');

const Joi = require('joi');
const {
	StatusCodes,
} = require('http-status-codes');
module.exports = async function login(req, res) {
	try {

		// if (validate.error) {
		// 	res.status(StatusCodes.BAD_REQUEST).send({
		// 		data: {},
		// 		message: err.message,
		// 		error: err.stack,
		// 	});
		// }
		const data = await userModel.getUsers();
		res.status(StatusCodes.OK).send({ message: 'Recieved Data', data, error: {} });
	} catch (err) {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).send({
			data: {},
			message: err.message,
			error: err.stack,
		});
	}
};
