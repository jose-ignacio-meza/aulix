import mongoose from 'mongoose';

const DatosPersonalesSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', unique: true },

  nombre: String,
  apellido: String,
  dni: String,
  fechaNacimiento: Date,
  domicilio: String,
  telefono: String,
  email: String,
  cargo: String,
  titulo: String
});

export default mongoose.model('DatosPersonales', DatosPersonalesSchema);