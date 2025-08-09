import criterios from '../DAO/models/criterios.model.js'

export const getAllCriteriosDao = async () => {
    return await criterios
        .find({ eliminado: false })
        .populate('area') // trae el objeto de la colección "area"
        .lean(); // convierte todo a objetos planos para Handlebars
};

export const crearCriterioDao = async(data) =>{
    const nuevoCriterio = new criterios(data);
    return await nuevoCriterio.save();
}

export const editarCriterioDao = async(id,data) => {
    return await criterios.findByIdAndUpdate(id,data,{new:true}).lean();
}

export const deleteCriterioDao = async(id) => {
    return await criterios.findByIdAndUpdate(id,{eliminado:true}).lean();
}

export const eliminarItemDao = async(idCriterio, index) => {
    const criterionuevo = await criterios.findById(idCriterio);
    if (!criterionuevo || !criterionuevo.items || index >= criterionuevo.items.length) {
        throw new Error("Ítem no encontrado o índice inválido");
    }

    criterionuevo.items.splice(index, 1); // eliminar item
    await criterionuevo.save(); // guardar cambios
    return criterionuevo;
}

export const getCriterioByIdDao = async (id) => {
    return await criterios
        .findById(id)
        .populate('area')
        .lean();
};