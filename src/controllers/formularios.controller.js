import FormularioService from '../services/formularios.service.js';

const formularioService = new FormularioService();

export const getFormularios = async (req, res) => {
    try {
        const formularios = await formularioService.getAll();
        if (!formularios) {
            return res.status(404).json({ message: 'Formularios no encontrados' });
        }
        if (Array.isArray(formularios) && formularios.length === 0) {
            return res.render('formularios/index', { message: 'No se encontraron formularios' });
        }
        res.render('formularios/index', { "payload": formularios });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getFormularioById = async (req, res) => {
    try {
        console.log("Obteniendo formulario por ID:", req.params.id);
        const formulario = await formularioService.getById(req.params.id);
        console.log("Formulario encontrado:", formulario);
        if (!formulario) {
            return res.status(404).json({ message: 'Formulario no encontrado' });
        }
        res.render('formularios/verFormulario', { "payload": formulario });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const crernuevoFormularioByTipo = async (req, res) => {
    try {
        const tipoFormulario = req.query.tipo;
        console.log("Creando nuevo formulario de tipo:", tipoFormulario);
        const formulario = await formularioService.getFormularioByTipo(tipoFormulario);
        console.log("Formulario encontrado:", formulario);
        res.render('formularios/crearFormulario', { "formulario": formulario ,"tipo": tipoFormulario });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const createFormulario = async (req, res) => {
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const nuevoFormulario = await formularioService.create(req.body);
        res.status(201).json(nuevoFormulario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateFormulario = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const formularioActualizado = await formularioService.update(req.params.id, req.body);
        if (!formularioActualizado) {
            return res.status(404).json({ message: 'Formulario no encontrado' });
        }
        res.json(formularioActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteFormulario = async (req, res) => {
    try {
        const formularioEliminado = await formularioService.delete(req.params.id);
        if (!formularioEliminado) {
            return res.status(404).json({ message: 'Formulario no encontrado' });
        }
        res.json({ message: 'Formulario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//Distintos Formularios

export const planificacionAnual = async (req, res) => {
    const { datos } = req.body;
    const parsed = typeof datos === 'string' ? JSON.parse(datos) : datos;
    const perspectivas =["1","dos","3","cuatro"];
    const contenidos = ["contenido1","contenido2","contenido3"]
    res.render('formularios/formPlanificacionAnual', {
        contenidos,
        perspectivas,
        datos: parsed
    });
};