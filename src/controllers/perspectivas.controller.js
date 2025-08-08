import * as perspectivaService from '../services/perspectivas.service.js'

export const allPerspectivas = async(req,res) =>{
    try{
        const perspectivas = await perspectivaService.getAllPerspectivas();
        if(perspectivas.lenght === 0 ){
            res.status(401).render('admin/listadoPerspectivas', {titulo:'No se encontraron perspectivas'}); 
        }
        res.status(200).render('admin/listadoPerspectivas', {titulo:'Listado de perspectivas', perspectivas});
    }
    catch(error){
        res.status(500).send({message:'error al conectar con la DB '+error});
    }
}