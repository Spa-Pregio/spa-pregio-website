import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
// Layout
import Navigation from './components/Navigation';
import Footer from './components/Footer';
// Pages
import Home from './pages/Home';
import CelebrationSuites from './pages/CelebrationSuites';
import Events from './pages/Events';
import ForVendors from './pages/ForVendors';
import Membership from './pages/Membership';
import About from './pages/About';
import FindVendors from './pages/FindVendors';
import Ambassadors from './pages/Ambassadors';
import VendorDashboard from './pages/VendorDashboard';
import MommaDashboard from './pages/MommaDashboard';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen bg-spa-cream">
        <Navigation />
        <main className="relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/suites" element={<CelebrationSuites />} />
            <Route path="/events" element={<Events />} />
            <Route path="/vendors" element={<ForVendors />} />
            <Route path="/find-vendors" element={<FindVendors />} />
            <Route path="/join" element={<Membership />} />
            <Route path="/about" element={<About />} />
            <Route path="/ambassadors" element={<Ambassadors />} />
            <Route path="/vendor-dashboard" element={<VendorDashboard />} />
            <Route path="/my-account" element={<MommaDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
