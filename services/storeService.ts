import { CartItem, Order, InventoryItem } from '../types';
import { authService } from './authService';

const ORDERS_KEY = 'viper_orders';

export const storeService = {
  checkout: async (userId: string, cartItems: CartItem[], total: number): Promise<Order> => {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newOrder: Order = {
      id: crypto.randomUUID(),
      userId,
      items: cartItems,
      total,
      date: Date.now()
    };

    // Save order
    const ordersStr = localStorage.getItem(ORDERS_KEY);
    const orders: Order[] = ordersStr ? JSON.parse(ordersStr) : [];
    orders.push(newOrder);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

    // Generate licenses and add to user inventory
    cartItems.forEach(item => {
      const inventoryItem: InventoryItem = {
        id: crypto.randomUUID(),
        productId: item.productId,
        productName: 'Unknown Product', // In real app lookup product
        licenseKey: `VIPER-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
        purchaseDate: Date.now(),
        expiryDate: Date.now() + (item.pricing.duration === 'Day' ? 86400000 : item.pricing.duration === 'Week' ? 604800000 : 2592000000)
      };
      
      // Basic lookup to fix name
      // In a real app we'd query the DB properly
      import('../constants').then(({ PRODUCTS }) => {
        const prod = PRODUCTS.find(p => p.id === item.productId);
        if (prod) inventoryItem.productName = prod.name;
        authService.updateUserInventory(userId, inventoryItem);
      });
    });

    return newOrder;
  }
};
