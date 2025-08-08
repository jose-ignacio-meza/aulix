import modalidades from './models/modalidades.model.js'

export const getAllModalidadesDao = async() =>{
    const allModalidades = await modalidades.find({eliminado:false}).lean();
    return allModalidades;   
}