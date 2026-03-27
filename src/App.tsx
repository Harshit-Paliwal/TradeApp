/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import { getUserProfile, createUserProfile, subscribeToTrades, subscribeToHoldings, subscribeToWatchlist, subscribeToNotifications } from './services/firebaseService';
import { UserProfile, Trade, Holding, WatchlistItem, Notification as AppNotification } from './types';
import Layout from './components/Layout';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Market from './components/Market';
import History from './components/History';
import Profile from './components/Profile';
import StockDetails from './components/StockDetails';
import ErrorBoundary from './components/ErrorBoundary';
import NotificationsOverlay from './components/NotificationsOverlay';
import { addToWatchlist, removeFromWatchlist, markNotificationAsRead, clearNotifications } from './services/firebaseService';
import { stockService } from './services/stockService';
import { StockData, HistoricalData } from './types';

function StockDetailsContainer({ symbol, onBack, watchlist, onAddToWatchlist }: { 
  symbol: string, 
  onBack: () => void, 
  watchlist: WatchlistItem[],
  onAddToWatchlist: (symbol: string) => void
}) {
  const [stock, setStock] = useState<StockData | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [quote, history] = await Promise.all([
          stockService.getQuote(symbol),
          stockService.getHistoricalData(symbol)
        ]);
        setStock(quote);
        setHistoricalData(history);
      } catch (err: any) {
        console.error('Failed to fetch stock data:', err);
        setError(err.message || 'Failed to load stock data.');
      }
      setLoading(false);
    };
    fetchData();
  }, [symbol]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !stock) {
    return (
      <div className="text-center p-8 bg-red-500/5 border border-red-500/10 rounded-3xl">
        <p className="text-red-500 font-bold mb-4">{error || 'Failed to load stock data.'}</p>
        <div className="flex justify-center gap-4">
          <button onClick={() => window.location.reload()} className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-all">Retry</button>
          <button onClick={onBack} className="px-6 py-2 bg-orange-500 text-white rounded-xl text-xs font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <StockDetails 
      stock={stock} 
      historicalData={historicalData} 
      onBack={onBack} 
      onTrade={() => {}} 
      onAddToWatchlist={onAddToWatchlist}
      isWatched={watchlist.some(item => item.symbol === symbol)}
    />
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  // Real-time data
  const [trades, setTrades] = useState<Trade[]>([]);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        let userProfile = await getUserProfile(firebaseUser.uid);
        if (!userProfile) {
          userProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || '',
            photoURL: firebaseUser.photoURL || '',
            balance: 100000, // Starting balance
            totalInvested: 0,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };
          await createUserProfile(userProfile);
        }
        setProfile(userProfile);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddToWatchlist = async (symbol: string) => {
    if (!user) return;
    const isWatched = watchlist.some(item => item.symbol === symbol);
    try {
      if (isWatched) {
        const item = watchlist.find(i => i.symbol === symbol);
        if (item?.id) await removeFromWatchlist(item.id);
      } else {
        await addToWatchlist(user.uid, symbol);
      }
    } catch (error) {
      console.error('Failed to update watchlist:', error);
    }
  };

  useEffect(() => {
    if (user) {
      const unsubTrades = subscribeToTrades(user.uid, setTrades);
      const unsubHoldings = subscribeToHoldings(user.uid, setHoldings);
      const unsubWatchlist = subscribeToWatchlist(user.uid, setWatchlist);
      const unsubNotifications = subscribeToNotifications(user.uid, setNotifications);

      return () => {
        unsubTrades();
        unsubHoldings();
        unsubWatchlist();
        unsubNotifications();
      };
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  const renderContent = () => {
    if (selectedStock) {
      return (
        <StockDetailsContainer 
          symbol={selectedStock} 
          onBack={() => setSelectedStock(null)} 
          watchlist={watchlist}
          onAddToWatchlist={handleAddToWatchlist}
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard profile={profile} holdings={holdings} trades={trades} onSelectStock={setSelectedStock} />;
      case 'market':
        return (
          <Market 
            onSelectStock={setSelectedStock} 
            onAddToWatchlist={handleAddToWatchlist}
            watchlist={watchlist}
          />
        );
      case 'history':
        return <History trades={trades} />;
      case 'profile':
        return <Profile profile={profile} />;
      default:
        return <Dashboard profile={profile} holdings={holdings} trades={trades} onSelectStock={setSelectedStock} />;
    }
  };

  return (
    <ErrorBoundary>
      <Layout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        profile={profile}
        notifications={notifications}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
      >
        {renderContent()}
      </Layout>
      <NotificationsOverlay 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications} 
        onRead={markNotificationAsRead}
        onClear={() => user && clearNotifications(user.uid)}
      />
    </ErrorBoundary>
  );
}
