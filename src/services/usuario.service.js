import Establecimiento from '../DAO/models/establecimientos.model.js';
import Usuario from '../DAO/models/usuario.model.js';
import {crearUsuarioDAO,eliminarUsuario,darDeAltaUsuario,buscarUsuarioPorId,traerInstituciones, agregarInstitucion, eliminarInstitucionDAO,restaurarInsititucionesDao, editarInstitucionDAO} from '../DAO/usuario.dao.js'

export const getUsuarioPorId = async(id) => {
  try{
    const usuario = await buscarUsuarioPorId(id);
    return usuario; 
  }catch(error){
    throw new Error('Hubo un problema al obtener el usuario, porfavor intente mas tarde');
  }
};

export const getAllUsuarios = async()=>{
  try{
    const usuarios = await Usuario.find({ eliminado: { $eq: null } }).lean();
    const usuariosEliminados= await Usuario.find({ eliminado: { $ne: null } }).lean();
    const listaUsuarios = {usuarios, usuariosEliminados}
    return {
      listadoUsuarios: listaUsuarios,
      message: "Lista de usuarios no eliminados encontrada"
    };
  }catch(error){
    throw new Error('Hubo un problema al listar los usuarios, porfavor intente mas tarde');
  }
}

export const crearUsuario = async(datos) =>{
  try{
    //console.log('nuevo usuario: ',datos);
    const nuevoUsuario = await crearUsuarioDAO(datos);
    if(!nuevoUsuario){
      return {message:"no se pudo crear el usuario"}
    }
    return nuevoUsuario
  }catch(error){
    resizeBy.statsu(500).send({message:"error al crear usuario intentelo mas tarde"})
  }
}

export const eliminarUnUsuario = async(id)=>{
  try{
    const usuarioEliminado= await eliminarUsuario(id);
    if(!usuarioEliminado){
      return {message:"No se pudo eliminar el usuario"}
    }
    return usuarioEliminado
  }catch(error){
    res.status(500).send({message:"No se pudo eliminar le usuario intente en otro momento"})
  }
}

export const darAltaUser = async(id)=>{
  try{
    const nuevaAlta = await darDeAltaUsuario(id);
    if(!nuevaAlta){
      return {message:"error al dar de alta el usuario no se encontro"}
    }
    return nuevaAlta;
  }catch(error){
    res.status(500).send({message:"error al dar de alta el usuario, ",error});
  }
}

export const actualizarUsuario = async (id, datos) => {
  return await Usuario.findByIdAndUpdate(id, datos, { new: true });
};

//metodos para instituciones :-----------------------------------------------

export const darAltaInstitucion = async (idUsuario, institucion) => {
  const { nombre, cursos } = institucion;

  if (!nombre || !Array.isArray(cursos) || cursos.length === 0) {
    throw new Error('El nombre de la institución y al menos un curso son requeridos');
  }

  // Verificar que cada curso tenga nombre y área
  for (const curso of cursos) {
    if (!curso.nombre || !curso.area) {
      console.log('entro al error con curso', curso);
      throw new Error('Cada curso debe tener nombre y área');
    }
  }

  // Guardar en la base
  await Usuario.updateOne(
    { _id: idUsuario },
    { $push: { instituciones: institucion } }
  );
};

export const getInstituciones = async (idUsuario)=>{
  const instituciones = await traerInstituciones(idUsuario);
  return instituciones
}

export const eliminarInstitucionService = async (idUsuario, idInstitucion) => {
  return await eliminarInstitucionDAO(idUsuario, idInstitucion);
};

export const restaurarInstitucionService = async(idUsuario, idInstitucion)=> {
  return await restaurarInsititucionesDao(idUsuario, idInstitucion);
}

export const editarInstitucionService = async (idUsuario, idInstitucion, institucionData) => {
  const { nombre, cursos } = institucionData;

  if (!nombre || !Array.isArray(cursos) || cursos.length === 0) {
    throw new Error('Nombre de la institución y al menos un curso son requeridos');
  }

  for (const curso of cursos) {
    if (!curso.nombre || !curso.area) {
      throw new Error('Cada curso debe tener nombre y área');
    }
  }

  // Actualización del documento embebido
  return await Usuario.updateOne(
    { _id: idUsuario, "instituciones._id": idInstitucion },
    {
      $set: {
        "instituciones.$.nombre": nombre,
        "instituciones.$.cursos": cursos
      }
    }
  );
};