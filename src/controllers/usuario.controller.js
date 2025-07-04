import {darAltaInstitucion, getInstituciones, eliminarInstitucionService, restaurarInstitucionService, editarInstitucionService } from '../services/usuario.service.js'
import Usuario from '../DAO/models/usuario.model.js';


export const mostrarAltaInstitucion = (req,res) =>{
    res.status(200).render('./altaInstitucion');
}

export const altaInstitucion = async (req,res) => {
    try {
        const idUsuario = req.usuario._id; // O como tengas guardado el ID en sesión
        const { nombre, cargo, cursos } = req.body;

        await darAltaInstitucion(idUsuario, { nombre, cargo, cursos });

        res.redirect('/usuario/establecimientos'); // redirigí a la vista que corresponda
    } catch (error) {
        console.error('Error en controller:', error);
        res.status(500).send('Error al guardar la institución');
    }
}

export const getAllInstituciones = async (req,res) =>{
    try{
        const id = req.usuario._id;
        const instituciones = await getInstituciones(id);
        console.log(instituciones);
        // Filtrar activas y eliminadas
        const institucionesActivas = instituciones.instituciones.filter(inst => !inst.eliminado);
        const institucionesEliminadas = instituciones.instituciones.filter(inst => inst.eliminado);

        // Podés usar institucionesActivas para seguir filtrando por nombre, curso, etc.

        res.render('listadoInstituciones', {
        instituciones: institucionesActivas,
        institucionesEliminadas
        });
    }catch(error){
        res.status(500).send('error :'+error);
    }
}

export const eliminarInstitucion = async (req, res) => {
  try {
    const { idInstitucion } = req.body;
    const idUsuario = req.usuario._id;

    await eliminarInstitucionService(idUsuario, idInstitucion);
    res.redirect('/usuario/instituciones');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar institución');
  }
};

export const restaurarInstitucion = async (req,res) => {
    try{
        const { idInstitucion } = req.body;
        const idUsuario = req.usuario._id;
        await restaurarInstitucionService(idUsuario, idInstitucion);
        res.redirect('/usuario/instituciones'); 
    }catch(error){
       res.status(500).send('Error al restaurar la institución '+error);  
    }
}


export const vistaEditarInstitucionController = async (req, res) => {
  const { idInstitucion } = req.query; // este es el _id de la institución
  const usuario = await Usuario.findById(req.usuario._id).lean();

  const institucion = usuario.instituciones.find(i => i._id.toString() === idInstitucion);

  if (!institucion) return res.status(404).send('Institución no encontrada');

  res.render('editarInstitucion', {
    institucion,
    idInstitucion: institucion._id
  });
};


export const editarInstitucionController = async (req, res) => {
  try {
    const idUsuario = req.usuario._id;
    const { idInstitucion, nombre, cargo, cursos } = req.body;

    await editarInstitucionService(idUsuario, idInstitucion, {
      nombre,
      cargo,
      cursos: Array.isArray(cursos) ? cursos : [cursos]
    });

    res.redirect('/usuario/instituciones');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al editar institución');
  }
};