
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ordenShema = new Schema({

    // ¿quien hizo la orden?
    usuario: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Usuario',
        required: true
    },

    //arreglo de productos con calidad
    productos: [{
        productos: {
            type: Schema.Types.ObjectId,
            ref: 'Producto'
        },
        calidad: { type: Number, required: true, min: 1 }
    }],

    // total calculado en el frontend o en la ruta
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

}, { timestamps: true }); // agrega createdAt y updateAt

const Orden = mongoose.model('Orden', ordenShema);
module.exports = Orden;