import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { formatCurrency, formatNumber } from '../lib/utils';
import { HistoricalData } from '../types';

interface StockChartProps {
  data: HistoricalData[];
  symbol: string;
  color?: string;
}

export default function StockChart({ data, symbol, color = "#f97316" }: StockChartProps) {
  return (
    <div className="space-y-6">
      <div className="h-[400px] w-full bg-[#141414] border border-white/10 p-6 rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            {symbol} Price Chart
          </h3>
          <div className="flex gap-2">
            {['1D', '1W', '1M', '1Y', 'ALL'].map((period) => (
              <button
                key={period}
                className="px-3 py-1 text-[10px] font-bold rounded-lg bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all"
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="#ffffff20" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(v) => v.split('-').slice(1).join('/')}
            />
            <YAxis 
              stroke="#ffffff20" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
              domain={['auto', 'auto']}
              tickFormatter={(v) => `₹${v.toLocaleString()}`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#141414', border: '1px solid #ffffff10', borderRadius: '12px' }}
              itemStyle={{ color: color }}
              labelStyle={{ color: '#666', fontSize: '10px' }}
            />
            <Area 
              type="monotone" 
              dataKey="close" 
              stroke={color} 
              strokeWidth={2} 
              fillOpacity={1} 
              fill="url(#colorPrice)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="h-[150px] w-full bg-[#141414] border border-white/10 p-6 rounded-3xl">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Volume</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
            <XAxis dataKey="date" hide />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ backgroundColor: '#141414', border: '1px solid #ffffff10', borderRadius: '12px' }}
              cursor={{ fill: '#ffffff05' }}
              formatter={(v: number) => [formatNumber(v), 'Volume']}
            />
            <Bar dataKey="volume" fill="#ffffff10" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
