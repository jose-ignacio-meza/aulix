import mongoose from 'mongoose'
import { connectDBFormularios } from '../../config/DB-formularios.js'; // Asegúrate de que la ruta sea correcta

const conn = connectDBFormularios(); // obtenés la conexión

const areaSchema = new mongoose.Schema({
    nombre: {
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
areaSchema.pre('save', function(next) {
    this.fechaModificacion = Date.now();
    next();
});

const area = conn.model('Area', areaSchema);

export default area;
