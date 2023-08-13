const proxy = require("express-http-proxy");

const customerServiceProxy = proxy("http://localhost:4001");

module.exports = {
    customerServiceProxy
};
