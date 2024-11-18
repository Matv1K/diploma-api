import { body } from 'express-validator';

export const instrumentValidator = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name is required'),

  body('description')
    .isString()
    .withMessage('Description must be a string')
    .notEmpty()
    .withMessage('Description is required'),

  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be a number greater than 0')
    .notEmpty()
    .withMessage('Price is required'),

  body('image').isString(),

  body('isNew').optional().isBoolean().withMessage('isNew must be a boolean'),

  body('section')
    .isString()
    .withMessage('Section must be a string')
    .isIn(['guitars', 'pianos', 'cellos', 'drums', 'harmonicas'])
    .withMessage(
      'Section must be one of guitars, pianos, cellos, drums, or harmonicas',
    )
    .notEmpty()
    .withMessage('Section is required'),

  body('salePrice')
    .optional()
    .isFloat({ gt: 0 })
    .withMessage('Sale Price must be a number greater than 0'),

  body('onSale').optional().isBoolean().withMessage('onSale must be a boolean'),

  body('brandName')
    .isString()
    .withMessage('Brand name must be a string')
    .notEmpty()
    .withMessage('Brand name is required'),
];
