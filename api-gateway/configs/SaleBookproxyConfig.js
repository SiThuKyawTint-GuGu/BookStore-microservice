const proxy = require("express-http-proxy");

const salebookServiceProxy = proxy("http://localhost:4003");

module.exports = {
    salebookServiceProxy
};
