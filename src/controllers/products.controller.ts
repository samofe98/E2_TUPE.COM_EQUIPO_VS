import { Request, Response } from 'express';
import { mockProducts } from '../data/mock-products.data';

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lista todos los productos disponibles en el catálogo
 *     tags:
 *       - Products
 *     responses:
 *       '200':
 *         description: Lista de productos obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
export const getAllProducts = (req: Request, res: Response) => {
  const activeProducts = mockProducts.filter(p => p.status === 'activo' && p.stock > 0);
  res.status(200).json(activeProducts);
};

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtiene los detalles de un producto por su ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del producto
 *     responses:
 *       '200':
 *         description: Detalles del producto obtenidos con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '404':
 *         description: Producto no encontrado o no disponible
 */
export const getProductById = (req: Request, res: Response) => {
  const { id } = req.params;
  const product = mockProducts.find(p => p.id === id);

  if (!product || product.status !== 'activo') {
    return res.status(404).json({ message: 'Producto no encontrado o no disponible.' });
  }

  res.status(200).json(product);
};

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crea un nuevo producto (solo para administradores)
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - stock
 *               - description
 *               - status
 *               - sku
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: Camiseta básica
 *               price:
 *                 type: number
 *                 example: 25000
 *               stock:
 *                 type: number
 *                 example: 100
 *               description:
 *                 type: string
 *                 example: Camiseta de algodón 100% color blanco
 *               status:
 *                 type: string
 *                 enum: [activo, descontinuado]
 *                 example: activo
 *               sku:
 *                 type: string
 *                 example: SKU-001
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: https://mistienda.com/images/camiseta.jpg
 *               category:
 *                 type: string
 *                 example: Ropa
 *     responses:
 *       '201':
 *         description: Producto creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '401':
 *         description: No autorizado
 *       '403':
 *         description: Acceso denegado (requiere rol de administrador)
 */
export const createProduct = (req: Request, res: Response) => {
  const newProduct = {
    ...req.body,
    id: `prod-${Math.random().toString(36).substr(2, 9)}`,
  };
  res.status(201).json(newProduct);
};
