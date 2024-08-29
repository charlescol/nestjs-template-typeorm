import * as Joi from "joi";

const validationSchema = Joi.object({
  DATABASE_URL: Joi.string()
    .uri({
      scheme: ["postgres", "postgresql"],
    })
    .required(),
  DATABASE_ENABLE_SSL: Joi.boolean().required(),
  DATABASE_ENABLE_LOGGING: Joi.boolean(),
  DISABLE_SWAGGER: Joi.boolean(),
  DISABLE_APP_ADDRESS_LISTENING: Joi.boolean(),
  PORT: Joi.number(),
});

export default validationSchema;
