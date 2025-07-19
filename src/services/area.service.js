import { listarAreas ,nuevoArea, obtenerAreaPorIdDAO, editarArea, deleteArea, obtenerAreaPorNombreDAO} from '../DAO/area.dao.js';

export const crearArea = async (data) => {
    return await nuevoArea(data);
}

export const actualizarArea = async (id, data) => {
    return await editarArea(id, data);
}

export const eliminarArea = async (id) => {
    return await deleteArea(id);
}

export const obtenerAreas = async () => {
    return await listarAreas();
}

export const obtenerAreaPorId = async (id) => {
    return await obtenerAreaPorIdDAO(id);
}

export const obtenerAreaPorNombre = async(nombre) =>{
    return await obtenerAreaPorNombreDAO(nombre);
}