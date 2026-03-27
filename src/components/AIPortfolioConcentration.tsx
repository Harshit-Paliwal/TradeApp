import React from 'react';
import { motion } from 'framer-motion';
import { Target, Shield, Zap, TrendingUp, Activity, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface ConcentrationMetric {
  label: string;
  value: number;
  status: 'good' | 'warning' | 'critical';
  description: string;
}

interface AIPortfolioConcentrationProps {
  score: number;
  metrics: ConcentrationMetric[];
}

export default function AIPortfolioConcentration({ score, metrics }: AIPortfolioConcentrationProps) {
  return (
    <div className="bg-[#141414] border border-white/10 p-8 rounded-[40px] relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Target size={120} />
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-orange-500/20 rounded-2xl text-orange-500">
          <Target size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black tracking-tight">AI Portfolio Concentration</h3>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Asset Concentration Analysis</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-8 mb-8 relative">
        <svg className="w-48 h-48 transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="12"
          />
          <motion.circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeDasharray={2 * Math.PI * 88}
            initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - score / 100) }}
            transition={{ duration: 2, ease: "easeOut" }}
            className={cn(
              score <= 30 ? "text-green-500" : 
              score <= 60 ? "text-orange-500" : 
              "text-red-500"
            )}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black tracking-tighter">{score}</span>
          <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Concentration Score</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-white/5 rounded-[32px] border border-white/10 hover:border-orange-500/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-xl",
                  m.status === 'good' ? "bg-green-500/20 text-green-500" : 
                  m.status === 'warning' ? "bg-orange-500/20 text-orange-500" : 
                  "bg-red-500/20 text-red-500"
                )}>
                  {m.status === 'good' ? <Activity size={16} /> : 
                   m.status === 'warning' ? <Zap size={16} /> : 
                   <AlertCircle size={16} />}
                </div>
                <h4 className="text-sm font-black tracking-tight">{m.label}</h4>
              </div>
              <span className="text-sm font-black">{m.value}%</span>
            </div>
            <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
              {m.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
