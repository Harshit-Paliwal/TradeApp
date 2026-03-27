import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Target, Shield, Zap, TrendingUp, PieChart } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';

interface Holding {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  change: number;
}

interface AIPortfolioHoldingsProps {
  holdings: Holding[];
  onSelect: (symbol: string) => void;
}

export default function AIPortfolioHoldings({ holdings, onSelect }: AIPortfolioHoldingsProps) {
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
          <h3 className="text-xl font-black tracking-tight">AI Portfolio Holdings</h3>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Current Asset Distribution</p>
        </div>
      </div>

      <div className="space-y-4">
        {holdings.map((h, i) => (
          <motion.div
            key={h.symbol}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => onSelect(h.symbol)}
            className="p-6 bg-white/5 rounded-[32px] border border-white/10 hover:border-orange-500/30 transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-xs font-black">
                  {h.symbol}
                </div>
                <div>
                  <h4 className="text-sm font-black tracking-tight">{h.name}</h4>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{h.quantity} Shares</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-black tracking-tight">{formatCurrency(h.currentPrice * h.quantity)}</p>
                <div className={cn(
                  "flex items-center gap-1 justify-end text-[10px] font-black uppercase tracking-widest",
                  h.change >= 0 ? "text-green-500" : "text-red-500"
                )}>
                  {h.change >= 0 ? <TrendingUp size={10} /> : <TrendingUp size={10} className="transform rotate-180" />}
                  {Math.abs(h.change)}%
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-[8px] text-gray-500 font-black uppercase tracking-widest mb-1">Avg Price</p>
                <p className="text-xs font-black">{formatCurrency(h.avgPrice)}</p>
              </div>
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-[8px] text-gray-500 font-black uppercase tracking-widest mb-1">Current</p>
                <p className="text-xs font-black">{formatCurrency(h.currentPrice)}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
