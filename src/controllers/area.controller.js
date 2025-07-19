import * as areaService from '../services/area.service.js';

export const mostrarNuevaArea = (req, res) => {
    
    res.render('admin/crearArea');
}

export const nuevaArea = async (req, res) => {
    try {
        const data = req.body;
        const areaExistente = await areaService.obtenerAreaPorNombre(data.nombre);
        if (areaExistente) {
            return res.status(400).render('admin/crearArea', { message: 'El área ya existe' });
        }
        const areaCreada = await areaService.crearArea(data);
        if (!areaCreada) {
            return res.status(400).render('admin/crearArea', { message: 'Error al crear el área' });
        }
        // Redirigir a la lista de áreas o mostrar un mensaje de éxito
        res.status(201).redirect('/admin/areas');
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el área', error });
    }
}

export const listarAreas = async (req, res) => {
    try {
        const areas = await areaService.obtenerAreas();
        const message = areas.length > 0 ? 'Áreas encontradas' : 'No se encontraron áreas';
        // Renderizar la vista con las áreas obtenidas
        res.status(200).render('admin/listadoAreas', { areas, message });
    } catch (error) {
        res.status(500).json({ message: 'Error al listar áreas', error });
    }
}

export const obtenerAreaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const area = await areaService.obtenerAreaPorId(id);
        if (!area) {
            return res.status(404).json({ message: 'Área no encontrada' });
        }
        res.status(200).json(area);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el área', error });
    }
}

export const mostrarEditarArea = async (req, res) => {
    try {
        const { id } = req.params;
        const area = await areaService.obtenerAreaPorId(id);
        if (!area) {
            return res.status(404).json({ message: 'Área no encontrada' });
        }
        res.render('admin/editarArea', { area });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el área para editar', error });
    }
}

export const editarArea = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const areaActualizada = await areaService.actualizarArea(id, data);
        if (!areaActualizada) {
            return res.status(404).json({ message: 'Área no encontrada' });
        }
        res.status(200).redirect('/admin/areas');
    } catch (error) {
        res.status(500).json({ message: 'Error al editar el área', error });
    }
}

export const eliminarArea = async (req, res) => {
    try {
        const { id } = req.params;
        const areaEliminada = await areaService.eliminarArea(id);
        if (!areaEliminada) {
            return res.status(404).redirect('/admin/areas', { message: 'Área no encontrada' });
        }
        res.status(200).redirect('/admin/areas');
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el área', error });
    }
}

