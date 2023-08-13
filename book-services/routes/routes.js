const express = require('express');
const authMiddleware = require('../middleware/middleware');
const {createBookValidator, validateCreateBook } = require('../validator/BookValidator');
const { createBook, getBookList } = require('../controllers/BookController');

const BookRouter = express.Router();

BookRouter.post('/createbook', createBookValidator, validateCreateBook, authMiddleware, createBook);
BookRouter.get('/getbookList',authMiddleware, getBookList);


module.exports = BookRouter;
