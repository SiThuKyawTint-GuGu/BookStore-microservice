const { expect } = require('chai');
const sinon = require('sinon');
const { createUser,loginUser, getUserById } = require('../controllers/UserController');  // Adjust the path to match your actual file structure
const User = require('../model/User');
const Token = require('../model/Token');
const bcrypt = require('bcryptjs'); 

describe('User Controller', () => {
    describe('createUser', () => {
        it('create a user and return a token', async () => {
            const userStub = sinon.stub(User, 'create').resolves({ });
            const tokenStub = sinon.stub(Token, 'create').resolves({ token: 'mockedToken' });
            const req = {
                body: {
                    name: 'Test User',
                    email: 'test@example.com',
                    password: 'password123',
                    phone: '1234567890'
                }
            };
            const res = {
                json: sinon.stub(),
                status: sinon.stub().returnsThis()
            };
            await createUser(req, res);
            expect(userStub.calledOnce).to.be.true;
            expect(tokenStub.calledOnce).to.be.true;
            expect(res.json.calledOnce).to.be.true;
            userStub.restore();
            tokenStub.restore();
        });

    });

    describe('loginUser', () => {
        it('login a user and return a token', async () => {
            const userStub = sinon.stub(User, 'findOne').resolves({ email: 'test@example.com', password: 'hashedPassword' });
            const bcryptCompareStub = sinon.stub(bcrypt, 'compare').resolves(true);
            const req = {
                body: {
                    email: 'test@example.com',
                    password: 'password123'
                }
            };
            const res = {
                json: sinon.stub(),
                status: sinon.stub().returnsThis()
            };

            await loginUser(req, res);

            expect(userStub.calledOnce).to.be.true;
            expect(bcryptCompareStub.calledOnce).to.be.true;
            expect(res.json.calledOnce).to.be.true;

            userStub.restore();
            bcryptCompareStub.restore();
        });
    });

    describe('getUserById', () => {
        it('get user details', async () => {
            const userStub = sinon.stub(User, 'findOne').resolves({ id: 1, name: 'Test User' });
            const req = {
                params: {
                    id : 1
                }
            }
            const res = {
                json: sinon.stub(),
                status: sinon.stub().returnsThis()
            };

            await getUserById(req, res);

            expect(userStub.calledOnce).to.be.true;
            expect(res.json.calledOnce).to.be.true;

            userStub.restore();
        })
    })
});
