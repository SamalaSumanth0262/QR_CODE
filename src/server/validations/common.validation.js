const Joi = require("joi");
const { OBJECTID_REGEX } = require("./../constants");

const commonValidations = {
  stringRequired: Joi.string().required(),
  stringOptional: Joi.string().optional(),
  booleanRequired: Joi.boolean().required(),
  booleanOptional: Joi.boolean().optional(),
  arrayRequired: Joi.array().required(),
  arrayOptional: Joi.array().optional(),
  objectIdRequired: Joi.string()
    .regex(OBJECTID_REGEX)
    .required(),
  objectIdOptional: Joi.string()
    .regex(OBJECTID_REGEX)
    .optional(),
  dateRequired: Joi.date().required(),
  dateOptional: Joi.alternatives().try(
    Joi.date(),
    Joi.allow(null),
    Joi.optional()
  ),
  minRequired: value =>
    Joi.number()
      .min(value)
      .required(),
  minOptional: value =>
    Joi.number()
      .min(value)
      .optional(),
  emailRequired: Joi.string()
    .email()
    .required(),
  fileOptional: Joi.array()
    .items(
      Joi.object().keys({
        key: Joi.string().required(),
        location: Joi.string()
          .uri()
          .required()
      })
    )
    .optional()
};

module.exports = {
  commonValidations
};
