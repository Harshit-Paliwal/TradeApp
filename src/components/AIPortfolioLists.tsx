import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Target, Shield, Zap, TrendingUp, PieChart } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';

interface ListItem {
  id: string;
  title: string;
  subtitle: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

interface AIPortfolioListsProps {
  items: ListItem[];
  onSelect: (id: string) => void;
}

export default function AIPortfolioLists({ items, onSelect }: AIPortfolioListsProps) {
  return (
    <div className="bg-[#141414] border border-white/10 p-8 rounded-[40px] relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Activity size={120} />
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-orange-500/20 rounded-2xl text-orange-500">
          <Activity size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black tracking-tight">AI Portfolio Insights</h3>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Real-time Asset Analysis</p>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => onSelect(item.id)}
            className="p-6 bg-white/5 rounded-[32px] border border-white/10 hover:border-orange-500/30 transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-2xl text-gray-400 group-hover:text-orange-500 transition-all">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-black tracking-tight">{item.title}</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{item.subtitle}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-black tracking-tighter">{item.value}</p>
                <div className={cn(
                  "flex items-center gap-1 justify-end text-[10px] font-black uppercase tracking-widest",
                  item.change >= 0 ? "text-green-500" : "text-red-500"
                )}>
                  {item.change >= 0 ? <TrendingUp size={10} /> : <TrendingUp size={10} className="transform rotate-180" />}
                  {Math.abs(item.change)}%
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
