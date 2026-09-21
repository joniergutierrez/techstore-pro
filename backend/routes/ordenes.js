const express = require('express');

const Orden = require('../models/Orden');

const verificarToken = require('../middleware/auth');

const verificarAdmin = require('../middleware/admin');

const router = express.Router();

// ==================================================
// POST /api/ordenes
// Crear una orden — usuario logueado
// ==================================================

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

    res.status(400).json({
        error: err.message
    });

}

});

// ==================================================
// GET /api/ordenes/admin/todas
// El administrador ve TODAS las órdenes
// ==================================================

router.get('/admin/todas', verificarToken, verificarAdmin, async (req, res) => {

try {

    const ordenes = await Orden
        .find({})
        .populate('usuario', 'nombre email')
        .populate('productos.productos', 'nombre precio')
        .sort({ createdAt: -1 });

    res.json(ordenes);

} catch (err) {

    console.error('❌ Error al obtener todas las órdenes:', err);

    res.status(500).json({
        error: err.message
    });

}

});

// ==================================================
// PATCH /api/ordenes//estado
// El administrador cambia el estado de una orden
// ==================================================

const ESTADOS_VALIDOS = ['PAGO_CONFIRMADO', 'procesando', 'enviado', 'entregado', 'pendiente'];

router.patch('/:id/estado', verificarToken, verificarAdmin, async (req, res) => {
    try {
        const { estado } = req.body;

        console.log('🔄 Actualizando orden:', req.params.id);
        console.log('📦 Estado recibido:', estado);

        const ESTADOS_VALIDOS = [
            'pendiente',
            'procesando',
            'enviado',
            'entregado',
            'PAGO_CONFIRMADO'
        ];

        if (!ESTADOS_VALIDOS.includes(estado)) {
            return res.status(400).json({
                error: 'Estado inválido',
                estadosPermitidos: ESTADOS_VALIDOS
            });
        }

        const orden = await Orden.findById(req.params.id);

        if (!orden) {
            return res.status(404).json({
                error: 'Orden no encontrada'
            });
        }

        orden.estado = estado;

        await orden.save();

        console.log('✅ Estado actualizado correctamente');

        res.json({
            mensaje: 'Estado actualizado correctamente',
            orden
        });

    } catch (err) {
        console.error('❌ Error actualizando estado:', err);

        res.status(500).json({
            error: err.message
        });
    }
});

// ==================================================
// GET /api/ordenes
// Cada usuario ve solamente sus propias órdenes
// ==================================================

router.get('/', verificarToken, async (req, res) => {

try {

    const ordenes = await Orden
        .find({
            usuario: req.usuario.id
        })
        .populate('usuario', 'nombre email')
        .populate('productos.productos', 'nombre precio');

    res.json(ordenes);

} catch (err) {

    console.error('❌ Error al obtener las órdenes del usuario:', err);

    res.status(500).json({
        error: err.message
    });

}

});

module.exports = router;