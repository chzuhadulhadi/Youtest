const userModel = require('../../model/userModel');

const Joi = require('joi');
const {
	StatusCodes,
} = require('http-status-codes');
module.exports = async function getUser(req, res) {
	try {
		const data = await userModel.getUser(req.headers.userId);
		res.status(StatusCodes.OK).send({ message: 'Recieved Data', data, error: {} });
	} catch (err) {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).send({
			data: {},
			message: err.message,
			error: err.stack,
		});
	}
};

