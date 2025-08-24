import { Router } from 'express';
import { getCart, addItemToCart, updateItemInCart, removeItemFromCart } from '../controllers/cart.controller';
import { authenticateUser } from '../middlewares/auth.middleware';

const router = Router();

// Rutas protegidas para el carrito de compras del usuario autenticado
router.get('/', authenticateUser, getCart);
router.post('/items', authenticateUser, addItemToCart);
router.put('/items/:id', authenticateUser, updateItemInCart);
router.delete('/items/:id', authenticateUser, removeItemFromCart);

export default router;