import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Shield, Target, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';

interface OptimizationSuggestion {
  type: 'buy' | 'sell' | 'rebalance';
  symbol: string;
  reason: string;
  impact: string;
}

interface AIPortfolioOptimizerProps {
  suggestions: OptimizationSuggestion[];
  riskScore: number;
  onApply: (suggestion: OptimizationSuggestion) => void;
}

export default function AIPortfolioOptimizer({ suggestions, riskScore, onApply }: AIPortfolioOptimizerProps) {
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
          <h3 className="text-xl font-black tracking-tight">AI Portfolio Optimizer</h3>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Real-time Optimization Engine</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
          <Shield className="text-blue-500 mb-2" size={18} />
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Risk Score</p>
          <p className="text-lg font-black">{riskScore}/100</p>
        </div>
        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
          <Target className="text-orange-500 mb-2" size={18} />
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Efficiency</p>
          <p className="text-lg font-black">92%</p>
        </div>
        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
          <TrendingUp className="text-green-500 mb-2" size={18} />
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Potential</p>
          <p className="text-lg font-black">+12.4%</p>
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
