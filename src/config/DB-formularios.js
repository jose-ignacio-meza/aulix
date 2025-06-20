import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://user:n2f9YppoV2rjfoMD@formulariocluster1.9gcutiv.mongodb.net/FomulariosClientes';

let connection;

export const connectDBFormularios = () => {
  if (connection) return connection; // reutilizar si ya existe

  connection = mongoose.createConnection(MONGO_URI);

  connection.on('connected', () => {
    console.log('✅ Conectado a formulariosClientes');
  });

  connection.on('error', (err) => {
    console.error('❌ Error en formulariosClientes:', err);
  });

  return connection;
};