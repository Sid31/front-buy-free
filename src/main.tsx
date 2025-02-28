import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import App from './App.tsx';
import Admin from './Admin.tsx';
import './index.css';

import "@suiet/wallet-kit/style.css";
import { Toaster } from "react-hot-toast";

import {
  AllDefaultWallets,
  defineStashedWallet,
  WalletProvider,
} from "@suiet/wallet-kit";
import {
  Chain,
  SuiDevnetChain,
  SuiTestnetChain,
  SuiMainnetChain,
  DefaultChains,
} from "@suiet/wallet-kit";

const SupportedChains = [
  // ...DefaultChains,
  // SuiDevnetChain,
  SuiTestnetChain,
  // SuiMainnetChain,
];

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletProvider 
        chains={SupportedChains}
        defaultWallets={[
          ...AllDefaultWallets,
          defineStashedWallet({
            appName: "Suiet Kit Playground",
          }),
        ]}
      >
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/Admin" element={<Admin />} />
          </Routes>
        </Router>
      <Toaster position="top-right" reverseOrder={false} />
    </WalletProvider>
  </StrictMode>
);
