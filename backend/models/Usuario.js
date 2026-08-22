//1
const mongoose = require('mongoose');

//2
const usuarioSchema = new mongoose.Schema({
    nombre:   { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

//3
const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;