import Actividad from '../DAO/models/actividades.model.js';

/**
 * DAO para Actividades
 * Ajusta los campos en .populate(...) según relaciones reales del modelo Actividad.
 */

export const getAllActividadesDao = async () => {
  return await Actividad
    .find({ eliminado: false })
    // .populate('area') // descomentar / ajustar si Actividad referencia a otra colección
    .lean();
};

export const crearActividadDao = async (data) => {
  const nueva = new Actividad(data);
  return await nueva.save();
};

export const editarActividadDao = async (id, data) => {
  return await Actividad.findByIdAndUpdate(id, data, { new: true }).lean();
};

export const deleteActividadDao = async (id) => {
  // Soft delete
  return await Actividad.findByIdAndUpdate(id, { eliminado: true }, { new: true }).lean();
};

export const getActividadByIdDao = async (id) => {
  return await Actividad
    .findById(id)
    .populate('area') // ajustar según modelo
    .lean();
};

// Si el modelo Actividad tiene un array de ítems y necesitás eliminar un ítem por índice:
export const eliminarItemActividadDao = async (idActividad, index) => {
  const actividad = await Actividad.findById(idActividad);
  if (!actividad || !Array.isArray(actividad.items) || index >= actividad.items.length) {
    throw new Error('Ítem no encontrado o índice inválido');
  }
  actividad.items.splice(index, 1);
  await actividad.save();
  return actividad.toObject();
};