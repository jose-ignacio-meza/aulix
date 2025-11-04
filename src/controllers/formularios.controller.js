import FormularioService from '../services/formularios.service.js';
import * as perspectivasService from '../services/perspectivas.service.js';
import * as contenidosService from '../services/contenido.service.js';
import * as propositosService from '../services/proposito.service.js';
import * as criteriosService from '../services/criterios.service.js';
import * as actividadesService from '../services/actividades.service.js';
import * as modalidadesService from '../services/modalidades.service.js';
import * as areasService from '../services/area.service.js';

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
        console.error('Error al obtener los formularios, error: ',error);
        res.status(500).json({ error: error.message });
    }
};

export const getFormularioById = async (req, res) => {
    try {
        //console.log("Obteniendo formulario por ID:", req.params.id);
        const formulario = await formularioService.getById(req.params.id);
        //console.log("Formulario encontrado:", formulario);
        if (!formulario) {
            return res.status(404).json({ message: 'Formulario no encontrado' });
        }
        res.render('formularios/verFormulario', { "payload": formulario });
    } catch (error) {
        console.error('Error al obtener el formulario con el id: ',req.params.id,' error:',error);
        res.status(500).json({ error: error.message });
    }
};
export const crernuevoFormularioByTipo = async (req, res) => {
    try {
        const tipoFormulario = req.query.tipo;
        //console.log("Creando nuevo formulario de tipo:", tipoFormulario);
        const formulario = await formularioService.getFormularioByTipo(tipoFormulario);
        //console.log("Formulario encontrado:", formulario);
        res.render('formularios/crearFormulario', { "formulario": formulario ,"tipo": tipoFormulario });
    } catch (error) {
        console.error('Error al crear un nuevo formulario con el id: ',tipoFormulario,' error:',error);
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
        console.error('Error al crear un formulario, error:',error);
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
        console.error('Error al editar el formulario: ',req.params.id,', error:',error);
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
        console.error('Error al aliminar el formulario: ',req.params.id,', error:',error);
        res.status(500).json({ error: error.message });
    }
};


//Distintos Formularios

export const planificacionAnual = async (req, res) => {
    let { datos } = req.body;

    // Parsear si viene como string
    if (typeof datos === 'string') {
        datos = JSON.parse(datos);
    }
    console.log(datos)
    const instituciones = req.usuario.instituciones;
    const institucionesParsed = await Promise.all(
        req.usuario.instituciones.map(async i => ({
            ...i,
            _id: i._id.toString(),
            cursos: await Promise.all(i.cursos.map(async c => ({
                ...c,
                area: await areasService.obtenerAreaPorId(c.area), // Simula populate manualmente
                _id: c._id.toString()
            })))
        }))
    );

    institucionesParsed.forEach(inst => {
        // Mostrar cursos de forma legible
        console.log('Institución:', inst.nombre || inst._id);
        console.log('Cursos:', JSON.stringify(inst.cursos, null, 2));
    });
    const perspectivas = await perspectivasService.getAllPerspectivas();
    const contenidos = await contenidosService.obtenerContenido();
    const criterios = await criteriosService.getAllCriteriosService();
    const actividades = await actividadesService.obtenerTodasLasActividades();
    const modalidades= await modalidadesService.allModalidades();
    const propositos = await propositosService.obtenerPropositos();

    // Si modalidades es un string, lo parsea a objeto; si ya es objeto, lo deja igual
    let modalidadesParsed;
    if (typeof modalidades === 'string') {
        modalidadesParsed = JSON.parse(modalidades);
    } else {
        modalidadesParsed = modalidades;
    }
    res.render('formularios/formPlanificacionAnual', {
        instituciones: institucionesParsed,
        contenidos,
        modalidades: modalidadesParsed,
        perspectivas,
        criterios,
        actividades,
        propositos,
        datos,
        datosDebug: JSON.stringify({contenidos, perspectivas, criterios,modalidadesParsed}, null, 2)
    });
};