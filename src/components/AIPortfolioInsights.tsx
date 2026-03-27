import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Shield, Activity, TrendingUp, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface Insight {
  label: string;
  value: string;
  impact: 'positive' | 'neutral' | 'negative';
  description: string;
}

interface AIPortfolioInsightsProps {
  insights: Insight[];
}

export default function AIPortfolioInsights({ insights }: AIPortfolioInsightsProps) {
  return (
    <div className="bg-[#141414] border border-white/10 p-8 rounded-[40px] relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Zap size={120} />
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-orange-500/20 rounded-2xl text-orange-500">
          <Zap size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black tracking-tight">AI Portfolio Insights</h3>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Intelligent Market Analysis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {insights.map((ins, i) => (
          <motion.div
            key={ins.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-white/5 rounded-[32px] border border-white/10 hover:border-orange-500/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-xl",
                  ins.impact === 'positive' ? "bg-green-500/20 text-green-500" : 
                  ins.impact === 'neutral' ? "bg-orange-500/20 text-orange-500" : 
                  "bg-red-500/20 text-red-500"
                )}>
                  {ins.impact === 'positive' ? <TrendingUp size={16} /> : 
                   ins.impact === 'neutral' ? <Activity size={16} /> : 
                   <AlertCircle size={16} />}
                </div>
                <h4 className="text-sm font-black tracking-tight">{ins.label}</h4>
              </div>
              <span className="text-sm font-black">{ins.value}</span>
            </div>
            <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
              {ins.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
