const User = require('./../../models/users')

const getAll = (req, res) =>{
    User.find({}, ["name", "username"])
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    })
};

const getUser = (req, res) => {
    const id = req.params.id;
    User.find({_id : id}, ["name", "username"])
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    })
};
const newUser = (req, res) => {
    const user = {
        name: req.body.name,
        lastname: req.body.lastname,
        gender: req.body.gender,
        height: req.body.height,
        weight: req.body.weight,
        age: req.body.age,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        telephone: req.body.telephone
    };
    if(user.name && user.age && user.username && user.password && user.email){
        const object = new User(user);
        object.save()
        .then((response)=>{
            res.status(201).send(response._id);
        })
        .catch((err)=>{
            res.sendStatus(500);
        })
    }else{
        res.sendStatus(500);
    }
};

const updateUser = (req, res) => {
    const id = req.params.id;
    User.updateOne({_id : id}, {$set: 
        name = req.body.name,
        lastname = req.body.lastname,
        gender = req.body.gender,
        age = req.body.age,
        height = req.body.height,
        weight = req.body.weight,
        username = req.body.username,
        password = req.body.password,
        email = req.body.email,
        telephone = req.body.telephone})
    .then(response=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    })
}

const deleteUser = (req, res) => {
    const id = req.params.id;
    User.deleteOne({_id : id})
    .then(response=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    })
}

module.exports = {getAll, getUser, newUser, updateUser, deleteUser};