const express = require('express');
const BookRouter = require('./routes');

const router = express.Router();

// Main Router
router.use('/books', BookRouter);

module.exports = router;
