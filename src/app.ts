import express, { Express, Request, Response } from 'express';
import { json } from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';

// Importación de las rutas
import userRoutes from './routes/user.routes';
import productRoutes from './routes/products.routes';
import cartRoutes from './routes/cart.routes';
import orderRoutes from './routes/orders.routes';
import shipmentsRoutes from './routes/shipments.routes';

const app: Express = express();
const PORT: number = 3000;

// Middlewares globales
app.use(json());
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Agrega los middlewares para servir la documentación de Swagger
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Conexión de las rutas
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/shipments', shipmentsRoutes);

// Ruta base
app.get('/api/v1', (req: Request, res: Response) => {
    res.status(200).json({ message: "¡Bienvenido a la API de E-commerce!" });
});

// Manejador de errores global
app.use((err: Error, req: Request, res: Response, next: Function) => {
    console.error(err.stack);
    res.status(500).json({ message: "Algo salió mal en el servidor." });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor Express corriendo en el puerto ${PORT}`);
    console.log(`📚 Documentación de la API disponible en http://localhost:${PORT}/api/v1/docs`);
});

export default app;