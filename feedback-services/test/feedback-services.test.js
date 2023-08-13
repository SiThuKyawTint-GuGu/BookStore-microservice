const { expect } = require('chai');
const sinon = require('sinon');
const { createFeedBack, getFeedbacklist } = require('../controllers/FeedBackController');
const jwt = require('jsonwebtoken');
const { default: axios } = require('axios');
const FeedBack = require('../model/FeedBack');

describe('FeedBack Controller', () => {
    describe('createFeedBack', () => {
        it('create feedback and return a feedbacks', async () => {
            const feedbackStub = sinon.stub(FeedBack, 'create').resolves({});
            const jwtVerifyStub = sinon.stub(jwt, 'verify').returns({ customerId: 1 });

            const req = {
                body: {
                    feedback_text: 'Greate',
                    feedback_date: "2023-03-04",
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

            await createFeedBack(req, res);

            expect(jwtVerifyStub.calledOnce).to.be.true;
            expect(feedbackStub.calledOnce).to.be.true;
            expect(res.json.calledOnce).to.be.true;

            jwtVerifyStub.restore();
            feedbackStub.restore();
        });
    });

    describe('getFeedbacklist', () => {
        it('get feedback lists', async () => {
            const jwtVerifyStub = sinon.stub(jwt, 'verify').returns({ customerId: 1 });
            const feedbackStub = sinon.stub(FeedBack, 'findAll').resolves([{ customer_id: 1 }, { customer_id: 2 }]);
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

            await getFeedbacklist(req, res);

            expect(jwtVerifyStub.calledOnce).to.be.true;
            expect(feedbackStub.calledOnce).to.be.true;
            expect(axiosGetStub.calledTwice).to.be.true;
            expect(res.json.calledOnce).to.be.true;

            jwtVerifyStub.restore();
            feedbackStub.restore();
            axiosGetStub.restore();
        })
    })

});
