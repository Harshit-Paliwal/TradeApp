import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Target, Shield, Zap, TrendingUp, PieChart } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';

interface Stat {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

interface AIPortfolioStatsProps {
  stats: Stat[];
}

export default function AIPortfolioStats({ stats }: AIPortfolioStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-[#141414] border border-white/10 p-8 rounded-[40px] relative overflow-hidden group hover:border-orange-500/30 transition-all"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all">
            {s.icon}
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-white/5 rounded-2xl text-gray-400 group-hover:text-orange-500 transition-all">
              {s.icon}
            </div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500">{s.label}</h3>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-black tracking-tighter">{s.value}</p>
            <div className={cn(
              "flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
              s.change >= 0 ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
            )}>
              {s.change >= 0 ? <TrendingUp size={10} /> : <TrendingUp size={10} className="transform rotate-180" />}
              {Math.abs(s.change)}%
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
