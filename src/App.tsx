import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import {
  getUserProfile,
  createUserProfile,
  subscribeToTrades,
  subscribeToHoldings,
  subscribeToWatchlist,
  subscribeToNotifications,
  addToWatchlist,
  removeFromWatchlist,
  markNotificationAsRead,
  clearNotifications
} from './services/firebaseService';

import {
  UserProfile,
  Trade,
  Holding,
  WatchlistItem,
  Notification as AppNotification
} from './types';

import Layout from './components/Layout';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Market from './components/Market';
import History from './components/History';
import Profile from './components/Profile';
import StockDetails from './components/StockDetails';
import ErrorBoundary from './components/ErrorBoundary';
import NotificationsOverlay from './components/NotificationsOverlay';

import { stockService } from './services/stockService';
import { StockData, HistoricalData } from './types';

function StockDetailsContainer({
  symbol,
  onBack,
  watchlist,
  onAddToWatchlist
}: any) {
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
        console.error('Stock fetch error:', err);
        setError('Failed to load stock data');
      }

      setLoading(false);
    };

    fetchData();
  }, [symbol]);

  if (loading) {
    return <div className="text-center text-white p-10">Loading stock...</div>;
  }

  if (error || !stock) {
    return (
      <div className="text-center text-red-500 p-10">
        {error}
        <button onClick={onBack}>Go Back</button>
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
      isWatched={watchlist.some((item: any) => item.symbol === symbol)}
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

  const [trades, setTrades] = useState<Trade[]>([]);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  // ✅ AUTH + PROFILE FIX (MAIN FIX)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      try {
        if (firebaseUser) {
          let userProfile = await getUserProfile(firebaseUser.uid);

          if (!userProfile) {
            userProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || '',
              photoURL: firebaseUser.photoURL || '',
              balance: 100000,
              totalInvested: 0,
              createdAt: Date.now(),
              updatedAt: Date.now()
            };

            await createUserProfile(userProfile);
          }

          setProfile(userProfile);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error('Auth/Profile Error:', error);
        setProfile(null); // ✅ prevents infinite loading
      }

      setLoading(false); // ✅ ALWAYS executes
    });

    return () => unsubscribe();
  }, []);

  // ✅ FAILSAFE LOADING STOP
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // ✅ REALTIME SUBSCRIPTIONS SAFE
  useEffect(() => {
    if (!user) return;

    try {
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
    } catch (error) {
      console.error('Subscription error:', error);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading App...
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
          onAddToWatchlist={() => {}}
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard profile={profile} holdings={holdings} trades={trades} onSelectStock={setSelectedStock} />;
      case 'market':
        return <Market onSelectStock={setSelectedStock} />;
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