// Import the logEvents function
const { logEvents } = require('./logger.js');

// Error handling middleware
const errorHandler = async (err, req, res, next) => {
    await logEvents(`ERROR: ${err.name} - ${err.message}`);
    console.error(`${err.name}: ${err.message}`);
    console.log(err.stack);
    res.status(500).send(err.message);
}

module.exports = errorHandler;
