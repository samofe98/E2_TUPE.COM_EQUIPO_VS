"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockUsers = void 0;
exports.mockUsers = [
    {
        id: 'user-1a2b3c4d5e',
        email: 'admin@tuecommerce.com',
        password: 'password1234', // todo eto es simulado
        name: 'Admin User',
        role: 'admin',
        isEmailConfirmed: true,
        address: {
            street: 'Calle 10 #20-30',
            city: 'Bello',
            state: 'Antioquia',
            postalCode: '051052',
            country: 'Colombia'
        }
    },
    {
        id: 'user-f6g7h8i9j0',
        email: 'client@tuecommerce.com',
        password: 'password1234',
        name: 'Normal User',
        role: 'user',
        isEmailConfirmed: true,
        address: {
            street: 'Carrera 50 #100-20',
            city: 'Medellin',
            state: 'Antioquia',
            postalCode: '050010',
            country: 'Colombia'
        }
    }
];
//# sourceMappingURL=mock-users-data.js.map