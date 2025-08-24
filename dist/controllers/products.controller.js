"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const mock_products_data_1 = require("../data/mock-products.data");
/**
 * @swagger
 * /products:
 * get:
 * summary: Lista todos los productos disponibles en el catálogo
 * tags:
 * - Products
 * responses:
 * '200':
 * description: Lista de productos obtenida con éxito
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Product'
 */
const getAllProducts = (req, res) => {
    const activeProducts = mock_products_data_1.mockProducts.filter(p => p.status === 'activo' && p.stock > 0);
    res.status(200).json(activeProducts);
};
exports.getAllProducts = getAllProducts;
/**
 * @swagger
 * /products/{id}:
 * get:
 * summary: Obtiene los detalles de un producto por su ID
 * tags:
 * - Products
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: El ID del producto
 * responses:
 * '200':
 * description: Detalles del producto obtenidos con éxito
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Product'
 * '404':
 * description: Producto no encontrado o no disponible
 */
const getProductById = (req, res) => {
    const { id } = req.params;
    const product = mock_products_data_1.mockProducts.find(p => p.id === id);
    if (!product || product.status !== 'activo') {
        return res.status(404).json({ message: 'Producto no encontrado o no disponible.' });
    }
    res.status(200).json(product);
};
exports.getProductById = getProductById;
/**
 * @swagger
 * /products:
 * post:
 * summary: Crea un nuevo producto (solo para administradores)
 * tags:
 * - Products
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - name
 * - price
 * - stock
 * - description
 * - status
 * - sku
 * - category
 * properties:
 * name:
 * type: string
 * price:
 * type: number
 * stock:
 * type: number
 * description:
 * type: string
 * status:
 * type: string
 * enum: [activo, descontinuado]
 * sku:
 * type: string
 * images:
 * type: array
 * items:
 * type: string
 * category:
 * type: string
 * responses:
 * '201':
 * description: Producto creado con éxito
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Product'
 * '401':
 * description: No autorizado
 * '403':
 * description: Acceso denegado (requiere rol de administrador)
 */
const createProduct = (req, res) => {
    const newProduct = Object.assign(Object.assign({}, req.body), { id: `prod-${Math.random().toString(36).substr(2, 9)}` });
    res.status(201).json(newProduct);
};
exports.createProduct = createProduct;
//# sourceMappingURL=products.controller.js.map