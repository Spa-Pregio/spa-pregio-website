import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-spa-cream">
        <Navigation />
        <main className="relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/suites" element={<CelebrationSuites />} />
            <Route path="/events" element={<Events />} />
            <Route path="/vendors" element={<ForVendors />} />
            <Route path="/join" element={<Membership />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
