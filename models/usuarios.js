var restful = require('node-restful');
var mongoose = restful.mongoose;

var usuariosSchema = new mongoose.Schema({
	id: Number,
	nombre: String,
	correo: String,
	clave: String,
	nivel: Number,
	objetivos: Number,
	puntuacion: []
});
module.exports = restful.model('usuarios', usuariosSchema);