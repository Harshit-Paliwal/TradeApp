import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Zap, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { cn } from '../lib/utils';
import { Notification } from './Notifications';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onRead: (id: string) => void;
  onClear: () => void;
}

export default function NotificationsPanel({ isOpen, onClose, notifications, onRead, onClear }: NotificationsPanelProps) {
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'signal': return <Zap className="text-orange-500" size={20} />;
      case 'order': return <CheckCircle2 className="text-green-500" size={20} />;
      case 'alert': return <AlertCircle className="text-red-500" size={20} />;
      default: return <Info className="text-blue-500" size={20} />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-end p-4 md:p-8 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className="w-full max-w-md bg-[#141414] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden flex flex-col h-full max-h-[80vh]"
          >
            <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-500/20 rounded-2xl text-orange-500">
                  <Bell size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tight">Notifications</h3>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{unreadCount} Unread Messages</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={onClear} className="p-2 text-gray-500 hover:text-white transition-colors">
                  <span className="text-[10px] font-black uppercase tracking-widest">Clear</span>
                </button>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
              {notifications.map((n, i) => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => onRead(n.id)}
                  className={cn(
                    "p-6 rounded-[32px] border transition-all cursor-pointer relative group",
                    n.read ? "bg-white/5 border-transparent hover:bg-white/10" : "bg-orange-500/5 border-orange-500/20 hover:bg-orange-500/10"
                  )}
                >
                  <div className="flex gap-4">
                    <div className="p-3 bg-white/5 rounded-2xl h-fit group-hover:bg-white/10 transition-colors">
                      {getIcon(n.type)}
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
                </motion.div>
              ))}

              {notifications.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-700">
                    <Bell size={32} />
                  </div>
                  <p className="text-sm text-gray-500 font-black uppercase tracking-widest">No notifications yet</p>
                </div>
              )}
            </div>

            <div className="p-6 bg-white/5 border-t border-white/10 text-center">
              <button className="text-[10px] font-black text-orange-500 hover:text-orange-400 uppercase tracking-widest transition-colors">
                View All Activity Logs
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
