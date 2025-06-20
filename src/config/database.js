import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://user:n2f9YppoV2rjfoMD@formulariocluster1.9gcutiv.mongodb.net/mi_basededatos';

let connection;

export const connectDB = () => {
  if (connection) return connection; // ya existe

  connection = mongoose.createConnection(MONGO_URI);

  connection.on('connected', () => {
    console.log('✅ Conectado a MongoDB Atlas - Formularios');
  });

  connection.on('error', (err) => {
    console.error('❌ Error de conexión MongoDB:', err);
  });

  return connection;
};
