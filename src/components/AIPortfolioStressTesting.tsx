import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Shield, Target, Zap, TrendingUp, Activity } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';

interface StressScenario {
  name: string;
  impact: number;
  probability: 'low' | 'medium' | 'high';
  description: string;
}

interface AIPortfolioStressTestingProps {
  scenarios: StressScenario[];
  onSelect: (name: string) => void;
}

export default function AIPortfolioStressTesting({ scenarios, onSelect }: AIPortfolioStressTestingProps) {
  return (
    <div className="bg-[#141414] border border-white/10 p-8 rounded-[40px] relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <AlertCircle size={120} />
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-orange-500/20 rounded-2xl text-orange-500">
          <AlertCircle size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black tracking-tight">AI Portfolio Stress Testing</h3>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Market Crash Simulation Engine</p>
        </div>
      </div>

      <div className="space-y-4">
        {scenarios.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => onSelect(s.name)}
            className="p-6 bg-white/5 rounded-[32px] border border-white/10 hover:border-orange-500/30 transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                  s.impact < 0 ? "bg-red-500/20 text-red-500" : "bg-green-500/20 text-green-500"
                )}>
                  {s.impact}% Impact
                </span>
                <span className="text-sm font-black tracking-tight">{s.name}</span>
              </div>
              <span className={cn(
                "text-[10px] font-black uppercase tracking-widest",
                s.probability === 'low' ? "text-green-500" : 
                s.probability === 'medium' ? "text-orange-500" : 
                "text-red-500"
              )}>
                {s.probability} Probability
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium leading-relaxed mb-4">
              {s.description}
            </p>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.abs(s.impact)}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className={cn(
                  "h-full rounded-full transition-all",
                  s.impact < 0 ? "bg-red-500" : "bg-green-500"
                )}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
