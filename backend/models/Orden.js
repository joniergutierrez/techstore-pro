const mongoose = require('mongoose');
const { Schema } = mongoose;

const ordenSchema = new Schema({

    // ¿quien hizo la orden?
    usuario: {
        type: mongoose.Schema.Types.ObjectId,   // ✅ Corregido: era SchemaTypes
        ref: 'Usuario',
        required: true
    },

    // arreglo de productos con cantidad
    productos: [{
        producto: {                              // ✅ Corregido: era "productos"
            type: Schema.Types.ObjectId,
            ref: 'Producto'
        },
        cantidad: { type: Number, required: true, min: 1 }  // ✅ Corregido: era "calidad"
    }],

    // total calculado en el servidor
    total: { type: Number, required: true },

    // estado del ciclo de vida de la orden
    estado: {
        type: String,
        default: 'pendiente',
        enum: ['pendiente', 'procesando', 'enviado', 'entregado', 'PAGO_CONFIRMADO']
    },

    // Datos de Wompi — se llenan solo cuando el pago fue aprobado
    wompiTransactionId: { type: String },
    wompiReference:     { type: String }

}, { timestamps: true });

const Orden = mongoose.model('Orden', ordenSchema);
module.exports = Orden;