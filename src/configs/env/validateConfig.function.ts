import * as Joi from "joi";

export default function validateConfig(envVars: NodeJS.ProcessEnv): void {
  const envSchema = Joi.object()
    .keys({
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
    })
    .unknown();
  const { error } = envSchema.validate(envVars);

  if (error) throw new Error(`Validation error: ${error.message}`);
}
