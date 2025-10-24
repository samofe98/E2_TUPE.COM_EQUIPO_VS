import { Router } from 'express';
import { getTrackingInfo, updateShipmentStatus } from '../controllers/shipments.controller';
import { authenticateUser } from '../middlewares/auth.middleware';
import { isAdmin } from '../middlewares/role.middleware';
import { validateShipmentStatus } from '../middlewares/validation.middleware';

const router = Router();

/**
 * @swagger
 * /shipments/{orderId}/tracking:
 *   get:
 *     summary: Obtiene la información de seguimiento de un envío por ID de orden
 *     tags:
 *       - Shipments
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la orden
 *     responses:
 *       '200':
 *         description: Información de seguimiento obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shipment'
 *       '404':
 *         description: Información de seguimiento no encontrada
 */
router.get('/:orderId/tracking', getTrackingInfo);

/**
 * @swagger
 * /shipments/{orderId}:
 *   put:
 *     summary: Actualiza el estado de un envío (solo administradores)
 *     tags:
 *       - Shipments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDIENTE, PREPARANDO, EN_TRANSITO, EN_ENTREGA, ENTREGADO, CANCELADO]
 *     responses:
 *       '200':
 *         description: Estado del envío actualizado con éxito
 *       '400':
 *         description: Estado inválido
 *       '403':
 *         description: Acceso denegado (solo admins)
 *       '404':
 *         description: Envío no encontrado
 */
router.put('/:orderId', authenticateUser, isAdmin, validateShipmentStatus, updateShipmentStatus);

export default router;
