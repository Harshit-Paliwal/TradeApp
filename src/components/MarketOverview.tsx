import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Activity, Globe, BarChart3, Zap } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { StockData } from '../types';

interface MarketOverviewProps {
  stocks: StockData[];
  onSelect: (symbol: string) => void;
}

export default function MarketOverview({ stocks, onSelect }: MarketOverviewProps) {
  const indices = [
    { name: 'NIFTY 50', value: 22450.30, change: 125.4, changePercent: 0.56 },
    { name: 'SENSEX', value: 73850.15, change: 450.2, changePercent: 0.61 },
    { name: 'BANK NIFTY', value: 47200.45, change: -120.3, changePercent: -0.25 },
    { name: 'NIFTY IT', value: 36150.80, change: 280.1, changePercent: 0.78 },
  ];

  return (
    <div className="space-y-8">
      {/* Indices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {indices.map((index, i) => (
          <motion.div
            key={index.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#141414] border border-white/10 p-6 rounded-3xl hover:border-orange-500/50 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                <Globe size={18} className="text-gray-500" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-[10px] font-black uppercase tracking-widest",
                index.change >= 0 ? "text-green-500" : "text-red-500"
              )}>
                {index.change >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {Math.abs(index.changePercent).toFixed(2)}%
              </div>
            </div>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">{index.name}</p>
            <h3 className="text-xl font-black tracking-tight">{index.value.toLocaleString('en-IN')}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Market Sentiment */}
        <div className="bg-[#141414] border border-white/10 p-8 rounded-[40px] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Activity size={120} />
          </div>
          <h3 className="text-xl font-black tracking-tight mb-8">Market Sentiment</h3>
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                <span className="text-green-500">Bullish (65%)</span>
                <span className="text-red-500">Bearish (35%)</span>
              </div>
              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden flex">
                <div className="h-full bg-green-500" style={{ width: '65%' }}></div>
                <div className="h-full bg-red-500" style={{ width: '35%' }}></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Advances</p>
                <p className="text-lg font-black text-green-500">1,240</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Declines</p>
                <p className="text-lg font-black text-red-500">680</p>
              </div>
            </div>

            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex gap-3">
              <Zap className="text-orange-500 shrink-0" size={20} />
              <p className="text-[10px] text-orange-500/80 font-bold leading-relaxed">
                Market breadth is positive today with strong buying interest in IT and Banking sectors.
              </p>
            </div>
          </div>
        </div>

        {/* Sector Performance */}
        <div className="lg:col-span-2 bg-[#141414] border border-white/10 p-8 rounded-[40px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black tracking-tight">Sector Performance</h3>
            <button className="text-[10px] font-black text-orange-500 uppercase tracking-widest hover:underline">View Heatmap</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'IT Services', change: 1.85, volume: '2.4B' },
              { name: 'Banking', change: 0.45, volume: '5.1B' },
              { name: 'Energy', change: -0.32, volume: '1.2B' },
              { name: 'Auto', change: 1.12, volume: '850M' },
              { name: 'Pharma', change: -0.78, volume: '620M' },
              { name: 'FMCG', change: 0.24, volume: '940M' },
            ].map((sector) => (
              <div key={sector.name} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-white/10 group">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    sector.change >= 0 ? "bg-green-500" : "bg-red-500"
                  )}></div>
                  <span className="text-sm font-bold">{sector.name}</span>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "text-sm font-black",
                    sector.change >= 0 ? "text-green-500" : "text-red-500"
                  )}>
                    {sector.change >= 0 ? '+' : ''}{sector.change}%
                  </p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Vol: {sector.volume}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
