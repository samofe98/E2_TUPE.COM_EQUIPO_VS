"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
router.get('/', products_controller_1.getAllProducts);
router.get('/:id', products_controller_1.getProductById);
// Rutas protegidas para administradores
router.post('/', auth_middleware_1.authenticateUser, role_middleware_1.isAdmin, products_controller_1.createProduct);
exports.default = router;
//# sourceMappingURL=products.routes.js.map