
const { body, validationResult } = require('express-validator');

const createCustomerValidator = [
    body('name').notEmpty().withMessage('name is required'),
    body('email').notEmpty().withMessage('email is required'),
    body('password').notEmpty().withMessage('password is required'),
    body('phone').notEmpty().withMessage('phone is required'),
];

const validateCreateCustomer = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    createCustomerValidator,
    validateCreateCustomer,
};
