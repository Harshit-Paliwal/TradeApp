import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Zap, Globe, ArrowRight } from 'lucide-react';
import { signInWithGoogle } from '../firebase';

export default function Auth() {
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10"
      >
        {/* Hero Content */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
              <TrendingUp className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter uppercase">FinTrade AI</h1>
          </div>

          <div className="space-y-4">
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9]">
              TRADE <br />
              <span className="text-orange-500">SMARTER</span> <br />
              WITH AI.
            </h2>
            <p className="text-gray-500 text-lg font-medium max-w-md leading-relaxed">
              The next-generation trading platform powered by artificial intelligence. Real-time insights, automated signals, and seamless execution.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg text-orange-500">
                <Zap size={18} />
              </div>
              <span className="text-sm font-bold text-gray-400">AI Signals</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg text-blue-500">
                <Shield size={18} />
              </div>
              <span className="text-sm font-bold text-gray-400">Secure Trading</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg text-green-500">
                <Globe size={18} />
              </div>
              <span className="text-sm font-bold text-gray-400">Global Markets</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg text-purple-500">
                <TrendingUp size={18} />
              </div>
              <span className="text-sm font-bold text-gray-400">F&O Support</span>
            </div>
          </div>
        </div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#141414] border border-white/10 p-10 rounded-[40px] shadow-2xl relative group"
        >
          <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[40px]"></div>
          
          <div className="relative z-10 space-y-8">
            <div className="space-y-2 text-center">
              <h3 className="text-3xl font-black tracking-tight">Welcome Back</h3>
              <p className="text-gray-500 text-sm font-medium">Sign in to access your portfolio and AI insights.</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleGoogleLogin}
                className="w-full py-4 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-200 transition-all shadow-xl"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                CONTINUE WITH GOOGLE
              </button>
              
              <div className="flex items-center gap-4 py-2">
                <div className="h-px bg-white/10 flex-1"></div>
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">OR</span>
                <div className="h-px bg-white/10 flex-1"></div>
              </div>

              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-orange-500/50 transition-all"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-orange-500/50 transition-all"
                />
              </div>

              <button className="w-full py-4 bg-orange-500 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 group">
                SIGN IN
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest leading-relaxed">
              By continuing, you agree to our <br />
              <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">Terms of Service</span> and <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">Privacy Policy</span>.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Footer Disclaimer */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-gray-700 font-bold uppercase tracking-[0.2em] text-center max-w-md">
        This is a simulated trading platform. No real money is involved. <br />
        Trading in securities market is subject to market risks.
      </div>
    </div>
  );
}
