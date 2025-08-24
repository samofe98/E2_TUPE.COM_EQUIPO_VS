"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
// Middleware de autorización por rol
const isAdmin = (req, res, next) => {
    // En esta entrega solo simulamos la lógica.
    console.log('Middleware de autorización de rol ejecutado.');
    if (req.user && req.user.role === 'admin') {
        next();
    }
    else {
        res.status(403).json({ message: "Acceso denegado. Se requiere rol de administrador." });
    }
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=role.middleware.js.map