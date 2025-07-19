import {obtenerContenidoPorIdDAO, nuevoContenido, editarContenido, deleteContenido, listarContenido} from '../DAO/contenido.dao.js';

export const crearContenido = async (data) => {
    return await nuevoContenido(data);
};

export const actualizarContenido = async (id, data) => {
    return await editarContenido(id, data);
};

export const eliminarContenidoservice = async (id) => {
    return await deleteContenido(id);
};

export const obtenerContenido = async () => {
    return await listarContenido();
};

export const obtenerContenidoPorId = async (id) => {
    return await obtenerContenidoPorIdDAO(id);
};
