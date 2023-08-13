const proxy = require("express-http-proxy");

const userServiceProxy = proxy("http://localhost:4000");

module.exports = {
    userServiceProxy
};
