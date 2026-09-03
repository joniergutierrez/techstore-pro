//1
const mongoose = require('mongoose');

//2
const usuarioSchema = new mongoose.Schema({
    nombre:          { type: String, required: true },
    email:           { type: String, required: true, unique: true },
    departamento:    { type: String, required: true },
    municipio:       { type: String, required: true },
    password:        { type: String, required: true },
    rol:      { type: String,
        enum: ['admin', 'cliente'],
        default: 'cliente' }
});

//3
const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;