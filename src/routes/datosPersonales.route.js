import { Router } from 'express';
import {
  mostrarFormularioDatos,
  guardarDatosPersonales
} from '../controllers/datosPersonales.controller.js';

const router = Router();

router.get('/', mostrarFormularioDatos);
router.post('/guardar', guardarDatosPersonales);

export { router };