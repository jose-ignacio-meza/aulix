import { Router } from 'express';
import {soloAdmin} from '../middlewares/roles.middleware.js';
import * as adminController from '../controllers/admin.controller.js';
import * as plantillaController from '../controllers/plantillasFormularios.controller.js';

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

export {router};