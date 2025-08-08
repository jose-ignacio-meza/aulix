import mongoose from 'mongoose';
import {connectDBFormularios} from '../../config/DB-formularios.js';

const conn = connectDBFormularios(); // obtenés la conexión

// Definir el esquema para la colección "modalidades"
const modalidadesSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        required: true,
        trim: true
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
modalidadesSchema.pre('save', function(next) {
    this.fechaModificacion = Date.now();
    next();
});

// Exportar el modelo usando la conexión personalizada
const modalidades = conn.model('modalidades', modalidadesSchema);

export default modalidades;