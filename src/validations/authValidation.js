import { Joi, Segments } from 'celebrate';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().messages({
      'string.base': 'Email must be a string',
      'string.email': 'Email must be valid',
      'any.required': 'Email required',
    }),
    password: Joi.string().min(8).required().messages({
      'string.base': 'Password must be a string',
      'string.min': 'Password must be a 8 or more characters long',
      'any.required': 'Password required',
    }),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().messages({
      'string.base': 'Email must be a string',
      'string.email': 'Email must be valid',
      'any.required': 'Email required',
    }),
    password: Joi.string().min(8).required().messages({
      'string.base': 'Password must be a string',
      'string.min': 'Password must be a 8 or more characters long',
      'any.required': 'Password required',
    }),
  }),
};
