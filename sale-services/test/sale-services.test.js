const { expect } = require('chai');
const sinon = require('sinon');
const { createSaleBook, getSalebookList } = require('../controllers/SaleBookController');
const jwt = require('jsonwebtoken');  
const SaleBook = require('../model/SaleBook');
const { default: axios } = require('axios');

describe('SaleBook Controller', () => {
    describe('createSaleBook', () => {
        it('create salebook and return a sales', async () => {
            const salebookStub = sinon.stub(SaleBook, 'create').resolves({});
            const jwtVerifyStub = sinon.stub(jwt, 'verify').returns({ customerId: 1 }); 

            const req = {
                body: {
                    sale_date: '2020-03-03',
                    amount: 30000,
                    book_id: 1,
                    customer_id: 1,
                },
                headers: {
                    authorization: 'Bearer mockedToken', 
                },
            };
            const res = {
                json: sinon.stub(),
                status: sinon.stub().returnsThis()
            };

            await createSaleBook(req, res);

            expect(jwtVerifyStub.calledOnce).to.be.true;
            expect(salebookStub.calledOnce).to.be.true;
            expect(res.json.calledOnce).to.be.true;

            jwtVerifyStub.restore();
            salebookStub.restore();
        });
    });

    describe('getSalebookList', () => {
        it('get salebook lists', async () => {
            const jwtVerifyStub = sinon.stub(jwt, 'verify').returns({ customerId: 1 }); 
            const salebooksStub = sinon.stub(SaleBook, 'findAll').resolves([{ customer_id: 1 }, { customer_id: 2 }]);
            const axiosGetStub = sinon.stub(axios, 'get').resolves({ data: { customer: 'Customer Details' } });

            const req = {
                headers: {
                    authorization: 'Bearer mockedToken',  
                },
            };
            const res = {
                json: sinon.stub(),
                status: sinon.stub().returnsThis()
            };

            await getSalebookList(req, res);

            expect(jwtVerifyStub.calledOnce).to.be.true;
            expect(salebooksStub.calledOnce).to.be.true;
            expect(axiosGetStub.calledTwice).to.be.true; 
            expect(res.json.calledOnce).to.be.true;

            jwtVerifyStub.restore();
            salebooksStub.restore();
            axiosGetStub.restore();
        })
    })

});
