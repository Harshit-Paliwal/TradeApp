import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Shield, AlertTriangle, Settings, BarChart3, Search, Filter } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';

interface AdminPanelProps {
  users: any[];
  trades: any[];
  onUpdateUser: (uid: string, data: any) => void;
  onUpdateAIParams: (params: any) => void;
}

export default function AdminPanel({ users, trades, onUpdateUser, onUpdateAIParams }: AdminPanelProps) {
  const totalTrades = trades.length;
  const totalVolume = trades.reduce((acc, t) => acc + t.total, 0);
  const activeUsers = users.length;

  const stats = [
    { label: 'Total Users', value: activeUsers, icon: Users, color: 'text-blue-500' },
    { label: 'Total Trades', value: totalTrades, icon: TrendingUp, color: 'text-green-500' },
    { label: 'Total Volume', value: formatCurrency(totalVolume), icon: BarChart3, color: 'text-orange-500' },
    { label: 'System Health', value: 'Optimal', icon: Shield, color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#141414] border border-white/10 p-6 rounded-2xl hover:border-orange-500/50 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors", stat.color)}>
                <stat.icon size={20} />
              </div>
            </div>
            <p className="text-gray-500 text-sm font-medium mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Management */}
        <div className="bg-[#141414] border border-white/10 p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">User Management</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search users..."
                className="bg-white/5 border border-white/10 rounded-lg py-1.5 pl-10 pr-4 text-xs focus:outline-none focus:border-orange-500/50 transition-all"
              />
            </div>
          </div>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.uid} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold">
                    {user.displayName?.[0] || 'U'}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{user.displayName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                    user.role === 'admin' ? "bg-purple-500/20 text-purple-500" : "bg-blue-500/20 text-blue-500"
                  )}>
                    {user.role}
                  </span>
                  <button className="p-2 text-gray-500 hover:text-white transition-colors">
                    <Settings size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Parameters */}
        <div className="bg-[#141414] border border-white/10 p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">AI Recommendation Parameters</h3>
            <button className="text-orange-500 text-sm font-bold hover:underline">Reset to Default</button>
          </div>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">RSI Buy Threshold</span>
                <span className="font-bold">30</span>
              </div>
              <input type="range" min="10" max="50" defaultValue="30" className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-orange-500" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">RSI Sell Threshold</span>
                <span className="font-bold">70</span>
              </div>
              <input type="range" min="50" max="90" defaultValue="70" className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-orange-500" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Confidence Threshold</span>
                <span className="font-bold">0.65</span>
              </div>
              <input type="range" min="0" max="1" step="0.05" defaultValue="0.65" className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-orange-500" />
            </div>
            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex gap-3">
              <AlertTriangle className="text-orange-500 shrink-0" size={20} />
              <p className="text-xs text-orange-500/80 leading-relaxed">
                Changing these parameters will immediately affect the recommendations generated for all users. Use with caution.
              </p>
            </div>
            <button className="w-full py-4 rounded-2xl bg-orange-500 font-bold text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20">
              SAVE PARAMETERS
            </button>
          </div>
        </div>
      </div>

      {/* Recent Trades Table */}
      <div className="bg-[#141414] border border-white/10 p-8 rounded-3xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold">Global Trade Monitor</h3>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all">
              <Filter size={14} />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 text-xs font-bold hover:bg-orange-600 transition-all">
              Export CSV
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-white/5">
                <th className="pb-4 font-semibold">User</th>
                <th className="pb-4 font-semibold">Symbol</th>
                <th className="pb-4 font-semibold">Type</th>
                <th className="pb-4 font-semibold">Qty</th>
                <th className="pb-4 font-semibold">Price</th>
                <th className="pb-4 font-semibold">Total</th>
                <th className="pb-4 font-semibold">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {trades.map((trade) => (
                <tr key={trade.id} className="group hover:bg-white/5 transition-all">
                  <td className="py-4 text-sm font-medium">{trade.userId.slice(0, 8)}...</td>
                  <td className="py-4 font-bold text-sm tracking-tight">{trade.symbol}</td>
                  <td className="py-4">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                      trade.type === 'buy' ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                    )}>
                      {trade.type}
                    </span>
                  </td>
                  <td className="py-4 text-sm font-medium">{trade.quantity}</td>
                  <td className="py-4 text-sm font-medium">{formatCurrency(trade.price)}</td>
                  <td className="py-4 text-sm font-medium">{formatCurrency(trade.total)}</td>
                  <td className="py-4 text-sm text-gray-500">{new Date(trade.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
