const express = require('express');
const SaleBookRouter = require('./routes');

const router = express.Router();

// Main Router
router.use('/feedbacks', SaleBookRouter);

module.exports = router;
