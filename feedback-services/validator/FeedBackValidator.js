
const { body, validationResult } = require('express-validator');

const createFeedbackValidator = [
    body('book_id').notEmpty().withMessage('book_id is required'),
    body('feedback_text').notEmpty().withMessage('feedback_text is required'),
    body('feedback_date').notEmpty().withMessage('feedback_date is required'),
];

const validateCreateFeedback = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    createFeedbackValidator,
    validateCreateFeedback,
};
