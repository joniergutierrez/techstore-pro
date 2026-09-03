// 1 importar dependencias 
const express = require('express');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const router  = express.Router();

//2 POST crear cuenta
router.post('/registro', async (req, res) => {
    try {
        const { nombre, email, departamento, municipio, password, rol } = req.body;

        // verificar que el email no exista ya
        const existe = await Usuario.findOne({ email });
        if (existe) return res.status(400).json({ error: 'el email ya esta registrado' });

        // encriptar la coontraseña con 10 rondas de bcrypt
        const hash = await bcrypt.hash(password, 10);

        // guardar el ususario con la contraseña encriptada
        const usuario = await Usuario.create({ nombre, email, departamento, municipio, password: hash, rol });
        console.log (rol)
        

        res.status(201).json({ mensaje: 'usuario creado correctamente', id: usuario._id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 3 POST iniciar sesion y recuibir token
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // buscar ususario por email
        const usuario = await Usuario.findOne({ email });
        if (!usuario) return res.status(401).json({ error: 'email o contraseña incorrectos' });

        // comparar la contraseña con el hash guardado en atlas
        const valida = await bcrypt.compare(password, usuario.password);
        if (!valida) return res.status(401).json({ error: 'email o contraseña incorrectos' });

        // crear el token JWT - dura 24 horas
        const token = jwt.sign(
            { id: usuario._id, email: usuario.email, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, nombre: usuario.nombre });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//4 exportar el souter
module.exports = router;