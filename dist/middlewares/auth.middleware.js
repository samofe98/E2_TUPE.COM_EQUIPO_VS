"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
// Middleware de autenticación simulado
const authenticateUser = (req, res, next) => {
    // para esta entrega solo vamos a simular la lógica.
    console.log('Middleware de autenticación ejecutado.');
    req.user = { id: 'mock-user-id', role: 'admin' }; // Simulación de usuario
    next();
};
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=auth.middleware.js.map