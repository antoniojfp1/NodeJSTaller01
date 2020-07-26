const Rol = require('./../../models/roles');

const getRol = (req, res) => {
    const message = 'get rol';
    console.log(message);
    res.status(200).res.send(message);
}

const getAllRoles = (req, res) => {
    const message = 'get all roles';
    console.log(message);
    res.status(200).res.send(message);
}

const newRol = (req, res) => {
    const message = 'new rol';
    console.log(message);
    res.status(200).res.send(message);
}

module.exports = {getRol, getAllRoles, newRol}