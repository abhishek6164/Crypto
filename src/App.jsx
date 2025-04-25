import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updatePrices } from "./features/crypto/cryptoSlice";
import { startPriceSimulation } from "./utils/socketSimulator"; 
import CryptoTable from "./features/crypto/CryptoTable";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const cleanup = startPriceSimulation(dispatch);
    return () => {
      cleanup();
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold p-4">Crypto Tracker 💹</h1>
      <CryptoTable />
    </div>
  );
}

export default App;
