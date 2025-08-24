import mongoose from 'mongoose';

export const normalizarUsuario = (usuario) => {
  if (!usuario) return null;

  // instituciones → array
  usuario.instituciones = Array.isArray(usuario.instituciones) ? usuario.instituciones : [];

  usuario.instituciones = usuario.instituciones.map(inst => {
    // cursos → array
    inst.cursos = Array.isArray(inst.cursos) ? inst.cursos : [];

    // cada curso: aseguramos area
    inst.cursos = inst.cursos.map(curso => ({
      ...curso,
      area: curso.area && mongoose.Types.ObjectId.isValid(curso.area) ? curso.area : null
    }));

    // eliminado → aseguramos valor
    if (!('eliminado' in inst)) inst.eliminado = null;

    return inst;
  });

  // datosPersonales → opcional, aseguramos objeto
  if (!usuario.datosPersonales || typeof usuario.datosPersonales !== 'object') {
    usuario.datosPersonales = {};
  }

  return usuario;
};