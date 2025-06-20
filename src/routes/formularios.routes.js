import { Router } from 'express';
import { getFormularios, crernuevoFormularioByTipo } from '../controllers/formularios.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', verificarToken, getFormularios);
router.get('/nuevo', verificarToken, crernuevoFormularioByTipo);


export {router};