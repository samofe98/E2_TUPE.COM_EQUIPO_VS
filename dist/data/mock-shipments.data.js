"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockShipments = void 0;
exports.mockShipments = [
    {
        orderId: 'ORD-20250824-00001',
        trackingNumber: 'TRK-20250824-00001',
        status: 'EN_TRANSITO',
        history: [
            { status: 'PENDIENTE', timestamp: new Date('2025-08-24T10:00:00Z') },
            { status: 'PREPARANDO', timestamp: new Date('2025-08-24T12:00:00Z') },
            { status: 'EN_TRANSITO', timestamp: new Date('2025-08-25T14:30:00Z') }
        ]
    },
    {
        orderId: 'ORD-20250823-00002',
        trackingNumber: 'TRK-20250823-00002',
        status: 'ENTREGADO',
        history: [
            { status: 'PENDIENTE', timestamp: new Date('2025-08-23T08:00:00Z') },
            { status: 'PREPARANDO', timestamp: new Date('2025-08-23T09:00:00Z') },
            { status: 'EN_TRANSITO', timestamp: new Date('2025-08-23T10:00:00Z') },
            { status: 'EN_ENTREGA', timestamp: new Date('2025-08-24T11:00:00Z') },
            { status: 'ENTREGADO', timestamp: new Date('2025-08-24T12:00:00Z') }
        ]
    }
];
//# sourceMappingURL=mock-shipments.data.js.map