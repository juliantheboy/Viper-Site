import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, ShieldCheck, Zap, MessageSquare, Users, Globe } from 'lucide-react';
import { EXTERNAL_LINKS } from '../constants';
import { useProducts } from '../contexts/ProductContext';

export default function Home() {
  const { products } = useProducts();
  const featuredGames = Array.from(new Set(products.map(p => p.game))).slice(0, 4);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4">
        {/* Background Blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-viper-primary/20 rounded-full blur-[128px] animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] animate-blob animation-delay-2000"></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6 animate-pulse">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                System Operational
             </div>
             
             <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 mb-6 tracking-tight">
               VIPER CHEATS
             </h1>
             
             <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
               Dominate the competition with elite, kernel-level software. 
               Undetected. Powerful. Secure.
             </p>

             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Link 
                 to="/store"
                 className="w-full sm:w-auto px-8 py-4 bg-viper-primary hover:bg-viper-primary-dark text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(99,102,241,0.4)] flex items-center justify-center gap-2"
               >
                 Access Store <ArrowRight className="w-5 h-5" />
               </Link>
               <a 
                 href={EXTERNAL_LINKS.DISCORD}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg border border-white/10 transition-all flex items-center justify-center gap-2"
               >
                 <MessageSquare className="w-5 h-5" /> Join Discord
               </a>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8 text-viper-primary" />}
              title="Undetected Security"
              desc="Kernel-level drivers ensuring maximum security against anti-cheat systems."
            />
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-viper-primary" />}
              title="Instant Delivery"
              desc="Automated system delivers your license key immediately after purchase."
            />
            <FeatureCard 
              icon={<Cpu className="w-8 h-8 text-viper-primary" />}
              title="High Performance"
              desc="Optimized code with zero impact on your game's FPS or latency."
            />
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-24 relative border-y border-white/5 bg-gradient-to-b from-viper-bg to-viper-surface">
         <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Join the Elite</h2>
            <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
               Connect with thousands of other users on our Discord server. Get support, request features, and share configs.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
               <div className="bg-white/5 p-6 rounded-xl border border-white/5 flex flex-col items-center">
                  <Users className="w-10 h-10 text-viper-primary mb-4" />
                  <h3 className="font-bold text-white mb-2">Active Community</h3>
                  <p className="text-sm text-gray-500">24/7 active voice chats and discussions.</p>
               </div>
               <div className="bg-white/5 p-6 rounded-xl border border-white/5 flex flex-col items-center">
                  <Globe className="w-10 h-10 text-viper-primary mb-4" />
                  <h3 className="font-bold text-white mb-2">Global Support</h3>
                  <p className="text-sm text-gray-500">Staff available in multiple timezones.</p>
               </div>
               <div className="bg-white/5 p-6 rounded-xl border border-white/5 flex flex-col items-center">
                  <MessageSquare className="w-10 h-10 text-viper-primary mb-4" />
                  <h3 className="font-bold text-white mb-2">Ticket Support</h3>
                  <p className="text-sm text-gray-500">Private ticket system for customer help.</p>
               </div>
            </div>
            <div className="mt-12">
               <a href={EXTERNAL_LINKS.DISCORD} target="_blank" className="inline-flex items-center gap-2 text-viper-primary hover:text-white font-bold transition-colors">
                  Join Server <ArrowRight className="w-4 h-4" />
               </a>
            </div>
         </div>
      </section>

      {/* Supported Games */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Supported Titles</h2>
          {products.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {featuredGames.map((game, i) => (
                 <Link to={`/store?game=${game}`} key={i} className="group relative h-40 rounded-xl overflow-hidden border border-white/10 hover:border-viper-primary/50 transition-all">
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
                   <img 
                      src={products.find(p => p.game === game)?.imageUrl} 
                      alt={game}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                   />
                   <div className="absolute bottom-4 left-4 z-20">
                     <h3 className="font-bold text-white text-lg">{game}</h3>
                   </div>
                 </Link>
               ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="glass-card p-8 rounded-xl">
      <div className="bg-viper-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}