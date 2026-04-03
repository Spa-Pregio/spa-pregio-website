import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';

// Layout
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Start from './pages/Start';
import CelebrationSuites from './pages/CelebrationSuites';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import EventSuccess from './pages/EventSuccess';
import ForVendors from './pages/ForVendors';
import Membership from './pages/Membership';
import About from './pages/About';
import FindVendors from './pages/FindVendors';
import Ambassadors from './pages/Ambassadors';
import VendorDashboard from './pages/VendorDashboard';
import MommaDashboard from './pages/MommaDashboard';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import AffiliateDashboard from './pages/AffiliateDashboard';
import AdminAffiliates from './pages/AdminAffiliates';
import Community from './pages/Community';
import SpoilList from './pages/SpoilList';
import WhatAboutDad from './pages/WhatAboutDad';

// Funnel Pages
import ExpectingMom from './pages/ExpectingMom';
import Vendors from './pages/Vendors';

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
            <Route path="/start" element={<Start />} />
            <Route path="/suites" element={<CelebrationSuites />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/success" element={<EventSuccess />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/vendors" element={<ForVendors />} />
            <Route path="/find-vendors" element={<FindVendors />} />
            <Route path="/join" element={<Membership />} />
            <Route path="/about" element={<About />} />
            <Route path="/ambassadors" element={<Ambassadors />} />
            <Route path="/vendor-dashboard" element={<VendorDashboard />} />
            <Route path="/my-account" element={<MommaDashboard />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sister-dashboard" element={<AffiliateDashboard />} />
            <Route path="/admin-affiliates" element={<AdminAffiliates />} />
            <Route path="/community" element={<Community />} />
            <Route path="/spoil-list" element={<SpoilList />} />
            <Route path="/what-about-dad" element={<WhatAboutDad />} />
            <Route path="/expecting" element={<ExpectingMom />} />
            <Route path="/join-as-vendor" element={<Vendors />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
