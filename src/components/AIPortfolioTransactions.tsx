import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Target, Shield, Zap, TrendingUp, PieChart } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';

interface Transaction {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  date: string;
}

interface AIPortfolioTransactionsProps {
  transactions: Transaction[];
  onSelect: (id: string) => void;
}

export default function AIPortfolioTransactions({ transactions, onSelect }: AIPortfolioTransactionsProps) {
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
          <h3 className="text-xl font-black tracking-tight">AI Portfolio Transactions</h3>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Historical Asset Activity</p>
        </div>
      </div>

      <div className="space-y-4">
        {transactions.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => onSelect(t.id)}
            className="p-6 bg-white/5 rounded-[32px] border border-white/10 hover:border-orange-500/30 transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-xl",
                  t.type === 'buy' ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                )}>
                  {t.type === 'buy' ? <TrendingUp size={16} /> : <TrendingUp size={16} className="transform rotate-180" />}
                </div>
                <div>
                  <h4 className="text-sm font-black tracking-tight">{t.symbol}</h4>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{t.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-black tracking-tight">{formatCurrency(t.price * t.quantity)}</p>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{t.quantity} Shares @ {formatCurrency(t.price)}</p>
              </div>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className={cn(
                  "h-full rounded-full transition-all",
                  t.type === 'buy' ? "bg-green-500" : "bg-red-500"
                )}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
