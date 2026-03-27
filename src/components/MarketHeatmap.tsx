import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { StockData } from '../types';

interface MarketHeatmapProps {
  stocks: StockData[];
  onSelect: (symbol: string) => void;
}

export default function MarketHeatmap({ stocks, onSelect }: MarketHeatmapProps) {
  return (
    <div className="bg-[#141414] border border-white/10 p-8 rounded-[40px]">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black tracking-tight">Market Heatmap</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Negative</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Positive</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {stocks.map((stock, i) => {
          const intensity = Math.min(Math.abs(stock.changePercent) * 20, 100);
          const isPositive = stock.changePercent >= 0;
          
          return (
            <motion.div
              key={stock.symbol}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.02 }}
              onClick={() => onSelect(stock.symbol)}
              className={cn(
                "aspect-square rounded-2xl flex flex-col items-center justify-center p-4 cursor-pointer transition-all hover:scale-105 hover:z-10 shadow-xl",
                isPositive 
                  ? "bg-green-500/20 border border-green-500/30 text-green-500" 
                  : "bg-red-500/20 border border-red-500/30 text-red-500"
              )}
              style={{
                backgroundColor: isPositive 
                  ? `rgba(34, 197, 94, ${0.1 + intensity / 200})` 
                  : `rgba(239, 68, 68, ${0.1 + intensity / 200})`
              }}
            >
              <span className="text-sm font-black tracking-tighter mb-1">{stock.symbol}</span>
              <span className="text-[10px] font-black opacity-80">
                {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
