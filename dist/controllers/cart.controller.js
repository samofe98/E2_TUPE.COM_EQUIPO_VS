"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeItemFromCart = exports.updateItemInCart = exports.addItemToCart = exports.getCart = void 0;
const mock_cart_data_1 = require("../data/mock-cart.data");
/**
 * @swagger
 * /cart:
 * get:
 * summary: Obtiene el contenido del carrito de compras del usuario autenticado
 * tags:
 * - Cart
 * security:
 * - bearerAuth: []
 * responses:
 * '200':
 * description: Contenido del carrito recuperado con éxito
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Cart'
 * '401':
 * description: No autorizado
 */
const getCart = (req, res) => {
    res.status(200).json(mock_cart_data_1.mockCart);
};
exports.getCart = getCart;
/**
 * @swagger
 * /cart/items:
 * post:
 * summary: Agrega un producto al carrito de compras
 * tags:
 * - Cart
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - productId
 * - quantity
 * properties:
 * productId:
 * type: string
 * example: prod-001
 * quantity:
 * type: number
 * example: 1
 * responses:
 * '200':
 * description: Producto agregado al carrito exitosamente
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: Producto agregado al carrito exitosamente.
 * '401':
 * description: No autorizado
 * '400':
 * description: Datos de entrada no válidos
 */
const addItemToCart = (req, res) => {
    const { productId, quantity } = req.body;
    console.log(`Simulando agregar ${quantity} unidades del producto ${productId} al carrito.`);
    res.status(200).json({ message: 'Producto agregado al carrito exitosamente.' });
};
exports.addItemToCart = addItemToCart;
/**
 * @swagger
 * /cart/items/{id}:
 * put:
 * summary: Actualiza la cantidad de un ítem en el carrito de compras
 * tags:
 * - Cart
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: El ID del ítem del carrito (o ID del producto)
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - quantity
 * properties:
 * quantity:
 * type: number
 * example: 3
 * responses:
 * '200':
 * description: Cantidad del producto actualizada con éxito
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: Cantidad del producto actualizada.
 * '401':
 * description: No autorizado
 * '404':
 * description: Ítem del carrito no encontrado
 */
const updateItemInCart = (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    console.log(`Simulando actualizar la cantidad del producto ${id} a ${quantity}.`);
    res.status(200).json({ message: 'Cantidad del producto actualizada.' });
};
exports.updateItemInCart = updateItemInCart;
/**
 * @swagger
 * /cart/items/{id}:
 * delete:
 * summary: Elimina un ítem del carrito de compras
 * tags:
 * - Cart
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: El ID del ítem del carrito (o ID del producto)
 * responses:
 * '200':
 * description: Producto eliminado del carrito exitosamente
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: Producto eliminado del carrito.
 * '401':
 * description: No autorizado
 * '404':
 * description: Ítem del carrito no encontrado
 */
const removeItemFromCart = (req, res) => {
    const { id } = req.params;
    console.log(`Simulando eliminar el producto ${id} del carrito.`);
    res.status(200).json({ message: 'Producto eliminado del carrito.' });
};
exports.removeItemFromCart = removeItemFromCart;
//# sourceMappingURL=cart.controller.js.map