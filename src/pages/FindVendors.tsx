import { useEffect } from 'react';
import LocalVendorSearch from '../sections/LocalVendorSearch';
import { ArrowRight } from 'lucide-react';

export default function FindVendors() {
  // Pass any ?category= URL param into the search component via a custom event
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    if (cat) {
      // Small delay to let the component mount
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('spa-pregio-preset-category', { detail: cat }));
      }, 100);
    }
  }, []);

  return (
    <div className="w-full pt-20">
      <section className="w-full min-h-[80vh] bg-spa-cream py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Local Vendor Directory</span>
            <h1 className="font-serif text-4xl sm:text-5xl text-spa-charcoal leading-tight mt-4">
              Find mama-friendly vendors <span className="text-spa-purple">near you.</span>
            </h1>
            <p className="mt-4 text-spa-gray leading-relaxed">
              Answer three quick questions and we'll surface the best local vendors for your celebration.
            </p>
          </div>
          <LocalVendorSearch />
        </div>
      </section>

      <section className="w-full py-12 bg-spa-purple">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-white/80 text-lg">Are you a vendor who serves expectant mamas?</p>
          <p className="text-white/60 text-sm mt-1">Start with a free basic listing — no credit card required.</p>
          <a href="/vendors" className="inline-flex items-center gap-2 bg-white text-spa-purple px-6 py-3 rounded-full font-medium hover:bg-spa-cream transition-colors mt-4">
            List Your Business Free <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
