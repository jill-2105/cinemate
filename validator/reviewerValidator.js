import Joi from 'joi';

// Data field of reviewers
const username = Joi.string().alphanum().min(5).max(15);
const email = Joi.string().email();
const password = Joi.string().min(8).max(20);

// Validator for Reviewers route
export const reviewerValidateSchema = Joi.object({
  username: username.required(),
  email: email.required(),
  password: password.required(),
});

export const reviewerAuthenticateSchema = Joi.object({
  username: username.required(),
  password: password.required(),
});

export const reviewerUsernameParaSchema = Joi.object({
  username: username.required(),
});
