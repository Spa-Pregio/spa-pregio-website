import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop', href: '#kits' },
    { name: 'Inspiration', href: '#spa' },
    { name: 'Meetups', href: '#meetups' },
    { name: 'Journal', href: '#tips' },
    { name: 'Contact', href: '#newsletter' },
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-0.5 flex-shrink-0">
              <span className="font-serif text-lg sm:text-xl lg:text-2xl font-semibold text-spa-purple">
                SPA
              </span>
              <span className="text-spa-plum text-lg sm:text-xl">-</span>
              <span className="font-serif text-lg sm:text-xl lg:text-2xl font-semibold text-spa-pink">
                PREGIO
              </span>
              <span className="text-[10px] align-top ml-0.5">™</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-spa-plum/80 hover:text-spa-pink transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:block">
              <a
                href="#kits"
                className="btn-primary text-sm px-5 py-2.5"
              >
                Get the free starter kit
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 -mr-2 text-spa-plum hover:bg-spa-lavender rounded-lg transition-colors"
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
        className={`fixed inset-0 z-40 bg-spa-lavender transition-all duration-300 lg:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 pt-20">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleNavClick}
              className="font-serif text-2xl sm:text-3xl text-spa-plum hover:text-spa-pink transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#kits"
            onClick={handleNavClick}
            className="btn-primary mt-4 text-base"
          >
            Get the free starter kit
          </a>
        </div>
      </div>
    </>
  );
}
