import { Product } from '../models/product.model';

export const mockProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Teclado Mecánico RGB',
    price: 350000,
    stock: 25,
    description: 'Teclado de alta calidad con switches marrones.',
    status: 'activo',
    sku: 'SKU-TCL-001',
    images: ['https://example.com/images/prod-001a.jpg', 'https://example.com/images/prod-001b.jpg'],
    category: 'Accesorios',
  },
  {
    id: 'prod-002',
    name: 'Monitor Curvo 27"',
    price: 1200000,
    stock: 0, // Sin stock
    description: 'Monitor con alta tasa de refresco para gamers.',
    status: 'activo',
    sku: 'SKU-MNT-002',
    images: ['https://example.com/images/prod-002a.jpg'],
    category: 'Monitores',
  },
  {
    id: 'prod-003',
    name: 'Mouse Ergonómico',
    price: 85000,
    stock: 50,
    description: 'Mouse diseñado para largas horas de uso sin fatiga.',
    status: 'descontinuado', // Descontinuado
    sku: 'SKU-MSE-003',
    images: ['https://example.com/images/prod-003a.jpg'],
    category: 'Accesorios',
  },
];