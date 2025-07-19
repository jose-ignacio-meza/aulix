import * as contenidoService from '../services/contenido.service.js';
import * as areaService from '../services/area.service.js';

// Función para obtener las áreas desde la base de datos
const obtenerAreas = async () => {
    try {
        return await areaService.obtenerAreas();
    } catch (error) {
        console.error('Error al obtener áreas:', error);
        throw error;
    }
};

export const listarContenido = async (req, res) => {
    try {
        const contenidos = await contenidoService.obtenerContenido();
        const areas = await obtenerAreas();
        res.render('admin/listaContenido', { contenidos ,areas});
    } catch (error) {
        console.error('Error al listar contenidos:', error);
        res.status(500).send('Error interno del servidor');
    }
}

export const mostrarCrearContenido = async (req, res) => {
    try {
        const areas = await obtenerAreas();
        res.render('admin/crearContenido', { areas });
    } catch (error) {
        console.error('Error al mostrar crear contenido:', error);
        res.status(500).send('Error interno del servidor');
    }
}

export const crearContenido = async (req, res) => {
    try {
        const nuevoContenido = await contenidoService.crearContenido(req.body);
        if (!nuevoContenido) {
            return res.status(400).render('admin/crearContenido', { message: 'Error al crear contenido' });
        }
        res.render('admin/listaContenido');
    } catch (error) {
        console.error('Error al crear contenido:', error);
        res.status(500).send('Error interno del servidor');
    }
}

export const mostrarEditarContenido = async (req, res) => {
    try {
        const contenido = await contenidoService.obtenerContenidoPorId(req.params.id);
        if (!contenido) {
            return res.status(404).send('Contenido no encontrado');
        }
        const areas = await obtenerAreas();
        res.render('admin/editarContenido', { contenido , areas});
    } catch (error) {
        console.error('Error al obtener contenido para editar:', error);
        res.status(500).send('Error interno del servidor');
    }
}

export const editarContenido = async (req, res) => {
    try {
        const contenidoActualizado = await contenidoService.actualizarContenido(req.params.id, req.body);
        if (!contenidoActualizado) {
            return res.status(404).send('Contenido no encontrado');
        }
        res.redirect('/admin/listaContenido');
    } catch (error) {
        console.error('Error al editar contenido:', error);
        res.status(500).send('Error interno del servidor');
    }
}

export const eliminarContenido = async (req, res) => {
    try {
        const contenidoEliminado = await contenidoService.eliminarContenidoservice(req.params.id);
        if (!contenidoEliminado) {
            return res.status(404).send('Contenido no encontrado');
        }
        res.redirect('/admin/listaContenido');
    } catch (error) {
        console.error('Error al eliminar contenido:', error);
        res.status(500).send('Error interno del servidor');
    }
}

