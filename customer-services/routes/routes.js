const express = require('express');
const { createUser, loginUser, loginCustomer, createCustomer, getCustomer, editCustomer, destroyCustomer, getCustomerById } = require('../controllers/CustomerController');
const authMiddleware = require('../middleware/middleware');
const { createCustomerValidator, validateCreateCustomer } = require('../validator/CustomerValidation');

const CustomerRouter = express.Router();

CustomerRouter.post('/createcustomer',createCustomerValidator,validateCreateCustomer, createCustomer);
CustomerRouter.post('/logincustomer', loginCustomer);
CustomerRouter.get('/getcustomer', authMiddleware, getCustomer);
CustomerRouter.post('/editcustomer', authMiddleware, editCustomer);
CustomerRouter.delete('/destorycustomer', authMiddleware, destroyCustomer);
CustomerRouter.get('/getdetail/:id', getCustomerById);

module.exports = CustomerRouter;
