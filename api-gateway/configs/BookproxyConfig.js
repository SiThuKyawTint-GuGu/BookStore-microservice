const proxy = require("express-http-proxy");

const bookServiceProxy = proxy("http://localhost:4002");

module.exports = {
    bookServiceProxy
};
