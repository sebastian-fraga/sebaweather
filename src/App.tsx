import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";
import CityPage from "./pages/CityPage";
import LocationsPage from "./pages/LocationsPage";
import SettingsPage from "./pages/SettingsPage";

import Header from "./components/ui/Header";
import AnimatedBackground from "./components/layout/AnimatedBackground";

function AnimatedRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedApp");

    if (!hasVisited && location.pathname === "/") {
      localStorage.setItem("hasVisitedApp", "true");
      navigate("/locations", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <AnimatedBackground>
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/home/city/:lat/:lon" element={<CityPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </AnimatePresence>
    </AnimatedBackground>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;