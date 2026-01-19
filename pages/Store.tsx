import React, { useMemo } from 'react';
import { STATUS_COLORS } from '../constants';
import { motion } from 'framer-motion';
import { useProducts } from '../contexts/ProductContext';
import { Loader2, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

export default function Store() {
  const { products, loading, error } = useProducts();

  // Group products by category
  const categories = useMemo(() => {
    if (!products.length) return {};
    
    return products.reduce((acc, product) => {
      const cat = product.category || 'Other';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(product);
      return acc;
    }, {} as Record<string, Product[]>);
  }, [products]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-viper-primary animate-spin" />
      </div>
    );
  }

  // Error Handling / Empty State
  if (error || products.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass-panel p-12 rounded-2xl border-white/5"
        >
          <div className="w-20 h-20 bg-viper-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-10 h-10 text-viper-primary" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Coming Soon</h1>
          <p className="text-gray-400 text-lg mb-8">
            Our store is currently being updated with the latest elite software. Check back shortly.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            System Synchronizing
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 px-4 container mx-auto">
      <div className="mb-16 text-center">
         <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4">
           Digital Armory
         </h1>
         <p className="text-gray-400 max-w-2xl mx-auto text-lg">
           Select your loadout. Instant delivery via secure channels.
         </p>
      </div>

      <div className="space-y-16">
        {Object.entries(categories).map(([categoryName, items], catIndex) => (
          <motion.section 
            key={categoryName}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIndex * 0.1 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-white uppercase tracking-wider">{categoryName}</h2>
              <div className="h-px bg-gradient-to-r from-viper-primary/50 to-transparent flex-1"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((product) => (
                <div 
                  key={product.id}
                  className="glass-card rounded-xl overflow-hidden group flex flex-col border border-white/5 hover:border-viper-primary/50 transition-all duration-300"
                >
                  {/* Image Area */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute top-3 right-3 z-10">
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase border backdrop-blur-md ${STATUS_COLORS[product.status] || 'text-gray-400 border-gray-700 bg-gray-900/50'}`}>
                        {product.status}
                      </span>
                    </div>
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-viper-surface via-transparent to-transparent opacity-90"></div>
                    
                    <div className="absolute bottom-4 left-4 right-4">
                       <h3 className="text-xl font-bold text-white group-hover:text-viper-primary transition-colors truncate">{product.name}</h3>
                       <p className="text-xs text-gray-400 uppercase tracking-widest">{product.game}</p>
                    </div>
                  </div>
                  
                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-gray-400 text-sm mb-6 line-clamp-2 flex-grow">{product.description}</p>
                    
                    <div className="flex items-center justify-between gap-3 mt-4 pt-4 border-t border-white/5">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 uppercase font-bold">Price</span>
                        <span className="text-white font-bold text-xl">${product.pricing[0].price}</span>
                      </div>
                      
                      <button
                        data-sh-product={product.sellhubId}
                        data-sh-theme="dark"
                        data-sh-modal="true"
                        className="sh-pub-button px-6 py-2.5 bg-viper-primary hover:bg-viper-primary-dark text-white rounded-lg transition-all text-sm font-bold shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transform hover:-translate-y-0.5"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}