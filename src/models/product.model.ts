export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  status: 'activo' | 'descontinuado';
  sku: string;
  images: string[];
  category: string;
}