import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface IndexData {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

interface IndicesOverviewProps {
  indices: IndexData[];
}

export default function IndicesOverview({ indices }: IndicesOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {indices.map((index, i) => (
        <motion.div
          key={index.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-[#141414] border border-white/10 p-6 rounded-3xl hover:border-orange-500/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
              <Globe size={18} className="text-gray-500" />
            </div>
            <div className={cn(
              "flex items-center gap-1 text-[10px] font-black uppercase tracking-widest",
              index.change >= 0 ? "text-green-500" : "text-red-500"
            )}>
              {index.change >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
              {Math.abs(index.changePercent).toFixed(2)}%
            </div>
          </div>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">{index.name}</p>
          <h3 className="text-xl font-black tracking-tight">{index.value.toLocaleString('en-IN')}</h3>
        </motion.div>
      ))}
    </div>
  );
}
