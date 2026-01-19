import React, { useState, useEffect, createContext, useMemo } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { User, CartItem } from './types';
import { authService } from './services/authService';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Store from './pages/Store';
import ProductDetails from './pages/ProductDetails';
import Status from './pages/Status';
import Dashboard from './pages/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';
import ToastContainer, { useToast } from './components/ui/Toast';
import CookieBanner from './components/CookieBanner';
import CartDrawer from './components/CartDrawer';
import { ProductProvider } from './contexts/ProductContext';

// --- Contexts ---
interface AuthContextType {
  user: User | null;
  login: (u: User) => void;
  logout: () => void;
}
export const AuthContext = createContext<AuthContextType>({ user: null, login: () => {}, logout: () => {} });

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  cartTotal: 0,
  isCartOpen: false,
  setIsCartOpen: () => {},
});

// --- Main App Logic ---
const AppContent = () => {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const { addToast } = useToast();

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Initialize cart from storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('viper_cart');
      if (saved) setCart(JSON.parse(saved));
    } catch (e) {
      console.error('Failed to load cart', e);
    }
  }, []);

  // Persist cart
  useEffect(() => {
    localStorage.setItem('viper_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(p => p.productId === item.productId && p.pricing.duration === item.pricing.duration);
      if (existingIdx >= 0) {
        const newCart = [...prev];
        newCart[existingIdx].quantity += item.quantity;
        return newCart;
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
    addToast('success', 'Added to cart');
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.pricing.price * item.quantity), 0);
  }, [cart]);

  useEffect(() => {
    const loadedUser = authService.getCurrentUser();
    if (loadedUser) setUser(loadedUser);
  }, []);

  const login = (u: User) => setUser(u);
  const logout = () => {
    authService.logout();
    setUser(null);
    addToast('success', 'Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal, isCartOpen, setIsCartOpen }}>
        <div className="min-h-screen flex flex-col relative font-sans text-gray-200">
          <Navbar />
          <CartDrawer />
          
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/store" element={<Store />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/status" element={<Status />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </AnimatePresence>
          </main>

          <footer className="py-8 text-center text-white/20 text-sm border-t border-white/5 bg-black/40 backdrop-blur-md">
            <p>&copy; {new Date().getFullYear()} VIPER CHEATS. All Systems Operational.</p>
          </footer>
          
          <CookieBanner />
        </div>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <ProductProvider>
        <ToastContainer>
          <HashRouter>
            <AppContent />
          </HashRouter>
        </ToastContainer>
      </ProductProvider>
    </ErrorBoundary>
  );
}