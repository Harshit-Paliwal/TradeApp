import { Recommendation, HistoricalData } from '../types';
import { calculateRSI, calculateSMA, calculateMACD } from '../lib/utils';

export const aiService = {
  async getRecommendation(symbol: string, historicalData: HistoricalData[]): Promise<Recommendation> {
    const prices = historicalData.map(d => d.close);
    const rsi = calculateRSI(prices);
    const sma20 = calculateSMA(prices, 20);
    const sma50 = calculateSMA(prices, 50);
    const { macd, signal } = calculateMACD(prices);

    let recommendationSignal: 'buy' | 'sell' | 'hold' = 'hold';
    let confidence = 0.5;
    let riskLevel: 'low' | 'medium' | 'high' = 'medium';
    let explanation = '';

    // RSI Logic
    if (rsi < 30) {
      recommendationSignal = 'buy';
      confidence += 0.2;
      explanation += 'RSI is below 30, indicating the stock is oversold. ';
    } else if (rsi > 70) {
      recommendationSignal = 'sell';
      confidence += 0.2;
      explanation += 'RSI is above 70, indicating the stock is overbought. ';
    }

    // SMA Crossover Logic
    if (sma20 > sma50) {
      if (recommendationSignal === 'buy') confidence += 0.1;
      else if (recommendationSignal === 'hold') recommendationSignal = 'buy';
      explanation += 'The 20-day SMA is above the 50-day SMA, suggesting a bullish trend. ';
    } else {
      if (recommendationSignal === 'sell') confidence += 0.1;
      else if (recommendationSignal === 'hold') recommendationSignal = 'sell';
      explanation += 'The 20-day SMA is below the 50-day SMA, suggesting a bearish trend. ';
    }

    // MACD Logic
    if (macd > signal) {
      if (recommendationSignal === 'buy') confidence += 0.1;
      explanation += 'The MACD line is above the signal line, confirming bullish momentum. ';
    } else {
      if (recommendationSignal === 'sell') confidence += 0.1;
      explanation += 'The MACD line is below the signal line, confirming bearish momentum. ';
    }

    // Risk Level based on RSI and SMA distance
    const smaDist = Math.abs(sma20 - sma50) / sma50;
    if (smaDist > 0.1) riskLevel = 'high';
    else if (smaDist > 0.05) riskLevel = 'medium';
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
