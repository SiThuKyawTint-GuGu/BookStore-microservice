const express = require('express');
const SaleBookRouter = require('./routes');

const router = express.Router();

// Main Router
router.use('/salebooks', SaleBookRouter);

module.exports = router;
