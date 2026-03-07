import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, User } from 'lucide-react';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Celebration Suites', href: '/suites' },
    { name: 'Find Vendors', href: '/find-vendors' },
    { name: 'Events', href: '/events' },
    { name: 'Suite Sisters™', href: '/ambassadors' },
    { name: 'About', href: '/about' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo — matches footer style */}
            <Link to="/" className="flex flex-col items-start">
              <div className="flex items-baseline gap-0">
                <span className="font-serif text-xl lg:text-2xl font-bold tracking-widest text-spa-charcoal">SPA-</span>
                <span className="font-serif text-xl lg:text-2xl font-bold tracking-widest text-spa-purple">PREGIO™</span>
              </div>
              <span className="text-[10px] lg:text-xs text-spa-purple/70 uppercase tracking-[0.15em] mt-0.5">
                The Celebration Suite Movement
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.href
                      ? 'text-spa-purple'
                      : 'text-spa-charcoal/70 hover:text-spa-purple'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTAs */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/my-account"
                title="My Account"
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
                  location.pathname === '/my-account'
                    ? 'text-spa-purple'
                    : 'text-spa-charcoal/70 hover:text-spa-purple'
                }`}
              >
                <User size={16} />
                <span>My Account</span>
              </Link>
              <Link
                to="/vendor-dashboard"
                title="Vendor Dashboard"
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
                  location.pathname === '/vendor-dashboard'
                    ? 'text-spa-purple'
                    : 'text-spa-charcoal/70 hover:text-spa-purple'
                }`}
              >
                <LayoutDashboard size={16} />
                <span>Vendor</span>
              </Link>
              <Link
                to="/vendors"
                className="text-sm font-medium text-spa-charcoal/70 hover:text-spa-purple transition-colors"
              >
                List Your Business
              </Link>
              <Link to="/join" className="btn-primary text-sm">
                Become a Member
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 -mr-2 text-spa-charcoal hover:bg-spa-lavender rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-spa-cream transition-all duration-300 lg:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 pt-20">
          {/* Logo in mobile menu */}
          <div className="flex items-baseline gap-0 mb-2">
            <span className="font-serif text-2xl font-bold tracking-widest text-spa-charcoal">SPA-</span>
            <span className="font-serif text-2xl font-bold tracking-widest text-spa-purple">PREGIO™</span>
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`font-serif text-2xl transition-colors duration-200 ${
                location.pathname === link.href
                  ? 'text-spa-purple'
                  : 'text-spa-charcoal hover:text-spa-purple'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/my-account"
            className={`font-serif text-2xl transition-colors duration-200 flex items-center gap-2 ${
              location.pathname === '/my-account'
                ? 'text-spa-purple'
                : 'text-spa-charcoal hover:text-spa-purple'
            }`}
          >
            <User size={22} /> My Account
          </Link>
          <Link
            to="/vendor-dashboard"
            className={`font-serif text-2xl transition-colors duration-200 flex items-center gap-2 ${
              location.pathname === '/vendor-dashboard'
                ? 'text-spa-purple'
                : 'text-spa-charcoal hover:text-spa-purple'
            }`}
          >
            <LayoutDashboard size={22} /> Vendor Dashboard
          </Link>
          <div className="flex flex-col gap-4 mt-6">
            <Link
              to="/vendors"
              className="text-spa-charcoal/70 hover:text-spa-purple transition-colors text-center"
            >
              List Your Business
            </Link>
            <Link to="/join" className="btn-primary">
              Become a Member
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
