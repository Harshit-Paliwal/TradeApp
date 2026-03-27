import React from 'react';
import { motion } from 'framer-motion';
import { Target, Shield, Zap, TrendingUp, Activity, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface Prediction {
  asset: string;
  target: number;
  stopLoss: number;
  timeframe: string;
  description: string;
}

interface AIPortfolioPredictionsProps {
  predictions: Prediction[];
  onSelect: (asset: string) => void;
}

export default function AIPortfolioPredictions({ predictions, onSelect }: AIPortfolioPredictionsProps) {
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
          <h3 className="text-xl font-black tracking-tight">AI Portfolio Predictions</h3>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Future Price Projection Engine</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {predictions.map((pred, i) => (
          <motion.div
            key={pred.asset}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => onSelect(pred.asset)}
            className="p-6 bg-white/5 rounded-[32px] border border-white/10 hover:border-orange-500/30 transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/20 rounded-xl text-orange-500">
                  <Target size={16} />
                </div>
                <h4 className="text-sm font-black tracking-tight">{pred.asset}</h4>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                {pred.timeframe} Target
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-green-500/10 rounded-2xl border border-green-500/20">
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Target Price</p>
                <p className="text-lg font-black text-green-500">₹{pred.target.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Stop Loss</p>
                <p className="text-lg font-black text-red-500">₹{pred.stopLoss.toLocaleString()}</p>
              </div>
            </div>
            <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
              {pred.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
