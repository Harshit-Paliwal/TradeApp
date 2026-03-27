import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { formatCurrency } from '../lib/utils';
import { Holding } from '../types';

interface PortfolioAnalyticsProps {
  holdings: Holding[];
}

export default function PortfolioAnalytics({ holdings }: PortfolioAnalyticsProps) {
  const data = holdings.map(h => ({
    name: h.symbol,
    value: h.quantity * h.lastPrice,
  }));

  const COLORS = ['#f97316', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#f59e0b'];

  const sectorData = [
    { name: 'Technology', value: 45 },
    { name: 'Finance', value: 25 },
    { name: 'Energy', value: 15 },
    { name: 'Consumer', value: 10 },
    { name: 'Others', value: 5 },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Asset Allocation */}
        <div className="bg-[#141414] border border-white/10 p-8 rounded-[40px] relative overflow-hidden group">
          <h3 className="text-xl font-black tracking-tight mb-8">Asset Allocation</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141414', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(v: number) => [formatCurrency(v), 'Value']}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sector Diversification */}
        <div className="bg-[#141414] border border-white/10 p-8 rounded-[40px] relative overflow-hidden group">
          <h3 className="text-xl font-black tracking-tight mb-8">Sector Diversification</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#ffffff20" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  width={80}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141414', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#3b82f6' }}
                  formatter={(v: number) => [`${v}%`, 'Weight']}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Risk Analysis */}
      <div className="bg-[#141414] border border-white/10 p-8 rounded-[40px]">
        <h3 className="text-xl font-black tracking-tight mb-8">Risk Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Beta</span>
              <span className="text-xs font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-full">Low Risk</span>
            </div>
            <p className="text-3xl font-black tracking-tighter">0.85</p>
            <p className="text-[10px] text-gray-600 font-bold leading-relaxed">
              Your portfolio is 15% less volatile than the market benchmark.
            </p>
          </div>
          <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Sharpe Ratio</span>
              <span className="text-xs font-black text-orange-500 bg-orange-500/10 px-2 py-1 rounded-full">Moderate</span>
            </div>
            <p className="text-3xl font-black tracking-tighter">1.42</p>
            <p className="text-[10px] text-gray-600 font-bold leading-relaxed">
              Risk-adjusted returns are healthy compared to risk-free rate.
            </p>
          </div>
          <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Volatility (Std Dev)</span>
              <span className="text-xs font-black text-red-500 bg-red-500/10 px-2 py-1 rounded-full">High</span>
            </div>
            <p className="text-3xl font-black tracking-tighter">12.4%</p>
            <p className="text-[10px] text-gray-600 font-bold leading-relaxed">
              Monthly standard deviation of returns based on historical data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
