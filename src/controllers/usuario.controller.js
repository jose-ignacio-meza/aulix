import {darAltaInstitucion, getInstituciones, eliminarInstitucionService, restaurarInstitucionService, editarInstitucionService } from '../services/usuario.service.js'
import Usuario from '../DAO/models/usuario.model.js';
import {obtenerAreas} from '../services/area.service.js';


export const mostrarAltaInstitucion = async (req,res) =>{
    const areas = await obtenerAreas();
    res.status(200).render('./altaInstitucion', { areas });
}

export const altaInstitucion = async (req, res) => {
  try {
    const idUsuario = req.usuario._id;
    const { nombre, cursos } = req.body;
    //console.log('Nombre:'+nombre+' cursos:'+cursos);
    // Asegurate de que `cursos` venga como array de objetos { nombre, cargo }
    const nuevaInstitucion = {
      nombre,
      cursos: cursos.map(curso => ({
        nombre: curso.nombre,
        area: curso.area,
        eliminado: false
      })),
      eliminado: false
    };

    await darAltaInstitucion(idUsuario, nuevaInstitucion);

    res.redirect('/usuario/instituciones');
  } catch (error) {
    console.error('Error en controller:', error);
    res.status(500).send('Error al guardar la institución');
  }
};


export const getAllInstituciones = async (req,res) =>{
    try{
        const id = req.usuario._id;
        const instituciones = await getInstituciones(id);
        //console.log(instituciones);
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
  const areas = await obtenerAreas();

  console.log('Áreas que llegan a la vista:', areas);
  console.log('Tipo de areas:', Array.isArray(areas));
  res.render('editarInstitucion', {
    institucion,
    idInstitucion: institucion._id,
    areas
  });
};


export const editarInstitucionController = async (req, res) => {
  try {
    const idUsuario = req.usuario._id;
    const { idInstitucion, nombre, cursos } = req.body;

    // Asegurarse de que cursos venga como objeto o array de objetos
    let cursosFinales = [];

    if (Array.isArray(cursos)) {
      // Múltiples cursos: cursos es un array de objetos
      cursosFinales = cursos.map(c => ({
        nombre: c.nombre,
        area: c.area
      }));
    } else if (cursos && typeof cursos === 'object') {
      // Solo un curso enviado
      cursosFinales = [{ nombre: cursos.nombre, area: cursos.area }];
    }

    // Validación adicional opcional
    if (!nombre || cursosFinales.some(c => !c.nombre || !c.area)) {
      throw new Error('Todos los cursos deben tener nombre y área');
    }

    await editarInstitucionService(idUsuario, idInstitucion, {
      nombre,
      cursos: cursosFinales
    });

    res.redirect('/usuario/instituciones');
  } catch (error) {
    console.error('Error en editarInstitucionController:', error);
    res.status(500).send('Error al editar institución');
  }
};
