import { getAllPerspectivasDao } from "../DAO/perspectiva.dao.js";

 export const getAllPerspectivas = async()=>{
    try{
        const perspectivas = await getAllPerspectivasDao();
        return perspectivas;
    }catch(error){
        res.status(500).send({message:'error al traer las perspectivas '+error});
    }
 }