import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { StockData } from '../types';

interface MarketTrendsProps {
  stocks: StockData[];
  onSelect: (symbol: string) => void;
}

export default function MarketTrends({ stocks, onSelect }: MarketTrendsProps) {
  const topGainers = [...stocks].sort((a, b) => b.changePercent - a.changePercent).slice(0, 4);
  const topLosers = [...stocks].sort((a, b) => a.changePercent - b.changePercent).slice(0, 4);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Top Gainers */}
      <div className="bg-[#141414] border border-white/10 p-8 rounded-[40px] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
          <TrendingUp size={120} />
        </div>
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/20 rounded-2xl text-green-500">
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight">Top Gainers</h3>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Market Outperformers</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {topGainers.map((stock, i) => (
            <motion.div
              key={stock.symbol}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onSelect(stock.symbol)}
              className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-green-500/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-black text-xs group-hover:bg-green-500 group-hover:text-white transition-all">
                  {stock.symbol.slice(0, 2)}
                </div>
                <div>
                  <p className="font-black text-sm tracking-tight">{stock.symbol}</p>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">NSE / Equity</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-sm">{formatCurrency(stock.price)}</p>
                <div className="flex items-center justify-end gap-1 text-[10px] font-black uppercase tracking-widest text-green-500">
                  <ArrowUpRight size={10} />
                  +{stock.changePercent.toFixed(2)}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Top Losers */}
      <div className="bg-[#141414] border border-white/10 p-8 rounded-[40px] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
          <TrendingDown size={120} />
        </div>
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-500/20 rounded-2xl text-red-500">
              <TrendingDown size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight">Top Losers</h3>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Market Underperformers</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {topLosers.map((stock, i) => (
            <motion.div
              key={stock.symbol}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onSelect(stock.symbol)}
              className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-red-500/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-black text-xs group-hover:bg-red-500 group-hover:text-white transition-all">
                  {stock.symbol.slice(0, 2)}
                </div>
                <div>
                  <p className="font-black text-sm tracking-tight">{stock.symbol}</p>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">NSE / Equity</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-sm">{formatCurrency(stock.price)}</p>
                <div className="flex items-center justify-end gap-1 text-[10px] font-black uppercase tracking-widest text-red-500">
                  <ArrowDownRight size={10} />
                  {stock.changePercent.toFixed(2)}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
