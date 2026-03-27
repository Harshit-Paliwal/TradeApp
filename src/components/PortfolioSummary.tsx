import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';

interface PortfolioSummaryProps {
  totalValue: number;
  investedValue: number;
  pnl: number;
  pnlPercent: number;
  dayPnl: number;
  dayPnlPercent: number;
}

export default function PortfolioSummary({ 
  totalValue, 
  investedValue, 
  pnl, 
  pnlPercent, 
  dayPnl, 
  dayPnlPercent 
}: PortfolioSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Value Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#141414] border border-white/10 p-8 rounded-[40px] relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
          <Wallet size={120} />
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-500/20 rounded-2xl text-blue-500">
            <Wallet size={24} />
          </div>
          <div>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Current Value</p>
            <h3 className="text-2xl font-black tracking-tight">{formatCurrency(totalValue)}</h3>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest mb-1">Invested</p>
            <p className="text-sm font-black">{formatCurrency(investedValue)}</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="flex-1">
            <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest mb-1">Available Cash</p>
            <p className="text-sm font-black">{formatCurrency(totalValue - investedValue)}</p>
          </div>
        </div>
      </motion.div>

      {/* Total P&L Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#141414] border border-white/10 p-8 rounded-[40px] relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
          <PieChart size={120} />
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className={cn(
            "p-3 rounded-2xl",
            pnl >= 0 ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
          )}>
            {pnl >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
          </div>
          <div>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Total Returns</p>
            <h3 className={cn(
              "text-2xl font-black tracking-tight",
              pnl >= 0 ? "text-green-500" : "text-red-500"
            )}>
              {pnl >= 0 ? '+' : ''}{formatCurrency(pnl)}
            </h3>
          </div>
        </div>
        <div className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest",
          pnl >= 0 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
        )}>
          {pnl >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(pnlPercent).toFixed(2)}% Overall
        </div>
      </motion.div>

      {/* Day P&L Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#141414] border border-white/10 p-8 rounded-[40px] relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
          <TrendingUp size={120} />
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className={cn(
            "p-3 rounded-2xl",
            dayPnl >= 0 ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
          )}>
            {dayPnl >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
          </div>
          <div>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Day's P&L</p>
            <h3 className={cn(
              "text-2xl font-black tracking-tight",
              dayPnl >= 0 ? "text-green-500" : "text-red-500"
            )}>
              {dayPnl >= 0 ? '+' : ''}{formatCurrency(dayPnl)}
            </h3>
          </div>
        </div>
        <div className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest",
          dayPnl >= 0 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
        )}>
          {dayPnl >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(dayPnlPercent).toFixed(2)}% Today
        </div>
      </motion.div>
    </div>
  );
}
