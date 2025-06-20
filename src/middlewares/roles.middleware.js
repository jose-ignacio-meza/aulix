export const soloAdmin = (req, res, next) => {
  if (req.usuario?.rol === 'admin') return next();
  return res.status(403).send('Acceso denegado');
};