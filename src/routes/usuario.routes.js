import Router from 'express'
import * as usuarioController from '../controllers/usuario.controller.js'

const router = Router();

//Rutas para instituciones.---------------------------------------------------------
router.get('/instituciones', usuarioController.getAllInstituciones);
router.get('/altaInstitucion', usuarioController.mostrarAltaInstitucion);
router.post('/agregarInstitucion',usuarioController.altaInstitucion);
router.post('/eliminarInstitucion', usuarioController.eliminarInstitucion);
router.post('/restaurarInstitucion', usuarioController.restaurarInstitucion);
router.get('/editarInstitucion', usuarioController.vistaEditarInstitucionController); // mostrar el formulario
router.post('/editarInstitucion', usuarioController.editarInstitucionController);     // guardar cambios

export {router};