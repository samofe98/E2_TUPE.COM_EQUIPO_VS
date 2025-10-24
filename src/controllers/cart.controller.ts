import { Request, Response } from 'express';
import { CartModel } from '../models/cart.model';
import { ProductModel } from '../models/product.model';

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
 *       200:
 *         description: Carrito obtenido correctamente
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno
 */
export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    let cart = await CartModel.findOne({ userId }).populate('items.productId');

    if (!cart) {
      cart = await CartModel.create({ userId, items: [], total: 0 });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('[GET CART ERROR]', error);
    res.status(500).json({ message: 'Error al obtener el carrito.' });
  }
};

/**
 * @swagger
 * /cart/items:
 *   post:
 *     summary: Agrega un producto al carrito
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
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Producto agregado al carrito exitosamente
 *       400:
 *         description: Campos obligatorios faltantes o inválidos
 *       404:
 *         description: Producto no disponible
 *       500:
 *         description: Error interno
 */
export const addItemToCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: 'productId y quantity son obligatorios.' });
    }

    const product = await ProductModel.findById(productId);
    if (!product || product.status !== 'activo' || product.stock < quantity) {
      return res.status(404).json({ message: 'Producto no disponible.' });
    }

    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      cart = await CartModel.create({ userId, items: [], total: 0 });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
        priceAtPurchase: product.price,
      });
    }

    cart.total = cart.items.reduce((sum, item) => sum + item.quantity * item.priceAtPurchase, 0);

    await cart.save();
    res.status(200).json({ message: 'Producto agregado al carrito exitosamente.', cart });
  } catch (error) {
    console.error('[ADD ITEM ERROR]', error);
    res.status(500).json({ message: 'Error al agregar producto al carrito.' });
  }
};

/**
 * @swagger
 * /cart/items/{id}:
 *   put:
 *     summary: Actualiza la cantidad de un ítem del carrito
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
 *         description: ID del producto en el carrito
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
 *     responses:
 *       200:
 *         description: Cantidad actualizada correctamente
 *       400:
 *         description: Cantidad inválida
 *       404:
 *         description: Carrito o producto no encontrado
 *       500:
 *         description: Error interno
 */
export const updateItemInCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'La cantidad debe ser mayor a 0.' });
    }

    const cart = await CartModel.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado.' });

    const item = cart.items.find(i => i.productId.toString() === id);
    if (!item) return res.status(404).json({ message: 'Producto no encontrado en el carrito.' });

    item.quantity = quantity;
    cart.total = cart.items.reduce((sum, i) => sum + i.quantity * i.priceAtPurchase, 0);

    await cart.save();
    res.status(200).json({ message: 'Cantidad actualizada correctamente.', cart });
  } catch (error) {
    console.error('[UPDATE ITEM ERROR]', error);
    res.status(500).json({ message: 'Error al actualizar cantidad.' });
  }
};

/**
 * @swagger
 * /cart/items/{id}:
 *   delete:
 *     summary: Elimina un producto del carrito
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
 *         description: ID del producto en el carrito
 *     responses:
 *       200:
 *         description: Producto eliminado del carrito
 *       404:
 *         description: Carrito o producto no encontrado
 *       500:
 *         description: Error interno
 */
export const removeItemFromCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    const cart = await CartModel.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado.' });

    cart.items = cart.items.filter(i => i.productId.toString() !== id);
    cart.total = cart.items.reduce((sum, i) => sum + i.quantity * i.priceAtPurchase, 0);

    await cart.save();
    res.status(200).json({ message: 'Producto eliminado del carrito.', cart });
  } catch (error) {
    console.error('[REMOVE ITEM ERROR]', error);
    res.status(500).json({ message: 'Error al eliminar producto del carrito.' });
  }
};
