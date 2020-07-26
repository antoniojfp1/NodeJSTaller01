const Rol = require('./../../models/roles');

const getRol = (req, res) => {
    const id = req.params.id;
    Rol.findOne({_id : id})
    .populate('permission_ids.permission', 'name')
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    })
}

const getAllRoles = (req, res) => {
    Rol.find({})
    .populate('permission_ids.permission', 'name')
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    })
}

const newRol = (req, res) => {
    const rol = {
        name: req.body.name
    };
    if(rol.name){
        const object = new Rol(rol);
        object.save()
        .then((response)=>{
            res.status(201).send(response);
        })
        .catch((err)=>{
            res.sendStatus(500);
        })
    }else{
        res.sendStatus(500);
    }
}

const newPermission = (req, res) => {
    const rol = req.body.rol;
    const permission = {
        permission: req.body.permission
    };
    Rol.updateOne({_id :rol}, {$addToSet: {permission_ids : permission}})
    .then(response=>{
        res.status(202).send(response);
    })
    .catch(err=>{
        res.status(500).send(err);
    })
};

module.exports = {getRol, getAllRoles, newRol, newPermission}