const userModel = require("../../model/userModel");
const Joi = require("joi");
const schema = Joi.object().keys({
  SaleId: Joi.string(),
  GroupPrivateToken: Joi.string().required(),
  NumberOfItems: Joi.number(),
  ItemIdN: Joi.string(),
  ItemCatalogNumberN: Joi.string(),
  ItemQuantityN: Joi.number(),
  ItemUnitPriceN: Joi.number(),
  ItemDescriptionN: Joi.string(),
  Reference: Joi.string(),
  Order: Joi.string(),
  CustomerLastName: Joi.string(),
  CustomerFirstName: Joi.string(),
  Address: Joi.string(),
  POB: Joi.string(),
  City: Joi.string(),
  Zipcode: Joi.string(),
  PhoneNumber: Joi.string(),
  PhoneNumber2: Joi.string(),
  FaxNumber: Joi.string(),
  IdNumber: Joi.string(),
  VatNumber: Joi.string(),
  Custom1: Joi.string().required(),
  Custom2: Joi.string().required(),
  Custom3: Joi.string(),
  Custom4: Joi.string(),
  Custom5: Joi.string(),
  Custom6: Joi.string(),
  Custom7: Joi.string(),
  Custom8: Joi.string(),
  Custom9: Joi.string(),
  CustomerId: Joi.string(),
  DocumentURL: Joi.string(),
  DocumentNum: Joi.string(),
  DocumentType: Joi.string(),
  TransactionAmount: Joi.number(),
  TransactionAuthNum: Joi.string(),
  TransactionCardName: Joi.string(),
  TransactionCardNum: Joi.string(),
  TransactionCreditTerms: Joi.string(),
  TransactionCreditTermsDescription: Joi.string(),
  TransactionFirstAmount: Joi.number(),
  TransactionNonFirstAmount: Joi.number(),
  TransactionNumOfPayment: Joi.number(),
  TransactionForeignSign: Joi.string(),
  TransactionSolekSapak: Joi.string(),
  TransactionStatus: Joi.string(),
  TransactionTerminalName: Joi.string(),
  TransactionTerminalNum: Joi.string(),
  TransactionTransAmount: Joi.number(),
  TransactionDateTime: Joi.date(),
  TransactionType: Joi.string(),
  TransactionTypeDescription: Joi.string(),
  TransactionCurrency: Joi.string(),
  TransactionCurrencyDescription: Joi.string(),
  TransactionToken: Joi.string(),
});
const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} = require("http-status-codes");
module.exports = async function handleIPN(req, res) {
  try {
    const validate = await schema.validateAsync(req.body, {
      abortEarly: false,
    });

    if (validate.error) {
      res.status(StatusCodes.BAD_REQUEST).send({
        data: {},
        message: err.message,
        error: err.stack,
      });
    }

    const data = await userModel.handleIPN(validate);
    res.status(StatusCodes.OK).send({ message: "Check otp", data, error: {} });
  } catch (err) {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).send({
      data: {},
      message: err.message,
      error: err.stack,
    });
  }
};
