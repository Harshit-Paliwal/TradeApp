import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet, PieChart, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn, formatCurrency } from '../lib/utils';
import { StockData, Holding, Trade, UserProfile } from '../types';

interface DashboardProps {
  profile: UserProfile | null;
  holdings: Holding[];
  trades: Trade[];
  onSelectStock: (symbol: string) => void;
}

export default function Dashboard({ profile, holdings, trades, onSelectStock }: DashboardProps) {
  const totalInvestment = holdings.reduce((acc, h) => acc + h.quantity * h.averagePrice, 0);
  const currentValue = holdings.reduce((acc, h) => acc + h.quantity * h.lastPrice, 0);
  const totalPnL = currentValue - totalInvestment;
  const pnlPercent = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;

  // Mock market trends for now
  const marketTrends: StockData[] = [
    { symbol: 'RELIANCE.NSE', price: 2950.45, change: 45.2, changePercent: 1.55, volume: 4500000, high: 2980, low: 2920, open: 2930, previousClose: 2905.25, lastUpdated: Date.now() },
    { symbol: 'TCS.NSE', price: 4120.10, change: -12.4, changePercent: -0.3, volume: 1200000, high: 4150, low: 4100, open: 4140, previousClose: 4132.5, lastUpdated: Date.now() },
    { symbol: 'HDFCBANK.NSE', price: 1450.75, change: 8.3, changePercent: 0.57, volume: 8900000, high: 1465, low: 1440, open: 1445, previousClose: 1442.45, lastUpdated: Date.now() },
  ];

  // Mock portfolio history
  const portfolioHistory = [
    { date: '2024-03-20', value: 95000 },
    { date: '2024-03-21', value: 98000 },
    { date: '2024-03-22', value: 97000 },
    { date: '2024-03-23', value: 102000 },
    { date: '2024-03-24', value: 105000 },
    { date: '2024-03-25', value: 103000 },
    { date: '2024-03-26', value: 108000 },
  ];

  const stats = [
    { label: 'Total Value', value: formatCurrency(currentValue), icon: Wallet, color: 'text-orange-500' },
    { label: 'Investment', value: formatCurrency(totalInvestment), icon: PieChart, color: 'text-blue-500' },
    { label: 'P&L', value: formatCurrency(totalPnL), icon: totalPnL >= 0 ? TrendingUp : TrendingDown, color: totalPnL >= 0 ? 'text-green-500' : 'text-red-500', subValue: `${pnlPercent.toFixed(2)}%` },
    { label: 'Available Cash', value: formatCurrency(profile?.balance || 0), icon: Activity, color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#141414] border border-white/10 p-6 rounded-2xl hover:border-orange-500/50 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors", stat.color)}>
                <stat.icon size={20} />
              </div>
              {stat.subValue && (
                <span className={cn("text-xs font-bold px-2 py-1 rounded-full bg-white/5", stat.color)}>
                  {stat.subValue}
                </span>
              )}
            </div>
            <p className="text-gray-500 text-sm font-medium mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Charts & Trends Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Portfolio Performance */}
        <div className="lg:col-span-2 bg-[#141414] border border-white/10 p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Portfolio Performance</h3>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-orange-500/50">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolioHistory}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="date" stroke="#ffffff20" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff20" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141414', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#f97316' }}
                />
                <Area type="monotone" dataKey="value" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Market Trends */}
        <div className="bg-[#141414] border border-white/10 p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-6">Market Trends</h3>
          <div className="space-y-4">
            {marketTrends.map((stock, i) => (
              <div 
                key={stock.symbol} 
                className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
                onClick={() => onSelectStock(stock.symbol)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-bold text-xs group-hover:bg-orange-500 group-hover:text-white transition-all">
                    {stock.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{stock.symbol}</p>
                    <p className="text-xs text-gray-500">Vol: {stock.volume.toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">₹{stock.price.toLocaleString('en-IN')}</p>
                  <div className={cn("flex items-center justify-end text-xs font-bold", stock.change >= 0 ? "text-green-500" : "text-red-500")}>
                    {stock.change >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {Math.abs(stock.changePercent).toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 rounded-xl border border-white/10 text-sm font-medium hover:bg-white/5 transition-all">
            View All Market Data
          </button>
        </div>
      </div>

      {/* Holdings Section */}
      <div className="bg-[#141414] border border-white/10 p-8 rounded-3xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold">Your Holdings</h3>
          <button className="text-orange-500 text-sm font-bold hover:underline">View Portfolio</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-white/5">
                <th className="pb-4 font-semibold">Instrument</th>
                <th className="pb-4 font-semibold">Qty</th>
                <th className="pb-4 font-semibold">Avg. Cost</th>
                <th className="pb-4 font-semibold">LTP</th>
                <th className="pb-4 font-semibold">Cur. Value</th>
                <th className="pb-4 font-semibold">P&L</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {holdings.map((holding) => (
                <tr 
                  key={holding.symbol} 
                  className="group hover:bg-white/5 transition-all cursor-pointer"
                  onClick={() => onSelectStock(holding.symbol)}
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center font-bold text-[10px]">
                        {holding.symbol.slice(0, 2)}
                      </div>
                      <span className="font-bold text-sm">{holding.symbol}</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm font-medium">{holding.quantity}</td>
                  <td className="py-4 text-sm font-medium">₹{holding.averagePrice.toLocaleString('en-IN')}</td>
                  <td className="py-4 text-sm font-medium">₹{holding.lastPrice.toLocaleString('en-IN')}</td>
                  <td className="py-4 text-sm font-medium">₹{(holding.quantity * holding.lastPrice).toLocaleString('en-IN')}</td>
                  <td className="py-4">
                    <div className={cn("text-sm font-bold", holding.pnl >= 0 ? "text-green-500" : "text-red-500")}>
                      {holding.pnl >= 0 ? '+' : ''}{holding.pnl.toLocaleString('en-IN')}
                      <span className="text-[10px] ml-1 opacity-70">({holding.pnlPercent.toFixed(2)}%)</span>
                    </div>
                  </td>
                </tr>
              ))}
              {holdings.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500 italic">
                    No holdings yet. Start trading to see your portfolio here!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
