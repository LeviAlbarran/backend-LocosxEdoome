var restful = require('node-restful');
var mongoose = restful.mongoose;
var cursosSchema = new mongoose.Schema({
	id: Number,
	nombre: String,
	descriccion: String,
	horario: String,
	dia: Number,
	objetivos: Number
});
module.exports = restful.model('cursos', cursosSchema);