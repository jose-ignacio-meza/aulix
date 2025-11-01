import {listarAreas} from '../DAO/area.dao.js';
import {
  obtenerTodasLasActividades,
  crearActividad,
  editarActividad,
  eliminarActividad,
  obtenerActividadPorId,
  eliminarItemActividad
} from '../services/actividades.service.js';

/**
 * Controller de Actividades — funciones CRUD básicas.
 * Ajusta nombres de vistas / rutas según tu proyecto.
 */

export const listarActividades = async (req, res) => {
  try {
    const actividades = await obtenerTodasLasActividades();
    actividades.forEach(a => {
      if (a.createdAt) {
        const fecha = new Date(a.createdAt);
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const año = fecha.getFullYear();
        a.createdAt = `${año}/${mes}/${dia}`;
      }
    });
    if (req.accepts('html')) return res.render('admin/actividades/index', { actividades });
    return res.json({ actividades });
  } catch (error) {
    console.error('Error listando actividades:', error);
    return res.status(500).json({ error: error.message });
  }
};

export const mostrarCrearActividad = async(req, res) => {
  const areas = await listarAreas();
  areas.forEach(area => area._id = area._id.toString());
  return res.render('admin/actividades/crear', {areas});
};

export const crearActividadController = async (req, res) => {
  try {
    const data = req.body;
    const nueva = await crearActividad(data);
    if (req.accepts('html')) return res.redirect('/admin/actividades');
    return res.status(201).json({ actividad: nueva });
  } catch (error) {
    console.error('Error creando actividad:', error);
    return res.status(400).json({ error: error.message });
  }
};

export const mostrarEditarActividad = async (req, res) => {
  try {
    const { id } = req.params;
    const actividad = await obtenerActividadPorId(id);
    if (actividad.createdAt) {
      const fecha = new Date(actividad.createdAt);
      const dia = String(fecha.getDate()).padStart(2, '0');
      const mes = String(fecha.getMonth() + 1).padStart(2, '0');
      const año = fecha.getFullYear();
      actividad.createdAt = `${dia}/${mes}/${año}`;
    }
    const areas = await listarAreas();
    areas.forEach(area => area._id = area._id.toString());
    if (!actividad) return res.status(404).send('Actividad no encontrada');
    return res.render('admin/actividades/editar', { actividad ,areas});
  } catch (error) {
    console.error('Error mostrando actividad:', error);
    return res.status(500).json({ error: error.message });
  }
};

export const editarActividadController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // 🔍 1. Verificar si la actividad existe
    const actividadExistente = await obtenerActividadPorId(id);
    if (!actividadExistente) {
      console.warn(`No se encontró la actividad con ID: ${id}`);
      return res.status(404).json({ error: 'La actividad no existe.' });
    }

    // 🔧 2. Actualizar la actividad
    const actividadActualizada = await editarActividad(id, data, {
      new: true,
      runValidators: true
    });

    // 🔁 3. Responder según el tipo de petición
    if (req.accepts('html')) {
      return res.redirect('/admin/actividades');
    }

    return res.json({ actividad: actividadActualizada });

  } catch (error) {
    console.error('Error editando actividad:', error);
    return res.status(400).json({ error: error.message });
  }
};

export const eliminarActividadController = async (req, res) => {
  try {
    // aceptar id por params o body
    const id = req.params?.id || req.body?.id;
    if (!id) return res.status(400).json({ error: 'ID requerido' });
    await eliminarActividad(id);
    if (req.accepts('html')) return res.redirect('/admin/actividades');
    return res.json({ success: true });
  } catch (error) {
    console.error('Error eliminando actividad:', error);
    return res.status(400).json({ error: error.message });
  }
};

export const eliminarItemActividadController = async (req, res) => {
  try {
    const idActividad = req.params?.id || req.body?.idActividad;
    const index = Number(req.body?.index ?? req.query?.index);
    if (!idActividad || Number.isNaN(index)) return res.status(400).json({ error: 'idActividad e index requeridos' });
    const actividad = await eliminarItemActividad(idActividad, index);
    return res.json({ actividad });
  } catch (error) {
    console.error('Error eliminando ítem de actividad:', error);
    return res.status(400).json({ error: error.message });
  }
};