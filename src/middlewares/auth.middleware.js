import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt.js';
import { getUsuarioPorId } from '../services/usuario.service.js';


export const verificarToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.redirect('/login');

  try {
    const payload = jwt.verify(token, jwtConfig.secret);
    const usuario = await getUsuarioPorId(payload.id);
    req.usuario = usuario;
    res.locals.usuario = usuario;
    next();
  } catch {
    return res.redirect('/login');
  }
};
