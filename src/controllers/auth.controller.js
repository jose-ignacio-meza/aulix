import { login } from '../services/auth.service.js';
import Usuario from '../DAO/models/usuario.model.js';
import bcrypt from 'bcrypt';

export const mostrarHomePage = async(req,res)=>{
  //Consulta a la db por las instituciones de este cliente, y a la db por los roles predefinidos cargados.
  const instituciones = [
  { nombre: "Jardin 910" },
  { nombre: "Escuela Primaria N°10" },
  { nombre: "E.E.S.T N°2" }
];

const roles = [
  { nombre: "MIT" },
  { nombre: "MI" },
  { nombre: "M" }
];
  res.render('index', {
    usuario: req.usuario,
    instituciones,
    roles,
    institucionesJson: JSON.stringify(instituciones),
    rolesJson: JSON.stringify(roles)
  });
}

export const mostrarLogin = (req, res) => {
  res.render('login');
};

export const mostrarPerfil = async (req, res) => {
  // Verificamos si el usuario está autenticado
  if (!req.usuario) {
    return res.redirect('/login');
  }
  try {
    const usuario = await Usuario.findById(req.usuario._id);
    // Convertís a objeto simple plano:
    const usuarioPlain = usuario.toObject();
    res.render('perfil', { user: usuarioPlain });
  } catch (error) {
    console.error('Error al obtener datos personales:', error);
    res.status(500).send('Error interno del servidor');
  }
};

export const procesarLogin = async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const { token, usuario } = await login(email, contraseña);

    res.cookie('token', token, { httpOnly: true });
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    if (usuario.rol === 'admin') {
      res.redirect('/admin/index'); // a la vista principal de admin
    }

    res.redirect('/index'); // a la vista principal
  } catch (error) {
    res.render('login', { error: error.message });
  }
};

export const mostrarcambiarPassword = (req, res) => {
  if (!req.usuario) {
    console.log('no enconte el usuario');
    return res.redirect('/login');
  }
  res.render('cambiar-pw');
};

export const cambiarPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.usuario._id;

  try {
    const usuario = await Usuario.findById(userId);
    if (!usuario) {
      return res.status(404).send('Usuario no encontrado');
    }
    if (!currentPassword || !newPassword) {
      return res.status(400).send('Por favor, proporciona ambas contraseñas');
    }
    // Verificar la contraseña antigua
    const isMatch = await usuario.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).send('Contraseña antigua incorrecta');
    }

    // Cambiar la contraseña
    usuario.password = await bcrypt.hash(newPassword, 10);
    // Guardar el usuario actualizado
    await usuario.save();

    res.redirect('/perfil'); // Redirigir al perfil después de cambiar la contraseña
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    res.status(500).send('Error interno del servidor');
  }
};

export const logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};
