import { Router } from 'express';
import { getAllProducts, getProductById, createProduct } from '../controllers/products.controller';
import { authenticateUser } from '../middlewares/auth.middleware';
import { isAdmin } from '../middlewares/role.middleware';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Rutas protegidas para administradores
router.post('/', authenticateUser, isAdmin, createProduct);

export default router;