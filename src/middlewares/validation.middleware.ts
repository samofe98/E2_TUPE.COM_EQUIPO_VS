import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';

/**
 * Middleware para validar los resultados de express-validator
 */
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/**
 * Validaciones para crear un producto
 * @example
 * router.post('/products', authenticateUser, isAdmin, validateCreateProduct, createProduct)
 */
export const validateCreateProduct = [
  body('name').isString().notEmpty(),
  body('price').isNumeric().custom(value => value > 0),
  body('stock').isInt({ min: 0 }),
  body('sku').isString().notEmpty(),
  body('category').isString().notEmpty(),
  validate
];

/**
 * Validaciones para actualizar un producto
 * @example
 * router.put('/products/:id', authenticateUser, isAdmin, validateUpdateProduct, updateProduct)
 */
export const validateUpdateProduct = [
  param('id').isMongoId(),
  body('price').optional().isNumeric(),
  body('stock').optional().isInt({ min: 0 }),
  validate
];

/**
 * Validaciones para checkout
 * @example
 * router.post('/orders/checkout', authenticateUser, validateCheckout, checkout)
 */
export const validateCheckout = [
  body('shippingAddress').isObject(),
  body('shippingAddress.street').isString().notEmpty(),
  body('shippingAddress.city').isString().notEmpty(),
  validate
];

/**
 * Validaciones para actualizar el estado de un envío
 * @example
 * router.put('/shipments/:orderId', authenticateUser, isAdmin, validateShipmentStatus, updateShipmentStatus)
 */
export const validateShipmentStatus = [
  param('orderId').isMongoId(),
  body('status').isIn(['PENDIENTE','PREPARANDO','EN_TRANSITO','EN_ENTREGA','ENTREGADO','CANCELADO']),
  validate
];
