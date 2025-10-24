import { Request, Response } from 'express';
import { ProductModel } from '../models/product.model';

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
 */
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const activeProducts = await ProductModel.find({ status: 'activo', stock: { $gt: 0 } });
    res.status(200).json(activeProducts);
  } catch (error) {
    console.error('[GET PRODUCTS ERROR]', error);
    res.status(500).json({ message: 'Error al obtener productos.' });
  }
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
 *     responses:
 *       '200':
 *         description: Detalles del producto obtenidos con éxito
 *       '404':
 *         description: Producto no encontrado o no disponible
 */
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);

    if (!product || product.status !== 'activo') {
      return res.status(404).json({ message: 'Producto no encontrado o no disponible.' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('[GET PRODUCT BY ID ERROR]', error);
    res.status(500).json({ message: 'Error al obtener el producto.' });
  }
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
 */
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, stock, description, sku, category, images } = req.body;

    if (!name || !price || !stock || !sku || !category) {
      return res.status(400).json({ message: 'Faltan campos obligatorios.' });
    }

    const existingProduct = await ProductModel.findOne({ sku });
    if (existingProduct) {
      return res.status(409).json({ message: 'Ya existe un producto con ese SKU.' });
    }

    const newProduct = new ProductModel({
      name,
      price,
      stock,
      description,
      sku,
      category,
      images: images || [],
      status: 'activo',
    });

    await newProduct.save();
    res.status(201).json({ message: 'Producto creado con éxito.', product: newProduct });
  } catch (error) {
    console.error('[CREATE PRODUCT ERROR]', error);
    res.status(500).json({ message: 'Error al crear producto.' });
  }
};

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualiza un producto existente (solo admin)
 *     tags:
 *       - Products
 */
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const product = await ProductModel.findByIdAndUpdate(id, updatedData, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    res.status(200).json({ message: 'Producto actualizado con éxito.', product });
  } catch (error) {
    console.error('[UPDATE PRODUCT ERROR]', error);
    res.status(500).json({ message: 'Error al actualizar producto.' });
  }
};

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Elimina un producto (solo admin)
 *     tags:
 *       - Products
 */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    res.status(200).json({ message: 'Producto eliminado con éxito.' });
  } catch (error) {
    console.error('[DELETE PRODUCT ERROR]', error);
    res.status(500).json({ message: 'Error al eliminar producto.' });
  }
};
