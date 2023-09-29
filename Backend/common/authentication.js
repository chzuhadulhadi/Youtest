var jwt = require('jsonwebtoken');
const config = require('../config.json');
const userService = require('../service/userService');
const {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} = require('http-status-codes');

exports.verifyPermissions = async (req, res, next) => {
	try {
		if (!req.headers['authorization']) {
			throw new Error('Authorization token missing');
		}

		let authorization = req.headers['authorization'].split(' ');
		var decoded = jwt.verify(authorization[1], config.jwt.secret);
		const splittedUrl = req.originalUrl.split('/');
		const userPermissions = await userService.getUserPermissions(decoded.id);
		var access = false;
		for (let single of userPermissions) {
			const permission = single.toJSON();
			if (permission.permissionKey.key === splittedUrl[2]) {
				access = true;
				break;
			}
		}
		if (!access) {
			throw new Error('No permissions');
		}
		req.headers.userId = decoded.id;
		req.headers.roleId = decoded.roleId;
		req.headers.memberId = decoded.memberId;
		req.headers.agentId = decoded.agentId;
		req.headers.adminId = decoded.adminId;
		req.headers.driverId = decoded.driverId;

		return next();
	} catch (err) {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).send({
			data: {},
			message: err.message,
			error: err.stack,
		});
	}
};

exports.verifyJwt = async (req, res, next) => {
	if (!req.headers['authorization']) {
		return res.status(401).send();
	}
	try {
		let authorization = req.headers['authorization'].split(' ');
		var decoded = await jwt.verify(authorization[1], config.jwt.secret);

		console.log("decoded", decoded)
		req.headers.userId = decoded.id;


		return next();
	} catch (err) {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).send({
			data: {},
			message: err.message,
			error: err.stack,
		});
	}
};
