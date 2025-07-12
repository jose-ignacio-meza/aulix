import { Router } from 'express';
import { getFormularios, crernuevoFormularioByTipo,planificacionAnual } from '../controllers/formularios.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', verificarToken, getFormularios);
router.get('/nuevo', verificarToken, crernuevoFormularioByTipo);
router.post('/planificacion-anual', verificarToken, planificacionAnual);

export {router};