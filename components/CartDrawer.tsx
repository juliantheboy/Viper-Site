import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, CreditCard, Lock } from 'lucide-react';
import { CartContext, AuthContext } from '../App';
import { useProducts } from '../contexts/ProductContext';
import { storeService } from '../services/storeService';
import { useToast } from './ui/Toast';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { cart, removeFromCart, clearCart, cartTotal, isCartOpen, setIsCartOpen } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { products } = useProducts();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      addToast('error', 'Login required to checkout');
      return;
    }

    setIsCheckingOut(true);
    try {
      await storeService.checkout(user.id, cart, cartTotal);
      clearCart();
      setIsCartOpen(false);
      navigate('/dashboard');
      addToast('success', 'Order successful! Licenses delivered.');
    } catch (e) {
      addToast('error', 'Checkout failed. Try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const getProductDetails = (id: string) => products.find(p => p.id === id);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-viper-surface z-50 border-l border-white/10 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShoppingBagIcon /> Your Loadout
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-50">
                  <ShoppingBagIcon size={48} />
                  <p className="mt-4">Cart Empty</p>
                </div>
              ) : (
                cart.map((item, index) => {
                  const product = getProductDetails(item.productId);
                  if (!product) return null;
                  return (
                    <div key={index} className="flex gap-4 bg-white/5 p-3 rounded-lg border border-white/5">
                      <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded bg-black" />
                      <div className="flex-1">
                        <h4 className="font-bold text-sm text-white">{product.name}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-viper-primary bg-viper-primary/10 px-2 py-0.5 rounded">{item.pricing.duration}</span>
                          <span className="text-white font-mono">${item.pricing.price}</span>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(index)} className="text-gray-500 hover:text-red-400 px-2">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            <div className="p-6 border-t border-white/10 bg-black/20">
              <div className="flex justify-between items-center mb-6 text-lg font-bold">
                <span>Total</span>
                <span className="text-viper-primary font-mono">${cartTotal.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleCheckout}
                disabled={cart.length === 0 || isCheckingOut}
                className="w-full bg-viper-primary hover:bg-viper-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)]"
              >
                 {isCheckingOut ? (
                   <span className="animate-pulse">Processing...</span>
                 ) : (
                   <>
                     <CreditCard className="w-4 h-4" /> Secure Checkout
                   </>
                 )}
              </button>
              <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> 256-bit SSL Encrypted Transaction
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const ShoppingBagIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);