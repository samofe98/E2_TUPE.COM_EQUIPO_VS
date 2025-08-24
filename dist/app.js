"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./swagger");
// Importación de las rutas
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
const orders_routes_1 = __importDefault(require("./routes/orders.routes"));
const shipments_routes_1 = __importDefault(require("./routes/shipments.routes"));
const app = (0, express_1.default)();
const PORT = 3000;
// Middlewares globales
app.use((0, body_parser_1.json)());
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
// Agrega los middlewares para servir la documentación de Swagger
app.use('/api/v1/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
// Conexión de las rutas
app.use('/api/v1/users', user_routes_1.default);
app.use('/api/v1/products', products_routes_1.default);
app.use('/api/v1/cart', cart_routes_1.default);
app.use('/api/v1/orders', orders_routes_1.default);
app.use('/api/v1/shipments', shipments_routes_1.default);
// Ruta base
app.get('/api/v1', (req, res) => {
    res.status(200).json({ message: "¡Bienvenido a la API de E-commerce!" });
});
// Manejador de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Algo salió mal en el servidor." });
});
app.listen(PORT, () => {
    console.log(`🚀 Servidor Express corriendo en el puerto ${PORT}`);
    console.log(`📚 Documentación de la API disponible en http://localhost:${PORT}/api/v1/docs`);
});
exports.default = app;
//# sourceMappingURL=app.js.map