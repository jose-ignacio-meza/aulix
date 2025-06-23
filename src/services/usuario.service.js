import Usuario from '../DAO/models/usuario.model.js';
import {crearUsuarioDAO,eliminarUsuario} from '../DAO/usuario.dao.js'

export const getUsuarioPorId = async (id) => {
  return await Usuario.findById(id).lean();
};

export const getAllUsuarios = async()=>{
  try{
    const listaUsuarios = await Usuario.find().lean();
    return { listadoUsuarios: listaUsuarios, message: "Lista de usuarios encontrada" };
  }catch(error){
    throw new Error('Hubo un problema al listar los usuarios, porfavor intente mas tarde');
  }
}

export const crearUsuario = async(datos) =>{
  try{
    
    console.log('nuevo usuario: ',datos);
    const nuevoUsuario = await crearUsuarioDAO(datos);
    if(!nuevoUsuario){
      return {message:"no se pudo crear el usuario"}
    }
    return nuevoUsuario
  }catch(error){
    resizeBy.statsu(500).send({message:"error al crear usuario intentelo mas tarde"})
  }
}

export const eliminarUnUsuario = async(req,res)=>{
  const {id} = req.body
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
