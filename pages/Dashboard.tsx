import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { authService } from '../services/authService';
import { User, InventoryItem, LoginLog } from '../types';
import { Copy, Key, Shield, Clock } from 'lucide-react';
import { useToast } from '../components/ui/Toast';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState<'inventory' | 'security'>('inventory');
  const [currentUserData, setCurrentUserData] = useState<User | null>(null);
  const { addToast } = useToast();

  // Re-fetch user data on mount to get latest inventory
  useEffect(() => {
    const u = authService.getCurrentUser();
    if (u) setCurrentUserData(u);
  }, [user]); // Re-run if auth context changes

  if (!user) return <Navigate to="/" />;
  
  // Use local state if available (more fresh), else context
  const displayUser = currentUserData || user;

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    addToast('success', 'License key copied to clipboard');
  };

  return (
    <div className="pt-24 pb-12 px-4 container mx-auto max-w-5xl">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-viper-primary to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
          {displayUser.email.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Operator Dashboard</h1>
          <p className="text-gray-400">Welcome back, {displayUser.email}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'inventory' ? 'bg-viper-primary text-white' : 'hover:bg-white/5 text-gray-400'}`}
          >
            Inventory
          </button>
          <button 
             onClick={() => setActiveTab('security')}
             className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'security' ? 'bg-viper-primary text-white' : 'hover:bg-white/5 text-gray-400'}`}
          >
            Security Log
          </button>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          {activeTab === 'inventory' && (
            <div className="glass-panel rounded-xl p-6 min-h-[400px]">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Key className="w-5 h-5 text-viper-primary" /> Active Licenses
              </h2>
              
              {displayUser.inventory.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p>No licenses found in your inventory.</p>
                  <p className="text-sm mt-2">Purchase a product from the store to get started.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {displayUser.inventory.slice().reverse().map((item: InventoryItem) => (
                    <div key={item.id} className="bg-white/5 border border-white/5 rounded-lg p-4 hover:border-white/10 transition-colors">
                       <div className="flex justify-between items-start mb-3">
                          <h3 className="font-bold text-white">{item.productName}</h3>
                          <span className={`text-xs px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/20`}>
                            Active
                          </span>
                       </div>
                       
                       <div className="bg-black/50 p-3 rounded border border-white/5 flex justify-between items-center mb-3">
                         <code className="text-gray-300 font-mono text-sm tracking-wide break-all mr-4">{item.licenseKey}</code>
                         <button onClick={() => copyKey(item.licenseKey)} className="text-gray-400 hover:text-white transition-colors">
                           <Copy className="w-4 h-4" />
                         </button>
                       </div>
                       
                       <div className="flex gap-6 text-xs text-gray-500">
                          <span>Purchased: {new Date(item.purchaseDate).toLocaleDateString()}</span>
                          <span>Expires: {new Date(item.expiryDate).toLocaleDateString()}</span>
                       </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="glass-panel rounded-xl p-6 min-h-[400px]">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-viper-primary" /> Security Log
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-400">
                  <thead className="bg-white/5 text-gray-200 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3 rounded-tl-lg">Event</th>
                      <th className="px-4 py-3">Location / IP</th>
                      <th className="px-4 py-3 rounded-tr-lg">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {displayUser.loginLogs.map((log: LoginLog, idx: number) => (
                      <tr key={idx} className="hover:bg-white/5">
                        <td className="px-4 py-3 text-emerald-400">Successful Login</td>
                        <td className="px-4 py-3">{log.ip}</td>
                        <td className="px-4 py-3">{new Date(log.timestamp).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
