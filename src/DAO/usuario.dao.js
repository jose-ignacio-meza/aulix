// DAO/usuario.dao.js
import UsuarioModel from './models/usuario.model.js';


export const crearUsuarioDAO = async (datos) => {
  try {
    const usuario = new UsuarioModel(datos);
    return await usuario.save();
  } catch (error) {
    console.error("Error creando usuario:", error);
    throw error;
  }
};

export const buscarUsuarioPorEmail = async (email) => {
  try{
    //console.log("Buscando usuario con email:", email);
    return await UsuarioModel.findOne({ email });
  } catch (error) {
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
    const resultado = await UsuarioModel.findByIdAndUpdate(id,{ eliminado: new Date() },{ new: true });
    if(!resultado){
      //console.log('no hay usuario con es id');
      return {errorMessage:"fallo la consulta y no se encontro el usuario"};
    }
    //console.log("usuario encontrado: ", resultado);
    return resultado 
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
    return await UsuarioModel.findById(id).lean();
  } catch (error) {
    console.error("Error buscando usuario por ID:", error);
    throw error;
  }
};

export const darDeAltaUsuario = async(id)=>{
  try{
    return await UsuarioModel.findByIdAndUpdate(id,{ eliminado: null },{ new: true });
  }catch(error){
    throw error;
  }
}

//metodos para instituciones-------------------
export const traerInstituciones = async(idUsuario) => {
  const result =  await UsuarioModel.findById(idUsuario, 'instituciones').lean();
 return result;
}

export const agregarInstitucion = async (idUsuario,institucion) => {
   return await UsuarioModel.findByIdAndUpdate(
    idUsuario,
    { $push: { instituciones: institucion } },
    { new: true }
  ).lean();
};

export const eliminarInstitucionDAO = async (idUsuario, idInstitucion) => {
  const usuario = await UsuarioModel.findById(idUsuario);

  if (!usuario) throw new Error('Usuario no encontrado');

  const institucion = usuario.instituciones.id(idInstitucion);

  if (!institucion) throw new Error('Institución no encontrada');

  institucion.eliminado = true;
  await usuario.save();
};

export const restaurarInsititucionesDao = async (idUsuario, idInstitucion) => {
   const usuario = await UsuarioModel.findById(idUsuario);

    if (!usuario) throw new Error('Usuario no encontrado');

    const institucion = usuario.instituciones.id(idInstitucion);

    if (!institucion) throw new Error('Institución no encontrada');

    institucion.eliminado = null;
    await usuario.save();
}

export const editarInstitucionDAO = async (idUsuario, idInstitucion, datos) => {
  const usuario = await UsuarioModel.findById(idUsuario);

  if (!usuario) throw new Error('Usuario no encontrado');

  const institucion = usuario.instituciones.id(idInstitucion);

  if (!institucion) throw new Error('Institución no encontrada');

  institucion.nombre = datos.nombre;
  institucion.cargo = datos.cargo;
  institucion.cursos = datos.cursos;

  await usuario.save();

  return institucion;
};