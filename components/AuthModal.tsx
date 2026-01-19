import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, User as UserIcon } from 'lucide-react';
import { AuthContext } from '../App';
import { authService } from '../services/authService';
import { useToast } from './ui/Toast';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: Props) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = isLogin 
        ? await authService.login(email, password)
        : await authService.register(email, password);
      
      login(user);
      addToast('success', isLogin ? 'System Access Granted' : 'Account Created Successfully');
      onClose();
    } catch (err: any) {
      addToast('error', err.message || 'Authentication Failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-md glass-panel rounded-xl overflow-hidden shadow-2xl"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white tracking-wide">
              {isLogin ? 'SYSTEM LOGIN' : 'NEW OPERATOR'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase text-gray-500 font-bold">Email Access</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="email" 
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:border-viper-primary focus:outline-none transition-colors"
                  placeholder="operator@viper.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase text-gray-500 font-bold">Passcode</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="password" 
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:border-viper-primary focus:outline-none transition-colors"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-viper-primary hover:bg-viper-primary-dark text-white font-bold py-3 rounded-lg transition-all shadow-[0_0_15px_rgba(99,102,241,0.25)] mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Authenticating...' : (isLogin ? 'Establish Connection' : 'Register Identity')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-gray-400 hover:text-viper-primary transition-colors"
            >
              {isLogin ? "Need access? Join the network" : "Already an operator? Login"}
            </button>
          </div>
        </div>
        
        {/* Decorative Bottom Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-viper-primary to-transparent opacity-50"></div>
      </motion.div>
    </div>
  );
}
