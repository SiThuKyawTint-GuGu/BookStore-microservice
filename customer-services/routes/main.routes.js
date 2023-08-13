const express = require('express');
const CustomerRouter = require('./routes');

const router = express.Router();

// Main Router
router.use('/customers', CustomerRouter);

module.exports = router;
