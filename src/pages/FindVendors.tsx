import { Link, useSearchParams } from 'react-router-dom';
import LocalVendorSearch from '../sections/LocalVendorSearch';
import { ArrowRight } from 'lucide-react';

export default function FindVendors() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  return (
    <div className="w-full pt-16 lg:pt-20">
      <section className="w-full min-h-[80vh] bg-spa-cream py-12 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-8 lg:mb-10">
            <span className="text-xs sm:text-sm uppercase tracking-[0.15em] text-spa-purple font-semibold">
              Local Vendor Directory
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-spa-charcoal leading-tight mt-3">
              Find mama-friendly vendors <span className="text-spa-purple">near you.</span>
            </h1>
            <p className="mt-4 text-spa-gray leading-relaxed">
              Enter your ZIP code or use your current location to browse local spas, bakers, photographers, and celebration pros in seconds.
            </p>
          </div>

          <LocalVendorSearch initialCategory={initialCategory} />
        </div>
      </section>

      <section className="w-full py-14 bg-spa-purple">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-spa-blush font-semibold mb-2">
            For Local Businesses
          </span>
          <p className="font-serif text-white text-2xl sm:text-3xl">
            Curious if local mamas are searching your city?
          </p>
          <p className="text-white/80 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Claim your free starter listing to customize your photos and post local mom-to-be events — no credit card required.
          </p>
          <Link
            to="/vendors"
            className="group inline-flex items-center gap-2 bg-white text-spa-purple px-7 py-3.5 rounded-full font-semibold hover:bg-spa-cream transition-colors mt-6 shadow-sm"
          >
            Claim Your Local Spot Free
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
