//importar express
const express = require('express');
//instanciar express en el objeto app
const app = express();

const useragent = require('express-useragent');

app.use(express.json());

app.use(useragent.express());

//importar módulo personalizado
const bmi = require('./bmi');
const date = require('./date');

//Models
const users = [];

//Middleware
const logger = (req, res, next) => {
    const parameters = JSON.stringify(req.params);
    const ua = JSON.stringify(req.useragent);
    console.log(`${date()} : ${req.method} : ${req.path} : ${parameters} : ${ua}`);
	next();
}
app.use(logger);

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

app.get('/users/lastname/:lastname', (req, res)=>{
    const lastname = req.params.lastname;   
    if(lastname !== null){          
       const user = users.find(u => u.lastname == lastname);
       res.status(200).send(user);
    }else{
        res.sendStatus(400);
    }
});

app.get('/users/gender/:gender', (req, res)=>{
    const gender = req.params.gender;   
    if(gender !== null){          
       const user = users.find(u => u.gender == gender);
       res.status(200).send(user);
    } else {
        res.sendStatus(400);
    }
});

app.get('/users/user/telephone', (req, res)=>{ 
    const user = users.find(u => u.telephones.length > 0);
    res.status(200).send(user);
});

app.get('/users/bmi/:id', (req, res)=>{
    const id = req.params.id;   
    if(id > 0){          
       const user = users.find(u => u.identification == id);
       let weight = user.weight;
       let height = user.height;       
       res.status(200).send(new Object(bmi(weight, height)));
    } else {
        res.sendStatus(400);
    }
});


app.get('/users/user/bmi', (req, res)=>{
        let result = [];
        users.forEach( u => {
           if (u.weight != undefined && u.height != undefined) {
                let weight = u.weight;
                let height = u.height;  
                userResult = {
                    identification: u.identification,
                    bmi: bmi(weight, height)
                }
                result.push(userResult)
           }
        });    
       res.status(200).send(result);
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