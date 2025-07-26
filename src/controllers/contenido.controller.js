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
        console.log('Nuevo contenido:' + JSON.stringify(req.body));
        // Validar que se envíen los ítems
        if (!req.body.items || req.body.items.length === 0) {
            return res.status(400).render('admin/crearContenido', { message: 'Debe ingresar al menos un ítem' });
        }
        req.body.items = JSON.parse(req.body.items);
        const nuevoContenido = await contenidoService.crearContenido(req.body);
        if (!nuevoContenido) {
            return res.status(400).render('admin/crearContenido', { message: 'Error al crear contenido' });
        }
        res.redirect('/admin/listaContenido');
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
        contenido.area._id= contenido.area._id.toString(); // Asegurarse de que el ID sea una cadena
        const areas = await obtenerAreas();
        areas.forEach(a => a._id = a._id.toString());
        res.render('admin/editarContenido', { contenido , areas});
    } catch (error) {
        console.error('Error al obtener contenido para editar:', error);
        res.status(500).send('Error interno del servidor');
    }
}

export const eliminarItemContenido = async (req, res) => {
    const { idContenido, index } = req.params;
    try {
        console.log(`Eliminando ítem en el índice ${index} del contenido con ID ${idContenido}`);
        const contenido = await contenidoService.eliminarUnItemContenido(idContenido,index);
        res.json({ success: true , contenido });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error al eliminar el ítem:" + err });
    }
};

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

