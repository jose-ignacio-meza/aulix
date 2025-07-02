import mongoose from "mongoose";
import { connectDBFormularios } from '../../config/DB-formularios.js'; // Asegúrate de que la ruta sea correcta

const conn = connectDBFormularios(); // obtenés la conexión
const PreguntaSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    label: { type: String, required: true },
    placeholder: { type: String, required: true },
    options: { type: [ 
        { 
            label: { type: String, required: true },
            value: { type: String, required: true }
        }
    ], default: undefined }
}, { _id: false });

const PlantillaFormularioSchema = new mongoose.Schema({
    tipo: { type: String, required: true },
    Preguntas: {
        type: Map,
        of: PreguntaSchema,
        required: true
    },
    eliminado: {
        type: Boolean,
        default: false
    }
});

const PlantillaFormulario = conn.model('plantillasFormularios', PlantillaFormularioSchema);
export default PlantillaFormulario;