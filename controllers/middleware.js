var jwt = require('jwt-simple');  
var moment = require('moment');  
var config = require('./config');
var mongoose = require('mongoose');

exports.ensureAuthenticated = function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

  if(!req.headers.authorization) {
    return res
      .status(403)
      .send({message: "Tu petición no tiene cabecera de autorización"});
  }

  var token = req.headers.authorization.split(" ")[1];
  var payload = jwt.decode(token, config.TOKEN_SECRET);

  if(payload.exp <= moment().unix()) {
     return res
         .status(401)
        .send({message: "El token ha expirado"});
  }
  var usuario = req.headers.authorization.split(" ")[1];
  usuario = jwt.decode(usuario, config.TOKEN_SECRET);
  req.user = payload.sub;
  next();
}
