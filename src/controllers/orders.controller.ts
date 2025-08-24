import { Request, Response } from 'express';
import { mockOrders } from '../data/mock-orders.data';

/**
 * @swagger
 * /orders/checkout:
 *   post:
 *     summary: Procesa el carrito de compras y crea una nueva orden
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '401':
 *         description: No autorizado
 *       '400':
 *         description: Solicitud incorrecta (ej. carrito vacío)
 */
export const checkout = (req: Request, res: Response) => {
  const newOrder = {
    id: `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 99999)}`,
    userId: (req as any).user?.id || 'user-001', // fallback para evitar crash si no hay user
    status: 'PENDIENTE',
    items: [],
    total: 150000,
    trackingNumber: `TRK-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 99999)}`,
    createdAt: new Date(),
  };
  console.log(`Simulando checkout. Se creó la orden ${newOrder.id}.`);
  res.status(201).json(newOrder);
};

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Obtiene las órdenes del usuario autenticado
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de órdenes obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       '401':
 *         description: No autorizado
 */
export const getUserOrders = (req: Request, res: Response) => {
  res.status(200).json(mockOrders);
};

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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '404':
 *         description: Orden no encontrada
 */
export const getOrderById = (req: Request, res: Response) => {
  const { id } = req.params;
  const order = mockOrders.find(o => o.id === id);

  if (!order) {
    return res.status(404).json({ message: 'Orden no encontrada.' });
  }

  res.status(200).json(order);
};
