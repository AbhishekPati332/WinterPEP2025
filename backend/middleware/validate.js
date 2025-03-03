const { body, validationResult } = require('express-validator');

exports.validateHospital = [
  body('name').trim().notEmpty().withMessage('Hospital name is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('imageUrl').trim().notEmpty().withMessage('Image URL is required'),
  body('specialities').isArray().withMessage('Specialities must be an array'),
  body('rating').isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateAuth = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
]; 