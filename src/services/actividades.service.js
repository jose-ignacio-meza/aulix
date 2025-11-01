import {
  getAllActividadesDao,
  crearActividadDao,
  editarActividadDao,
  deleteActividadDao,
  getActividadByIdDao,
  eliminarItemActividadDao
} from '../DAO/actividad.dao.js';

export const validarDatosActividad = (datos) => {
  if (!datos || typeof datos !== 'object') {
    throw new Error('Datos de actividad inválidos');
  }
  // Requiere al menos un título o nombre para la actividad
  if (!datos.titulo && !datos.nombre) {
    throw new Error('La actividad debe tener un "titulo" o "nombre"');
  }
  return true;
};

export const obtenerTodasLasActividades = async () => {
  try {
    return await getAllActividadesDao();
  } catch (error) {
    throw error;
  }
};

export const crearActividad = async (data) => {
  try {
    validarDatosActividad(data);
    const nueva = await crearActividadDao(data);
    return nueva;
  } catch (error) {
    throw error;
  }
};

export const editarActividad = async (id, data) => {
  try {
    if (!id) throw new Error('ID de actividad requerido');
    // opcional validar datos si se proporcionan campos principales
    if (data && Object.keys(data).length) validarDatosActividad({ ...data, titulo: data.titulo || data.nombre });
    const actividad = await editarActividadDao(id, data);
    if (!actividad) throw new Error('Actividad no encontrada');
    return actividad;
  } catch (error) {
    throw error;
  }
};

export const eliminarActividad = async (id) => {
  try {
    if (!id) throw new Error('ID de actividad requerido');
    return await deleteActividadDao(id);
  } catch (error) {
    throw error;
  }
};

export const obtenerActividadPorId = async (id) => {
  try {
    if (!id) throw new Error('ID de actividad requerido');
    return await getActividadByIdDao(id);
  } catch (error) {
    throw error;
  }
};

export const eliminarItemActividad = async (idActividad, index) => {
  try {
    if (!idActividad) throw new Error('ID de actividad requerido');
    if (typeof index !== 'number' || index < 0) throw new Error('Índice inválido');
    return await eliminarItemActividadDao(idActividad, index);
  } catch (error) {
    throw error;
  }
};