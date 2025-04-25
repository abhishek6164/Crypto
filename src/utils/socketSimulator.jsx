import { updatePrices } from "../features/crypto/cryptoSlice";

export const startPriceSimulation = (dispatch) => {
  const urls = [
    "wss://stream.binance.com:9443/ws/btcusdt@trade",
    "wss://stream.binance.com:9443/ws/ethusdt@trade",
    "wss://stream.binance.com:9443/ws/xrpusdt@trade",
    "wss://stream.binance.com:9443/ws/adausdt@trade",
    "wss://stream.binance.com:9443/ws/ltcusdt@trade",
  ];

  const imgUrls = {
    BTC: "https://imgs.search.brave.com/jisgK6auK2h5TE_mO-0n1l648ciEji9RZgVF44Fhp7I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzE2LzY3LzQ0/LzM2MF9GXzIxNjY3/NDQzNl9KVVY0bzFY/cGQyd2RvbVNVNG5F/anZiYW9FMkZ6YzFs/bS5qcGc",
    ETH: "https://imgs.search.brave.com/mgW2QFWkpw3s92nw50gvVYuzid-Gx4B0lTLv8dWxaq8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pY29u/cy5pY29uYXJjaGl2/ZS5jb20vaWNvbnMv/Y2pkb3duZXIvY3J5/cHRvY3VycmVuY3kt/ZmxhdC81MTIvRXRo/ZXJldW0tRVRILWlj/b24ucG5n",
    XRP: "https://imgs.search.brave.com/1aBDQ2qAvrM-XYL5S4TitjsfgE_wGvthULmvT5o4L2Y/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzA4LzQzLzUx/LzM2MF9GXzUwODQz/NTE2NV9qYkVFbzN2/M2FTVGJHQllBVG0w/cXFFQzlteFczelpU/MC5qcGc",
    ADA: "https://imgs.search.brave.com/yjMz79-46T1TcDPh_lyopDu67VgVa-r49CxarEY4SSo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pY29u/cy5pY29uYXJjaGl2/ZS5jb20vaWNvbnMv/YmxhY2t2YXJpYW50/L2J1dHRvbi11aS1y/ZXF1ZXN0cy02LzUx/Mi9MaXRlQ29pbi1p/Y29uLnBuZw",
    LTC: "https://imgs.search.brave.com/6QExKYnF2T6oGn0Ej58zT5FhtSHju4vuySF84aEfwkw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG40/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvY3J5cHRvLWN1/cnJlbmN5LWFuZC1j/b2luLTIvMjU2L2Nh/cmRhbm9fYWRhLTUx/Mi5wbmc",
  };

  const sockets = [];

  urls.forEach((url) => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log(`WebSocket connection established for ${url}`);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const symbol = data.s.split("USDT")[0];

      const simulatedData = {
        id: data.s,
        name: symbol,
        symbol: symbol,
        price: parseFloat(data.p),
        volume24h: parseFloat(data.q),
        change1h: (Math.random() * 10 - 5).toFixed(2),
        change24h: (Math.random() * 10 - 5).toFixed(2),
        change7d: (Math.random() * 20 - 10).toFixed(2),
        marketCap: (Math.random() * 1000000000).toFixed(0),
        circulatingSupply: (Math.random() * 1000000000).toFixed(0),
        maxSupply: 21000000,
        chart: imgUrls[symbol] || "https://www.example.com/default-chart.png",
      };

      dispatch(updatePrices(simulatedData));
    };

    socket.onerror = (error) => {
      console.error(`WebSocket Error for ${url}:`, error);
    };

    socket.onclose = (event) => {
      console.log(`WebSocket connection closed for ${url}:`, event.code);
    };

    sockets.push(socket);
  });

  return () => {
    sockets.forEach((socket) => socket.close());
  };
};
