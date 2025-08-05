import proposito from './models/proposito.model.js';

export const nuevoProposito = async (data) => {
    const nuevoProposito = new proposito(data);
    return await nuevoProposito.save();
};

export const listarPropositosDAO = async () => {
    try {
        return await proposito.find({ eliminado: false }).populate('area', 'nombre').lean();
    } catch (error) {
        console.error('Error al listar propósitos:', error);
        throw error;
    }
};

export const obtenerPropositoPorIdDAO = async (id) => {
    return await proposito.findById(id).populate('area', 'nombre').lean();
};

export const editarPropositoDAO = async (id, data) => {
    return await proposito.findByIdAndUpdate(id, data, { new: true }).lean();
};

export const eliminarPropositoDAO = async (id) => {
    return await proposito.findByIdAndUpdate(id, { eliminado: true }).lean();
};

export const eliminarItemPropositoDAO = async (idProposito, index) => {
    const propositoNuevo = await proposito.findById(idProposito);
    if (!propositoNuevo || !propositoNuevo.items || index >= propositoNuevo.items.length) {
        throw new Error("Ítem no encontrado o índice inválido");
    }
    propositoNuevo.items.splice(index, 1);
    return await propositoNuevo.save();
};




