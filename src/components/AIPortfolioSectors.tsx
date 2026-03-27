import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Target, Shield, Zap, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

interface Sector {
  label: string;
  value: number;
  color: string;
}

interface AIPortfolioSectorsProps {
  sectors: Sector[];
  onSelect: (label: string) => void;
}

export default function AIPortfolioSectors({ sectors, onSelect }: AIPortfolioSectorsProps) {
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
          <h3 className="text-xl font-black tracking-tight">AI Portfolio Sectors</h3>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Sector Allocation Analysis</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-8 mb-8 relative">
        <svg className="w-48 h-48 transform -rotate-90">
          {sectors.map((s, i) => {
            const total = sectors.reduce((acc, curr) => acc + curr.value, 0);
            const percentage = (s.value / total) * 100;
            const previousPercentage = sectors.slice(0, i).reduce((acc, curr) => acc + (curr.value / total) * 100, 0);
            const dashArray = 2 * Math.PI * 88;
            const dashOffset = dashArray * (1 - percentage / 100);
            const rotation = (previousPercentage / 100) * 360;

            return (
              <motion.circle
                key={s.label}
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke={s.color}
                strokeWidth="12"
                strokeDasharray={dashArray}
                initial={{ strokeDashoffset: dashArray }}
                animate={{ strokeDashoffset: dashOffset }}
                transition={{ duration: 2, ease: "easeOut", delay: i * 0.1 }}
                style={{ transformOrigin: 'center', transform: `rotate(${rotation}deg)` }}
                className="cursor-pointer hover:stroke-[16px] transition-all"
                onClick={() => onSelect(s.label)}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black tracking-tighter">{sectors.length}</span>
          <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Sectors</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {sectors.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => onSelect(s.label)}
            className="p-4 bg-white/5 rounded-3xl border border-white/10 hover:border-orange-500/30 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500">{s.label}</h4>
            </div>
            <p className="text-lg font-black">{s.value}%</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
