const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[0-9]).{6,}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 6 characters, include an uppercase letter and a number.",
    }),
  profile: Joi.object({
    name: Joi.string().min(2).max(100),
    age: Joi.number().min(10).max(100),
    gender: Joi.string().valid("male", "female", "other"),
    college: Joi.string().allow("", null),
  }),
});

module.exports = { registerSchema };
