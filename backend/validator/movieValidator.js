const Joi = require('joi');

// Movie fields
const title = Joi.string()
  .min(1)                      // allow very short titles (e.g. test data)
  .max(100)                    // reasonable upper bound
  .trim();

const releaseYear = Joi.number()
  .integer()
  .min(1900)
  .max(new Date().getFullYear() + 1);

const genre = Joi.string()
  .min(3)
  .max(50)
  .trim();

// Reviewer fields for movie routes
const username = Joi.string()
  .min(3)                      // allow shorter usernames in tests
  .max(30)
  .trim();

const password = Joi.string()
  .min(6)                      // allow 6+ chars (tests use 'pass123456' so still valid)
  .max(50);

// Validator for Movies route (body)
const movieValidateSchema = Joi.object({
  username: username.required(),
  password: password.required(),
  title: title.required(),
  releaseYear: releaseYear.required(),
  genre: genre.required(),
});

// Validator for :title param
const movieTitleSchema = Joi.object({
  title: title.required(),
});

module.exports = {
  movieValidateSchema,
  movieTitleSchema,
};
