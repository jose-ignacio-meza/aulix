import Usuario from '../DAO/usuario.dao.js';

export const getUsuarioPorId = async (id) => {
  return await Usuario.findById(id).lean();
};

export const getUsuarios = async () => {
  return await Usuario.find().lean();
};

export const crearUsuario = async (usuarioData) => {
    const nuevoUsuario = new Usuario(usuarioData);
    return await nuevoUsuario.save();
};

export const eliminarUnUsuario = async (id)=>{
  const usuarioEliminado = await Usuario.eliminarUsuario(id);
  return usuarioEliminado;
}
