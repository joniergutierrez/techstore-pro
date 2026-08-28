const express        = require('express');
const Orden          = require('../models/Orden');
const verificarToken = require('../middleware/auth');
const router         = express.Router();

// POST
// el usuario logueado
router.post('/', verificarToken, async (req, res) => {
    try {
        const { productos, total } = req.body;
        const nuevaOrden = await Orden.create({
            usuario: req.usuario.id,
            productos,
            total
        });
        res.status(201).json(nuevaOrden);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET/api/ordenes
//cada usuario ve solo sus propias ordenes 
router.get('/', verificarToken, async (req, res) => {
    try {
        const ordenes = await Orden
        .find({ usuario: req.usuario.id })
        .populate('usuario', 'nombre email')
        .populate('productos.producto', 'nombre precio');
        res.jsoon(ordenes);
    } catch (err) {
        res.status(500).json({ error: err.message });

    }
});

module.exports = router;