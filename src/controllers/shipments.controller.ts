import { Request, Response } from 'express';
import { ShipmentModel } from '../models/shipments.model'; 
import { OrderModel } from '../models/order.model';
import { io } from '../server';

type ShipmentStatus =
  | 'PENDIENTE'
  | 'PREPARANDO'
  | 'EN_TRANSITO'
  | 'EN_ENTREGA'
  | 'ENTREGADO'
  | 'CANCELADO';

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
 *         description: El ID de la orden
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
export const getTrackingInfo = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const shipment = await ShipmentModel.findOne({ orderId });

    if (!shipment) {
      return res.status(404).json({ message: 'Información de seguimiento no encontrada.' });
    }

    res.status(200).json(shipment);
  } catch (error) {
    console.error('[GET TRACKING ERROR]', error);
    res.status(500).json({ message: 'Error al obtener información de seguimiento.' });
  }
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
 *       '400':
 *         description: Estado inválido
 *       '401':
 *         description: No autorizado
 *       '403':
 *         description: Acceso denegado (solo admins)
 *       '404':
 *         description: Envío no encontrado
 */
export const updateShipmentStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status }: { status: ShipmentStatus } = req.body;

    if (!status || !['PENDIENTE','PREPARANDO','EN_TRANSITO','EN_ENTREGA','ENTREGADO','CANCELADO'].includes(status)) {
      return res.status(400).json({ message: 'Estado de envío inválido.' });
    }

    // Validar que el usuario sea admin
    const user = req.user;
    if (!user || user.role !== 'admin') return res.status(403).json({ message: 'Acceso denegado.' });

    const shipment = await ShipmentModel.findOne({ orderId });
    if (!shipment) return res.status(404).json({ message: 'Envío no encontrado.' });

    shipment.status = status;
    await shipment.save();

    // Emitir notificación en tiempo real al usuario de la orden
    io.to(`user_${shipment.userId}`).emit('shipmentUpdated', { orderId, status });

    res.status(200).json({ message: 'Estado del envío actualizado con éxito.', shipment });
  } catch (error) {
    console.error('[UPDATE SHIPMENT ERROR]', error);
    res.status(500).json({ message: 'Error al actualizar estado del envío.' });
  }
};
