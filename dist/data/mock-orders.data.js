"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockOrders = void 0;
exports.mockOrders = [
    {
        id: 'ORD-20250824-00001',
        userId: 'user-f6g7h8i9j0',
        status: 'EN_TRANSITO',
        items: [
            {
                productId: 'prod-001',
                quantity: 1,
                priceAtPurchase: 350000
            }
        ],
        total: 350000,
        trackingNumber: 'TRK-20250824-00001',
        createdAt: new Date('2025-08-24T10:00:00Z'),
        updatedAt: new Date('2025-08-25T14:30:00Z'),
    },
    {
        id: 'ORD-20250823-00002',
        userId: 'user-f6g7h8i9j0',
        status: 'ENTREGADO',
        items: [
            {
                productId: 'prod-003',
                quantity: 2,
                priceAtPurchase: 85000
            }
        ],
        total: 170000,
        trackingNumber: 'TRK-20250823-00002',
        createdAt: new Date('2025-08-23T08:00:00Z'),
        updatedAt: new Date('2025-08-24T12:00:00Z'),
    },
];
//# sourceMappingURL=mock-orders.data.js.map