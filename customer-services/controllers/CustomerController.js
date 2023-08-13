
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const generateToken = require('../services/GenerateToken');
const hashPassword = require('../services/GenerateHashPassword');
const handleSuccess = require('../utils/success/success.message');
const { handle400Error, handle500Error, handleNotFound } = require('../utils/errors/error.message');
const Token = require('../model/Token');
const Customer = require('../model/Customer');

const createCustomer = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        const hashedPassword = await hashPassword(password);
        const customer = await Customer.create({ name, email, password: hashedPassword, phone });

        const tokenValue = generateToken({ customerId: customer.id, email: customer.email });
        const token = await Token.create({
            token: tokenValue,
            expires_at: new Date(Date.now() + 3600000),
            customer_id: customer.id,
        });

        handleSuccess(res, { customer, token });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return handle400Error(res, error, error.errors[0].message);
        }
        handle500Error(res, error, 'Failed to create Customer');
    }
};


const loginCustomer = async (req, res) => {
    try {
        const { email, password } = req.body;
        const customer = await Customer.findOne({ where: { email } });

        if (!customer) {
            return handle400Error(res, 'Customer not found');
        }
        const isPasswordValid = await bcrypt.compare(password, customer.password);

        if (!isPasswordValid) {
            return handle400Error(res, 'Invalid Password');
        }
        const tokenValue = generateToken({ customerId: customer.id, email: customer.email });
        const token = await Token.create({
            token: tokenValue,
            expires_at: new Date(Date.now() + 3600000),
            customer_id: customer.id,
        });
        handleSuccess(res, { customer, token });
    } catch (error) {
        handle500Error(res, error, 'Login failed');
    }
};


const getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findAll({});
        if (!customer) {
            return handle400Error(res, 'Customer not found');
        }
        handleSuccess(res, { customer });
    } catch (error) {
        handle500Error(res, error, 'Failed get Customer');
    }
}
const editCustomer = async (req, res) => {
    try {
        const { id } = req.query;
        const { name, email, phone } = req.body;
        const customer = await Customer.findOne({ _id: id });
        if (!customer) {
            return handle400Error(res, 'Customer not found');
        }
        if (name) {
            customer.name = name;
        }
        if (email) {
            customer.email = email;
        }
        if (phone) {
            customer.phone = phone;
        }
        await customer.save();
        handleSuccess(res, { customer });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return handle400Error(res, error, error.errors[0].message);
        }
        handle500Error(res, error, 'Failed to update Customer');
    }
}

const destroyCustomer = async (req, res) => {
    try {
        const { id } = req.query;
        const customer = await Customer.destroy({
            where: {
                id:id
            }
        });
        if (!customer) {
            return handle400Error(res, 'Customer not found');
        }
        handleSuccess(res, { message: 'Customer deleted successfully' });
    } catch (error) {
        handle500Error(res, error, 'Failed to destory Customer');
    }
}

const getCustomerById = async (req, res) => {
    try {
        const customerId = req.params.id;

        const customer = await Customer.findOne({ where: { id: customerId } });

        if (!customer) {
            return handleNotFound(res, 'Customer not found');
        }
        handleSuccess(res, { customer });
    } catch (error) {
        handle500Error(res, error, 'Failed to get Customer');
    }
};


module.exports = {
    createCustomer,
    loginCustomer,
    getCustomer,
    editCustomer,
    destroyCustomer,
    getCustomerById
};
