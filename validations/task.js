import { body } from 'express-validator';

export const taskValidations = [
  body('name', 'Please enter task name')
    .isString().withMessage('Task name can only be a string.')
    .isLength({
      min: 2,
      max: 25
    }).withMessage('The task name must contain at least 2 and no more than 25 characters.'),

  body('status', 'Please сhoose the right status')
    .isBoolean().withMessage('Status can only be boolean'),

  body('project_id', 'Project ID not found')
]