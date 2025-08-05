import { crearProposito, obtenerPropositos, obtenerPropositoPorId, actualizarProposito, eliminarProposito, eliminarItemProposito } from '../services/proposito.service.js';
import { obtenerAreas } from '../services/area.service.js';

export const listarPropositosController = async (req, res) => {
    try {
        const propositos = await obtenerPropositos();
        const areas = await obtenerAreas();
        if (!propositos || propositos.length === 0) {
            return res.render('admin/listadoPropositos', { title: 'No se encontraron propósitos', areas });
        }
        res.render('admin/listadoPropositos', { title: 'Lista de Propósitos', propositos, areas });
    } catch (error) {
        console.error('Error al listar propósitos:', error);
        res.status(500).json({ message: 'Error al listar propósitos' });
    }
};

export const mostrarCrearProposito = async (req, res) => {
    try {
        const areas = await obtenerAreas();
        res.render('admin/crearProposito', { title: 'Crear Propósito', areas });
    } catch (error) {
        console.error('Error al obtener áreas:', error);
        return res.status(500).json({ message: 'Error al obtener áreas' });
    }
};

export const nuevoPropositoController = async (req, res) => {
    try {
        const data = req.body;

        if (typeof data.items === 'string') {
            try {
                data.items = JSON.parse(data.items);
            } catch (err) {
                return res.status(400).json({ message: 'Formato de ítems inválido' });
            }
        }

        // Validar que se haya seleccionado un área
        if (!data.area) {
            return res.status(400).json({ message: 'El área es requerida' });
        }
        // Validar que se haya ingresado un título
        if (!data.titulo || data.titulo.trim() === '') {
            return res.status(400).json({ message: 'El título es requerido' });
        }
        // Validar que se hayan ingresado ítems
        if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
            return res.status(400).json({ message: 'Debe agregar al menos un ítem al propósito' });
        }
        // Crear el nuevo propósito
        data.items = data.items.filter(item => item.trim() !== ''); // Filtrar ítems vacíos
        if (data.items.length === 0) {
            return res.status(400).json({ message: 'Debe agregar al menos un ítem al propósito' });
        }

        const nuevoProposito = await crearProposito(data);
        if (!nuevoProposito) {
            return res.status(400).json({ message: 'Error al crear propósito' });
        }
        req.flash('success', 'Propósito creado exitosamente');
        return listarPropositosController(req, res); // Redirigir a la vista de creación de propósito
    } catch (error) {
        console.error('Error al crear propósito:', error);
        res.status(500).json({ message: 'Error al crear propósito' });
    }
};

export const obtenerPropositoPorIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const proposito = await obtenerPropositoPorId(id);
        if (!proposito) {
            return res.status(404).json({ message: 'Propósito no encontrado' });
        }
        res.status(200).json(proposito);
    } catch (error) {
        console.error('Error al obtener propósito por ID:', error);
        res.status(500).json({ message: 'Error al obtener propósito por ID' });
    }
};

export const mostrarEditarProposito = async (req, res) => {
    try {
        const { id } = req.params;
        const proposito = await obtenerPropositoPorId(id);
        if (!proposito) {
            return res.status(404).json({ message: 'Propósito no encontrado' });
        }
        const areas = await obtenerAreas();
        areas.forEach(a => a._id = a._id.toString());
        proposito.area._id = proposito.area._id.toString(); // Asegurarse de que el ID sea una cadena
        res.render('admin/editarProposito', { title: 'Editar Propósito', proposito, areas });
    } catch (error) {
        console.error('Error al mostrar editar propósito:', error);
        res.status(500).json({ message: 'Error al mostrar editar propósito' });
    }
}

export const actualizarPropositoController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const propositoActualizado = await actualizarProposito(id, data);
        if (!propositoActualizado) {
             req.flash('error', 'Propósito no encontrado');
            return listarPropositosController(req, res); // Redirigir a la vista de listado de propósitos
        }
        req.flash('success', 'Propósito actualizado exitosamente');
        return listarPropositosController(req, res); // Redirigir a la vista de listado de propósitos
    } catch (error) {
        console.error('Error al actualizar propósito:', error);
        res.status(500).json({ message: 'Error al actualizar propósito' });
    }
};

export const eliminarPropositoController = async (req, res) => {
    try {
        const { id } = req.params;
        const propositoEliminado = await eliminarProposito(id);
        if (!propositoEliminado) {
            req.flash('error', { message: 'Propósito no encontrado' });
            return listarPropositosController(req, res); // Redirigir a la vista de listado de propósitos
        }
        req.flash('success', { message: 'Propósito eliminado' });
        return listarPropositosController(req, res); // Redirigir a la vista de listado de propósitos
    } catch (error) {
        console.error('Error al eliminar propósito:', error);
        res.status(500).json({ message: 'Error al eliminar propósito' });
    }
};

export const eliminarItemPropositoController = async (req, res) => {
    try {
        const { idProposito, index } = req.params;
        const propositoActualizado = await eliminarItemProposito(idProposito, parseInt(index));
        res.json({ success: true ,propositoActualizado });
    } catch (error) {
        console.error('Error al eliminar ítem del propósito:', error);
        res.status(500).json({ message: 'Error al eliminar ítem del propósito' });
    }
};

