import { Router } from 'express';
import { login, register, getUserProfile } from '../controllers/user.controller';
import { authenticateUser } from '../middlewares/auth.middleware';
import { body, param } from 'express-validator';
import { validate } from '../middlewares/validation.middleware';

const router = Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Usuario registrado con éxito
 *       '400':
 *         description: Datos inválidos
 */
router.post(
  '/register',
  body('name').isString().notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  validate,
  register
);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Inicia sesión con email y contraseña
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login exitoso
 *       '401':
 *         description: Credenciales inválidas
 */
router.post(
  '/login',
  body('email').isEmail(),
  body('password').isString().notEmpty(),
  validate,
  login
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene el perfil de un usuario
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Perfil del usuario
 *       '401':
 *         description: No autorizado
 *       '404':
 *         description: Usuario no encontrado
 */
router.get(
  '/:id',
  authenticateUser,
  param('id').isMongoId(),
  validate,
  getUserProfile
);

export default router;
