"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_controller_1 = require("../controllers/orders.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Rutas para órdenes, protegidas para usuarios autenticados
router.post('/checkout', auth_middleware_1.authenticateUser, orders_controller_1.checkout);
router.get('/', auth_middleware_1.authenticateUser, orders_controller_1.getUserOrders);
router.get('/:id', auth_middleware_1.authenticateUser, orders_controller_1.getOrderById);
exports.default = router;
//# sourceMappingURL=orders.routes.js.map