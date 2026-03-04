import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import LocalVendorSearch, { VendorSearchHandle } from '../sections/LocalVendorSearch';

const categories = [
  { name: 'Spas & Wellness', emoji: '💆‍♀️' },
  { name: 'Photographers', emoji: '📸' },
  { name: 'Caterers & Bakers', emoji: '🎂' },
  { name: 'Event Venues', emoji: '🏡' },
  { name: 'Maternity Boutiques', emoji: '👗' },
  { name: 'Florists', emoji: '💐' },
  { name: 'Doulas & Midwives', emoji: '🤱' },
  { name: 'Party Planners', emoji: '🎉' },
];

export default function FindVendors() {
  const vendorSearchRef = useRef<VendorSearchHandle>(null);

  return (
    <div className="w-full pt-20">

      {/* Hero */}
      <section className="w-full py-16 lg:py-24 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Local Vendor Directory</span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-spa-charcoal leading-tight mt-4">
            Find mama-friendly vendors <span className="text-spa-purple">near you.</span>
          </h1>
          <p className="mt-6 text-lg text-spa-gray leading-relaxed max-w-2xl mx-auto">
            Spas, photographers, bakers, florists, doulas and more — all searched and surfaced for you by city. Click a category or search below.
          </p>
        </div>
      </section>

      {/* Quick Category Clicks */}
      <section className="w-full py-10 bg-white border-b border-spa-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => vendorSearchRef.current?.searchCategory(cat.name)}
                className="flex items-center gap-2 px-5 py-3 bg-spa-lavender hover:bg-spa-purple hover:text-white text-spa-charcoal rounded-full text-sm font-medium transition-all"
              >
                <span>{cat.emoji}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="w-full py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <LocalVendorSearch ref={vendorSearchRef} />
        </div>
      </section>

      {/* Are you a vendor CTA */}
      <section className="w-full py-12 bg-spa-purple">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-white/80 text-lg">Are you a vendor who serves expectant mamas?</p>
          <a href="/vendors" className="inline-flex items-center gap-2 bg-white text-spa-purple px-6 py-3 rounded-full font-medium hover:bg-spa-cream transition-colors mt-4">
            List Your Business — It's Free to Start <ArrowRight size={16} />
          </a>
        </div>
      </section>

    </div>
  );
}
