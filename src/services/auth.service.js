import * as usuarioDAO from '../DAO/usuario.dao.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt.js';

export const login = async (email, contraseña) => {
  const usuario = await usuarioDAO.buscarUsuarioPorEmail(email);
  if (!usuario) throw new Error('Usuario no encontrado');
  
  console.log('Hash almacenado:', usuario.password);
  const esValido = await bcrypt.compare(contraseña, usuario.password);
  if (!esValido) throw new Error('Contraseña incorrecta');

  const payload = {
    id: usuario._id,
    rol: usuario.rol,
    nombre: usuario.nombre,
    email: usuario.email
  };

  const token = jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

  return { token, usuario: payload };
};
