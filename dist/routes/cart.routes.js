"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("../controllers/cart.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Rutas protegidas para el carrito de compras del usuario autenticado
router.get('/', auth_middleware_1.authenticateUser, cart_controller_1.getCart);
router.post('/items', auth_middleware_1.authenticateUser, cart_controller_1.addItemToCart);
router.put('/items/:id', auth_middleware_1.authenticateUser, cart_controller_1.updateItemInCart);
router.delete('/items/:id', auth_middleware_1.authenticateUser, cart_controller_1.removeItemFromCart);
exports.default = router;
//# sourceMappingURL=cart.routes.js.map