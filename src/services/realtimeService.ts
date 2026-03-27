const API_KEY = "YOUR_FINNHUB_API_KEY";

let socket: WebSocket | null = null;

export const realtimeService = {
  connect(symbol: string, onPriceUpdate: (price: number) => void) {
    socket = new WebSocket(`wss://ws.finnhub.io?token=${API_KEY}`);

    socket.onopen = () => {
      socket?.send(JSON.stringify({ type: "subscribe", symbol }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "trade" && data.data?.length > 0) {
        const price = data.data[0].p;
        onPriceUpdate(price);
      }
    };
  },

  disconnect() {
    socket?.close();
  }
};