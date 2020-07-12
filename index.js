//importar express
const express = require('express');
//instanciar express en el objeto app
const app = express();

app.use(express.json());

//importar módulo personalizado
const bmi = require('./bmi');
const date = require('./date');

//Models
const users = [];

app.get('/users', (req, res)=>{
    res.status(200).send(users);
});

app.get('/users/:id', (req, res)=>{
    const id = req.params.id;   
    if(id>0){          
       const user = users.find(u => u.identification == id);
       res.status(200).send(user);
    }else{
        res.sendStatus(400);
    }
});

app.post('/users', (req, res) => {
    const user = {
        identification : req.body.identification,
        name: req.body.name,
        lastname: req.body.lastname,
        age: req.body.age,
        gender: req.body.gender,
        height: req.body.height,
        weight: req.body.weight,
        telephones: req.body.telephones
    }
    let camposObligatorios = [];
    if (user.identification == "" || user.identification == 0){
        camposObligatorios.push("Identificacion");
    }
    if (user.name == ""){
        camposObligatorios.push("name");
    }
    if (user.lastname == ""){
        camposObligatorios.push("lastname");
    }
    if (user.age == "" || user.age == 0){
        camposObligatorios.push("age");
    }
    if (user.gender == ""){
        camposObligatorios.push("gender");
    }
    if(camposObligatorios.length==0){
        users.push(user);
	    res.status(200).send(`El usuario ${user.name} fue creado`);
    }
    else{
        res.status(412).send(`Campos obligatorios: ${camposObligatorios}`);
    }
});

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;   
    if(id>0){          
       const user = users.findIndex(u => u.identification == id);
       users.splice(user,1);
       res.status(200).send(users);
    }else{
        res.sendStatus(400);
    }
});

app.listen(3000, () => {
    console.log("Servidor iniciado");
   });