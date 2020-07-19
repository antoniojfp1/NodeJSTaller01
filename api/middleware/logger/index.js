const date = require('./../../functions/date');

const logger = (req, res, next) => {
    const parameters = JSON.stringify(req.params);
    const ua = JSON.stringify(req.useragent);
    console.log(`${date()} : ${req.method} : ${req.path} : ${parameters} : ${ua}`);
	next();
}

module.exports = logger;