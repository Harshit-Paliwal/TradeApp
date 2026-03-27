import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Shield, Zap, Activity, PieChart } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ForecastData {
  date: string;
  pessimistic: number;
  expected: number;
  optimistic: number;
}

interface AIPortfolioForecastingsProps {
  data: ForecastData[];
  onSelect: (date: string) => void;
}

export default function AIPortfolioForecastings({ data, onSelect }: AIPortfolioForecastingsProps) {
  return (
    <div className="bg-[#141414] border border-white/10 p-8 rounded-[40px] relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <TrendingUp size={120} />
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-orange-500/20 rounded-2xl text-orange-500">
          <TrendingUp size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black tracking-tight">AI Portfolio Forecastings</h3>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Growth Projection Analysis</p>
        </div>
      </div>

      <div className="h-64 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} onClick={(e) => e && e.activeLabel && onSelect(String(e.activeLabel))}>
            <defs>
              <linearGradient id="colorOptimistic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
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
              itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
              labelStyle={{ color: '#6b7280', fontSize: '10px', marginBottom: '4px' }}
            />
            <Area 
              type="monotone" 
              dataKey="optimistic" 
              stroke="#22c55e" 
              strokeWidth={2} 
              strokeDasharray="5 5"
              fillOpacity={1} 
              fill="url(#colorOptimistic)" 
            />
            <Area 
              type="monotone" 
              dataKey="expected" 
              stroke="#f97316" 
              strokeWidth={4} 
              fillOpacity={1} 
              fill="url(#colorExpected)" 
            />
            <Area 
              type="monotone" 
              dataKey="pessimistic" 
              stroke="#ef4444" 
              strokeWidth={2} 
              strokeDasharray="5 5"
              fill="transparent" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white/5 rounded-3xl border border-white/10">
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Pessimistic</p>
          <p className="text-sm font-black text-red-500">₹{data[data.length-1].pessimistic.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-white/5 rounded-3xl border border-orange-500/30">
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Expected</p>
          <p className="text-sm font-black text-orange-500">₹{data[data.length-1].expected.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-white/5 rounded-3xl border border-white/10">
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Optimistic</p>
          <p className="text-sm font-black text-green-500">₹{data[data.length-1].optimistic.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
