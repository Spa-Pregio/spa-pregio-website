import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Celebration Suites', href: '/suites' },
    { name: 'Events', href: '/events' },
    { name: 'For Vendors', href: '/vendors' },
    { name: 'About', href: '/about' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex flex-col">
              <span className="font-serif text-xl lg:text-2xl font-semibold tracking-tight">
                <span className="text-spa-purple">SPA</span>
                <span className="text-spa-gray">-</span>
                <span className="text-spa-pink">PREGIO</span>
              </span>
              <span className="text-[10px] lg:text-xs text-spa-purple/70 uppercase tracking-[0.15em]">
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
                to="/vendors"
                className="text-sm font-medium text-spa-charcoal/70 hover:text-spa-purple transition-colors"
              >
                List Your Business
              </Link>
              <Link
                to="/join"
                className="btn-primary text-sm"
              >
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
          <div className="flex flex-col gap-4 mt-6">
            <Link
              to="/vendors"
              className="text-spa-charcoal/70 hover:text-spa-purple transition-colors"
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
