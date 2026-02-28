import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Pin, Mail, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  shop: [
    { name: 'Party Kits', href: '#kits' },
    { name: 'Spa Guides', href: '#spa' },
    { name: 'Free Downloads', href: '#kits' },
  ],
  company: [
    { name: 'Our Story', href: '#' },
    { name: 'Meetups', href: '#meetups' },
    { name: 'Journal', href: '#tips' },
  ],
  support: [
    { name: 'Contact', href: '#newsletter' },
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
  ],
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footer,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-white z-40 border-t border-spa-plum/5"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        {/* Top Section */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <a href="#" className="inline-flex items-center gap-1 mb-6">
              <span className="font-serif text-2xl font-semibold text-spa-purple">
                SPA
              </span>
              <span className="text-spa-plum">-</span>
              <span className="font-serif text-2xl font-semibold text-spa-pink">
                PREGIO
              </span>
              <span className="text-xs align-top ml-0.5">™</span>
            </a>

            <p className="text-spa-muted leading-relaxed max-w-sm mb-6">
              Celebrate every moment of your journey. Printable party kits, spa-day inspiration, and local meetups for moms-to-be.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-spa-lavender flex items-center justify-center text-spa-plum hover:bg-spa-pink hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-spa-lavender flex items-center justify-center text-spa-plum hover:bg-spa-pink hover:text-white transition-all duration-300"
                aria-label="Pinterest"
              >
                <Pin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-spa-lavender flex items-center justify-center text-spa-plum hover:bg-spa-pink hover:text-white transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-medium text-spa-plum mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-spa-muted hover:text-spa-pink transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-spa-plum mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-spa-muted hover:text-spa-pink transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-spa-plum mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-spa-muted hover:text-spa-pink transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-spa-plum/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-spa-muted">
            © 2026 Spa-Pregio. All rights reserved.
          </p>
          <p className="text-sm text-spa-muted flex items-center gap-1">
            Made with <Heart size={14} className="text-spa-pink fill-spa-pink" /> for moms everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
