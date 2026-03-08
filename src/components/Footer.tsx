import { Link } from 'react-router-dom';
import { Instagram, Pin, Mail, Heart } from 'lucide-react';

const footerLinks = {
  explore: [
    { name: 'Celebration Suites', href: '/suites' },
    { name: 'Events', href: '/events' },
    { name: 'For Vendors', href: '/vendors' },
    { name: 'About', href: '/about' },
  ],
  membership: [
    { name: 'Join Free', href: '/join' },
    { name: 'Member Benefits', href: '/about' },
    { name: 'Partner Vendors', href: '/vendors' },
  ],
  support: [
    { name: 'Contact', href: '/about' },
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-spa-purple/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        {/* Top Section */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex flex-col mb-6">
              <span className="font-serif text-2xl font-semibold tracking-tight">
                <span className="text-spa-purple">SPA</span>
                <span className="text-spa-gray">-</span>
                <span className="text-spa-pink">PREGIO</span>
              </span>
              <span className="text-xs text-spa-purple/70 uppercase tracking-[0.15em]">
                The Celebration Suite Movement
              </span>
            </Link>

            <p className="text-spa-gray leading-relaxed max-w-sm mb-6">
              Where motherhood becomes a celebration. Connect with expectant mothers in your area and plan your perfect Celebration Suite.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/spapregio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-spa-lavender flex items-center justify-center text-spa-charcoal hover:bg-spa-purple hover:text-white transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.pinterest.com/spapregio/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-spa-lavender flex items-center justify-center text-spa-charcoal hover:bg-spa-purple hover:text-white transition-all duration-200"
                aria-label="Pinterest"
              >
                <Pin size={18} />
              </a>
              <a
                href="mailto:support@spa-pregio.com"
                className="w-10 h-10 rounded-full bg-spa-lavender flex items-center justify-center text-spa-charcoal hover:bg-spa-purple hover:text-white transition-all duration-200"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-medium text-spa-charcoal mb-4 text-sm uppercase tracking-wider">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-spa-gray hover:text-spa-purple transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-spa-charcoal mb-4 text-sm uppercase tracking-wider">Membership</h4>
            <ul className="space-y-3">
              {footerLinks.membership.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-spa-gray hover:text-spa-purple transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-spa-charcoal mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-spa-gray hover:text-spa-purple transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-spa-purple/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-spa-gray">
            © 2026 Spa-Pregio®. All rights reserved.
          </p>
          <p className="text-sm text-spa-gray flex items-center gap-1">
            Made with <Heart size={14} className="text-spa-pink fill-spa-pink" /> for expectant mothers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
