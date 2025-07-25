// src/DAO/models/usuario.model.js
import {connectDB}  from '../../config/database.js'; // Asegúrate de que la ruta sea correcta
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const conn = connectDB(); // obtenés la conexión

const datosPersonalesSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  dni: String,
  telefono: String,
  domicilio: String,
  fechaNacimiento: Date,
  genero: String,
  cargo: String,
  titulo: String
  // podés seguir agregando más campos según el formulario
}, { _id: false }); // para no generar un _id interno para este objeto embebido

// CursoSchema con cargo específico
const cursoSchema = new mongoose.Schema({
  nombre: String,
  cargo: String,
  eliminado: { type: Boolean, default: false }
}, { _id: true });

// Institución con cursos embebidos
const institucionSchema = new mongoose.Schema({
  nombre: String,
  cursos: [cursoSchema],
  eliminado: { type: Boolean, default: false }
}, { _id: true });

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true },
  password: String,
  rol: { type: String, enum: ['admin', 'cliente'], default: 'cliente' },
  eliminado: { type: Date, default: null },
  datosPersonales: datosPersonalesSchema,
  instituciones: { type: [institucionSchema], default: [] }
});

UsuarioSchema.methods.comparePassword = async function(candidatePassword) {
  // Asegúrate de usar bcrypt o el método que uses para comparar contraseñas
  return await bcrypt.compare(candidatePassword, this.password);
};

const Usuario = conn.model('Usuario', UsuarioSchema);
export default Usuario;

