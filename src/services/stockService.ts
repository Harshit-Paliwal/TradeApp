import axios from 'axios';
import { StockData, HistoricalData } from '../types';

export const stockService = {
  async searchStocks(keywords: string) {
    const response = await axios.get(`/api/stocks/search?keywords=${keywords}`);
    const bestMatches = response.data.bestMatches || [];
    return bestMatches.map((match: any) => ({
      symbol: match['1. symbol'],
      name: match['2. name'],
      type: match['3. type'],
      region: match['4. region'],
    }));
  },

  async getQuote(symbol: string): Promise<StockData> {
    const response = await axios.get(`/api/stocks/quote?symbol=${symbol}`);
    
    if (response.data['Note']) {
      throw new Error('API rate limit exceeded. Please try again in a minute.');
    }

    if (response.data['Error Message']) {
      throw new Error('Invalid stock symbol or API error.');
    }

    const quote = response.data['Global Quote'];
    
    if (!quote || Object.keys(quote).length === 0) {
      throw new Error('Stock not found');
    }

    return {
      symbol: quote['01. symbol'],
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
      volume: parseInt(quote['06. volume']),
      high: parseFloat(quote['03. high']),
      low: parseFloat(quote['04. low']),
      open: parseFloat(quote['02. open']),
      previousClose: parseFloat(quote['08. previous close']),
      lastUpdated: Date.now(),
    };
  },

  async getHistoricalData(symbol: string): Promise<HistoricalData[]> {
    const response = await axios.get(`/api/stocks/historical?symbol=${symbol}`);
    
    if (response.data['Note']) {
      throw new Error('API rate limit exceeded. Please try again in a minute.');
    }

    if (response.data['Error Message']) {
      throw new Error('Invalid stock symbol or API error.');
    }

    const timeSeries = response.data['Time Series (Daily)'];
    
    if (!timeSeries) {
      throw new Error('Historical data not found');
    }

    return Object.entries(timeSeries).map(([date, data]: [string, any]) => ({
      date,
      close: parseFloat(data['4. close']),
      volume: parseInt(data['5. volume']),
    })).reverse();
  },
};
