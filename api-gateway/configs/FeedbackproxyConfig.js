const proxy = require("express-http-proxy");

const feedbackServiceProxy = proxy("http://localhost:4004");

module.exports = {
    feedbackServiceProxy
};
