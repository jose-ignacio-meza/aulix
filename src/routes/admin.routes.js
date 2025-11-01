import { Router } from 'express';
import {soloAdmin} from '../middlewares/roles.middleware.js';
import * as adminController from '../controllers/admin.controller.js';
import * as plantillaController from '../controllers/plantillasFormularios.controller.js';
import * as contenidoController from '../controllers/contenido.controller.js';
import * as areaController from '../controllers/area.controller.js';
import * as propositoController from '../controllers/proposito.controller.js';
import * as modalidadesController from '../controllers/modalidades.controller.js';
import * as perspectivasController from '../controllers/perspectivas.controller.js';
import * as criteriosController from '../controllers/criterios.controller.js';
import * as actividadesController from '../controllers/actividades.controller.js';

const router = Router();

// Rutas protegidas por el middleware soloAdmin
router.get('/index', soloAdmin, adminController.index);
router.get('/usuarios', soloAdmin, adminController.listarUsuarios);
router.get('/crearUsuario', soloAdmin, adminController.mostrarCrearUsuario);
router.post('/crearUsuario', soloAdmin, adminController.crearUnUsuario);
router.post('/eliminarUsuario', soloAdmin, adminController.eliminarUsuario)
router.post('/darDeAltaUsuario', soloAdmin, adminController.darDeAltaUsuario)
router.get('/editarUsuario', soloAdmin , adminController.mostrarEditarUsuario);
router.post('/editarUsuario', soloAdmin, adminController.editarUsuario);

// Rutas para platnillas
router.get('/crearPlantilla', soloAdmin, plantillaController.mostrarCrearPlantilla);
router.post('/guardarPlantilla', soloAdmin, plantillaController.guardarPlantilla);
router.get('/editarPlantilla/:id', soloAdmin, plantillaController.obtenerPlantilla);
router.get('/plantillas', soloAdmin, plantillaController.obtenerTodasLasPlantillas);
router.post('/actualizarPlantilla/:id', soloAdmin, plantillaController.actualizarPlantilla);
router.get('/eliminarPlantilla/:id', soloAdmin, plantillaController.eliminarPlantilla);
router.get('/restaurarPlantilla/:id', soloAdmin, plantillaController.restaurarPlantilla)

//Rutas para Contenido
router.get('/listaContenido', soloAdmin, contenidoController.listarContenido);
router.get('/crearContenido', soloAdmin, contenidoController.mostrarCrearContenido);
router.post('/crearContenido', soloAdmin, contenidoController.crearContenido);
router.get('/editarContenido/:id', soloAdmin, contenidoController.mostrarEditarContenido);
router.post('/editarContenido/:id', soloAdmin, contenidoController.editarContenido);
router.post('/eliminarContenido/:id', soloAdmin, contenidoController.eliminarContenido);
router.delete('/contenidos/eliminar-item/:idContenido/:index', soloAdmin, contenidoController.eliminarItemContenido);

//Rutas para areas
router.get('/areas', soloAdmin, areaController.listarAreas);
router.get('/nuevaArea', soloAdmin, areaController.mostrarNuevaArea);
router.post('/nuevaArea', soloAdmin, areaController.nuevaArea);
router.get('/editarArea/:id', soloAdmin, areaController.mostrarEditarArea);
router.post('/editarArea/:id', soloAdmin, areaController.editarArea);
router.post('/eliminarArea/:id', soloAdmin, areaController.eliminarArea);


// Rutas para propósitos
router.get('/propositos', soloAdmin, propositoController.listarPropositosController);
router.get('/propositos/:id', soloAdmin, propositoController.obtenerPropositoPorIdController);
router.get('/editarProposito/:id', soloAdmin, propositoController.mostrarEditarProposito);
router.get('/crearProposito', soloAdmin, propositoController.mostrarCrearProposito);
router.post('/propositos', soloAdmin, propositoController.nuevoPropositoController);
router.post('/editarPropositos/:id', soloAdmin, propositoController.actualizarPropositoController);
router.post('/eliminarPropositos/:id', soloAdmin, propositoController.eliminarPropositoController);
router.delete('/propositos/eliminar-item/:idProposito/:index', soloAdmin, propositoController.eliminarItemPropositoController);

//Rutas para Criterios
router.get('/criterios', soloAdmin, criteriosController.getAllCriterios);
router.get('/crearCriterio', soloAdmin, criteriosController.mostrarNuevoCriterio);
router.get('/editarCriterio/:id', soloAdmin, criteriosController.mostrarEditarCriterio);
router.post('/criterios', soloAdmin, criteriosController.nuevoCriterio);
router.post('/editarCriterio/:id', soloAdmin, criteriosController.editarCriterio);
router.post('/eliminarCriterio/:id', soloAdmin, criteriosController.eliminarCriterio);
router.delete('/criterio/eliminar-item/:idCriterio/:index', soloAdmin, criteriosController.eliminarItemCriterioController);

//Rutas para Actividades
router.get('/actividades', soloAdmin, actividadesController.listarActividades);
router.get('/crearActividades', soloAdmin, actividadesController.mostrarCrearActividad);
router.get('/actividades/:id/editar', soloAdmin, actividadesController.mostrarEditarActividad);
router.post('/actividades', soloAdmin, actividadesController.crearActividadController);
router.post('/editarActividades/:id', soloAdmin, actividadesController.editarActividadController);
router.post('/eliminarActividades/:id', soloAdmin, actividadesController.eliminarActividadController);



//Rutas para ver modalidades
router.get('/modalidades', soloAdmin, modalidadesController.allModalidades);

//Rutas para ver modalidades
router.get('/perspectivas', soloAdmin, perspectivasController.allPerspectivas);

export {router};