import React from "react";
import { useSelector } from "react-redux";

export default function CryptoTable() {
  const assets = useSelector((state) => state.crypto.assets);

  const topAssets = assets.slice(0, 5);

  if (!topAssets || topAssets.length === 0) {
    return <p className="text-center text-gray-500">No data available...</p>;
  }

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full   text-left">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th>#</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>1h %</th>
            <th>24h %</th>
            <th>7d %</th>
            <th>Market Cap</th>
            <th>24h Volume</th>
            <th>Circulating Supply</th>
            <th>Max Supply</th>
            {/* <th>7D Chart</th> */}
          </tr>
        </thead>
        <tbody className="">
          {topAssets.map((coin, i) => {
            console.log(`Symbol: ${coin.symbol}, Chart URL: ${coin.chart}`); // Log symbol and chart URL
            return (
              <tr key={coin.id} className="border-b h-28">
                <td>{i + 1}</td>
                <td>
                  <img
                    src={coin.chart}
                    alt={`${coin.name} logo`}
                    className="w-8 h-8"
                  />
                </td>
                <td>{coin.name}</td>
                <td>{coin.symbol}</td>
                <td>${coin.price.toLocaleString()}</td>
                <td
                  className={
                    coin.change1h >= 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {coin.change1h}%
                </td>
                <td
                  className={
                    coin.change24h >= 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {coin.change24h}%
                </td>
                <td
                  className={
                    coin.change7d >= 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {coin.change7d}%
                </td>
                <td>${coin.marketCap.toLocaleString()}</td>
                <td>${coin.volume24h.toLocaleString()}</td>
                <td>{coin.circulatingSupply}</td>
                <td>{coin.maxSupply}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
