const Joi = require('joi');

//Data field of reviewers
const username = Joi.string().alphanum().min(5).max(15);
const email = Joi.string().email();
const password = Joi.string().min(8).max(20);

// Validator for Reviewers route
const reviewerValidateSchema = Joi.object({
  username: username.required(),
  email: email.required(),
  password: password.required(),
});

const reviewerAuthenticateSchema = Joi.object({
  username: username.required(),
  password: password.required(),
});

const reviewerUsernameParaSchema = Joi.object({
  username: username.required(),
});

module.exports = {
  reviewerValidateSchema,
  reviewerAuthenticateSchema,
  reviewerUsernameParaSchema,
};
