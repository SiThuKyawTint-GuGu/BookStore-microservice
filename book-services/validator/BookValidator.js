
const { body, validationResult } = require('express-validator');

const createBookValidator = [
    body('title').notEmpty().withMessage('title is required'),
    body('author').notEmpty().withMessage('author is required'),
    body('description').notEmpty().withMessage('description is required'),
    body('price').notEmpty().withMessage('price is required'),
    body('publication_year').notEmpty().withMessage('publication_year is required'),
];

const validateCreateBook = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    createBookValidator,
    validateCreateBook,
};
