export enum UserRole {
  USER = 'user',
  OWNER = 'owner'
}

export enum ProductStatus {
  OPERATIONAL = 'Operational',
  MAINTENANCE = 'Maintenance',
  UPDATING = 'Updating',
  DETECTED = 'Detected'
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  balance: number;
  inventory: InventoryItem[];
  loginLogs: LoginLog[];
  createdAt: number;
}

export interface LoginLog {
  timestamp: number;
  ip: string; // Simulated
}

export interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  licenseKey: string;
  purchaseDate: number;
  expiryDate: number;
}

export interface Product {
  id: string;
  name: string;
  game: string;
  category: string; // Added for auto-categorization
  status: ProductStatus;
  description: string;
  features: string[];
  imageUrl: string;
  pricing: ProductPricing[];
  sellhubId: string; // Sellhub Product ID
}

export interface ProductPricing {
  duration: 'Day' | 'Week' | 'Month' | 'Lifetime' | 'License';
  price: number;
}

export interface CartItem {
  productId: string;
  pricing: ProductPricing;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  date: number;
}

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}