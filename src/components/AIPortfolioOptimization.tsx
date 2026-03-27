import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Shield, Target, TrendingUp, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface OptimizationSuggestion {
  type: 'buy' | 'sell' | 'rebalance';
  symbol: string;
  reason: string;
  impact: string;
}

interface AIPortfolioOptimizationProps {
  suggestions: OptimizationSuggestion[];
  onApply: (suggestion: OptimizationSuggestion) => void;
}

export default function AIPortfolioOptimization({ suggestions, onApply }: AIPortfolioOptimizationProps) {
  return (
    <div className="bg-[#141414] border border-white/10 p-8 rounded-[40px] relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Sparkles size={120} />
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-orange-500/20 rounded-2xl text-orange-500">
          <Sparkles size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black tracking-tight">AI Portfolio Optimization</h3>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Real-time Rebalancing Engine</p>
        </div>
      </div>

      <div className="space-y-4">
        {suggestions.map((s, i) => (
          <motion.div
            key={s.symbol}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-white/5 rounded-[32px] border border-white/10 hover:border-orange-500/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                  s.type === 'buy' ? "bg-green-500/20 text-green-500" : 
                  s.type === 'sell' ? "bg-red-500/20 text-red-500" : 
                  "bg-blue-500/20 text-blue-500"
                )}>
                  {s.type}
                </span>
                <span className="text-sm font-black tracking-tight">{s.symbol}</span>
              </div>
              <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">{s.impact}</span>
            </div>
            <p className="text-xs text-gray-500 font-medium leading-relaxed mb-4">
              {s.reason}
            </p>
            <button
              onClick={() => onApply(s)}
              className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 group-hover:bg-orange-500 group-hover:text-white"
            >
              Apply Optimization <ArrowRight size={14} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
