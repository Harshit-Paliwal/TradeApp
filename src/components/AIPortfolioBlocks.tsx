import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Target, Shield, Zap, TrendingUp, PieChart } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';

interface BlockItem {
  id: string;
  title: string;
  subtitle: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

interface AIPortfolioBlocksProps {
  items: BlockItem[];
  onSelect: (id: string) => void;
}

export default function AIPortfolioBlocks({ items, onSelect }: AIPortfolioBlocksProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          onClick={() => onSelect(item.id)}
          className="bg-[#141414] border border-white/10 p-8 rounded-[40px] relative overflow-hidden group hover:border-orange-500/30 transition-all cursor-pointer"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all">
            {item.icon}
          </div>
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-white/5 rounded-2xl text-gray-400 group-hover:text-orange-500 transition-all">
              {item.icon}
            </div>
            <div>
              <h3 className="text-sm font-black tracking-tight">{item.title}</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{item.subtitle}</p>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-black tracking-tighter">{item.value}</p>
            <div className={cn(
              "flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
              item.change >= 0 ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
            )}>
              {item.change >= 0 ? <TrendingUp size={10} /> : <TrendingUp size={10} className="transform rotate-180" />}
              {Math.abs(item.change)}%
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
