import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string, role: string };
    }
  }
}

// Middleware de autorización por rol
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  // En esta entrega solo simulamos la lógica.
  console.log('Middleware de autorización de rol ejecutado.');
  
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: "Acceso denegado. Se requiere rol de administrador." });
  }
};