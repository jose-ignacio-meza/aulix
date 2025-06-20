import { getUsuarioPorId } from "../services/usuario.service.js";

const index = (req, res) => {
    // Renderizar la vista principal del panel de administración
    // Aquí podrías pasar datos adicionales si es necesario
    console.log('Accediendo al panel de administración');
    console.log('Usuario autenticado:', req.usuario.rol);
    if (!req.usuario || req.usuario.rol !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado' });
    }
    res.render('index', { title: 'Panel de Administración', usuario: req.usuario });
}

// Mostrar un usuario por ID
const mostrarUsuario = async (req, res) => {
    const { id } = req.params;
    const usuario = await getUsuarioPorId(id);
    if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuario);
};

// Listar todos los usuarios
const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await import("../services/usuario.service.js").then(m => m.getTodosUsuarios());
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al listar usuarios' });
    }
};

// Crear un usuario
const crearUsuario = async (req, res) => {
    try {
        const datos = req.body;
        const nuevoUsuario = await import("../services/usuario.service.js").then(m => m.crearUsuario(datos));
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario' });
    }
};

// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const eliminado = await import("../services/usuario.service.js").then(m => m.eliminarUsuario(id));
        if (!eliminado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
};

// Cambiar contraseña de un usuario
const cambiarContrasena = async (req, res) => {
    try {
        const { id } = req.params;
        const { nuevaContrasena } = req.body;
        const actualizado = await import("../services/usuario.service.js").then(m => m.cambiarContrasena(id, nuevaContrasena));
        if (!actualizado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Contraseña actualizada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al cambiar contraseña' });
    }
};

const editarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;
        const usuarioActualizado = await import("../services/usuario.service.js").then(m => m.editarUsuario(id, datosActualizados));
        if (!usuarioActualizado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ message: 'Error al editar usuario' });
    }
};



export {
    index,
    mostrarUsuario,
    listarUsuarios,
    crearUsuario,
    eliminarUsuario,
    cambiarContrasena,
    editarUsuario
};
