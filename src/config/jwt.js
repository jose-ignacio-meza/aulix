export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'clave-supersecreta',
  expiresIn: '10h',
};