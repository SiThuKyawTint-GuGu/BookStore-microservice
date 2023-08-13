const express = require('express');
const { createUser, loginUser, getUserById } = require('../controllers/UserController');
const authMiddleware = require('../middleware/middleware');
const { createUserValidator, validateCreateUser } = require('../validator/UserValidation');

const UserRouter = express.Router();

UserRouter.post('/createuser',createUserValidator,validateCreateUser, createUser);
UserRouter.post('/loginUser', loginUser);
UserRouter.get('/getdetail/:id',getUserById);

module.exports = UserRouter;
