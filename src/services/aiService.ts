import { Recommendation, HistoricalData } from '../types';
import { calculateRSI, calculateSMA, calculateMACD } from '../lib/utils';

export const aiService = {
  async getRecommendation(symbol: string, historicalData: HistoricalData[]): Promise<Recommendation> {
    const prices = historicalData.map(d => d.close);
    const volumes = historicalData.map(d => d.volume || 0);

    const rsi = calculateRSI(prices);
    const sma20 = calculateSMA(prices, 20);
    const sma50 = calculateSMA(prices, 50);
    const { macd, signal } = calculateMACD(prices);

    const latestPrice = prices[prices.length - 1];
    const avgVolume = volumes.reduce((a, b) => a + b, 0) / volumes.length;
    const latestVolume = volumes[volumes.length - 1];

    let recommendationSignal: 'buy' | 'sell' | 'hold' = 'hold';
    let confidence = 0.5;
    let riskLevel: 'low' | 'medium' | 'high' = 'medium';
    let explanation = '';

    // 🔹 RSI
    if (rsi < 30) {
      recommendationSignal = 'buy';
      confidence += 0.2;
      explanation += 'RSI < 30 (Oversold). ';
    } else if (rsi > 70) {
      recommendationSignal = 'sell';
      confidence += 0.2;
      explanation += 'RSI > 70 (Overbought). ';
    }

    // 🔹 SMA Trend
    if (sma20 > sma50) {
      if (recommendationSignal === 'buy') confidence += 0.15;
      else if (recommendationSignal === 'hold') recommendationSignal = 'buy';

      explanation += 'Bullish SMA crossover. ';
    } else {
      if (recommendationSignal === 'sell') confidence += 0.15;
      else if (recommendationSignal === 'hold') recommendationSignal = 'sell';

      explanation += 'Bearish SMA crossover. ';
    }

    // 🔹 MACD
    if (macd > signal) {
      confidence += 0.1;
      explanation += 'MACD bullish. ';
    } else {
      confidence += 0.1;
      explanation += 'MACD bearish. ';
    }

    // 🔹 Volume Confirmation (NEW 🔥)
    if (latestVolume > avgVolume * 1.5) {
      confidence += 0.1;
      explanation += 'High volume confirms trend. ';
    }

    // 🔹 Price vs SMA (Momentum)
    if (latestPrice > sma20) {
      confidence += 0.05;
      explanation += 'Price above SMA20 (strong momentum). ';
    }

    // 🔹 Risk Calculation
    const volatility = Math.max(...prices) - Math.min(...prices);

    if (volatility / latestPrice > 0.1) riskLevel = 'high';
    else if (volatility / latestPrice > 0.05) riskLevel = 'medium';
    else riskLevel = 'low';

    return {
      symbol,
      signal: recommendationSignal,
      confidence: Math.min(confidence, 1),
      riskLevel,
      explanation,
      indicators: {
        rsi,
        macd,
        sma20,
        sma50,
      },
    };
  },
};