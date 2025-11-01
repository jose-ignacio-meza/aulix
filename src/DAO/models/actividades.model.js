import mongoose from 'mongoose'
import { connectDBFormularios } from '../../config/DB-formularios.js'; // Asegúrate de que la ruta sea correcta

const conn = connectDBFormularios(); // obtenés la conexión

const actividadSchema = new mongoose.Schema(
    {
        // se usará el _id de mongoose como id único
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        descripcion: {
            type: String,
            default: '',
            trim: true
        },
        // referencia al modelo de área (archivo area.model.js)
        area: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Area',
            required: true
        },
         eliminado: {
            type: Boolean,
            default: false   // 🔹 Soft delete por defecto en false
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            }
        }
    }
);

const Actividad = conn.model('Actividades', actividadSchema);
export default Actividad;