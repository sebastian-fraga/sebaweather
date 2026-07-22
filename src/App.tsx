import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { listenForegroundMessages } from "./services/firebase";

import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";
import CityPage from "./pages/CityPage";
import LocationsPage from "./pages/LocationsPage";
import SettingsPage from "./pages/SettingsPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

import Header from "./components/ui/Header";
import AnimatedBackground from "./components/layout/AnimatedBackground";

function AnimatedRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedApp");

    if (hasVisited && location.pathname === "/") {
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
          <Route
            path="/home/city/:lat/:lon"
            element={<CityPage />}
          />
          <Route
            path="/home/city/:name/:lat/:lon"
            element={<CityPage />}
          />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </AnimatePresence>
    </AnimatedBackground>
  );
}

function App() {
  useEffect(() => {
    listenForegroundMessages();
  }, []);

  return (

    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;