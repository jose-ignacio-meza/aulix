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
router.put('/usuarios/:id', soloAdmin, adminController.editarUsuario);
router.get('/crearPlantilla', soloAdmin, plantillaController.mostrarCrearPlantilla);
router.post('/guardarPlantilla', soloAdmin, plantillaController.guardarPlantilla);
router.get('/plantillas/:tipo', soloAdmin, plantillaController.obtenerPlantilla);
router.get('/plantillas', soloAdmin, plantillaController.obtenerTodasLasPlantillas);
router.put('/plantillas/:id', soloAdmin, plantillaController.actualizarPlantilla);
router.delete('/plantillas/:id', soloAdmin, plantillaController.eliminarPlantilla);

export {router};