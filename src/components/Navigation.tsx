import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogIn, Store } from 'lucide-react';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Celebration Suites', href: '/suites' },
    { name: 'Events', href: '/events' },
    { name: 'Find Vendors', href: '/find-vendors' },
    { name: 'Suite Sisters™', href: '/ambassadors' },
    { name: 'About', href: '/about' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20 gap-4">

            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-2 flex-shrink-0">
              <img
                src="/images/spa-pregio-icon-512.png"
                alt="Spa-Pregio™"
                className="h-8 lg:h-9 w-auto"
              />
              <span className="font-serif text-xl lg:text-2xl font-semibold tracking-tight whitespace-nowrap">
                <span className="text-spa-purple">Spa</span>
                <span className="text-spa-charcoal">-</span>
                <span className="text-spa-pink">Pregio</span>
                <span className="text-spa-purple text-xs align-super">™</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center gap-5 2xl:gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                    isActive(link.href)
                      ? 'text-spa-purple font-semibold'
                      : 'text-spa-charcoal/75 hover:text-spa-purple'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden xl:flex items-center gap-2.5 flex-shrink-0">
              <Link
                to="/vendors"
                className="text-sm font-medium text-spa-charcoal/75 hover:text-spa-purple transition-colors whitespace-nowrap px-1"
              >
                List Your Business
              </Link>
              <Link
                to="/vendor-dashboard"
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive('/vendor-dashboard')
                    ? 'border-spa-pink bg-spa-pink text-white'
                    : 'border-spa-pink text-spa-pink hover:bg-spa-pink hover:text-white'
                }`}
              >
                <Store size={14} />
                Vendor Login
              </Link>
              <Link
                to="/my-account"
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive('/my-account')
                    ? 'border-spa-purple bg-spa-purple text-white'
                    : 'border-spa-purple text-spa-purple hover:bg-spa-purple hover:text-white'
                }`}
              >
                <LogIn size={14} />
                Sign In
              </Link>
            </div>

            {/* Mobile / Tablet Button */}
            <button
              className="xl:hidden p-2 -mr-2 text-spa-charcoal hover:bg-spa-lavender rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile / Tablet Menu */}
      <div
        className={`fixed inset-0 z-40 bg-spa-cream transition-all duration-300 xl:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-5 pt-16 px-6">
          <div className="flex items-center gap-2 mb-2">
            <img src="/images/spa-pregio-icon-512.png" alt="Spa-Pregio™" className="h-9 w-auto" />
            <span className="font-serif text-2xl font-semibold tracking-tight">
              <span className="text-spa-purple">Spa</span>
              <span className="text-spa-charcoal">-</span>
              <span className="text-spa-pink">Pregio</span>
              <span className="text-spa-purple text-xs align-super">™</span>
            </span>
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`font-serif text-2xl transition-colors duration-200 ${
                isActive(link.href) ? 'text-spa-purple' : 'text-spa-charcoal hover:text-spa-purple'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3.5 mt-5 items-center w-full max-w-xs">
            <Link
              to="/vendors"
              className="text-spa-charcoal/80 hover:text-spa-purple font-medium transition-colors"
            >
              List Your Business
            </Link>
            <Link
              to="/vendor-dashboard"
              className="w-full justify-center inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-spa-pink text-spa-pink font-medium hover:bg-spa-pink hover:text-white transition-colors"
            >
              <Store size={17} /> Vendor Login
            </Link>
            <Link
              to="/my-account"
              className="w-full justify-center inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-spa-purple text-spa-purple font-medium hover:bg-spa-purple hover:text-white transition-colors"
            >
              <LogIn size={17} /> Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
