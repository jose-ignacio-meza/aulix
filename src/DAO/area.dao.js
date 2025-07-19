import area from '../DAO/models/area.model.js';

export const listarAreas = async () => {
    return await area.find({ eliminado: false }).lean();
}

export const nuevoArea = async (data) => {
    const nuevaArea = new area(data);
    return await nuevaArea.save();
}

export const obtenerAreaPorIdDAO = async (id) => {
    return await area.findById(id).lean();
}

export const editarArea = async (id, data) => {
    return await area.findByIdAndUpdate(id, data, { new: true }).lean();
}

export const deleteArea = async (id) => {
    return await area.findByIdAndUpdate(id, { eliminado: true }, { new: true }).lean();
}

export const obtenerAreaPorNombreDAO = async(nombre) => {
    return await area.findOne({ nombre }).lean();
}

