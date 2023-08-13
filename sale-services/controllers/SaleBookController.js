
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const handleSuccess = require('../utils/success/success.message');
const { handle400Error, handle500Error, handleNotFound } = require('../utils/errors/error.message');
const axios = require('axios');
const SaleBook = require('../model/SaleBook');

const createSaleBook = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token,'bookstorecustomer123');
        const authenticatedUserId = decodedToken.customerId;
        if (!authenticatedUserId) {
            return handle400Error(res, "Need Customer Login!");
        }
        const { sale_date, amount, customer_id, book_id } = req.body;
        const salebook = await SaleBook.create({ sale_date,amount,customer_id:authenticatedUserId,book_id });
        handleSuccess(res, { salebook });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return handle400Error(res, error, error.errors[0].message);
        }
        handle500Error(res, error, 'Failed to create Book');
    }
};

const getSalebookList = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'bookstorecustomer123');
        const authenticatedUserId = decodedToken.customerId;
        if (!authenticatedUserId) {
            return handle400Error(res, "Need Customer Login!");
        }
        const salebooks = await SaleBook.findAll({});
        if (!salebooks) {
            return handle400Error(res, "Customer not Found");
        }
        for (const salebook of salebooks) {
            if (salebook.customer_id) {
                const userResponse = await axios.get(`http://localhost:8000/customer/getdetails/api/customers/getdetail/${salebook.customer_id}`);
                salebook.customer_id = userResponse.data.customer;
            }
        }
        handleSuccess(res, { salebooks });
    } catch (error) {
        handle500Error(res, error, 'Failed to get Books');
    }
}

module.exports = {
    createSaleBook,
    getSalebookList
};
