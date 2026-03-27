import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, TrendingDown, Target, Shield, Zap } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';

interface AIPrediction {
  symbol: string;
  currentPrice: number;
  targetPrice: number;
  stopLoss: number;
  timeframe: string;
  confidence: number;
  risk: 'low' | 'medium' | 'high';
}

interface AIPredictionsProps {
  predictions: AIPrediction[];
  onSelect: (symbol: string) => void;
}

export default function AIPredictions({ predictions, onSelect }: AIPredictionsProps) {
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
          <h3 className="text-xl font-black tracking-tight">AI Price Predictions</h3>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Predictive Analysis Engine</p>
        </div>
      </div>

      <div className="space-y-4">
        {predictions.map((p, i) => {
          const upside = ((p.targetPrice - p.currentPrice) / p.currentPrice) * 100;
          const isBullish = p.targetPrice > p.currentPrice;

          return (
            <motion.div
              key={p.symbol}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onSelect(p.symbol)}
              className="p-6 bg-white/5 rounded-[32px] border border-white/10 hover:border-orange-500/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-sm font-black tracking-tighter group-hover:bg-white/10 transition-colors">
                    {p.symbol}
                  </div>
                  <div>
                    <h4 className="text-sm font-black tracking-tight">{p.symbol}</h4>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{p.timeframe} Outlook</p>
                  </div>
                </div>
                <div className={cn(
                  "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2",
                  isBullish ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                )}>
                  {isBullish ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {isBullish ? '+' : ''}{upside.toFixed(2)}% Upside
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <Target className="text-blue-500 mb-2" size={18} />
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Target Price</p>
                  <p className="text-lg font-black">{formatCurrency(p.targetPrice)}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <Shield className="text-red-500 mb-2" size={18} />
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Stop Loss</p>
                  <p className="text-lg font-black">{formatCurrency(p.stopLoss)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Zap className="text-orange-500" size={14} />
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Confidence: {p.confidence}%</span>
                  </div>
                  <div className="w-px h-4 bg-white/10" />
                  <div className="flex items-center gap-2">
                    <Shield className={cn(
                      p.risk === 'low' ? "text-green-500" : 
                      p.risk === 'medium' ? "text-orange-500" : 
                      "text-red-500"
                    )} size={14} />
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Risk: {p.risk}</span>
                  </div>
                </div>
                <button className="p-2 bg-white/5 hover:bg-orange-500 hover:text-white rounded-xl transition-all">
                  <TrendingUp size={18} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
