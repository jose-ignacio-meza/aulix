import perspectiva from './models/perspectiva.model.js'

export const getAllPerspectivasDao = async() =>{
    const allPerspectivas = await perspectiva.find({eliminado:false}).lean();
    return allPerspectivas;   
}