import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Carga las variables del archivo .env

/**
 * Se recomienda usar un archivo .env (ya manejado por dotenv)
 * Ejemplo:
 * MONGO_URI=mongodb+srv://usuario:password@cluster0.maprloz.mongodb.net/tuecommerce
 * DB_NAME=tuecommerce
 */

const MONGO_URI: string = process.env.MONGO_URI || '';
const DB_NAME: string = process.env.DB_NAME || 'tuecommerce';

export const dbConnection = async (): Promise<void> => {
  try {
    if (!MONGO_URI) {
      throw new Error('❌ [DB] No se encontró la variable MONGO_URI en el archivo .env');
    }

    await mongoose.connect(MONGO_URI, {
      dbName: DB_NAME,
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ [DB] Conectado exitosamente a MongoDB Atlas - Base: ${DB_NAME}`);
  } catch (error) {
    console.error('❌ [DB] Error al conectar con MongoDB:', error);
    process.exit(1);
  }
};
