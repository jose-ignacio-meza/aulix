import express from 'express';
import { verificarToken } from '../middlewares/auth.middleware.js';
import { mostrarLogin, mostrarPerfil, procesarLogin, mostrarcambiarPassword, cambiarPassword, logout } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/login', mostrarLogin);
router.get('/perfil', verificarToken, mostrarPerfil);
router.post('/login', procesarLogin);
router.get('/cambiar-pw', verificarToken, mostrarcambiarPassword);
router.post('/cambiar-pw', verificarToken, cambiarPassword);
router.get('/logout', logout);

export default router;
