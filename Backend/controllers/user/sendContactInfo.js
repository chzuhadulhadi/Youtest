const mailService = require('../../service/mailService');

const Joi = require('joi');
const schema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    message: Joi.string().required(),
});
const {
    StatusCodes,
} = require('http-status-codes');
module.exports = async function sendContactInfo(req, res) {
    try {
        const validate = await schema.validateAsync(req.body, {
            abortEarly: false,
        });

        const data = await mailService.sendEmail(validate);
        res
            .status(StatusCodes.OK)
            .send({ message: 'Successfully sent Mail.', data, error: {} });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).send({
            data: {},
            message: err.message,
            error: err.stack,
        });
    }
};
