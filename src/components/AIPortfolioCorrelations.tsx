import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield, Target, Zap, TrendingUp, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface Correlation {
  pair: [string, string];
  value: number;
}

interface AIPortfolioCorrelationsProps {
  correlations: Correlation[];
  onSelect: (pair: [string, string]) => void;
}

export default function AIPortfolioCorrelations({ correlations, onSelect }: AIPortfolioCorrelationsProps) {
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
          <h3 className="text-xl font-black tracking-tight">AI Portfolio Correlations</h3>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Asset Interdependence Analysis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {correlations.map((c, i) => (
          <motion.div
            key={`${c.pair[0]}-${c.pair[1]}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => onSelect(c.pair)}
            className="p-6 bg-white/5 rounded-[32px] border border-white/10 hover:border-orange-500/30 transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-[#141414] flex items-center justify-center text-[8px] font-black">{c.pair[0]}</div>
                  <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-[#141414] flex items-center justify-center text-[8px] font-black">{c.pair[1]}</div>
                </div>
                <h4 className="text-sm font-black tracking-tight">{c.pair[0]} & {c.pair[1]}</h4>
              </div>
              <span className={cn(
                "text-[10px] font-black uppercase tracking-widest",
                Math.abs(c.value) > 0.7 ? "text-red-500" : 
                Math.abs(c.value) > 0.4 ? "text-orange-500" : 
                "text-green-500"
              )}>
                {c.value.toFixed(2)} Correlation
              </span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.abs(c.value) * 100}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className={cn(
                  "h-full rounded-full transition-all",
                  Math.abs(c.value) > 0.7 ? "bg-red-500" : 
                  Math.abs(c.value) > 0.4 ? "bg-orange-500" : 
                  "bg-green-500"
                )}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
