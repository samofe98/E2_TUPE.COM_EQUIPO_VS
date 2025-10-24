import app from './app';
import http from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 3000;

// Crear el servidor HTTP a partir de Express
const httpServer = http.createServer(app);

// Crear instancia de Socket.IO
export const io = new Server(httpServer, {
  cors: {
    origin: '*', // Cambiar a tu dominio frontend
    methods: ['GET', 'POST'],
  },
});

// Conexión de clientes
io.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  // Ejemplo: unirse a un room por usuario
  socket.on('joinRoom', (userId: string) => {
    socket.join(`user_${userId}`);
  });

  socket.on('disconnect', () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});

// Reemplaza app.listen por httpServer.listen
httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
