// const express = require('express'); Versión OUTDATED
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

// única instancia de express
const app = express();

// Conectar a la DB
db.authenticate()
    .then( () => console.log('Base de datos conectada') )
    .catch( error => console.log(error));

// Define port
// process.env.PORT es una variable de entorno (para producción), que elige el puerto que está disponible para lanzar el servidor de express; por lo tanto, en desarrollo tendría port que ser 4000 (en este caso)
const port = process.env.PORT || 4000;
const host = process.env.HOST || '127.0.0.1';

// Habilitar el templete engine PUG
app.set('view engine', 'pug');

// Creando nuestro middleware para el año
app.use( (req, res, next) => {

    const year = new Date();
    res.locals.currentYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";
    next(); // Se sigue para ejecutar las siguientes lineas de código (middlewares)
});

// Agregando body parser para leer os datos de formularios
app.use(express.urlencoded({extended: true}));

// Definiendo la carpeta publica
app.use(express.static('public'));

// Agregar Router, use soporta los verbos de HTTP (get, post, delete, put...)
app.use('/', router);

app.listen( port, host, () => {
    console.log('Servidor works!');
});
