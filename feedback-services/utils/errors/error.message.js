
const fs = require('fs');

const logError = (error, statusCode) => {
    const errorMessage = `[${new Date().toISOString()}] Status: ${statusCode}, Error: ${error}\n`;
    fs.appendFileSync('./logs/error.log', errorMessage);
};

const handle500Error = (res, error, message) => {
    console.error('Error:', error);
    logError(`Error: ${error}`, 500);
    res.status(500).json({ error: message || 'Internal Server Error' });
};

function handle400Error(res, message) {
    logError(`Error: ${message}`, 400);
    return res.status(400).json({ error: message });
}

const handleNotFound = (res, error, message) => {
    console.error('Error:', error);
    logError(`Error: ${error}`, 404);
    res.status(400).json({ error: message || 'Internal Server Error' });
};

module.exports = {
    // logError,
    handle500Error,
    handle400Error,
    handleNotFound
};
