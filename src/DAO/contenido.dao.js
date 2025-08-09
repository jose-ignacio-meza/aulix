import contenido from '../DAO/models/cotenido.model.js';

export const nuevoContenido = async (data) => {
    const nuevoContenido = new contenido(data);
    return await nuevoContenido.save();
};

export const editarContenido = async (id, data) => {
    return await contenido.findByIdAndUpdate(id, data, { new: true }).lean();
};

export const eliminarItem = async (idContenido, index) => {
    const contenidonuevo = await contenido.findById(idContenido);
    if (!contenidonuevo || !contenidonuevo.items || index >= contenidonuevo.items.length) {
        throw new Error("Ítem no encontrado o índice inválido");
    }

    contenidonuevo.items.splice(index, 1); // eliminar item
    await contenidonuevo.save(); // guardar cambios
    return contenidonuevo;
};

export const deleteContenido = async (id) => {
    return await contenido.findByIdAndUpdate(id, { eliminado: true }).lean();
};

export const listarContenido = async () => {
    return await contenido.find({ eliminado: false }).populate('area', 'nombre').lean();
};

export const obtenerContenidoPorIdDAO = async (id) => {
    return await contenido.findById(id).populate('area', 'nombre').lean();
};

