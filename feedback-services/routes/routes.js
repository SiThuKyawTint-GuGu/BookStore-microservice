const express = require('express');
const authMiddleware = require('../middleware/middleware');
const { createFeedbackValidator, validateCreateFeedback } = require('../validator/FeedBackValidator');
const { createFeedBack, getFeedbacklist } = require('../controllers/FeedBackController');

const BookSaleRouter = express.Router();

BookSaleRouter.post('/createfeedback', createFeedbackValidator, validateCreateFeedback,authMiddleware,createFeedBack);
BookSaleRouter.get('/getfeedbacklist',authMiddleware, getFeedbacklist);


module.exports = BookSaleRouter;
