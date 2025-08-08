import { getAllModalidadesDao } from "../DAO/modalidades.dao.js";

 export const allModalidades = async()=>{
    try{
        const modalidades = await getAllModalidadesDao();
        return modalidades;
    }catch(error){
        return error;
    }
 }