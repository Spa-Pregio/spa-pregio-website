import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LocalVendorSearch from '../sections/LocalVendorSearch';
import { ArrowRight } from 'lucide-react';

export default function FindVendors() {
  // Pass any ?category= URL param into the search component via a custom event
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    if (cat) {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('spa-pregio-preset-category', { detail: cat }));
      }, 100);
    }
  }, []);

  return (
    <div className="w-full pt-16 lg:pt-20">
      <section className="w-full min-h-[80vh] bg-spa-cream py-12 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-12">
            <span className="text-xs sm:text-sm uppercase tracking-[0.15em] text-spa-purple font-medium">
              Local Vendor Directory
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-spa-charcoal leading-tight mt-3">
              Find mama-friendly vendors <span className="text-spa-purple">near you.</span>
            </h1>
            <p className="mt-4 text-spa-gray leading-relaxed">
              Curated local spas, bakers, and celebration pros ready for baby showers, sip-and-sees, and mama-to-be moments.
            </p>
          </div>

          <LocalVendorSearch />
        </div>
      </section>

      <section className="w-full py-14 bg-spa-purple">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <p className="font-serif text-white text-2xl sm:text-3xl">
            Own a spa, bakery, or celebration venue?
          </p>
          <p className="text-white/80 text-sm sm:text-base mt-2">
            Claim your free starter listing to customize your photos and post local mom-to-be events — no credit card required.
          </p>
          <Link
            to="/vendors"
            className="inline-flex items-center gap-2 bg-white text-spa-purple px-6 py-3 rounded-full font-medium hover:bg-spa-cream transition-colors mt-6 shadow-sm"
          >
            Claim or List Your Business Free <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
