const { expect } = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcryptjs');
const { createCustomer, loginCustomer, getCustomer,editCustomer,destroyCustomer,getCustomerById } = require('../controllers/CustomerController');
const jwt = require('jsonwebtoken');
const Customer = require('../model/Customer');
const Token = require('../model/Token');

describe('Customer Controller', () => {
    describe('createCustomer', () => {
        it('create customer and return a token', async () => {
            const customerStub = sinon.stub(Customer, 'create').resolves({});
            const tokenStub = sinon.stub(Token, 'create').resolves({ token: 'mockedToken' });
            const req = {
                body: {
                    name: "Si Thu Kyaw Tint",
                    email: "sithu0071@gmail.com",
                    password: "guguadmin",
                    phone: "08352619221",
                },
            };
            const res = {
                json: sinon.stub(),
                status: sinon.stub().returnsThis()
            };

            await createCustomer(req, res);

            expect(customerStub.calledOnce).to.be.true;
            expect(tokenStub.calledOnce).to.be.true;
            expect(res.json.calledOnce).to.be.true;

            customerStub.restore();
        });
    });

    describe('loginCustomer', () => {
        it('login customer and return a token', async () => {
            const customerStub = sinon.stub(Customer, 'findOne').resolves({ email: 'sithu0071@gmail.com', password: 'guguadmin' });
            const bcryptCompareStub = sinon.stub(bcrypt,'compare').resolves(true);
            const req = {
                body: {
                    email: 'sithu0071@gmail.com',
                    password: 'guguadmin'
                }
            };
            const res = {
                json: sinon.stub(),
                status: sinon.stub().returnsThis()
            }

            await loginCustomer(req, res);

            expect(customerStub.calledOnce).to.be.true;
            expect(bcryptCompareStub.calledOnce).to.be.true;
            expect(res.json.calledOnce).to.be.true;
            
            customerStub.restore();
            bcryptCompareStub.restore();
        })
    })

    describe('getCustomer', () => {
        it('get customer list', async () => {
            const customerStub = sinon.stub(Customer, 'findAll').resolves({});

            const req = {};
            const res = {
                json: sinon.stub(),
                status: sinon.stub().returnsThis()
            };

            await getCustomer(req, res);

            expect(customerStub.calledOnce).to.be.true;
            expect(res.json.calledOnce).to.be.true;

            customerStub.restore();
        })
    })

    describe('editCustomer', () => {
        it('edit customer ', async () => {
            const customerStub = sinon.stub(Customer, 'findOne').resolves({ id: 1 });
            const Savecustomer = sinon.stub().resolves();
            

            const req = {
                query: { id: '1' },
                body: {
                    name: 'Aung Aung',
                    email: 'Aung@example.com',
                    phone: '09317524814'
                }
            };
            const res = {
                json: sinon.stub(),
                status: sinon.stub().returnsThis()
            };
            customerStub.returns({save:Savecustomer});

            await editCustomer(req, res);

            expect(customerStub.calledOnce).to.be.true;
            expect(Savecustomer.calledOnce).to.be.true;
            expect(res.json.calledOnce).to.be.true;

            customerStub.restore();
        })
    })

    describe('destroyCustomer', () => {
        it('destroy customer ', async () => {
            const customerStub = sinon.stub(Customer, 'destroy').resolves(1); 

            const req = {
                query: { id: '1' }
            };
            const res = {
                json: sinon.stub(),
                status: sinon.stub().returnsThis()
            };
            await destroyCustomer(req, res);

            expect(customerStub.calledOnce).to.be.true;
            expect(res.json.calledOnce).to.be.true;

            customerStub.restore();
        })
    })

    describe('getCustomerById', () => {
        it('get customer details ', async () => {
            const customerStub = sinon.stub(Customer, 'findOne').resolves({id:1});
            const req = {
                params: {
                    id: 1
                }
            }
            const res = {
                json: sinon.stub(),
                status: sinon.stub().returnsThis()
            };
            await getCustomerById(req, res);

            expect(customerStub.calledOnce).to.be.true;
            expect(res.json.calledOnce).to.be.true;

            customerStub.restore();
        })
    })

});
