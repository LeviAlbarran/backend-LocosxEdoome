var mongoose = require('mongoose');  
//var User = mongoose.model('usuarios');  
var User = require('../models/usuarios');
var service = require('./services');

exports.emailSignup = function(req, res) { 
var correo = req.body.correo;
User.findOne({correo: correo}, function(err, user) {
        if (user) {
           
                return res
                .status(200)
                .send({response: "Correo ya registrado"});                
        }else{

        var user = new User({
            // Creamos el usuario con los campos
            // que definamos en el Schema
            // nombre, email, etc...
        id: req.body.id,
        nombre: req.body.nombre,
        correo: req.body.correo,
        clave: req.body.clave,
        nivel: req.body.nivel,
        });

        user.save(function(err){
            console.log(user);
            return res
                .status(200)
                .send({token: service.createToken(user)});
        });

        }
     
    });
       
};

exports.emailLogin = function(req, res) {
//req.body.correo.toLowerCase()
var correo = req.body.correo;
var clave = req.body.clave;  
console.log(req.body);
 User.findOne({correo: correo}, function(err, user) {
    console.log(user);
   // Congregacion.findOne({id: user.id_congregacion}, function(err, congregacion) {
        if (user) {
            if (user.clave==clave) {
    
                  return res
                  .status(200)
                  .send({token: service.createToken(user)});
   

            }else{
                return res
                .status(200)
                .send({response: "Su contraseña es incorrecta"});                
            };
            
        }else{
            return res
            .status(200)
            .send({response: "Su correo es incorrecto"});
        }
    //});    
});
};