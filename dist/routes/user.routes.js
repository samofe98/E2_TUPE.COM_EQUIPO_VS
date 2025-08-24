"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Rutas de autenticación
router.post('/register', user_controller_1.register);
router.post('/login', user_controller_1.login);
// Ruta protegida para ver el perfil de usuario
router.get('/:id', auth_middleware_1.authenticateUser, user_controller_1.getUserProfile);
exports.default = router;
//# sourceMappingURL=user.routes.js.map