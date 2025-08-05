import { nuevoProposito, listarPropositosDAO, obtenerPropositoPorIdDAO, editarPropositoDAO, eliminarPropositoDAO, eliminarItemPropositoDAO} from "../DAO/proposito.dao.js";

export const crearProposito = async (data) => {
    return await nuevoProposito(data);
};

export const obtenerPropositos = async () => {
    return await listarPropositosDAO();
};

export const obtenerPropositoPorId = async (id) => {
    return await obtenerPropositoPorIdDAO(id);
};

export const actualizarProposito = async (id, data) => {
    return await editarPropositoDAO(id, data);
};

export const eliminarProposito = async (id) => {
    return await eliminarPropositoDAO(id);
};

export const eliminarItemProposito = async (idProposito, index) => {
    return await eliminarItemPropositoDAO(idProposito, index);
};