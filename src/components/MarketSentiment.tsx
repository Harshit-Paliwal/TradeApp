import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface MarketSentimentProps {
  bullishPercent: number;
  advances: number;
  declines: number;
  summary: string;
}

export default function MarketSentiment({ bullishPercent, advances, declines, summary }: MarketSentimentProps) {
  const bearishPercent = 100 - bullishPercent;

  return (
    <div className="bg-[#141414] border border-white/10 p-8 rounded-[40px] relative overflow-hidden group h-full">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Activity size={120} />
      </div>
      <h3 className="text-xl font-black tracking-tight mb-8">Market Sentiment</h3>
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between text-xs font-black uppercase tracking-widest">
            <span className="text-green-500">Bullish ({bullishPercent}%)</span>
            <span className="text-red-500">Bearish ({bearishPercent}%)</span>
          </div>
          <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden flex">
            <div className="h-full bg-green-500 transition-all duration-1000" style={{ width: `${bullishPercent}%` }}></div>
            <div className="h-full bg-red-500 transition-all duration-1000" style={{ width: `${bearishPercent}%` }}></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Advances</p>
            <p className="text-lg font-black text-green-500">{advances.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Declines</p>
            <p className="text-lg font-black text-red-500">{declines.toLocaleString()}</p>
          </div>
        </div>

        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex gap-3">
          <Zap className="text-orange-500 shrink-0" size={20} />
          <p className="text-[10px] text-orange-500/80 font-bold leading-relaxed">
            {summary}
          </p>
        </div>
      </div>
    </div>
  );
}
