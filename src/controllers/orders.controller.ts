import { Request, Response } from 'express';
import { OrderModel } from '../models/order.model';
import { CartModel } from '../models/cart.model';

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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '400':
 *         description: Carrito vacío o datos incorrectos
 *       '500':
 *         description: Error interno del servidor
 */
export const checkout = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Usuario no autenticado.' });

    const cart = await CartModel.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Carrito vacío.' });
    }

    const newOrder = new OrderModel({
      userId,
      status: 'PENDIENTE',
      items: cart.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchase: item.priceAtPurchase
      })),
      total: cart.total,
      trackingNumber: `TRK-${Date.now()}`,
    });

    await newOrder.save();

    // Limpiar carrito después de crear la orden
    cart.items = [];
    cart.total = 0;
    await cart.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('[CHECKOUT ERROR]', error);
    res.status(500).json({ message: 'Error al procesar la orden.' });
  }
};

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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       '500':
 *         description: Error interno del servidor
 */
export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Usuario no autenticado.' });

    const orders = await OrderModel.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error('[GET USER ORDERS ERROR]', error);
    res.status(500).json({ message: 'Error al obtener órdenes.' });
  }
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
 *       '500':
 *         description: Error interno del servidor
 */
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.findById(id).populate('items.productId');
    if (!order) return res.status(404).json({ message: 'Orden no encontrada.' });

    res.status(200).json(order);
  } catch (error) {
    console.error('[GET ORDER BY ID ERROR]', error);
    res.status(500).json({ message: 'Error al obtener la orden.' });
  }
};
