"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.login = exports.register = void 0;
const mock_users_data_1 = require("../data/mock-users.data");
// Datos simulados para esta entrega
let mockUserDB = [...mock_users_data_1.mockUsers];
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
const register = (req, res) => {
    const { email, password, name } = req.body;
    if (mockUserDB.some(user => user.email === email)) {
        return res.status(409).json({ message: 'El correo electrónico ya está registrado.' });
    }
    const newUser = {
        id: `user-${Math.random().toString(36).substr(2, 9)}`,
        email,
        password, // OJO: En la vida real, se debería hashear la contraseña
        name,
        role: 'user',
        isEmailConfirmed: false,
        address: {}
    };
    mockUserDB.push(newUser);
    res.status(201).json({ message: 'Usuario registrado con éxito. Confirme su email.' });
};
exports.register = register;
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
const login = (req, res) => {
    const { email, password } = req.body;
    const user = mockUserDB.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }
    // Simulación de JWT
    const accessToken = 'mock-access-token';
    const refreshToken = 'mock-refresh-token';
    res.status(200).json({
        message: 'Login exitoso',
        accessToken,
        refreshToken
    });
};
exports.login = login;
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
const getUserProfile = (req, res) => {
    const { id } = req.params;
    const user = mockUserDB.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    // No se debe enviar la contraseña al cliente
    const { password } = user, userWithoutPassword = __rest(user, ["password"]);
    res.status(200).json(userWithoutPassword);
};
exports.getUserProfile = getUserProfile;
//# sourceMappingURL=user.controller.js.map