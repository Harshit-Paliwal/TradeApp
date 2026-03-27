import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, Bot, User, Zap, TrendingUp, Shield } from 'lucide-react';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export default function AITradingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI Trading Assistant. I can help you analyze stocks, optimize your portfolio, or explain market trends. What's on your mind today?",
      timestamp: new Date(),
      suggestions: ['Analyze RELIANCE', 'Check my portfolio risk', 'Market outlook for today']
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (content: string) => {
    if (!content.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I've analyzed your request about "${content}". Based on current market data and technical indicators, I recommend monitoring the ₹2,450 support level. The RSI is currently at 42, suggesting a neutral to slightly oversold condition.`,
        timestamp: new Date(),
        suggestions: ['Show technical chart', 'Compare with industry peers', 'Set price alert']
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 p-4 bg-orange-500 text-white rounded-full shadow-2xl shadow-orange-500/40 flex items-center gap-2 group"
      >
        <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-black uppercase tracking-widest text-[10px] whitespace-nowrap">
          AI Assistant
        </span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-end justify-end p-4 md:p-8 bg-black/40 backdrop-blur-sm pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              className="w-full max-w-lg bg-[#141414] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden flex flex-col h-[600px] pointer-events-auto"
            >
              {/* Header */}
              <div className="p-8 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-500/20 rounded-2xl text-orange-500">
                    <Bot size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-tight">AI Assistant</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Online & Analyzing</p>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Messages */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar"
              >
                {messages.map((m) => (
                  <div 
                    key={m.id}
                    className={cn(
                      "flex gap-4",
                      m.role === 'user' ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <div className={cn(
                      "p-2 rounded-xl h-fit",
                      m.role === 'user' ? "bg-orange-500/20 text-orange-500" : "bg-white/5 text-gray-500"
                    )}>
                      {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={cn(
                      "max-w-[80%] space-y-3",
                      m.role === 'user' ? "items-end" : "items-start"
                    )}>
                      <div className={cn(
                        "p-6 rounded-[32px] text-sm leading-relaxed",
                        m.role === 'user' 
                          ? "bg-orange-500 text-white rounded-tr-none" 
                          : "bg-white/5 border border-white/10 rounded-tl-none"
                      )}>
                        {m.content}
                      </div>
                      {m.suggestions && (
                        <div className="flex flex-wrap gap-2">
                          {m.suggestions.map((s) => (
                            <button
                              key={s}
                              onClick={() => handleSend(s)}
                              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest transition-all"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-4">
                    <div className="p-2 rounded-xl bg-white/5 text-gray-500 h-fit">
                      <Bot size={16} />
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex gap-1">
                      <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-8 bg-white/5 border-t border-white/10">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(input);
                  }}
                  className="relative"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about stocks, trends, or your portfolio..."
                    className="w-full bg-[#141414] border border-white/10 rounded-2xl py-4 pl-6 pr-16 text-sm focus:outline-none focus:border-orange-500 transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all"
                  >
                    <Send size={18} />
                  </button>
                </form>
                <div className="mt-4 flex items-center justify-center gap-6 opacity-40">
                  <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest">
                    <Zap size={10} /> Real-time Data
                  </div>
                  <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest">
                    <TrendingUp size={10} /> Technical Analysis
                  </div>
                  <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest">
                    <Shield size={10} /> Risk Assessment
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
