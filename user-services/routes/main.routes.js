const express = require('express');
const UserRouter = require('./routes');

const router = express.Router();

// Main Router
router.use('/users', UserRouter);

module.exports = router;
