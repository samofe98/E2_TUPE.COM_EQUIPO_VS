import swaggerJsdoc from 'swagger-jsdoc';
import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
    openapi: '3.0.0',
    info: {
        title: 'Plataforma E-commerce TUPE.COM API',
        version: '1.0.0',
        description: 'API REST para la plataforma de e-commerce TUPE.COM. ',
    },
    servers: [
        {
            url: 'http://localhost:3000/api/v1',
            description: 'Servidor de desarrollo',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            Product: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    price: { type: 'number' },
                    stock: { type: 'number' },
                    description: { type: 'string' },
                    status: { type: 'string', enum: ['activo', 'descontinuado'] },
                    sku: { type: 'string' },
                    images: { type: 'array', items: { type: 'string' } },
                    category: { type: 'string' },
                },
            },
            Cart: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    userId: { type: 'string' },
                    items: { type: 'array', items: { $ref: '#/components/schemas/CartItem' } },
                    total: { type: 'number' },
                },
            },
            CartItem: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    productId: { type: 'string' },
                    quantity: { type: 'number' },
                    price: { type: 'number' },
                },
            },
            Order: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    userId: { type: 'string' },
                    items: { type: 'array', items: { $ref: '#/components/schemas/OrderItem' } },
                    total: { type: 'number' },
                    status: { type: 'string', enum: ['PENDIENTE', 'PAGADO', 'EN_CAMINO', 'ENTREGADO', 'CANCELADO'] },
                    shippingAddress: { type: 'object' },
                    createdAt: { type: 'string', format: 'date-time' },
                },
            },
            OrderItem: {
                type: 'object',
                properties: {
                    productId: { type: 'string' },
                    quantity: { type: 'number' },
                    price: { type: 'number' },
                },
            },
            Shipment: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    orderId: { type: 'string' },
                    trackingNumber: { type: 'string' },
                    carrier: { type: 'string' },
                    status: { type: 'string', enum: ['PENDIENTE', 'PREPARANDO', 'EN_TRANSITO', 'EN_ENTREGA', 'ENTREGADO', 'CANCELADO'] },
                    estimatedDelivery: { type: 'string', format: 'date' },
                },
            },
            User: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string' },
                    name: { type: 'string' },
                    role: { type: 'string', enum: ['user', 'admin'] },
                    isEmailConfirmed: { type: 'boolean' },
                    address: { type: 'object' },
                },
            },
            UserProfile: {
                type: 'object',
                properties: {
                    id: { type: 'string', description: 'El ID único del usuario.' },
                    email: { type: 'string', format: 'email', description: 'El correo electrónico del usuario.' },
                    name: { type: 'string', description: 'El nombre completo del usuario.' },
                    role: { type: 'string', enum: ['user', 'admin'], description: 'El rol del usuario.' },
                    isEmailConfirmed: { type: 'boolean', description: 'Indica si el correo electrónico del usuario ha sido confirmado.' },
                    address: { type: 'object', description: 'La dirección de envío del usuario.' },
                },
            },
        },
    },
    apis: [
        './src/routes/*.ts',
        './src/controllers/*.ts',
        './src/models/*.ts'
    ],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);