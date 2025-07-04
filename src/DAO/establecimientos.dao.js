// src/DAO/establecimientoDAO.js
import Establecimiento from './models/establecimiento.model.js';

const crearEstablecimiento = async (data) => {
  const nuevo = new Establecimiento(data);
  return await nuevo.save();
};

const obtenerTodos = async () => {
  return await Establecimiento.find().lean();
};

export default {
  crearEstablecimiento,
  obtenerTodos
};