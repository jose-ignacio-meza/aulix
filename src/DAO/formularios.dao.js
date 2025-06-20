import Formulario from './models/formularios.model.js';

// Crear un nuevo formulario
export const crearFormulario = async (data) => {
    const formulario = new Formulario(data);
    return await formulario.save();
};

// Obtener todos los formularios
export const obtenerFormularios = async () => {
    return await Formulario.find();
};

// Obtener un formulario por ID
export const obtenerFormularioPorId = async (id) => {
    return await Formulario.findById(id);
};

// Actualizar un formulario por ID
export const actualizarFormulario = async (id, data) => {
    return await Formulario.findByIdAndUpdate(id, data, { new: true });
};

// Eliminar un formulario por ID
export const eliminarFormulario = async (id) => {
    return await Formulario.findByIdAndDelete(id);
};