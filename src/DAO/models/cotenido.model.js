import mongoose from 'mongoose';
import {connectDBFormularios} from '../../config/DB-formularios.js';
import { el } from 'date-fns/locale';

const conn = connectDBFormularios(); // obtenés la conexión

// Definir el esquema para la colección "contenido"
const contenidoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    items: [{
        type: String,
        required: true,
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
contenidoSchema.pre('save', function(next) {
    this.fechaModificacion = Date.now();
    next();
});

// Exportar el modelo usando la conexión personalizada
const contenido = conn.model('Contenido', contenidoSchema);

export default contenido;