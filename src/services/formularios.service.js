import {crearFormulario,obtenerFormularios,obtenerFormularioPorId,actualizarFormulario,eliminarFormulario} from '../DAO/formularios.dao.js';
import { obtenerPlantillaPorTipo } from '../DAO/plantillasFormularios.dao.js';

export class FormularioService {
    async create(data) {
        return await crearFormulario(data);
    }

    async getAll(filter = {}) {
        return await obtenerFormularios(filter);
    }

    async getById(id) {
        return await obtenerFormularioPorId(id);
    }

    async getFormularioByTipo(tipo) {
        const plantilla = await obtenerPlantillaPorTipo(tipo);
        if (!plantilla) {
            throw new Error(`No se encontró una plantilla para el tipo: ${tipo}`);
        }
        return plantilla;
    }

    async update(id, data) {
        return await actualizarFormulario(id, data);
    }

    async delete(id) {
        return await eliminarFormulario(id);
    }

}
export default FormularioService;
