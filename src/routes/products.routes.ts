import { Router } from 'express';
import { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../controllers/products.controller';
import { authenticateUser } from '../middlewares/auth.middleware';
import { isAdmin } from '../middlewares/role.middleware';
import { validateCreateProduct, validateUpdateProduct } from '../middlewares/validation.middleware';

const router = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lista todos los productos disponibles
 *     tags:
 *       - Products
 *     responses:
 *       '200':
 *         description: Lista de productos obtenida con éxito
 */
router.get('/', getAllProducts);

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
 *         description: ID del producto
 *     responses:
 *       '200':
 *         description: Detalles del producto obtenidos con éxito
 *       '404':
 *         description: Producto no encontrado
 */
router.get('/:id', getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crea un nuevo producto (solo administradores)
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
 *               - sku
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               sku:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       '201':
 *         description: Producto creado con éxito
 *       '400':
 *         description: Faltan campos obligatorios
 *       '401':
 *         description: No autorizado
 */
router.post('/', authenticateUser, isAdmin, validateCreateProduct, createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualiza un producto existente (solo administradores)
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       '200':
 *         description: Producto actualizado con éxito
 *       '404':
 *         description: Producto no encontrado
 */
router.put('/:id', authenticateUser, isAdmin, validateUpdateProduct, updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Elimina un producto (solo administradores)
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Producto eliminado con éxito
 *       '404':
 *         description: Producto no encontrado
 */
router.delete('/:id', authenticateUser, isAdmin, deleteProduct);

export default router;
