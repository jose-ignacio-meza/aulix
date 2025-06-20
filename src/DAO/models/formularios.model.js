import mongoose from 'mongoose';
import { connectDBFormularios } from '../../config/DB-formularios.js'; // Asegúrate de que la ruta sea correcta

const conn = connectDBFormularios(); // obtenés la conexión

const formularioSchema = new mongoose.Schema({
    tipo: {
        type: String,
        enum: ['declaracion_jurada', 'acta', 'planificacion_anual'],
        required: true
    },
    titulo: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
    creador: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    datos: { type: mongoose.Schema.Types.Mixed, required: true },
    estado: { type: String, enum: ['borrador', 'finalizado'], default: 'borrador' }
});
const Formulario = conn.model('formularios', formularioSchema);
export default Formulario;