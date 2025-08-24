"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shipments_controller_1 = require("../controllers/shipments.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
// Ruta pública para consultar el tracking
router.get('/:orderId/tracking', shipments_controller_1.getTrackingInfo);
// Ruta protegida para que el administrador actualice el estado del envío
router.put('/:orderId', auth_middleware_1.authenticateUser, role_middleware_1.isAdmin, shipments_controller_1.updateShipmentStatus);
exports.default = router;
//# sourceMappingURL=shipments.routes.js.map