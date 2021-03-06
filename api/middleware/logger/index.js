const fs = require('fs');
const config = require('./../../../config');
const date = require('./../../functions/date');

const logger = (req, res, next) => {
    const parameters = JSON.stringify(req.params);
    const ua = JSON.stringify(req.useragent);
    const log = `${date()} :: ${req.method} :: ${req.path} : ${parameters} : ${ua}`;
    const folder = config.server.logs.dir || 'logs';
    fs.appendFile(`${folder}/logger.log`, log, 'utf8', (err)=>{
        if (err)
            console.log(err);
    })
	next();
}

module.exports = logger;