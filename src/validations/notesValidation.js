import { Joi, Segments } from 'celebrate';
import { TAGS } from '../constants/tags.js';
import { isValidObjectId } from 'mongoose';

const objectIdValidation = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      'number.base': 'Page must be a number',
      'number.integer': 'Page must be a integer',
      'number.min': 'Page must be greater than or equal 1',
    }),
    perPage: Joi.number().integer().min(5).max(20).default(10).messages({
      'number.base': 'perPage must be a number',
      'number.integer': 'perPage must be a integer',
      'number.min': 'perPage must be greater than or equal 5',
      'number.max': 'perPage must be lower than or equal 20',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .messages({
        'string.base': 'Tag must be a string',
        'any.only': 'Tag must be a valid',
      }),
    search: Joi.string().trim().allow('').messages({
      'string.base': 'Search must be a string',
    }),
  }),
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidation).required().messages({
      'string.base': 'NoteId must be a string',
      'any.required': 'NoteId must be provided',
    }),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title must be greater or equal than 1 symbol',
      'any.required': 'Title must be provided',
    }),
    content: Joi.string().trim().allow('').messages({
      'string.base': 'Content must be a string',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .messages({
        'string.base': 'Tag must be a string',
        'any.only': 'Tag must be a valid',
      }),
  }),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidation).required().messages({
      'string.base': 'NoteId must be a string',
      'any.required': 'NoteId must be provided',
    }),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title must be greater or equal than 1 symbol',
    }),
    content: Joi.string().trim().allow('').messages({
      'string.base': 'Content must be a string',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .messages({
        'string.base': 'Tag must be a string',
        'any.only': 'Tag must be a valid',
      }),
  }).min(1),
};
