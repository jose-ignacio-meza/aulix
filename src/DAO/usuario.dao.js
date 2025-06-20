// DAO/usuario.dao.js
import UsuarioModel from './models/usuario.model.js';

export const crearUsuario = async (datos) => {
  try {
    return await UsuarioModel.create(datos);
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