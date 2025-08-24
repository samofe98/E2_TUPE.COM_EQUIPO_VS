"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderById = exports.getUserOrders = exports.checkout = void 0;
const mock_orders_data_1 = require("../data/mock-orders.data");
/**
 * @swagger
 * /orders/checkout:
 * post:
 * summary: Procesa el carrito de compras y crea una nueva orden
 * tags:
 * - Orders
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - shippingAddress
 * properties:
 * shippingAddress:
 * type: object
 * example: { street: "Calle 10", city: "Medellín" }
 * responses:
 * '201':
 * description: Orden creada con éxito
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Order'
 * '401':
 * description: No autorizado
 * '400':
 * description: Solicitud incorrecta (ej. carrito vacío)
 */
const checkout = (req, res) => {
    // Simulación del proceso de checkout
    const newOrder = {
        id: `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 99999)}`,
        userId: req.user.id,
        status: 'PENDIENTE',
        items: [], // Simulación
        total: 150000,
        trackingNumber: `TRK-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 99999)}`,
        createdAt: new Date(),
    };
    console.log(`Simulando checkout. Se creó la orden ${newOrder.id}.`);
    res.status(201).json(newOrder);
};
exports.checkout = checkout;
/**
 * @swagger
 * /orders:
 * get:
 * summary: Obtiene las órdenes del usuario autenticado
 * tags:
 * - Orders
 * security:
 * - bearerAuth: []
 * responses:
 * '200':
 * description: Lista de órdenes obtenida con éxito
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Order'
 * '401':
 * description: No autorizado
 */
const getUserOrders = (req, res) => {
    // Simulación: devuelve todas las órdenes mock
    res.status(200).json(mock_orders_data_1.mockOrders);
};
exports.getUserOrders = getUserOrders;
/**
 * @swagger
 * /orders/{id}:
 * get:
 * summary: Obtiene los detalles de una orden por su ID
 * tags:
 * - Orders
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: El ID de la orden
 * responses:
 * '200':
 * description: Detalles de la orden obtenidos con éxito
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Order'
 * '404':
 * description: Orden no encontrada
 */
const getOrderById = (req, res) => {
    const { id } = req.params;
    const order = mock_orders_data_1.mockOrders.find(o => o.id === id);
    if (!order) {
        return res.status(404).json({ message: 'Orden no encontrada.' });
    }
    res.status(200).json(order);
};
exports.getOrderById = getOrderById;
//# sourceMappingURL=orders.controller.js.map