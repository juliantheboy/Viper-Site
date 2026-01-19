import React from 'react';
import { STATUS_COLORS } from '../constants';
import { useProducts } from '../contexts/ProductContext';
import { Loader2 } from 'lucide-react';

export default function Status() {
  const { products, loading } = useProducts();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-viper-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 px-4 container mx-auto max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">System Status</h1>
        <p className="text-gray-400">Live service monitoring for all Viper products.</p>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden border border-white/10">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 bg-white/5 text-xs font-bold uppercase text-gray-400 tracking-wider">
          <div className="col-span-6 md:col-span-4">Product</div>
          <div className="col-span-3 md:col-span-3">Game</div>
          <div className="col-span-3 md:col-span-3">Status</div>
          <div className="hidden md:block md:col-span-2 text-right">Last Check</div>
        </div>

        {products.map((product, idx) => (
          <div 
            key={product.id}
            className={`grid grid-cols-12 gap-4 p-4 items-center border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${idx % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'}`}
          >
            <div className="col-span-6 md:col-span-4 font-bold text-white flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${
                product.status === 'Operational' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 
                product.status === 'Detected' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 
                'bg-yellow-500'
              }`}></div>
              {product.name}
            </div>
            <div className="col-span-3 md:col-span-3 text-gray-400 text-sm">{product.game}</div>
            <div className="col-span-3 md:col-span-3">
              <span className={`inline-block px-2 py-1 rounded text-xs font-bold border ${STATUS_COLORS[product.status]}`}>
                {product.status}
              </span>
            </div>
            <div className="hidden md:block md:col-span-2 text-right text-gray-500 text-sm font-mono">
              Just now
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-6 justify-center">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Operational
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
           <div className="w-2 h-2 rounded-full bg-yellow-500"></div> Maintenance
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
           <div className="w-2 h-2 rounded-full bg-red-500"></div> Detected
        </div>
      </div>
    </div>
  );
}