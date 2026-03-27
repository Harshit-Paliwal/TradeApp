import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Activity, Zap, Star } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { StockData, WatchlistItem } from '../types';

interface MarketProps {
  onSelectStock: (symbol: string) => void;
  onAddToWatchlist: (symbol: string) => void;
  watchlist: WatchlistItem[];
}

export default function Market({ onSelectStock, onAddToWatchlist, watchlist }: MarketProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  
  const isWatched = (symbol: string) => watchlist.some(item => item.symbol === symbol);
  
  // Mock data for market
  const stocks: StockData[] = [
    { symbol: 'RELIANCE.NSE', price: 2950.45, change: 45.2, changePercent: 1.55, volume: 4500000, high: 2980, low: 2920, open: 2930, previousClose: 2905.25, lastUpdated: Date.now() },
    { symbol: 'TCS.NSE', price: 4120.10, change: -12.4, changePercent: -0.3, volume: 1200000, high: 4150, low: 4100, open: 4140, previousClose: 4132.5, lastUpdated: Date.now() },
    { symbol: 'HDFCBANK.NSE', price: 1450.75, change: 8.3, changePercent: 0.57, volume: 8900000, high: 1465, low: 1440, open: 1445, previousClose: 1442.45, lastUpdated: Date.now() },
    { symbol: 'INFY.NSE', price: 1620.30, change: 25.6, changePercent: 1.6, volume: 3400000, high: 1635, low: 1600, open: 1605, previousClose: 1594.7, lastUpdated: Date.now() },
    { symbol: 'ICICIBANK.NSE', price: 1080.20, change: -5.4, changePercent: -0.5, volume: 5600000, high: 1095, low: 1075, open: 1090, previousClose: 1085.6, lastUpdated: Date.now() },
    { symbol: 'SBIN.NSE', price: 780.45, change: 12.1, changePercent: 1.57, volume: 12000000, high: 790, low: 770, open: 775, previousClose: 768.35, lastUpdated: Date.now() },
    { symbol: 'BHARTIARTL.NSE', price: 1240.60, change: 35.2, changePercent: 2.92, volume: 2300000, high: 1255, low: 1210, open: 1215, previousClose: 1205.4, lastUpdated: Date.now() },
    { symbol: 'ITC.NSE', price: 430.15, change: -2.3, changePercent: -0.53, volume: 7800000, high: 435, low: 428, open: 433, previousClose: 432.45, lastUpdated: Date.now() },
  ];

  const filteredStocks = stocks.filter(s => 
    s.symbol.toLowerCase().includes(search.toLowerCase()) &&
    (filter === 'all' || (filter === 'gainers' ? s.change > 0 : s.change < 0))
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tighter uppercase">Market Explorer</h2>
          <p className="text-gray-500 text-sm font-medium">Real-time market data across all sectors.</p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search symbol..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500/50 transition-all"
            />
          </div>
          <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
            {['all', 'gainers', 'losers'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                  filter === f ? "bg-orange-500 text-white" : "text-gray-500 hover:text-white"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredStocks.map((stock, i) => (
          <motion.div
            key={stock.symbol}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-[#141414] border border-white/10 p-6 rounded-[32px] hover:border-orange-500/50 transition-all group relative cursor-pointer"
            onClick={() => onSelectStock(stock.symbol)}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-black text-sm group-hover:bg-orange-500 group-hover:text-white transition-all">
                {stock.symbol.slice(0, 2)}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToWatchlist(stock.symbol);
                }}
                className={cn(
                  "p-2 rounded-full transition-all",
                  isWatched(stock.symbol) ? "text-orange-500 bg-orange-500/10" : "text-gray-500 hover:text-white hover:bg-white/5"
                )}
              >
                <Star size={18} fill={isWatched(stock.symbol) ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="space-y-1 mb-6">
              <h3 className="text-xl font-black tracking-tighter">{stock.symbol}</h3>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">NSE / Equity</p>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-black tracking-tight">{formatCurrency(stock.price)}</p>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-black uppercase tracking-widest",
                  stock.change >= 0 ? "text-green-500" : "text-red-500"
                )}>
                  {stock.change >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                  {Math.abs(stock.changePercent).toFixed(2)}%
                </div>
              </div>
              <div className="w-16 h-8 opacity-50 group-hover:opacity-100 transition-opacity">
                {/* Mini chart placeholder */}
                <Activity size={32} className={stock.change >= 0 ? "text-green-500" : "text-red-500"} />
              </div>
            </div>

            {/* Hover Action */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#141414]/80 backdrop-blur-sm rounded-[32px]">
              <div className="flex gap-3">
                <button className="px-6 py-2 bg-orange-500 text-white font-black text-xs rounded-xl shadow-lg shadow-orange-500/20">
                  DETAILS
                </button>
                <button className="p-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all">
                  <Zap size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
