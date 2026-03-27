export const portfolioService = {
  calculatePNL(trades: any[]) {
    let invested = 0;
    let current = 0;

    trades.forEach(t => {
      if (t.type === "BUY") invested += t.price * t.quantity;
      else current += t.price * t.quantity;
    });

    return {
      invested,
      current,
      profit: current - invested
    };
  }
};