import { Router } from 'express';
import { checkout, getUserOrders, getOrderById } from '../controllers/orders.controller';
import { authenticateUser } from '../middlewares/auth.middleware';

const router = Router();

// Rutas para órdenes, protegidas para usuarios autenticados
router.post('/checkout', authenticateUser, checkout);
router.get('/', authenticateUser, getUserOrders);
router.get('/:id', authenticateUser, getOrderById);

export default router;