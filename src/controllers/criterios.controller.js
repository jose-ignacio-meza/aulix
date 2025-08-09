import * as criteriosService from '../services/criterios.service.js'
import * as areaService from '../services/area.service.js';

// Función para obtener las áreas desde la base de datos
const obtenerAreas = async () => {
    try {
        return await areaService.obtenerAreas();
    } catch (error) {
        console.error('Error al obtener áreas:', error);
        throw error;
    }
};

export const getAllCriterios = async(req,res) => {
    try{
        const criterios = await criteriosService.getAllCriteriosService();
        if(criterios.lenght === 0){
            res.status(401).render('admin/listadoCriterios',{titulo:'No se encontraron criterios de evaluacion'});
        }
        const areas = await obtenerAreas();
        res.status(200).render('admin/listadoCriterios',{titulo:'Listado de Criterios de Evaluacion', criterios, areas});
    }catch(error){
        console.error('Error al traer los criterios:', error);
        res.status(500).send({message:'Error '+error});
    }
}

export const getCriterioById = async(req,res) => {
    const {id} = req.params
    try{
        const criterio = await criteriosService.getCriterioByIdService(id);
        if(!criterio){
            res.status(401).render('admin/listadoCriterios', {message:'No se encontro el criterio'})  
        }
        res.status(200).render('admin/editarCriterio', criterio)
    }catch(error){
        console.error('Error al traer el criterio:',id,' error:', error);
        res.status(500).send({message:'Error '+error});
    }
}

export const mostrarNuevoCriterio = async(req,res) => {
    try{
        const areas = await obtenerAreas();
        res.status(200).render('admin/crearCriterio',{titulo:'Crear un nuevo Criterio de Evaluacion', areas} );
    }catch(error){
        console.error('Error al mostrar crear criterio:', error);
        res.status(500).send({message:'Error '+error});
    }
}

export const nuevoCriterio = async(req,res) => {
    try{
        const { area, items } = req.body;

        // Parsear el string a array
        const itemsArray = JSON.parse(items);

        // Armar el objeto para el service
        const data = { 
            area, 
            items: itemsArray 
        };

         // Llamar al service
        const nuevoCriterio = await criteriosService.nuevoCriterioService(data);

        if(!nuevoCriterio){
            req.flash('error', 'No se pudo crear el nuevo Criterio de Evaluacion intente nuevamente');
            res.status(401).render('/admin/nuevoCriterio');
        }
        req.flash('succes','Se creo correctamente el nuevo Criterio de Evaluacion');
        res.status(200).redirect('/admin/criterios');
    }catch(error){
        console.error('Error al crear un nuevo criterio:', error);
        res.status(500).send({message:'Error '+error});
    }
}

export const mostrarEditarCriterio = async(req,res) => {
    const {id} = req.params
    try{
        const criterio = await criteriosService.getCriterioByIdService(id);
        if(!criterio){
            res.status(401).render('admin/listadoCriterios', {message:'No se encontro el Criterio de Evaluacion '})  
        }
        criterio.area._id= criterio.area._id.toString(); // Asegurarse de que el ID sea una cadena
        const areas = await obtenerAreas();
        areas.forEach(a => a._id = a._id.toString());
        res.status(200).render('admin/editarCriterio', {criterio, areas});
    }catch(error){
        console.error('Error al mostrar editar criterio:',id,' error:', error);
        res.status(500).send({message:'Error '+error});
    }
}

export const editarCriterio = async (req, res) => {
    try {
        const criterioEditado = await criteriosService.editarCriterioService(req.params.id, req.body);
        if (!criterioEditado) {
            req.flash('error', 'No se encontró el criterio para editar');
            return res.status(404).redirect('/admin/criterios');
        }
        req.flash('success', 'Criterio de Evaluacion editado');
        res.status(200).redirect('/admin/criterios');
    } catch (error) {
        console.error('Error al editar criterio:', error);
        res.status(500).send({ message: 'Error ' + error });
    }
};

export const eliminarItemCriterioController = async(req,res) => {
    const { idCriterio, index } = req.params;
    try {
        //console.log(req.params);
        //console.log(`Eliminando ítem en el índice ${index} del Criterio con ID ${idCriterio}`);
        const contenido = await criteriosService.eliminarUnItemCriterio(idCriterio,index);
        res.json({ success: true , contenido });
    } catch (error) {
        console.error('Error al eliminar item del criterio:',idCriterio,' error:', error);
        res.status(500).json({ success: false, message: "Error al eliminar el ítem:" + err });
    }
    
}

export const eliminarCriterio = async(req,res) => {
    const {id} = req.params
    try{
        const criterioEliminado = await criteriosService.eliminarCriterioService(id);
        console.log(criterioEliminado);
        if(!criterioEliminado){
            req.flash('error', 'No se encontró el criterio para eliminar');
            return res.status(404).redirect('/admin/criterios');
        }
        req.flash('success','Criterio de Evaluacion eliminado');
        res.status(200).redirect('/admin/criterios');
    }catch(error){
        console.error('Error al eliminar criterio:',id,' error:', error);
        res.status(500).send({message:'Error '+error});
    }
}