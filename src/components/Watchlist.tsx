import React from 'react';
import { motion } from 'framer-motion';
import { Star, Trash2, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { StockData } from '../types';

interface WatchlistProps {
  stocks: StockData[];
  onRemove: (symbol: string) => void;
  onSelect: (symbol: string) => void;
}

export default function Watchlist({ stocks, onRemove, onSelect }: WatchlistProps) {
  return (
    <div className="bg-[#141414] border border-white/10 p-6 rounded-3xl h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Star className="text-orange-500 fill-orange-500" size={20} />
          Watchlist
        </h3>
        <span className="text-xs font-bold text-gray-500 bg-white/5 px-2 py-1 rounded-full">
          {stocks.length} Stocks
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {stocks.map((stock, i) => (
          <motion.div
            key={stock.symbol}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelect(stock.symbol)}
            className="group relative flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-orange-500/30 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-bold text-xs group-hover:bg-orange-500 group-hover:text-white transition-all">
                {stock.symbol.slice(0, 2)}
              </div>
              <div>
                <p className="font-bold text-sm tracking-tight">{stock.symbol}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                  Vol: {stock.volume.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="text-right pr-8">
              <p className="font-bold text-sm">{formatCurrency(stock.price)}</p>
              <div className={cn(
                "flex items-center justify-end text-[10px] font-bold",
                stock.change >= 0 ? "text-green-500" : "text-red-500"
              )}>
                {stock.change >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {Math.abs(stock.changePercent).toFixed(2)}%
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(stock.symbol);
              }}
              className="absolute right-4 p-2 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 size={16} />
            </button>
          </motion.div>
        ))}

        {stocks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-500 mb-4">
              <Star size={24} />
            </div>
            <p className="text-sm text-gray-500 font-medium">Your watchlist is empty.</p>
            <p className="text-xs text-gray-600 mt-1">Search for stocks to add them here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
