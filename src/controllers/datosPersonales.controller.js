import Usuario from '../DAO/models/usuario.model.js';

export const mostrarFormularioDatos = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario._id);
    // Convertís a objeto simple plano:
    const usuarioPlain = usuario.toObject();
    if (usuarioPlain.datosPersonales && usuarioPlain.datosPersonales.fechaNacimiento) {
      const fecha = new Date(usuarioPlain.datosPersonales.fechaNacimiento);
      const dia = String(fecha.getDate()).padStart(2, '0');
      const mes = String(fecha.getMonth() + 1).padStart(2, '0');
      const anio = fecha.getFullYear();
      usuarioPlain.datosPersonales.fechaNacimiento = `${anio}-${mes}-${dia}`;
    }
    //console.log('Usuario encontrado:', usuarioPlain);
    res.render('datos-personales', { usuario: usuarioPlain });
  } catch (error) {
    console.error('Error al obtener datos personales:', error);
    res.status(500).send('Error interno del servidor');
  }
};

export const guardarDatosPersonales = async (req, res) => {
  if (!req.usuario) {
    return res.status(401).send('Usuario no autenticado');
  }
  try {
    const usuario = await Usuario.findById(req.usuario._id); // viene del middleware verificarToken
    if (!usuario) {
      return res.status(404).send('Usuario no encontrado');
    }
    usuario.datosPersonales = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      dni: req.body.dni,
      telefono: req.body.telefono,
      domicilio: req.body.domicilio,
      fechaNacimiento: req.body.fechaNacimiento,
      genero: req.body.genero,
      cargo: req.body.cargo,
      titulo: req.body.titulo
    };

    await usuario.save();
    const datosGuardados = await Usuario.findById(req.usuario._id);
    //console.log('Datos personales guardados:', datosGuardados.datosPersonales);
    res.redirect('/perfil'); // o donde lo necesites
  } catch (error) {
    console.error('Error al guardar datos personales:', error);
    res.status(500).send('Error interno del servidor');
  }
};
