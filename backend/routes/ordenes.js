const express = require('express');
const Orden = require('../models/Orden');
const verificarToken = require('../middleware/auth');
const router = express.Router();

// GET /api/ordenes — mis órdenes
// Cada usuario ve solo sus propias órdenes: el servidor sabe quién es por el token.
// Las más nuevas primero, y con el nombre, precio e imagen de cada producto.
router.get('/', verificarToken, async (req, res) => {
  try {
    const ordenes = await Orden
      .find({ usuario: req.usuario.id })
      .populate('productos.producto', 'nombre precio imagen')
      .sort({ createdAt: -1 });
    
    res.json(ordenes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;