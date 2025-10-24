import { Router } from 'express';
import { checkout, getUserOrders, getOrderById } from '../controllers/orders.controller';
import { authenticateUser } from '../middlewares/auth.middleware';
import { body, param } from 'express-validator';
import { validate, validateCheckout } from '../middlewares/validation.middleware';

const router = Router();

/**
 * @swagger
 * /orders/checkout:
 *   post:
 *     summary: Procesa el carrito y crea una nueva orden
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shippingAddress
 *             properties:
 *               shippingAddress:
 *                 type: object
 *                 example:
 *                   street: Calle 10
 *                   city: Medellín
 *     responses:
 *       '201':
 *         description: Orden creada con éxito
 *       '400':
 *         description: Carrito vacío o datos inválidos
 *       '401':
 *         description: No autorizado
 *       '500':
 *         description: Error interno del servidor
 */
router.post('/checkout', authenticateUser, validateCheckout, checkout);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Obtiene todas las órdenes del usuario autenticado
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de órdenes obtenida con éxito
 *       '401':
 *         description: No autorizado
 *       '500':
 *         description: Error interno del servidor
 */
router.get('/', authenticateUser, getUserOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Obtiene los detalles de una orden por su ID
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la orden
 *     responses:
 *       '200':
 *         description: Detalles de la orden obtenidos con éxito
 *       '401':
 *         description: No autorizado
 *       '404':
 *         description: Orden no encontrada
 *       '500':
 *         description: Error interno del servidor
 */
router.get('/:id', authenticateUser, param('id').isMongoId(), validate, getOrderById);

export default router;
