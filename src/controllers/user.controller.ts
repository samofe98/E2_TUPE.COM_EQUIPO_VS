import { Request, Response } from 'express';
import { mockUsers } from '../data/mock-users.data';
import { User } from '../models/user.model';

let mockUserDB = [...mockUsers];

/**
 * @swagger
 * /users/register:
 * post:
 * summary: Registra un nuevo usuario en la plataforma
 * tags:
 * - Users
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - name
 * - email
 * - password
 * properties:
 * name:
 * type: string
 * example: Santiago
 * email:
 * type: string
 * format: email
 * example: santiago@example.com
 * password:
 * type: string
 * format: password
 * example: password1234
 * responses:
 * '201':
 * description: Usuario registrado con éxito.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: 'Usuario registrado con éxito. Confirme su email.'
 * '409':
 * description: El email ya está registrado.
 */
export const register = (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    
    if (mockUserDB.some(user => user.email === email)) {
        return res.status(409).json({ message: 'El correo electrónico ya está registrado.' });
    }

    const newUser: User = {
        id: `user-${Math.random().toString(36).substr(2, 9)}`,
        email,
        password,
        name,
        role: 'user',
        isEmailConfirmed: false,
        address: {}
    };

    mockUserDB.push(newUser);
    res.status(201).json({ message: 'Usuario registrado con éxito. Confirme su email.' });
};

/**
 * @swagger
 * /users/login:
 * post:
 * summary: Inicia sesión de un usuario y retorna tokens JWT
 * tags:
 * - Users
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - email
 * - password
 * properties:
 * email:
 * type: string
 * format: email
 * example: client@tuecommerce.com
 * password:
 * type: string
 * format: password
 * example: password1234
 * responses:
 * '200':
 * description: Login exitoso
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: 'Login exitoso'
 * accessToken:
 * type: string
 * example: 'mock-access-token'
 * refreshToken:
 * type: string
 * example: 'mock-refresh-token'
 * '401':
 * description: Credenciales incorrectas
 */
export const login = (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = mockUserDB.find(u => u.email === email && u.password === password);
    
    if (!user) {
        return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }

    const accessToken = 'mock-access-token';
    const refreshToken = 'mock-refresh-token';

    res.status(200).json({
        message: 'Login exitoso',
        accessToken,
        refreshToken
    });
};

/**
 * @swagger
 * /users/{id}:
 * get:
 * summary: Obtiene el perfil de un usuario por su ID
 * tags:
 * - Users
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: El ID único del usuario
 * responses:
 * '200':
 * description: Perfil de usuario obtenido con éxito
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/UserProfile'
 * '401':
 * description: No autorizado
 * '404':
 * description: Usuario no encontrado
 */
export const getUserProfile = (req: Request, res: Response) => {
    const { id } = req.params;
    const user = mockUserDB.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    
    const { password, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
};