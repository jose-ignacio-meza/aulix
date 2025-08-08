import * as modalidadesService  from "../services/modalidades.service.js";

export const allModalidades = async(req,res) =>{
    try{
        const modalidades = await modalidadesService.allModalidades();       
        if(modalidades.lenght === 0){
            res.render('admin/listadoModalidades', {titulo:'no se encontraron modalidades'});
        }
        res.render('admin/listadoModalidades', {titulo:'Listado de modalidades', modalidades});
    }catch{
        res.status(500).send({message:'error al traer las modalidades '+error});
    }
} 