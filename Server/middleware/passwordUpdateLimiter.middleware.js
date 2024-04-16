const rateLimit = require('express-rate-limit');

const passwordUpdateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 password update requests per windowMs
    message: 'Too many password update attempts from this IP, please try again after 15 minutes'
});

module.exports = {passwordUpdateLimiter}