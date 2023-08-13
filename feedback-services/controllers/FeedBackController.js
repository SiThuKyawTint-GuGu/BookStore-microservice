
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const handleSuccess = require('../utils/success/success.message');
const { handle400Error, handle500Error, handleNotFound } = require('../utils/errors/error.message');
const axios = require('axios');
const FeedBack = require('../model/FeedBack');

const createFeedBack = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'bookstorecustomer123');
        const authenticatedUserId = decodedToken.customerId;
        if (!authenticatedUserId) {
            return handle400Error(res, "Need Customer Login!");
        }
        const { customer_id, book_id, feedback_text, feedback_date } = req.body;
        const feedback = await FeedBack.create({customer_id: authenticatedUserId, book_id,feedback_text,feedback_date });
        handleSuccess(res, { feedback });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return handle400Error(res, error, error.errors[0].message);
        }
        handle500Error(res, error, 'Failed to create FeedBack');
    }
};

const getFeedbacklist = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'bookstorecustomer123');
        const authenticatedUserId = decodedToken.customerId;
        if (!authenticatedUserId) {
            return handle400Error(res, "Need Customer Login!");
        }
        const feedbacks = await FeedBack.findAll({});
        if (!feedbacks) {
            return handle400Error(res, "Customer not Found");
        }
        for (const feedback of feedbacks) {
            if (feedback.customer_id) {
                const userResponse = await axios.get(`http://localhost:8000/customer/getdetails/api/customers/getdetail/${feedback.customer_id}`);
                feedback.customer_id = userResponse.data.customer;
            }
        }
        handleSuccess(res, { feedbacks });
    } catch (error) {
        handle500Error(res, error, 'Failed to get FeedBack');
    }
}

module.exports = {
    createFeedBack,
    getFeedbacklist
};
