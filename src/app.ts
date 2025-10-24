import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { json } from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';

// Importar rutas
import userRoutes from './routes/user.routes';
import productRoutes from './routes/products.routes';
import cartRoutes from './routes/cart.routes';
import orderRoutes from './routes/orders.routes';
import shipmentsRoutes from './routes/shipments.routes';

// Conexión a MongoDB
import { dbConnection } from './infraestructure/config/mongoDB';

// Configurar variables de entorno
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// 🌐 Conexión a la base de datos
dbConnection();

// 🧩 Middlewares globales
app.use(json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 📘 Documentación Swagger
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 🚀 Rutas principales
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/shipments', shipmentsRoutes);

// 🏠 Ruta base
app.get('/api/v1', (req: Request, res: Response) => {
  res.status(200).json({ message: '¡Bienvenido a la API de E-commerce TUPE.COM!' });
});

// ❌ Manejador global de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[ERROR]', err.message);
  res.status(500).json({ message: 'Error interno del servidor.' });
});

// 🧠 Exportar app (para pruebas unitarias y server principal)
export default app;

// Si deseas que este archivo también levante el servidor (opcional)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`📚 Swagger Docs: http://localhost:${PORT}/api/v1/docs`);
  });
}
