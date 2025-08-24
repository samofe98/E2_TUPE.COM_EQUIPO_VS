import { Router } from 'express';
import { getTrackingInfo, updateShipmentStatus } from '../controllers/shipments.controller';
import { authenticateUser } from '../middlewares/auth.middleware';
import { isAdmin } from '../middlewares/role.middleware';

const router = Router();

// Ruta pública para consultar el tracking
router.get('/:orderId/tracking', getTrackingInfo);

// Ruta protegida para que el administrador actualice el estado del envío
router.put('/:orderId', authenticateUser, isAdmin, updateShipmentStatus);

export default router;