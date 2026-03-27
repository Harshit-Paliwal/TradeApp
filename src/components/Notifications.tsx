import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Zap, TrendingUp, TrendingDown, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export interface Notification {
  id: string;
  type: 'signal' | 'order' | 'alert' | 'system';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  severity: 'info' | 'success' | 'warning' | 'error';
}

interface NotificationsProps {
  notifications: Notification[];
  onRead: (id: string) => void;
  onClear: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Notifications({ notifications, onRead, onClear, isOpen, onClose }: NotificationsProps) {
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string, severity: string) => {
    switch (type) {
      case 'signal': return <Zap className="text-orange-500" size={16} />;
      case 'order': return <CheckCircle2 className="text-green-500" size={16} />;
      case 'alert': return <AlertCircle className="text-red-500" size={16} />;
      default: return <Bell className="text-blue-500" size={16} />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose}></div>
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-16 right-8 w-96 bg-[#141414] border border-white/10 rounded-[32px] shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-6 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="text-orange-500" size={20} />
                <h3 className="font-black tracking-tight">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-orange-500 text-[10px] font-black text-white">
                    {unreadCount} NEW
                  </span>
                )}
              </div>
              <button onClick={onClear} className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest transition-colors">
                Clear All
              </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => onRead(n.id)}
                  className={cn(
                    "p-6 border-b border-white/5 hover:bg-white/5 transition-all cursor-pointer relative group",
                    !n.read && "bg-orange-500/5"
                  )}
                >
                  {!n.read && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"></div>
                  )}
                  <div className="flex gap-4">
                    <div className="p-2 bg-white/5 rounded-xl h-fit">
                      {getIcon(n.type, n.severity)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-black tracking-tight">{n.title}</h4>
                        <span className="text-[10px] text-gray-600 font-bold">
                          {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed">
                        {n.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {notifications.length === 0 && (
                <div className="p-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-700 mx-auto">
                    <Bell size={24} />
                  </div>
                  <p className="text-xs text-gray-600 font-black uppercase tracking-widest">No new notifications</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-white/5 text-center">
              <button className="text-[10px] font-black text-orange-500 hover:text-orange-400 uppercase tracking-widest transition-colors">
                View All Activity
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
