import { Request, Response, NextFunction } from 'express';

// Middleware de autenticación simulado
export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  // para esta entrega solo vamos a simular la lógica.
  console.log('Middleware de autenticación ejecutado.');
  req.user = { id: 'mock-user-id', role: 'admin' }; // Simulación de usuario
  next(); 
};