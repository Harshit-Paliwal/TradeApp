import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Shield, Activity, TrendingUp, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface Signal {
  type: 'buy' | 'sell' | 'hold';
  asset: string;
  confidence: number;
  description: string;
}

interface AIPortfolioSignalsProps {
  signals: Signal[];
  onAction: (asset: string, type: string) => void;
}

export default function AIPortfolioSignals({ signals, onAction }: AIPortfolioSignalsProps) {
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
          <h3 className="text-xl font-black tracking-tight">AI Portfolio Signals</h3>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Real-time Trading Opportunities</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {signals.map((sig, i) => (
          <motion.div
            key={sig.asset}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-white/5 rounded-[32px] border border-white/10 hover:border-orange-500/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-xl",
                  sig.type === 'buy' ? "bg-green-500/20 text-green-500" : 
                  sig.type === 'sell' ? "bg-red-500/20 text-red-500" : 
                  "bg-orange-500/20 text-orange-500"
                )}>
                  {sig.type === 'buy' ? <TrendingUp size={16} /> : 
                   sig.type === 'sell' ? <AlertCircle size={16} /> : 
                   <Activity size={16} />}
                </div>
                <h4 className="text-sm font-black tracking-tight">{sig.asset}</h4>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                {sig.confidence}% Confidence
              </span>
            </div>
            <p className="text-[10px] text-gray-500 font-medium leading-relaxed mb-4">
              {sig.description}
            </p>
            <button
              onClick={() => onAction(sig.asset, sig.type)}
              className={cn(
                "w-full py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                sig.type === 'buy' ? "bg-green-500 text-white hover:bg-green-600" : 
                sig.type === 'sell' ? "bg-red-500 text-white hover:bg-red-600" : 
                "bg-white/10 text-white hover:bg-white/20"
              )}
            >
              {sig.type === 'buy' ? 'Execute Buy' : sig.type === 'sell' ? 'Execute Sell' : 'View Details'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
