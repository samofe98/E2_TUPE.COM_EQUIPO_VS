import { Router } from 'express';
import { getCart, addItemToCart, updateItemInCart, removeItemFromCart } from '../controllers/cart.controller';
import { authenticateUser } from '../middlewares/auth.middleware';
import { body, param } from 'express-validator';
import { validate } from '../middlewares/validation.middleware';

const router = Router();

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Obtiene el carrito del usuario autenticado
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Carrito obtenido con éxito
 *       '401':
 *         description: No autorizado
 */
router.get('/', authenticateUser, getCart);

/**
 * @swagger
 * /cart/items:
 *   post:
 *     summary: Agrega un item al carrito del usuario autenticado
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 64f8c9a2e8a1f2b5c6d7e8f9
 *               quantity:
 *                 type: number
 *                 example: 2
 *     responses:
 *       '200':
 *         description: Item agregado con éxito
 *       '400':
 *         description: Datos inválidos
 *       '401':
 *         description: No autorizado
 */
router.post(
  '/items',
  authenticateUser,
  body('productId').isMongoId(),
  body('quantity').isInt({ min: 1 }),
  validate,
  addItemToCart
);

/**
 * @swagger
 * /cart/items/{id}:
 *   put:
 *     summary: Actualiza la cantidad de un item en el carrito
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del item en el carrito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: number
 *                 example: 3
 *     responses:
 *       '200':
 *         description: Item actualizado con éxito
 *       '400':
 *         description: Datos inválidos
 *       '401':
 *         description: No autorizado
 */
router.put(
  '/items/:id',
  authenticateUser,
  param('id').isMongoId(),
  body('quantity').isInt({ min: 1 }),
  validate,
  updateItemInCart
);

/**
 * @swagger
 * /cart/items/{id}:
 *   delete:
 *     summary: Elimina un item del carrito
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del item en el carrito
 *     responses:
 *       '200':
 *         description: Item eliminado con éxito
 *       '401':
 *         description: No autorizado
 */
router.delete(
  '/items/:id',
  authenticateUser,
  param('id').isMongoId(),
  validate,
  removeItemFromCart
);

export default router;
