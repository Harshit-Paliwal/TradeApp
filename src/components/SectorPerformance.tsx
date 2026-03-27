import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface SectorData {
  name: string;
  change: number;
}

interface SectorPerformanceProps {
  sectors: SectorData[];
}

export default function SectorPerformance({ sectors }: SectorPerformanceProps) {
  return (
    <div className="bg-[#141414] border border-white/10 p-8 rounded-[40px] h-full">
      <h3 className="text-xl font-black tracking-tight mb-8">Sector Performance</h3>
      <div className="space-y-6">
        {sectors.map((sector, i) => (
          <motion.div
            key={sector.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group"
          >
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
              <span className="text-gray-400 group-hover:text-white transition-colors">{sector.name}</span>
              <span className={cn(sector.change >= 0 ? "text-green-500" : "text-red-500")}>
                {sector.change >= 0 ? '+' : ''}{sector.change.toFixed(2)}%
              </span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(Math.abs(sector.change) * 10, 100)}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className={cn(
                  "h-full rounded-full transition-all",
                  sector.change >= 0 ? "bg-green-500" : "bg-red-500"
                )}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
