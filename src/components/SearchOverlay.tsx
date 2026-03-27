import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, ArrowRight, Activity, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import { stockService } from '../services/stockService';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (symbol: string) => void;
}

export default function SearchOverlay({ isOpen, onClose, onSelect }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await stockService.searchStocks(query);
        setResults(data);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:p-24 bg-black/90 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="w-full max-w-3xl bg-[#141414] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="p-8 border-b border-white/10 flex items-center gap-6 bg-white/5">
              <Search className="text-orange-500 w-8 h-8" />
              <input
                autoFocus
                type="text"
                placeholder="Search stocks, indices, sectors..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-none text-2xl font-black tracking-tighter placeholder:text-gray-700 focus:outline-none"
              />
              <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar min-h-[400px]">
              {loading ? (
                <div className="space-y-4 animate-pulse">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-20 bg-white/5 rounded-3xl"></div>
                  ))}
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-6">Search Results</p>
                  {results.map((stock, i) => (
                    <motion.div
                      key={stock.symbol}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => {
                        onSelect(stock.symbol);
                        onClose();
                      }}
                      className="group flex items-center justify-between p-6 rounded-[32px] bg-white/5 hover:bg-white/10 border border-transparent hover:border-orange-500/30 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center font-black text-lg group-hover:bg-orange-500 group-hover:text-white transition-all">
                          {stock.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <h4 className="text-xl font-black tracking-tight">{stock.symbol}</h4>
                          <p className="text-sm text-gray-500 font-medium">{stock.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                          <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest">{stock.type}</p>
                          <p className="text-xs font-bold text-gray-400">{stock.region}</p>
                        </div>
                        <ArrowRight className="text-gray-700 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" size={24} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : query ? (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-700">
                    <Search size={32} />
                  </div>
                  <p className="text-sm text-gray-500 font-black uppercase tracking-widest">No results found for "{query}"</p>
                </div>
              ) : (
                <div className="space-y-12">
                  <div className="space-y-6">
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">Trending Searches</p>
                    <div className="flex flex-wrap gap-3">
                      {['RELIANCE.NSE', 'TCS.NSE', 'HDFCBANK.NSE', 'INFY.NSE', 'ZOMATO.NSE', 'PAYTM.NSE'].map((s) => (
                        <button
                          key={s}
                          onClick={() => setQuery(s)}
                          className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-black hover:bg-orange-500 hover:text-white transition-all"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 bg-orange-500/5 border border-orange-500/10 rounded-[40px] space-y-4">
                      <Zap className="text-orange-500" size={24} />
                      <h4 className="text-lg font-black tracking-tight">AI Insights</h4>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed">
                        Search for any stock to see real-time AI recommendations and technical analysis.
                      </p>
                    </div>
                    <div className="p-8 bg-blue-500/5 border border-blue-500/10 rounded-[40px] space-y-4">
                      <Activity className="text-blue-500" size={24} />
                      <h4 className="text-lg font-black tracking-tight">Market Trends</h4>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed">
                        Stay updated with the latest market gainers, losers, and sector-wise performance.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
