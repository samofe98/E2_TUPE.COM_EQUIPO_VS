import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'mi_clave_super_segura';
const JWT_EXPIRES_IN = '2h';

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
 * '409':
 * description: El email ya está registrado.
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    // Verificar si ya existe
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'El correo electrónico ya está registrado.' });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = new UserModel({
      email,
      password: hashedPassword,
      name,
      role: 'user',
      isEmailConfirmed: false,
      address: {}
    });

    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado con éxito. Confirme su email.' });
  } catch (error) {
    console.error('[REGISTER ERROR]', error);
    res.status(500).json({ message: 'Error al registrar usuario.' });
  }
};

/**
 * @swagger
 * /users/login:
 * post:
 * summary: Inicia sesión y retorna tokens JWT
 * tags:
 * - Users
 * responses:
 * '200':
 * description: Login exitoso
 * '401':
 * description: Credenciales incorrectas
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }

    // Validar contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }

    // Generar token
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({
      message: 'Login exitoso',
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('[LOGIN ERROR]', error);
    res.status(500).json({ message: 'Error al iniciar sesión.' });
  }
};

/**
 * @swagger
 * /users/{id}:
 * get:
 * summary: Obtiene el perfil del usuario por ID
 * tags:
 * - Users
 */
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('[PROFILE ERROR]', error);
    res.status(500).json({ message: 'Error al obtener perfil.' });
  }
};
