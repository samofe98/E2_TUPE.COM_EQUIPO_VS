import { Router } from 'express';
import { login, register, getUserProfile } from '../controllers/user.controller';
import { authenticateUser } from '../middlewares/auth.middleware';

const router = Router();

// Rutas de autenticación
router.post('/register', register);
router.post('/login', login);

// Ruta protegida para ver el perfil de usuario
router.get('/:id', authenticateUser, getUserProfile);

export default router;