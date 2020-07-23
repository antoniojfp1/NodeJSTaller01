//importar express
const express = require('express');
//instanciar express en el objeto app
const app = express();

//instancia de mongoose
const mongoose = require('mongoose');

const useragent = require('express-useragent');
const api = require('./api');

app.use(express.json());

app.use(useragent.express());

app.use('/api', api);

//protocol://user:password@host:port/resource
mongoose.connect('mongodb+srv://jcpenap:3q3j83mi2TZQsbB3@clusters.g6etq.mongodb.net/twitter?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=>{
    console.log("Conectado a la base de datos");
});

app.listen(3000, () => {
    console.log("Servidor iniciado");
});