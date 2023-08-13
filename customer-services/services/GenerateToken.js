const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = '1y';
    const token = jwt.sign(payload, secret, { expiresIn });
    return token;
};

module.exports = generateToken; 
