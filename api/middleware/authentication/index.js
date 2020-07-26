const jwt = require('jsonwebtoken');
const config = require('./../../../config');

const authentication = (req, res, next) => {
    const token = req.headers["x-access-token"];
    jwt.verify(token, config.tokenKey, (err, decoded) =>{
        if(err){
            res.sendStatus(401);
        }else{
            req.userId = decoded.id;
            next();
        }
    });
};

module.exports = authentication;