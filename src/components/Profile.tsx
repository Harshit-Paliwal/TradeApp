import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Wallet, Calendar, Settings, Bell, LogOut, ChevronRight, CreditCard, Lock } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { UserProfile } from '../types';
import { logout } from '../firebase';

interface ProfileProps {
  profile: UserProfile | null;
}

export default function Profile({ profile }: ProfileProps) {
  const settingsItems = [
    { id: 'account', label: 'Account Settings', icon: User, description: 'Manage your profile and personal information.' },
    { id: 'security', label: 'Security & Privacy', icon: Lock, description: 'Update your password and security preferences.' },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Control how you receive alerts and updates.' },
    { id: 'billing', label: 'Billing & Subscriptions', icon: CreditCard, description: 'Manage your payment methods and plans.' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tighter uppercase">User Profile</h2>
          <p className="text-gray-500 text-sm font-medium">Manage your account and trading preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="bg-[#141414] border border-white/10 p-8 rounded-[40px] flex flex-col items-center text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <User size={120} />
          </div>
          
          <div className="w-32 h-32 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-black text-4xl mb-6 border-4 border-orange-500/10 shadow-2xl shadow-orange-500/20">
            {profile?.displayName?.[0] || 'U'}
          </div>
          
          <div className="space-y-2 mb-8">
            <h3 className="text-2xl font-black tracking-tight">{profile?.displayName || 'User'}</h3>
            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm font-bold uppercase tracking-widest">
              <Mail size={14} />
              {profile?.email}
            </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Role</p>
              <div className="flex items-center justify-center gap-2 text-blue-500">
                <Shield size={14} />
                <span className="text-sm font-black uppercase tracking-widest">USER</span>
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Balance</p>
              <div className="flex items-center justify-center gap-2 text-orange-500">
                <Wallet size={14} />
                <span className="text-sm font-black uppercase tracking-widest">{formatCurrency(profile?.balance || 0)}</span>
              </div>
            </div>
          </div>

          <div className="w-full p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="text-gray-500" size={18} />
              <div className="text-left">
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Member Since</p>
                <p className="text-xs font-bold">{profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : 'N/A'}</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-8 py-4 bg-red-500/10 border border-red-500/20 text-red-500 font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-red-500/20 transition-all"
          >
            <LogOut size={18} />
            SIGN OUT
          </button>
        </div>

        {/* Settings List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-black tracking-tight mb-6">Settings & Preferences</h3>
          {settingsItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group flex items-center justify-between p-6 bg-[#141414] border border-white/10 rounded-3xl hover:border-orange-500/50 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-6">
                <div className="p-4 bg-white/5 rounded-2xl text-gray-500 group-hover:bg-orange-500/10 group-hover:text-orange-500 transition-all">
                  <item.icon size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-black tracking-tight">{item.label}</h4>
                  <p className="text-sm text-gray-500 font-medium">{item.description}</p>
                </div>
              </div>
              <ChevronRight className="text-gray-700 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" size={24} />
            </motion.div>
          ))}

          <div className="p-8 bg-orange-500/5 border border-orange-500/10 rounded-[40px] mt-8">
            <h4 className="text-lg font-black tracking-tight mb-2">Need Help?</h4>
            <p className="text-sm text-gray-500 font-medium mb-6 leading-relaxed">
              Our support team is available 24/7 to help you with any issues or questions you might have about the platform.
            </p>
            <button className="px-8 py-3 bg-orange-500 text-white font-black text-xs rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20">
              CONTACT SUPPORT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
