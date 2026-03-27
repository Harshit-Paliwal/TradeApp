import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, TrendingUp, Shield, Target, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

interface Insight {
  id: string;
  type: 'opportunity' | 'risk' | 'trend';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  symbol?: string;
}

interface AITradingInsightsProps {
  insights: Insight[];
  onSelect: (symbol: string) => void;
}

export default function AITradingInsights({ insights, onSelect }: AITradingInsightsProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <Zap className="text-orange-500" size={20} />;
      case 'risk': return <Shield className="text-red-500" size={20} />;
      case 'trend': return <Activity className="text-blue-500" size={20} />;
      default: return <Sparkles className="text-orange-500" size={20} />;
    }
  };

  return (
    <div className="bg-[#141414] border border-white/10 p-8 rounded-[40px] relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Sparkles size={120} />
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-orange-500/20 rounded-2xl text-orange-500">
          <Sparkles size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black tracking-tight">AI Trading Insights</h3>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Real-time Intelligence Engine</p>
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight, i) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => insight.symbol && onSelect(insight.symbol)}
            className={cn(
              "p-6 bg-white/5 rounded-[32px] border border-white/10 hover:border-orange-500/30 transition-all group",
              insight.symbol && "cursor-pointer"
            )}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors">
                {getIcon(insight.type)}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black tracking-tight">{insight.title}</h4>
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                    insight.impact === 'high' ? "bg-orange-500/20 text-orange-500" : 
                    insight.impact === 'medium' ? "bg-blue-500/20 text-blue-500" : 
                    "bg-gray-500/20 text-gray-500"
                  )}>
                    {insight.impact} impact
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  {insight.description}
                </p>
                {insight.symbol && (
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Analyze {insight.symbol}</span>
                    <TrendingUp size={12} className="text-orange-500" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
