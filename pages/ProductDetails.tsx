import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { STATUS_COLORS } from '../constants';
import { Check, Shield, CreditCard, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProducts } from '../contexts/ProductContext';

export default function ProductDetails() {
  const { id } = useParams();
  const { products, loading } = useProducts();
  const [selectedPriceIdx, setSelectedPriceIdx] = useState(0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-viper-primary animate-spin" />
      </div>
    );
  }

  const product = products.find(p => p.id === id);
  if (!product) return <Navigate to="/store" />;

  return (
    <div className="pt-24 pb-12 px-4 container mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left: Image */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative h-[400px] lg:h-[600px]"
        >
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-viper-bg via-transparent to-transparent opacity-50"></div>
        </motion.div>

        {/* Right: Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className={`px-3 py-1 rounded text-xs font-bold uppercase border ${STATUS_COLORS[product.status]}`}>
                {product.status}
              </span>
              <span className="text-gray-500 font-mono text-sm uppercase">{product.game}</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">{product.name}</h1>
            <p className="text-gray-400 text-lg leading-relaxed">{product.description}</p>
          </div>

          <div className="glass-panel p-6 rounded-xl">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-viper-primary" /> Feature List
            </h3>
            <ul className="grid grid-cols-2 gap-3">
              {product.features.map(feat => (
                <li key={feat} className="flex items-center gap-2 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-500" /> {feat}
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing Selector */}
          <div className="space-y-4">
            <h3 className="text-white font-bold">Select Duration</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {product.pricing.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPriceIdx(idx)}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-all ${
                    selectedPriceIdx === idx 
                      ? 'bg-viper-primary/20 border-viper-primary shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <span className={`text-sm font-bold mb-1 ${selectedPriceIdx === idx ? 'text-viper-primary' : 'text-gray-400'}`}>
                    {p.duration}
                  </span>
                  <span className="text-white font-bold text-xl">${p.price}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            {/* Sellhub Embed Button */}
            <button 
              data-sh-product={product.sellhubId}
              data-sh-theme="dark"
              data-sh-modal="true"
              className="sh-pub-button w-full bg-viper-primary hover:bg-viper-primary-dark text-white font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-3 transition-colors shadow-[0_0_20px_rgba(99,102,241,0.4)]"
            >
              <CreditCard className="w-5 h-5" /> Buy Now with Sellhub
            </button>
          </div>
          <p className="text-center text-gray-500 text-xs mt-4">
             Instant delivery via email and dashboard. Secure checkout powered by Sellhub.
          </p>
        </motion.div>
      </div>
    </div>
  );
}