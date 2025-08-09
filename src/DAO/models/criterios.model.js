import mongoose from 'mongoose';
import {connectDBFormularios} from '../../config/DB-formularios.js';

const conn = connectDBFormularios(); // obtenés la conexión

// Definir el esquema para la colección "contenido"
const criteriosSchema = new mongoose.Schema({
    items: [{
        type: String,
        trim: true
    }],
    area: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Area', // ← nombre del modelo relacionado (como está registrado en mongoose.model)
        required: true
    },
    fechaAlta: {
        type: Date,
        default: Date.now
    },
    fechaModificacion: {
        type: Date,
        default: Date.now
    },
    eliminado: {
        type: Boolean,
        default: false
    }
});

// Middleware para actualizar fechaModificacion en cada save
criteriosSchema.pre('save', function(next) {
    this.fechaModificacion = Date.now();
    next();
});

// Exportar el modelo usando la conexión personalizada
const criterios = conn.model('Criterios', criteriosSchema);

export default criterios;