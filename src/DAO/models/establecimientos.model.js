const establecimientoSchema = new mongoose.Schema({
  nombre: String,
  domicilio: String,
  codigo: String // si tiene un identificador oficial
});

const Establecimiento = mongoose.model('Establecimiento', establecimientoSchema);
export default Establecimiento;
