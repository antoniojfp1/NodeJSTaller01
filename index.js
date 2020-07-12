//importar express
const express = require('express');
//instanciar express en el objeto app
const app = express();
//importar módulo personalizado
const bmi = require('./bmi');

app.listen(3000, () => {
    console.log("Servidor iniciado");
   });