var config = {};

config.db = 'mongodb://localhost/crawlr-dev';
config.sessionCookie = {
    maxAge: 8640000,
    httpOnly: true,
    secure: false
};
config.sessionSecret = 'TRASHDUMPYARD';
config.sessionKey = 'sessionId';
config.sessionCollection = 'sessions';

module.exports = config;
