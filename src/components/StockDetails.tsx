import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, TrendingDown, Info, ShieldAlert, Zap, Target, BarChart3, Star } from 'lucide-react';
import { cn, formatCurrency, formatNumber } from '../lib/utils';
import { StockData, HistoricalData, Recommendation } from '../types';
import StockChart from './StockChart';
import { aiService } from '../services/aiService';

interface StockDetailsProps {
  stock: StockData;
  historicalData: HistoricalData[];
  onBack: () => void;
  onTrade: () => void;
  onAddToWatchlist: (symbol: string) => void;
  isWatched: boolean;
}

export default function StockDetails({ stock, historicalData, onBack, onTrade, onAddToWatchlist, isWatched }: StockDetailsProps) {
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (!historicalData.length) return;

  const runAI = async () => {
    const result = await aiService.getRecommendation(stock.symbol, historicalData);
    setRecommendation(result);
  };

  runAI();
}, [historicalData]);

  return (
    <div className="space-y-8 pb-12">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-bold uppercase tracking-widest">Back to Dashboard</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h2 className="text-4xl font-black tracking-tighter">{stock.symbol}</h2>
                <span className="px-2 py-1 rounded-lg bg-white/5 text-[10px] font-bold text-gray-500 uppercase tracking-widest border border-white/10">
                  Equity / NSE
                </span>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-3xl font-bold">{formatCurrency(stock.price)}</p>
                <div className={cn(
                  "flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-lg",
                  stock.change >= 0 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                )}>
                  {stock.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {Math.abs(stock.change).toFixed(2)} ({Math.abs(stock.changePercent).toFixed(2)}%)
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => onAddToWatchlist(stock.symbol)}
                className={cn(
                  "p-4 rounded-2xl border transition-all",
                  isWatched 
                    ? "bg-orange-500/10 border-orange-500/20 text-orange-500" 
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                )}
              >
                <Star size={24} fill={isWatched ? "currentColor" : "none"} />
              </button>
              <button
                onClick={onTrade}
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all shadow-xl shadow-orange-500/20"
              >
                TRADE NOW
              </button>
            </div>
          </div>

          <StockChart data={historicalData} symbol={stock.symbol} />

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Open', value: formatCurrency(stock.open) },
              { label: 'High', value: formatCurrency(stock.high) },
              { label: 'Low', value: formatCurrency(stock.low) },
              { label: 'Prev. Close', value: formatCurrency(stock.previousClose) },
              { label: 'Volume', value: formatNumber(stock.volume) },
              { label: 'Market Cap', value: stock.marketCap ? formatNumber(stock.marketCap) : 'N/A' },
              { label: '52W High', value: formatCurrency(stock.high * 1.2) }, // Mock
              { label: '52W Low', value: formatCurrency(stock.low * 0.8) }, // Mock
            ].map((stat) => (
              <div key={stat.label} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">{stat.label}</p>
                <p className="text-sm font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights Sidebar */}
        <div className="space-y-8">
          <div className="bg-[#141414] border border-white/10 p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Zap size={120} />
            </div>
            
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Zap className="text-orange-500" size={20} />
              AI Insights
            </h3>

            {loading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-12 bg-white/5 rounded-2xl"></div>
                <div className="h-24 bg-white/5 rounded-2xl"></div>
                <div className="h-32 bg-white/5 rounded-2xl"></div>
              </div>
            ) : recommendation && (
              <div className="space-y-6">
                <div className={cn(
                  "p-4 rounded-2xl border flex items-center justify-between",
                  recommendation.signal === 'buy' ? "bg-green-500/10 border-green-500/20 text-green-500" :
                  recommendation.signal === 'sell' ? "bg-red-500/10 border-red-500/20 text-red-500" :
                  "bg-orange-500/10 border-orange-500/20 text-orange-500"
                )}>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-black opacity-70">Signal</p>
                    <p className="text-2xl font-black uppercase tracking-tighter">{recommendation.signal}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest font-black opacity-70">Confidence</p>
                    <p className="text-2xl font-black tracking-tighter">{(recommendation.confidence * 100).toFixed(0)}%</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <ShieldAlert className={cn(
                      recommendation.riskLevel === 'low' ? "text-green-500" :
                      recommendation.riskLevel === 'medium' ? "text-orange-500" : "text-red-500"
                    )} size={20} />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Risk Level</p>
                      <p className="text-sm font-bold capitalize">{recommendation.riskLevel} Risk</p>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2">Analysis</p>
                    <p className="text-xs text-gray-400 leading-relaxed font-medium">
                      {recommendation.explanation}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Technical Indicators</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-[10px] text-gray-500 mb-1">RSI (14)</p>
                      <p className="text-xs font-bold">{recommendation.indicators.rsi.toFixed(2)}</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-[10px] text-gray-500 mb-1">MACD</p>
                      <p className="text-xs font-bold">{recommendation.indicators.macd.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* F&O Section */}
          <div className="bg-[#141414] border border-white/10 p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <BarChart3 className="text-blue-500" size={20} />
              Futures & Options
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Next Expiry</span>
                  <span className="text-xs font-bold">24 APR 2026</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Lot Size</span>
                  <span className="text-xs font-bold">50</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold hover:bg-green-500/20 transition-all">
                  CALL (CE)
                </button>
                <button className="py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold hover:bg-red-500/20 transition-all">
                  PUT (PE)
                </button>
              </div>
              <div className="flex gap-2 p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                <ShieldAlert className="text-orange-500 shrink-0" size={16} />
                <p className="text-[10px] text-orange-500/80 leading-tight">
                  F&O trading involves high risk. 9 out of 10 individual traders in equity F&O segment incurred net losses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
