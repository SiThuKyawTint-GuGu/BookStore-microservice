const { expect } = require('chai');
const sinon = require('sinon');
const { createBook, getBookList } = require('../controllers/BookController');
const jwt = require('jsonwebtoken');
const { default: axios } = require('axios');
const Book = require('../model/Book');

describe('Book Controller', () => {
    describe('createBook', () => {
        it('create book and return a book', async () => {
            const bookStub = sinon.stub(Book, 'create').resolves({});
            const jwtVerifyStub = sinon.stub(jwt, 'verify').returns({ userId: 1 });
            const req = {
                body: {
                    title: 'The Great Gatsby',
                    author: "F. Scott Fitzgerald",
                    description:"A classic novel about the American Dream",
                    price: 1000,
                    publication_year:"2020-03-03"

                },
                headers: {
                    authorization: 'Bearer mockedToken',
                },
            };
            const res = {
                json: sinon.stub(),
                status: sinon.stub().returnsThis()
            };

            await createBook(req, res);

            expect(jwtVerifyStub.calledOnce).to.be.true;
            expect(bookStub.calledOnce).to.be.true;
            expect(res.json.calledOnce).to.be.true;

            jwtVerifyStub.restore();
            bookStub.restore();
        });
    });

    describe('getBookList', () => {
        it('get book lists', async () => {
            const jwtVerifyStub = sinon.stub(jwt, 'verify').returns({ userId: 1 });
            const bookStub = sinon.stub(Book, 'findAll').resolves([{ created_by: 1 }, { created_by: 2 }]);
            const axiosGetStub = sinon.stub(axios, 'get').resolves({ data: { customer: 'Book Details' } });

            const req = {
                headers: {
                    authorization: 'Bearer mockedToken',
                },
            };
            const res = {
                json: sinon.stub(),
                status: sinon.stub().returnsThis()
            };

            await getBookList(req, res);

            expect(jwtVerifyStub.calledOnce).to.be.true;
            expect(bookStub.calledOnce).to.be.true;
            expect(axiosGetStub.calledTwice).to.be.true;
            expect(res.json.calledOnce).to.be.true;

            jwtVerifyStub.restore();
            bookStub.restore();
            axiosGetStub.restore();
        })
    })
});
