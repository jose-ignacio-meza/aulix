import {
    crear,
    obtenerTodos,
    obtenerPlantillaPorId,
    actualizar,
    eliminar,
    findEliminadas,
    restaurar
} from '../DAO/plantillasFormularios.dao.js';

/**
 * Servicio para gestionar plantillas de formularios usando funciones DAO.
 */

export const validarDatosPlantilla = (datos) => {
    console.log('validarDatosPlantilla llamada');
    if (!datos.tipo || !datos.Preguntas) {
        console.log('error 1')
        throw new Error('Los datos de la plantilla deben contener un tipo y preguntas.');
    }
    if (typeof datos.Preguntas !== 'object' || Array.isArray(datos.Preguntas)) {
        console.log('error 2')
        throw new Error('Preguntas debe ser un objeto.');
    }
    for (const key in datos.Preguntas) {
        const pregunta = datos.Preguntas[key];
        if (
            !pregunta.id ||
            !pregunta.name ||
            !pregunta.type ||
            !pregunta.label ||
            !pregunta.placeholder
        ) {
            console.log('error 3')
            throw new Error(`La pregunta con clave ${key} no tiene todos los campos requeridos.`);
        }
    }
};

export const crearPlantilla = async (datos) => {
    try{
        console.log('estoy aca ', datos);
        validarDatosPlantilla(datos);
        console.log('paso la validacion')
        return await crear(datos);
    }catch(error){
        return error
    }
};

export const obtenerPlantilla = async (id) => {
    return await obtenerPlantillaPorId(id);
};

export const obtenerTodasLasPlantillas = async () => {
    const plantillas =await obtenerTodos();
    const plantillasEliminadas= await findEliminadas();
    return {plantillas,plantillasEliminadas}
};

export const actualizarPlantilla = async (id, nuevosDatos) => {
    return await actualizar(id, nuevosDatos);
};

export const eliminarPlantilla = async (id) => {
    return await eliminar(id);
};

export const restaurarPlantilla = async (id) => {
    return await restaurar(id);
}
