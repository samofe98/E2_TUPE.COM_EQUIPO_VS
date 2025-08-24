export interface UserAddress {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface User {
  id: string;
  email: string;
  password?: string; // Opcional para evitar enviar al cliente
  name: string;
  role: 'admin' | 'user';
  isEmailConfirmed: boolean;
  address: UserAddress;
  createdAt?: Date;
  updatedAt?: Date;
}