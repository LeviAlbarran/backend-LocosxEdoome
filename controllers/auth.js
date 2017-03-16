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
        id_congregacion: req.body.id_congregacion,
        nombre: req.body.nombre,
        correo: req.body.correo,
        clave: req.body.clave,
        lat: req.body.lat,
        lng: req.body.lng,
        nivel: req.body.nivel,
        activacion: req.body.activacion
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
    
                if(user.activacion=="1"){
                    if(user.id_congregacion = 1){
                        //user.conexion = "http://localhost:5000/api";
                        user.conexion = "http://node-territorios.herokuapp.com/api";             
                        console.log("italiano Maracaibo");
                    }
                    else if(user.id_congregacion = 2){
                      //  user.conexion = "http://localhost:5000/api"; 
                        user.conexion = "http://node-territorios.herokuapp.com/api";        
                        console.log("Aruba Español");
                    }
                  return res
                  .status(200)
                  .send({token: service.createToken(user)});
                }else{
                 return res
                 .status(200)
                 .send({response: "En espera de activacion. Comuniquese con el Encargado de territorios"});     
                }

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