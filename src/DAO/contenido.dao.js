import contenido from '../DAO/models/cotenido.model.js';

export const nuevoContenido = async (data) => {
    const nuevoContenido = new contenido(data);
    return await nuevoContenido.save();
};

export const editarContenido = async (id, data) => {
    return await contenido.findByIdAndUpdate(id, data, { new: true }).lean();
};

export const deleteContenido = async (id) => {
    return await contenido.findByIdAndUpdate(id, { eliminado: true }).lean();
};

export const listarContenido = async () => {
    return await contenido.find({ eliminado: false }).lean();
};

export const obtenerContenidoPorIdDAO = async (id) => {
    return await contenido.findById(id).lean();
};

