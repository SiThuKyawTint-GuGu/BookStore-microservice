
const { body, validationResult } = require('express-validator');

const createBookSaleValidator = [
    body('sale_date').notEmpty().withMessage('sale_date is required'),
    body('amount').notEmpty().withMessage('amount is required'),
    body('book_id').notEmpty().withMessage('book_id is required'),
];

const validateCreateBookSale = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    createBookSaleValidator,
    validateCreateBookSale,
};
