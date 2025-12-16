const Joi = require('joi');

// Data field of reviews
const username = Joi.string().alphanum().min(5).max(15);
const password = Joi.string().min(8).max(20);
const title = Joi.string().min(2).max(30).regex(/^[A-Za-z0-9\s]+$/);
const reviewText = Joi.string().min(10).max(500);
const rating = Joi.number().min(0).max(10).precision(1);
const objectId = Joi.string().length(24).hex();

// Validator for Reviews route
const reviewCreateSchema = Joi.object({
  username: username.required(),
  password: password.required(),
  movie: title.required(),
  reviewText: reviewText.required(),
  rating: rating.required(),
});

const titleParaSchema = Joi.object({
  title: title.required(),
});

const authorParaSchema = Joi.object({
  author: username.required(),
});

const reviewIdParamSchema = Joi.object({
  id: objectId.required(),
});

module.exports = {
  reviewCreateSchema,
  titleParaSchema,
  authorParaSchema,
  reviewIdParamSchema,
};
