import Usuario from '../DAO/models/usuario.model.js';

export const getUsuarioPorId = async (id) => {
  return await Usuario.findById(id).lean();
};
