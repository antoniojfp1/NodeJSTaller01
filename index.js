//importar express
const express = require('express');
//instanciar express en el objeto app
const app = express();

//instancia de mongoose
const mongoose = require('mongoose');

//instancia de log
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

//importar variables de entorno
const dotenv = require('dotenv').config();

const config = require('./config');

const useragent = require('express-useragent');
const api = require('./api');

const accessLogStream = fs.createWriteStream(path.join(`${__dirname}/${config.server.logs.dir}`, 'access.log'), { flags: 'a' });

app.use(express.json());

app.use(useragent.express());

app.use(morgan('combined', { stream: accessLogStream}));
app.use("/api", api);

//protocol://user:password@host:port/resource

config.env === "development" &&
mongoose.connect(`mongodb://${config.database.development.host}/${config.database.development.name}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }, () => {
      console.log("Conectado a la base de datos");
    });
config.env === "production" &&
mongoose.connect(`mongodb+srv://${config.database.production.user}:${config.database.production.password}@${config.database.production.host}/${config.database.development.name}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }, () => {
      console.log("Conectado a la base de datos");
    });

const server = app.listen(config.server.port, config.server.host, () => {
  console.log(`Servidor iniciado en el puerto ${server.address().port} en modo ${config.env}`);
});