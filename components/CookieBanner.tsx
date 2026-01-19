import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('viper_cookies_accepted');
    if (!hasAccepted) setAccepted(false);
  }, []);

  const accept = () => {
    localStorage.setItem('viper_cookies_accepted', 'true');
    setAccepted(true);
  };

  return (
    <AnimatePresence>
      {!accepted && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 right-4 z-40 max-w-sm w-full"
        >
          <div className="glass-panel p-5 rounded-lg border-l-4 border-l-viper-primary shadow-2xl">
            <h4 className="font-bold text-white mb-2">System Tracking</h4>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              We use local storage protocols to maintain session integrity and shopping cart data. By continuing, you accept our data retention policy.
            </p>
            <button 
              onClick={accept}
              className="w-full bg-white/10 hover:bg-white/20 text-white text-xs uppercase font-bold py-2 rounded transition-colors"
            >
              Acknowledge
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
