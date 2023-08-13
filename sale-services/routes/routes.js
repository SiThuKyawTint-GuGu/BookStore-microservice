const express = require('express');
const authMiddleware = require('../middleware/middleware');
const {createBookSaleValidator, validateCreateBookSale } = require('../validator/SaleValidator');
const { createSaleBook, getSalebookList } = require('../controllers/SaleBookController');

const SaleRouter = express.Router();

SaleRouter.post('/createbookasle', createBookSaleValidator, validateCreateBookSale,authMiddleware,createSaleBook);
SaleRouter.get('/getbooksaleList',authMiddleware, getSalebookList);


module.exports = SaleRouter;
