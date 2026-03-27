import React from 'react';
import { motion } from 'framer-motion';
import { History as HistoryIcon, Filter, Download, Search, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { Trade } from '../types';

interface HistoryProps {
  trades: Trade[];
}

export default function History({ trades }: HistoryProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tighter uppercase">Trade History</h2>
          <p className="text-gray-500 text-sm font-medium">Review your past performance and execution logs.</p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search trades..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500/50 transition-all"
            />
          </div>
          <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-500 hover:text-white transition-all">
            <Download size={20} />
          </button>
        </div>
      </div>

      <div className="bg-[#141414] border border-white/10 rounded-[40px] overflow-hidden">
        <div className="p-8 border-b border-white/10 bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/20 rounded-2xl text-orange-500">
              <HistoryIcon size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight">Execution Logs</h3>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Showing {trades.length} recent trades</p>
            </div>
          </div>
          <div className="flex gap-2">
            {['All', 'Buy', 'Sell', 'Equity', 'F&O'].map((f) => (
              <button
                key={f}
                className="px-4 py-1.5 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all"
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/5">
                <th className="p-8 font-black">Instrument</th>
                <th className="p-8 font-black">Type</th>
                <th className="p-8 font-black">Quantity</th>
                <th className="p-8 font-black">Price</th>
                <th className="p-8 font-black">Total Value</th>
                <th className="p-8 font-black">Status</th>
                <th className="p-8 font-black">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {trades.map((trade, i) => (
                <motion.tr
                  key={trade.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-white/5 transition-all"
                >
                  <td className="p-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-black text-xs group-hover:bg-orange-500 group-hover:text-white transition-all">
                        {trade.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-black text-sm tracking-tight">{trade.symbol}</p>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{trade.assetType}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-8">
                    <div className={cn(
                      "flex items-center gap-2 text-xs font-black uppercase tracking-widest",
                      trade.type === 'buy' ? "text-green-500" : "text-red-500"
                    )}>
                      {trade.type === 'buy' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      {trade.type}
                    </div>
                  </td>
                  <td className="p-8 text-sm font-black">{trade.quantity}</td>
                  <td className="p-8 text-sm font-black">{formatCurrency(trade.price)}</td>
                  <td className="p-8 text-sm font-black">{formatCurrency(trade.total)}</td>
                  <td className="p-8">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                      trade.status === 'completed' ? "bg-green-500/10 border-green-500/20 text-green-500" :
                      trade.status === 'pending' ? "bg-orange-500/10 border-orange-500/20 text-orange-500" :
                      "bg-red-500/10 border-red-500/20 text-red-500"
                    )}>
                      {trade.status}
                    </span>
                  </td>
                  <td className="p-8 text-xs text-gray-500 font-bold">
                    {new Date(trade.timestamp).toLocaleString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                </motion.tr>
              ))}
              {trades.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-20 text-center">
                    <div className="flex flex-col items-center gap-4 text-gray-500">
                      <HistoryIcon size={48} className="opacity-10" />
                      <p className="text-sm font-bold uppercase tracking-widest">No trades found in your history.</p>
                    </div>
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
