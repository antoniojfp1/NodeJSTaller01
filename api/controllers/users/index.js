//const bcrypt = require('bcryptjs'); //mac servers
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./../../models/users');
const Tweet = require('./../../models/tweets');
const { response } = require('express');

const crypto = require('./../../functions/crypto');
const config = require('./../../../config');
const validatePassword = require('./../../functions/validatePassword');
const validateUsernameAndEmail = require('./../../functions/validateUsernameAndEmail');


const getAll = (req, res) =>{
    User.find({}, ['username', 'role_ids'])
    .populate('role_ids.rol', ['name', 'permission_ids'])
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    })
};


const getUsers = (req, res) => {
    res.sendStatus(200);
};

const getUser = (req, res) => {
    const id = req.params.id;
    User.find({_id : id})
    .then((response)=>{
        const user = {
            name: response[0].name,
            username: response[0].username,
            birthdate: crypto.decrypt(response[0].birthdate)
        }
        res.status(200).send(user);
    })
    .catch((err)=>{
        res.sendStatus(500);
    })
};
const newUser = (req, res) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);

    if (!validatePassword(req.body.password)){
        res.status(500).send("Contraseña inválida.");
    
    } else {
    
        const password = bcrypt.hashSync(req.body.password, salt);
        const birthdate = crypto.encrypt(req.body.birthdate);  

        const user = {
            name: req.body.name,
            lastname: req.body.lastname,
            gender: req.body.gender,
            height: req.body.height,
            weight: req.body.weight,
            age: req.body.age,
            username: req.body.username,
            password: password,
            email: req.body.email,
            telephone: req.body.telephone,
            birthdate: birthdate
        };

        if(user.name && user.age && user.username && user.password && user.email){

            const alreadyExist = async () => {
                return await validateUsernameAndEmail(user.username, user.email);
            }
            alreadyExist().then((response) => {
                if (response) {
                    res.status(409).send("Username or email already exist");
                } else {
                    const object = new User(user);
                    object.save()
                    .then((response)=>{
                        res.status(201).send(response._id);
                    })
                    .catch((err)=>{
                        res.status(500).send(err.message);
                    });
                }
            })
            .catch((err)=>{
                res.status(500).send(err.message);
            });
            
        }else{
            res.sendStatus(500);
        }
    }

    
};

const updateUser = (req, res) => {
    const id = req.params.id;
    User.updateOne({_id : id}, {$set: 
        {name: req.body.name,
        lastname: req.body.lastname,
        gender: req.body.gender,
        age: req.body.age,
        height: req.body.height,
        weight: req.body.weight,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        telephone: req.body.telephone}})
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

const totalTweetsOfUser = (req, res) => {
    const user = req.body.user;
    Tweet.find({user: {_id: user}})
    .then(response=>{
        res.status(200).send(`Tweetts del usuario: ${response.length}`);
    })
    .catch((err)=>{
        res.sendStatus(500).send(err);
    });
}

const listOfTweetsOfUser = (req, res) => {
    const user = req.params.id;
    Tweet.find({user: {_id: user}})
    .then(response=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    });
}

const loginUser = (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    };
    User.findOne({username: user.username}, ['name', 'password'])
    .then(response=>{
        const password = response.password;
        if(bcrypt.compareSync(user.password, password)){            
            const token = jwt.sign({id: response._id}, config.tokenKey);
            res.status(200).json({token: token, name: response.name, id: response._id});            
        }else
            res.sendStatus(400)    
    })
    .catch(err=>{
        res.sendStatus(400);
    });
};

const newRol = (req, res) => {
    const user = req.body.user;
    const rol = {
        rol: req.body.rol
    };
    User.updateOne({_id :user}, {$addToSet: {role_ids : rol}})
    .then(response=>{
        res.status(202).send(response);
    })
    .catch(err=>{
        res.status(500).send(err);
    })
};

module.exports = {getUser, newUser, updateUser, deleteUser,totalTweetsOfUser,listOfTweetsOfUser, loginUser, getAll, newRol};