const Permission = require('./../../models/permissions');

const getPermission = (req, res) => {
    const message = 'get permission';
    console.log(message);
    res.status(200).res.send(message);
}

const getAllPermissions = (req, res) => {
    const message = 'get all permissions';
    console.log(message);
    res.status(200).res.send(message);
}

const newPermission = (req, res) => {
    const message = 'new permission';
    console.log(message);
    res.status(200).res.send(message);
}

module.exports = {getPermission, getAllPermissions, newPermission}