import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import { AppProvider } from "./context/AppContext";

import "./assets/weather-icons/styles/weather-icons.css";
import "./assets/weather-icons/styles/weather-icons.min.css";
import "./assets/weather-icons/styles/weather-icons-wind.css";
import "./assets/weather-icons/styles/weather-icons-wind.min.css";

import "./App.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
);
