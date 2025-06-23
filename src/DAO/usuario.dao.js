// DAO/usuario.dao.js
import UsuarioModel from './models/usuario.model.js';

/**
 * Crea un nuevo usuario en la base de datos utilizando el modelo UsuarioModel.
 *
 * @async
 * @function crearUsuarioDAO
 * @param {Object} datos - Objeto con los datos del usuario a crear. Debe contener las propiedades requeridas por el modelo UsuarioModel, por ejemplo:
 *   {
 *     nombre: 'Juan',
 *     email: 'juan@email.com',
 *     password: 'contraseñaSegura123'
 *     // ...otros campos según el esquema del modelo
 *   }
 * @returns {Promise<Object>} El usuario creado.
 * @throws {Error} Si ocurre un error al crear el usuario.
 *
 * @example
 * const nuevoUsuario = await crearUsuarioDAO({
 *   nombre: 'Ana',
 *   email: 'ana@email.com',
 *   password: 'miPassword123'
 * });
 */
export const crearUsuarioDAO = async (datos) => {
  try {
    console.log('llego al dao');
    const usuario = new UsuarioModel(datos);
    return await usuario.save();
  } catch (error) {
    console.error("Error creando usuario:", error);
    throw error;
  }
};

export const buscarUsuarioPorEmail = async (email) => {
  try{
    console.log("Buscando usuario con email:", email);
    return await UsuarioModel.findOne({ email });
  } catch (error) {
    console.error("Error buscando usuario por email:", error);
    throw error;
  }
};

// Más funciones como actualizar, eliminar, listar, etc.
export const actualizarUsuario = async (id, datos) => {
  try {
    return await UsuarioModel.findByIdAndUpdate(id, datos, { new: true });
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    throw error;
  }
};

export const eliminarUsuario = async (id) => {
  try {
    return await UsuarioModel.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    throw error;
  }
};

export const listarUsuarios = async () => {
  try {
    return await UsuarioModel.find();
  } catch (error) {
    console.error("Error listando usuarios:", error);
    throw error;
  }
};

export const buscarUsuarioPorId = async (id) => {
  try {
    return await UsuarioModel.findById(id);
  } catch (error) {
    console.error("Error buscando usuario por ID:", error);
    throw error;
  }
};