import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield, Target, Zap, TrendingUp, AlertCircle } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BacktestData {
  date: string;
  portfolio: number;
  benchmark: number;
}

interface AIPortfolioBacktestingProps {
  data: BacktestData[];
  onSelect: (date: string) => void;
}

export default function AIPortfolioBacktesting({ data, onSelect }: AIPortfolioBacktestingProps) {
  return (
    <div className="bg-[#141414] border border-white/10 p-8 rounded-[40px] relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Activity size={120} />
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-orange-500/20 rounded-2xl text-orange-500">
          <Activity size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black tracking-tight">AI Portfolio Backtesting</h3>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Historical Strategy Simulation</p>
        </div>
      </div>

      <div className="h-64 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} onClick={(e) => e && e.activeLabel && onSelect(String(e.activeLabel))}>
            <defs>
              <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="rgba(255,255,255,0.3)" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="rgba(255,255,255,0.3)" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `₹${value / 1000}k`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#141414', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
              itemStyle={{ color: '#f97316', fontSize: '12px', fontWeight: 'bold' }}
              labelStyle={{ color: '#6b7280', fontSize: '10px', marginBottom: '4px' }}
            />
            <Area 
              type="monotone" 
              dataKey="portfolio" 
              stroke="#f97316" 
              strokeWidth={4} 
              fillOpacity={1} 
              fill="url(#colorPortfolio)" 
            />
            <Area 
              type="monotone" 
              dataKey="benchmark" 
              stroke="rgba(255,255,255,0.2)" 
              strokeWidth={2} 
              strokeDasharray="5 5" 
              fill="transparent" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 bg-white/5 rounded-[32px] border border-white/10 hover:border-orange-500/30 transition-all group">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-500/20 rounded-xl text-green-500">
              <TrendingUp size={16} />
            </div>
            <h4 className="text-sm font-black tracking-tight">Sharpe Ratio</h4>
          </div>
          <p className="text-2xl font-black text-green-500">1.84</p>
          <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
            Risk-adjusted return efficiency
          </p>
        </div>
        <div className="p-6 bg-white/5 rounded-[32px] border border-white/10 hover:border-orange-500/30 transition-all group">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-500/20 rounded-xl text-red-500">
              <AlertCircle size={16} />
            </div>
            <h4 className="text-sm font-black tracking-tight">Max Drawdown</h4>
          </div>
          <p className="text-2xl font-black text-red-500">-12.4%</p>
          <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
            Peak-to-trough historical decline
          </p>
        </div>
      </div>
    </div>
  );
}
