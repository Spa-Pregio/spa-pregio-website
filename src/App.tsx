import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';

import Navigation from './components/Navigation';
import Footer from './components/Footer';

import Home from './pages/Home';
import CelebrationSuites from './pages/CelebrationSuites';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import EventSuccess from './pages/EventSuccess';
import ForVendors from './pages/ForVendors';
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
import ResetPassword from './pages/ResetPassword';
import SpoilList from './pages/SpoilList';
import WhatAboutDad from './pages/WhatAboutDad';

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/suites" element={<CelebrationSuites />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/success" element={<EventSuccess />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/vendors" element={<ForVendors />} />
          <Route path="/find-vendors" element={<FindVendors />} />
          <Route path="/about" element={<About />} />
          <Route path="/ambassadors" element={<Ambassadors />} />
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          <Route path="/my-account" element={<MommaDashboard />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sister-dashboard" element={<AffiliateDashboard />} />
          <Route path="/admin-affiliates" element={<AdminAffiliates />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Legacy routes — redirect to merged locations */}
          <Route path="/spoil-list" element={<SpoilList />} />
          <Route path="/what-about-dad" element={<WhatAboutDad />} />
          <Route path="/join" element={<Navigate to="/my-account" replace />} />
          <Route path="/community" element={<Navigate to="/about" replace />} />
          <Route path="/start" element={<Navigate to="/" replace />} />
          <Route path="/expecting" element={<Navigate to="/suites" replace />} />
          <Route path="/join-as-vendor" element={<Navigate to="/vendors" replace />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
