//importar express
const express = require('express');
//instanciar express en el objeto app
const app = express();

//instancia de mongoose
const mongoose = require('mongoose');

const useragent = require('express-useragent');

app.use(express.json());

app.use(useragent.express());

//protocol://user:password@host:port/resource
mongoose.connect('mongodb://localhost/twitter', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=>{
    console.log("Conectado a la base de datos");
});

app.listen(3000, () => {
    console.log("Servidor iniciado");
});