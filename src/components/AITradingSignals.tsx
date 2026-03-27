import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../lib/utils';
import { Recommendation } from '../types';

interface AITradingSignalsProps {
  recommendations: Recommendation[];
  onSelect: (symbol: string) => void;
}

export default function AITradingSignals({ recommendations, onSelect }: AITradingSignalsProps) {
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
          <h3 className="text-xl font-black tracking-tight">AI Trading Signals</h3>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Real-time Market Analysis</p>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, i) => (
          <motion.div
            key={rec.symbol}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => onSelect(rec.symbol)}
            className="p-6 bg-white/5 rounded-[32px] border border-white/10 hover:border-orange-500/30 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-sm font-black tracking-tighter group-hover:bg-white/10 transition-colors">
                  {rec.symbol}
                </div>
                <div>
                  <h4 className="text-sm font-black tracking-tight">{rec.symbol}</h4>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Confidence: {(rec.confidence * 100).toFixed(0)}%</p>
                </div>
              </div>
              <div className={cn(
                "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2",
                rec.signal === 'buy' ? "bg-green-500/20 text-green-500" : 
                rec.signal === 'sell' ? "bg-red-500/20 text-red-500" : 
                "bg-blue-500/20 text-blue-500"
              )}>
                {rec.signal === 'buy' ? <TrendingUp size={14} /> : 
                 rec.signal === 'sell' ? <TrendingDown size={14} /> : 
                 <Minus size={14} />}
                {rec.signal}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="space-y-1">
                <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest">RSI</p>
                <p className="text-xs font-black">{rec.indicators.rsi.toFixed(1)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest">SMA 20/50</p>
                <p className="text-xs font-black">{rec.indicators.sma20 > rec.indicators.sma50 ? 'Bullish' : 'Bearish'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest">Risk</p>
                <p className={cn(
                  "text-xs font-black uppercase",
                  rec.riskLevel === 'low' ? "text-green-500" : 
                  rec.riskLevel === 'medium' ? "text-orange-500" : 
                  "text-red-500"
                )}>{rec.riskLevel}</p>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl text-[10px] text-gray-400 font-medium leading-relaxed group-hover:text-white transition-colors">
              {rec.explanation}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
