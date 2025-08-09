import {getAllCriteriosDao,getCriterioByIdDao,crearCriterioDao,editarCriterioDao,deleteCriterioDao, eliminarItemDao} from '../DAO/criterios.dao.js'

export const getAllCriteriosService = async() => {
    return await getAllCriteriosDao(); 
}

export const getCriterioByIdService = async(id) => {
    return getCriterioByIdDao(id);
}

export const nuevoCriterioService = async(data) => {
    return crearCriterioDao(data);
}

export const eliminarUnItemCriterio = async (criterio, index) => {
    return await eliminarItemDao(criterio, index);
};

export const editarCriterioService = async(id,data) => {
    return await editarCriterioDao(id,data); 
}

export const eliminarCriterioService = async(id) => {
    return await deleteCriterioDao(id); 
}

