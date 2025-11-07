import Joi from 'joi';

// Data field of Movies
const title = Joi.string().min(2).max(30).regex(/^[A-Za-z0-9\s]+$/);
const releaseYear = Joi.number().integer().min(1900).max(new Date().getFullYear() + 1);
const genre = Joi.string().min(3).max(30).pattern(/^[A-Za-z0-9\s\-/&]+$/);

// Data field of reviewers
const username = Joi.string().alphanum().min(5).max(15);
const password = Joi.string().min(8).max(20);

// Validator for Movies route
export const movieValidateSchema = Joi.object({
  username: username.required(),  
  password: password.required(),
  title: title.required(),
  releaseYear: releaseYear.required(),
  genre: genre.required(),
});

export const movieTitleSchema = Joi.object({
  title: title.required(),
});
