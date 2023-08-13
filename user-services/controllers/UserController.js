
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const generateToken = require('../services/GenerateToken');
const hashPassword = require('../services/GenerateHashPassword');
const handleSuccess = require('../utils/success/success.message');
const {handle400Error,handle500Error,handleNotFound} = require('../utils/errors/error.message');
const Token = require('../model/Token');

const createUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        const hashedPassword = await hashPassword(password);
        const user = await User.create({ name, email, password: hashedPassword, phone });

        const tokenValue = generateToken({ userId: user.id, email: user.email });
        const token = await Token.create({
            token: tokenValue,
            expires_at: new Date(Date.now() + 3600000),
            user_id: user.id,
        });

        handleSuccess(res, { user, token });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return handle400Error(res, error, error.errors[0].message); 
        }
        handle500Error(res, error, 'Failed to create user');
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return handle400Error(res,'User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return handle400Error(res, 'Invalid Password'); 
        }
        const tokenValue = generateToken({ userId: user.id, email: user.email });
        const token = await Token.create({
            token: tokenValue,
            expires_at: new Date(Date.now() + 3600000),
            user_id: user.id,
        });
        handleSuccess(res, { user, token });
    } catch (error) {
        handle500Error(res, error, 'Login failed');
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id; 

        const user = await User.findOne({ where: { id: userId } });

        if (!user) {
            return handleNotFound(res, 'User not found');
        }
        handleSuccess(res, { user });
    } catch (error) {
        handle500Error(res, error, 'Failed to get user');
    }
};

module.exports = {
    createUser,
    loginUser,
    getUserById
};
