import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, User, Menu, X, LogIn } from 'lucide-react';
import { AuthContext } from '../App';
import AuthModal from './AuthModal';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-viper-bg/60 backdrop-blur-md border-b border-white/5 h-16 flex items-center">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Shield className="w-6 h-6 text-viper-primary group-hover:text-white transition-colors" />
            <span className="font-bold text-xl tracking-wider text-white">VIPER</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`text-sm font-medium uppercase tracking-wide transition-colors hover:text-viper-primary ${isActive('/') ? 'text-viper-primary' : 'text-gray-400'}`}
            >
              Home
            </Link>
            
            <Link 
              to="/store" 
              className={`text-sm font-medium uppercase tracking-wide transition-colors hover:text-viper-primary ${isActive('/store') ? 'text-viper-primary' : 'text-gray-400'}`}
            >
              Store
            </Link>

            <Link 
              to="/status" 
              className={`text-sm font-medium uppercase tracking-wide transition-colors hover:text-viper-primary ${isActive('/status') ? 'text-viper-primary' : 'text-gray-400'}`}
            >
              Status
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="hidden md:flex items-center gap-4">
                 <Link to="/dashboard" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white">
                    <User className="w-4 h-4" />
                    <span>{user.email.split('@')[0]}</span>
                 </Link>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden md:flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              >
                <LogIn className="w-4 h-4" />
                Login
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-gray-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-30 bg-viper-bg/95 backdrop-blur-xl md:hidden flex flex-col p-6 gap-6">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-gray-300">Home</Link>
          <Link to="/store" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-gray-300">Store</Link>
          <Link to="/status" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-gray-300">Status</Link>
          {user && <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-gray-300">Dashboard</Link>}
          
          <div className="mt-auto border-t border-white/10 pt-6">
             {user ? (
                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full text-left text-red-400 font-bold">Log Out</button>
             ) : (
                <button onClick={() => { setIsAuthModalOpen(true); setIsMenuOpen(false); }} className="w-full text-left text-viper-primary font-bold">Login / Register</button>
             )}
          </div>
        </div>
      )}

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}