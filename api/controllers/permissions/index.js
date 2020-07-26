const Permission = require('./../../models/permissions');

const getPermission = (req, res) => {
    const id = req.params.id;
    Permission.findOne({_id : id})
    .then((response)=>{
        const permission = {
            id: response._id,
            name: response.name
        }
        res.status(200).send(permission);
    })
    .catch((err)=>{
        res.sendStatus(500);
    })
}

const getAllPermissions = (req, res) => {
    Permission.find({})
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    })
}

const newPermission = (req, res) => {
    const permission = {
        name: req.body.name
    }
    if (permission.name) {
        const object = new Permission(permission);
        object.save()
        .then((response) => {
            res.status(201).send(response._id);
        })
        .catch((err)=>{
            res.sendStatus(500);
        })
    } else {
        res.status(500);
    }
}

module.exports = {getPermission, getAllPermissions, newPermission}