import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Target, Shield, Zap, TrendingUp, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

interface DiversificationMetric {
  label: string;
  value: number;
  color: string;
}

interface AIPortfolioDiversificationProps {
  metrics: DiversificationMetric[];
  onSelect: (label: string) => void;
}

export default function AIPortfolioDiversification({ metrics, onSelect }: AIPortfolioDiversificationProps) {
  return (
    <div className="bg-[#141414] border border-white/10 p-8 rounded-[40px] relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <PieChart size={120} />
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-orange-500/20 rounded-2xl text-orange-500">
          <PieChart size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black tracking-tight">AI Portfolio Diversification</h3>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Sector & Asset Distribution Analysis</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-8 mb-8 relative">
        <svg className="w-48 h-48 transform -rotate-90">
          {metrics.map((m, i) => {
            const total = metrics.reduce((acc, curr) => acc + curr.value, 0);
            const percentage = (m.value / total) * 100;
            const strokeDasharray = 2 * Math.PI * 88;
            const strokeDashoffset = strokeDasharray * (1 - percentage / 100);
            const rotation = metrics.slice(0, i).reduce((acc, curr) => acc + (curr.value / total) * 360, 0);

            return (
              <motion.circle
                key={m.label}
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke={m.color}
                strokeWidth="12"
                strokeDasharray={strokeDasharray}
                initial={{ strokeDashoffset: strokeDasharray }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 2, ease: "easeOut", delay: i * 0.1 }}
                style={{ transform: `rotate(${rotation}deg)`, transformOrigin: 'center' }}
                className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => onSelect(m.label)}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black tracking-tighter">{metrics.length}</span>
          <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Sectors</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => onSelect(m.label)}
            className="p-6 bg-white/5 rounded-[32px] border border-white/10 hover:border-orange-500/30 transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: m.color }} />
                <h4 className="text-sm font-black tracking-tight">{m.label}</h4>
              </div>
              <span className="text-sm font-black">{m.value}%</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${m.value}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="h-full rounded-full transition-all"
                style={{ backgroundColor: m.color }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
