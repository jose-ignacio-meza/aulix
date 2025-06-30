import express from 'express';
import { verificarToken } from '../middlewares/auth.middleware.js';
import {mostrarHomePage, mostrarLogin, mostrarPerfil, procesarLogin, mostrarcambiarPassword, cambiarPassword, logout } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/login', mostrarLogin);
router.post('/login', procesarLogin);
router.get('/index',verificarToken,mostrarHomePage)
router.get('/perfil', verificarToken, mostrarPerfil);
router.get('/cambiar-pw', verificarToken, mostrarcambiarPassword);
router.post('/cambiar-pw', verificarToken, cambiarPassword);
router.get('/logout', logout);

export default router;
