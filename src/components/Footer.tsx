import React from 'react';
import { TrendingUp, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#141414] border-t border-white/10 p-12 mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-black tracking-tighter uppercase">FinTrade AI</h1>
          </div>
          <p className="text-sm text-gray-500 font-medium leading-relaxed">
            The next-generation trading platform powered by artificial intelligence. Real-time insights, automated signals, and seamless execution.
          </p>
          <div className="flex gap-4">
            <button className="p-2 bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all">
              <Twitter size={18} />
            </button>
            <button className="p-2 bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all">
              <Linkedin size={18} />
            </button>
            <button className="p-2 bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all">
              <Github size={18} />
            </button>
            <button className="p-2 bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all">
              <Mail size={18} />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-black text-gray-600 uppercase tracking-[0.2em]">Platform</h4>
          <ul className="space-y-3">
            {['Dashboard', 'Market Explorer', 'AI Insights', 'Trade History', 'F&O Trading'].map((item) => (
              <li key={item}>
                <button className="text-sm text-gray-500 font-bold hover:text-orange-500 transition-colors">{item}</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-black text-gray-600 uppercase tracking-[0.2em]">Company</h4>
          <ul className="space-y-3">
            {['About Us', 'Careers', 'Privacy Policy', 'Terms of Service', 'Contact Support'].map((item) => (
              <li key={item}>
                <button className="text-sm text-gray-500 font-bold hover:text-orange-500 transition-colors">{item}</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-black text-gray-600 uppercase tracking-[0.2em]">Compliance</h4>
          <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4">
            <p className="text-[10px] text-gray-500 font-bold leading-relaxed">
              Investing in securities market are subject to market risks. Read all the related documents carefully before investing.
            </p>
            <p className="text-[10px] text-orange-500/80 font-bold leading-relaxed">
              9 out of 10 individual traders in equity F&O segment incurred net losses.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-[10px] text-gray-700 font-black uppercase tracking-widest">
          © 2026 FinTrade AI. All rights reserved.
        </p>
        <div className="flex gap-8">
          <button className="text-[10px] text-gray-700 font-black uppercase tracking-widest hover:text-gray-500 transition-colors">Privacy Policy</button>
          <button className="text-[10px] text-gray-700 font-black uppercase tracking-widest hover:text-gray-500 transition-colors">Terms of Service</button>
          <button className="text-[10px] text-gray-700 font-black uppercase tracking-widest hover:text-gray-500 transition-colors">Cookie Policy</button>
        </div>
      </div>
    </footer>
  );
}
