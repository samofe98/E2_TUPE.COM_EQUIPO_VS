import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Carga las variables del archivo .env

const MONGO_URI: string = process.env.MONGO_URI || '';

export const dbConnection = async (): Promise<void> => {
  try {
    if (!MONGO_URI) {
      throw new Error('❌ [DB] No se encontró la variable MONGO_URI en el archivo .env');
    }

    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ [DB] Conectado exitosamente a MongoDB Atlas`);
  } catch (error) {
    console.error('❌ [DB] Error al conectar con MongoDB:', error);
    process.exit(1);
  }
};
