import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, TrendingDown, AlertCircle, Info } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { StockData } from '../types';

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: StockData;
  userBalance: number;
  onTrade: (type: 'buy' | 'sell', quantity: number, price: number, orderType: 'market' | 'limit') => void;
}

export default function TradeModal({ isOpen, onClose, stock, userBalance, onTrade }: TradeModalProps) {
  const [type, setType] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [quantity, setQuantity] = useState<number>(1);
  const [limitPrice, setLimitPrice] = useState<number>(stock.price);

  const price = orderType === 'market' ? stock.price : limitPrice;
  const total = quantity * price;
  const maxLimit = 100000;
  const isOverLimit = total > maxLimit;
  const canAfford = type === 'buy' ? total <= userBalance : true;

  const handleTrade = () => {
    if (isOverLimit || !canAfford || quantity <= 0) return;
    onTrade(type, quantity, price, orderType);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#141414] border border-white/10 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-xl",
              type === 'buy' ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
            )}>
              {type === 'buy' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
            </div>
            <div>
              <h3 className="font-bold text-lg">{stock.symbol}</h3>
              <p className="text-xs text-gray-500">LTP: {formatCurrency(stock.price)}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Buy/Sell Toggle */}
          <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10">
            <button
              onClick={() => setType('buy')}
              className={cn(
                "flex-1 py-2.5 rounded-xl font-bold text-sm transition-all",
                type === 'buy' ? "bg-green-500 text-white shadow-lg shadow-green-500/20" : "text-gray-500 hover:text-white"
              )}
            >
              BUY
            </button>
            <button
              onClick={() => setType('sell')}
              className={cn(
                "flex-1 py-2.5 rounded-xl font-bold text-sm transition-all",
                type === 'sell' ? "bg-red-500 text-white shadow-lg shadow-red-500/20" : "text-gray-500 hover:text-white"
              )}
            >
              SELL
            </button>
          </div>

          {/* Order Type Toggle */}
          <div className="flex gap-4">
            {['market', 'limit'].map((t) => (
              <button
                key={t}
                onClick={() => setOrderType(t as any)}
                className={cn(
                  "flex-1 py-2 rounded-xl border text-xs font-bold uppercase tracking-widest transition-all",
                  orderType === t 
                    ? "border-orange-500 bg-orange-500/10 text-orange-500" 
                    : "border-white/10 bg-white/5 text-gray-500 hover:border-white/20"
                )}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Price</label>
              <input
                type="number"
                disabled={orderType === 'market'}
                value={orderType === 'market' ? stock.price : limitPrice}
                onChange={(e) => setLimitPrice(parseFloat(e.target.value) || 0)}
                className={cn(
                  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500/50 transition-all",
                  orderType === 'market' && "opacity-50 cursor-not-allowed"
                )}
              />
            </div>
          </div>

          {/* Summary */}
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Approx. Total</span>
              <span className="font-bold">{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Available Balance</span>
              <span className={cn("font-medium", userBalance < total && type === 'buy' ? "text-red-500" : "text-gray-300")}>
                {formatCurrency(userBalance)}
              </span>
            </div>
          </div>

          {/* Warnings */}
          <AnimatePresence>
            {isOverLimit && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs"
              >
                <AlertCircle size={14} />
                <span>Max transaction limit is ₹1,00,000 per trade.</span>
              </motion.div>
            )}
            {type === 'buy' && !canAfford && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs"
              >
                <AlertCircle size={14} />
                <span>Insufficient balance for this trade.</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Disclaimer */}
          <div className="flex gap-2 text-[10px] text-gray-500 leading-relaxed">
            <Info size={12} className="shrink-0 mt-0.5" />
            <p>Investing in securities market are subject to market risks. Read all the related documents carefully before investing. This is not financial advice.</p>
          </div>

          {/* Action Button */}
          <button
            onClick={handleTrade}
            disabled={isOverLimit || !canAfford || quantity <= 0}
            className={cn(
              "w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-xl",
              type === 'buy' 
                ? "bg-green-500 hover:bg-green-600 shadow-green-500/20" 
                : "bg-red-500 hover:bg-red-600 shadow-red-500/20",
              (isOverLimit || !canAfford || quantity <= 0) && "opacity-50 cursor-not-allowed grayscale"
            )}
          >
            {type === 'buy' ? 'PLACE BUY ORDER' : 'PLACE SELL ORDER'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
