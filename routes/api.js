
// Dependecias
var express = require('express');
var router = express.Router();



// Modelos
var Usuarios = require('../models/usuarios');
var Cursos = require('../models/cursos');


// Routes
Usuarios.methods(['get', 'put', 'post', 'delete']);
Usuarios.register(router, '/usuarios');

Cursos.methods(['get', 'put', 'post', 'delete']);
Cursos.register(router, '/usuarios');

// Return router
module.exports = router;
