import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'mi_clave_super_segura';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string };
    }
  }
}

/**
 * Middleware para verificar el token JWT
 * 
 * @example
 * router.get('/orders', authenticateUser, getUserOrders);
 * 
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token no proporcionado.' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Formato de token inválido.' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado.' });
  }
};

/**
 * Middleware para verificar roles permitidos
 * @param allowedRoles Lista de roles permitidos
 * 
 * @example
 * router.put('/products/:id', authenticateUser, authorizeRoles('admin'), updateProduct);
 */
export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta.' });
    }
    next();
  };
};
