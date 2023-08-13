
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const handleSuccess = require('../utils/success/success.message');
const { handle400Error, handle500Error, handleNotFound } = require('../utils/errors/error.message');
const Book = require('../model/Book');
const axios = require('axios');

const createBook = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'bookstoreuser123');
        const authenticatedUserId = decodedToken.userId;
        if (!authenticatedUserId) {
            return  handle400Error(res,"Need Admin Login!");
        }
        const { created_by,title, author, description, price, publication_year } = req.body;
        const book = await Book.create({ created_by:authenticatedUserId,title, author, description, price, publication_year });
        handleSuccess(res, { book });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return handle400Error(res, error, error.errors[0].message);
        }
        handle500Error(res, error, 'Failed to create Book');
    }
};

const getBookList = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'bookstoreuser123');
        const authenticatedUserId = decodedToken.userId;
        if (!authenticatedUserId) {
            return handle400Error(res, "Need Admin Login!");
        }
        const books = await Book.findAll({});
        if (!books) {
            return handle400Error(res, "Books not Found");
        }
        for (const book of books) {
            if (book.created_by) {
                const userResponse = await axios.get(`http://localhost:8000/getdetails/api/users/getdetail/${book.created_by}`);
                book.created_by = userResponse.data.user;
            }
        }
        handleSuccess(res, { books });
    } catch (error) {
        handle500Error(res, error, 'Failed to get Books');
    }
}

module.exports = {
    createBook,
    getBookList
};
