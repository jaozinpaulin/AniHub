import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import './styles/global.css';

import { Analytics } from "@vercel/analytics/react";
import FavoritesProvider from './context/FavoritesProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <FavoritesProvider>
        <App />
      </FavoritesProvider>

      <Analytics />
    </BrowserRouter>
  </StrictMode>,
)
