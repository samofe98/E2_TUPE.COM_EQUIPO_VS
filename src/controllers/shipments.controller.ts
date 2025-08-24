import { Request, Response } from 'express';
import { mockShipments } from '../data/mock-shipments.data';

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
 *         description: El ID de la orden para la cual obtener el seguimiento
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
export const getTrackingInfo = (req: Request, res: Response) => {
  const { orderId } = req.params;
  const shipment = mockShipments.find(s => s.orderId === orderId);

  if (!shipment) {
    return res.status(404).json({ message: 'Información de seguimiento no encontrada.' });
  }

  res.status(200).json(shipment);
};

/**
 * @swagger
 * /shipments/{orderId}:
 *   put:
 *     summary: Actualiza el estado de un envío (solo para administradores)
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
 *         description: El ID de la orden a actualizar
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
 *                 example: EN_ENTREGA
 *     responses:
 *       '200':
 *         description: Estado del envío actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Estado del envío actualizado con éxito.
 *       '401':
 *         description: No autorizado
 *       '403':
 *         description: Acceso denegado (requiere rol de administrador)
 *       '404':
 *         description: Envío no encontrado
 */
export const updateShipmentStatus = (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { status }: { status: string } = req.body;
  console.log(`Simulando actualización del estado de envío para la orden ${orderId} a ${status}.`);
  res.status(200).json({ message: 'Estado del envío actualizado con éxito.' });
};
