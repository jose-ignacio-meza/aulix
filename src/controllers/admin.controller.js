import Usuario from "../DAO/models/usuario.model.js";
import { getUsuarioPorId,getAllUsuarios, crearUsuario,eliminarUnUsuario, darAltaUser, actualizarUsuario } from "../services/usuario.service.js";
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';


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


// Listar todos los usuarios
const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await getAllUsuarios();
        res.status(200).render('admin/listadoUsuarios', { usuarios:usuarios.listadoUsuarios, message:usuarios.message });
    } catch (error) {
        res.status(500).json({ message: 'Error al listar usuariosss' });
    }
};
const mostrarCrearUsuario = async( req,res)=>{
    try{
        res.status(200).render('admin/crearUsuario');
    }catch(error){
        res.status(500).send({message:error})
    }
}

// Crear un usuario
const crearUnUsuario = async (req, res) => {
    try {
        const {nombre,email,password} = req.body;
        const datosPersonales = {
                nombre:nombre,
                apellido:"",
                dni:"",
                telefono:"",
                domicilio:"",
                fechaNacimiento:null,
                genero:"",
                cargo:"",
                titulo:""
            };
        const hashedPassword = await bcrypt.hash(password, 10);
        const datos ={email,password:hashedPassword,datosPersonales}
        console.log("datos:", datos)
        const nuevoUsuario = await crearUsuario(datos);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario' });
    }
};

// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.body;
        console.log('llegue al controller con el id : ',id)
        const eliminado = await eliminarUnUsuario(id);
        if (!eliminado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        console.log('Usuario Eliminado: ',eliminado);
        res.redirect('/admin/usuarios');
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
};

const darDeAltaUsuario = async(req,res)=>{
    const {id} = req.body;
    try{
        const usuario = await darAltaUser(id);
        if(!usuario){
            res.status(401).send({message:"El usuario no se encuentra"});
        }
        res.redirect('/admin/usuarios');
    }catch(error){
        res.status(500).send({message:"No se pudo dar de alta el usuario intente mas tarde"});
    }
}

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

const mostrarEditarUsuario = async(req,res)=>{
    try{
        const { id } = req.query;

        if (!id) {
            return res.status(400).send({ message: "Falta el ID del usuario" });
        }

        const usuario = await getUsuarioPorId(id);
        if (!usuario) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }
        if (usuario.datosPersonales.fechaNacimiento) {
            const fecha = new Date(usuario.datosPersonales.fechaNacimiento);
            // Guarda como '1995-11-12'
            usuario.datosPersonales.fechaNacimiento = fecha.toISOString().split('T')[0];
        }
        res.status(200).render('admin/editarUsuario', {usuario,message: "Usuario Encontrado"});
    }catch(error){
        res.status(500).send({message:"No se pudo encontrar el usuario porfavor intente mas tarde"});
    }
}

const editarUsuario = async (req, res) => {
    try {
        const {
        id,
        email,
        rol,
        nombre,
        apellido,
        dni,
        telefono,
        domicilio,
        fechaNacimiento,
        genero,
        cargo,
        titulo
        } = req.body;
        console.log('fecha nacimiento : ',fechaNacimiento);
        // Validación de ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "ID de usuario no válido" });
        }

        // Verificar existencia del usuario
        const usuarioExistente = await getUsuarioPorId(id);
        if (!usuarioExistente) {
        return res.status(404).send({ message: "Usuario no encontrado" });
        }

        // Construir objeto actualizado
        const usuarioActualizado = {
        email,
        rol,
        datosPersonales: {
            nombre,
            apellido,
            dni,
            telefono,
            domicilio,
            fechaNacimiento: fechaNacimiento || null,
            genero,
            cargo,
            titulo
        }
        };

        // Actualizar en la base de datos
        const resultado = await actualizarUsuario(id, usuarioActualizado);

        if (!resultado) {
        return res.status(500).send({ message: "No se pudo actualizar el usuario" });
        }

        // Redirigir al listado si todo va bien
        res.status(200).redirect('/admin/usuarios');
    } catch (error) {
        res.status(500).json({ message: 'Error al editar usuario' });
    }
};



export {
    index,
    listarUsuarios,
    mostrarCrearUsuario,
    crearUnUsuario,
    eliminarUsuario,
    darDeAltaUsuario,
    cambiarContrasena,
    mostrarEditarUsuario,
    editarUsuario
};
