import { body } from 'express-validator';

export const projectValidations = [
  body('name', 'Please enter project name.')
    .isString().withMessage('Project name can only be a string.')
    .isLength({
      min: 2,
      max: 25
    }).withMessage('The project name must contain at least 2 and no more than 25 characters.')
];