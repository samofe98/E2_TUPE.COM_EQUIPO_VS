import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string };
    }
  }
}

/**
 * Middleware para verificar que el usuario sea administrador
 * 
 * @example
 * // Uso en rutas
 * router.post(
 *   '/products',
 *   authenticateUser,
 *   isAdmin, // protege esta ruta solo para admin
 *   createProduct
 * );
 * 
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  console.log('Middleware de autorización de rol ejecutado.');
  
  if (req.user && req.user.role === 'admin') {
    return next();
  }

  return res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador.' });
};

/**
 * Middleware más flexible que permite múltiples roles
 * 
 * @param roles Lista de roles permitidos
 * @returns Middleware
 * 
 * @example
 * router.put(
 *   '/orders/:id',
 *   authenticateUser,
 *   authorizeRoles('admin', 'manager'),
 *   updateOrder
 * );
 */
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user && roles.includes(req.user.role)) {
      return next();
    }
    return res.status(403).json({ message: 'Acceso denegado.' });
  };
};
