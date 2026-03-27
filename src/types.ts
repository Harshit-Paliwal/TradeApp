export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  balance: number;
  totalInvested?: number;
  riskTolerance?: 'low' | 'medium' | 'high';
  createdAt: number;
  updatedAt: number;
}

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  lastUpdated: number;
}

export interface HistoricalData {
  date: string;
  close: number;
  volume: number;
}

export interface Trade {
  id: string;
  userId: string;
  symbol: string;
  type: 'buy' | 'sell';
  orderType: 'market' | 'limit';
  quantity: number;
  price: number;
  total: number;
  timestamp: number;
  status: 'completed' | 'pending' | 'cancelled';
  assetType: 'equity' | 'fno';
}

export interface Holding {
  id?: string;
  userId: string;
  symbol: string;
  name?: string;
  quantity: number;
  averagePrice: number;
  lastPrice: number;
  pnl: number;
  pnlPercent: number;
  lastUpdated: number;
}

export interface Recommendation {
  symbol: string;
  signal: 'buy' | 'sell' | 'hold';
  confidence: number;
  riskLevel: 'low' | 'medium' | 'high';
  explanation: string;
  indicators: {
    rsi: number;
    macd: number;
    sma20: number;
    sma50: number;
  };
}

export interface WatchlistItem {
  id?: string;
  userId: string;
  symbol: string;
  addedAt: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: number;
}
