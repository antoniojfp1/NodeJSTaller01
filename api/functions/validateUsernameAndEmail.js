const User = require('./../models/users');

const validateUserAndEmail = (u, e) => {
    return User.findOne({$or: [{username: u},{email: e}]})
    .then((response) => {
         return response !== null;
    }).catch((err) => {
         res.sendStatus(500);
    }) ;
 }

 module.exports = validateUserAndEmail;