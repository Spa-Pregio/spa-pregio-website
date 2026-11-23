import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  Sparkles,
  Star,
  Crown,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Palette,
  Eye,
  Upload,
  Zap,
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { VENDOR_CATEGORIES } from '../sections/LocalVendorSearch';

const FOUNDING_LINKS = {
  Starter: 'https://buy.stripe.com/7sY8wQ2Ru1qq8Rb04X2go03',
  Professional: 'https://buy.stripe.com/fZu9AU2Ru6KKbZn4ld2go04',
  Enterprise: 'https://buy.stripe.com/00w8wQ5ZGb10bZn8Bt2go05',
};

export default function ForVendors() {
  const [selectedCategory, setSelectedCategory] = useState('Spas & Wellness');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const railRef = useRef<HTMLDivElement>(null);
  const signupRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    business_name: '',
    contact_name: '',
    email: '',
    phone: '',
    city: '',
    state: 'NC',
    category: 'Spas & Wellness',
    description: '',
    website: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Interactive Ad Designer preview state
  const [adHeadline, setAdHeadline] = useState('Prenatal Glow & Baby Shower Packages');
  const [adBadge, setAdBadge] = useState('Featured Local Vendor');

  const scrollRail = (dir: 'left' | 'right') => {
    if (!railRef.current) return;
    railRef.current.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
  };

  const handleSelectCategoryCard = (label: string) => {
    setSelectedCategory(label);
    setFormData((prev) => ({ ...prev, category: label }));
  };

  const scrollToForm = () => {
    signupRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleQuickSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    const { error } = await supabase.from('vendors').insert({
      business_name: formData.business_name.trim(),
      category: formData.category,
      city: formData.city.trim(),
      state: formData.state.trim().toUpperCase(),
      contact_type: formData.phone.trim() ? 'phone' : 'website',
      contact_value: formData.phone.trim() || formData.website.trim() || formData.email.trim(),
      plan: 'Starter',
      status: 'pending',
    });

    if (error) {
      setSubmitError(error.message || 'Could not submit listing. Please try again.');
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="w-full pt-16 lg:pt-20 bg-spa-cream">
      {/* Hero Banner */}
      <section className="w-full py-14 lg:py-20 bg-gradient-to-b from-spa-lavender/70 to-spa-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs sm:text-sm uppercase tracking-[0.18em] text-spa-purple font-semibold">
            Spa-Pregio Partner Network
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-spa-charcoal leading-tight mt-3 max-w-4xl mx-auto">
            Connect with local mamas <span className="text-spa-purple">planning their next chapter.</span>
          </h1>
          <p className="text-spa-gray text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            List your business in our local directory, host or join community events, and lock in founding member pricing before your city fills up.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8">
            <button
              type="button"
              onClick={scrollToForm}
              className="btn-primary px-7 py-3.5 text-base justify-center w-full sm:w-auto"
            >
              Start Free Listing <ArrowRight size={17} />
            </button>
            <a
              href="#founding-tiers"
              className="px-7 py-3.5 rounded-full bg-white text-spa-purple border border-spa-purple/25 font-semibold hover:bg-spa-lavender transition-colors inline-flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Zap size={17} /> Claim Founding Rate
            </a>
          </div>
        </div>
      </section>

      {/* Matching Swipeable Visual Category Showcase */}
      <section className="w-full py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-elegant p-5 sm:p-7 border border-spa-purple/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-spa-purple flex items-center gap-1.5">
                  <Sparkles size={13} /> Categories Mamas Search Daily
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-spa-charcoal mt-1">
                  Pick your specialty: <span className="text-spa-purple">{selectedCategory}</span>
                </h2>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <Link
                  to={'/find-vendors?category=' + encodeURIComponent(selectedCategory)}
                  className="text-xs sm:text-sm font-medium text-spa-purple hover:underline inline-flex items-center gap-1 mr-1"
                >
                  See {selectedCategory} listings <ArrowRight size={14} />
                </Link>
                <button
                  type="button"
                  onClick={() => scrollRail('left')}
                  aria-label="Scroll categories left"
                  className="hidden sm:inline-flex w-8 h-8 rounded-full bg-spa-lavender hover:bg-spa-purple hover:text-white text-spa-charcoal items-center justify-center transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollRail('right')}
                  aria-label="Scroll categories right"
                  className="hidden sm:inline-flex w-8 h-8 rounded-full bg-spa-lavender hover:bg-spa-purple hover:text-white text-spa-charcoal items-center justify-center transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div
              ref={railRef}
              className="flex gap-3.5 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: 'none' }}
            >
              {VENDOR_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.label;
                const imgBroken = Boolean(failedImages[cat.label]);

                return (
                  <button
                    key={cat.label}
                    type="button"
                    onClick={() => handleSelectCategoryCard(cat.label)}
                    className={
                      'group relative flex-shrink-0 w-40 sm:w-44 h-48 rounded-2xl overflow-hidden text-left snap-start transition-all duration-300 focus:outline-none ' +
                      (isActive
                        ? 'ring-4 ring-spa-purple shadow-lg scale-[1.01]'
                        : 'ring-1 ring-spa-charcoal/10 hover:ring-2 hover:ring-spa-purple/50 hover:shadow-md')
                    }
                  >
                    {!imgBroken ? (
                      <img
                        src={cat.image}
                        alt={cat.label}
                        loading="lazy"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [cat.label]: true }))
                        }
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-spa-lavender via-spa-blush to-spa-purple/30 flex items-center justify-center">
                        <span className="text-4xl">{cat.emoji}</span>
                      </div>
                    )}

                    <div
                      className={
                        'absolute inset-0 transition-opacity ' +
                        (isActive
                          ? 'bg-gradient-to-t from-spa-charcoal/90 via-spa-purple/40 to-transparent'
                          : 'bg-gradient-to-t from-spa-charcoal/85 via-spa-charcoal/25 to-transparent group-hover:from-spa-charcoal/90')
                      }
                    />

                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <span className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-sm shadow-sm">
                        {cat.emoji}
                      </span>
                      {isActive && (
                        <span className="px-2.5 py-0.5 rounded-full bg-spa-purple text-white text-[10px] font-semibold uppercase tracking-wide shadow-sm">
                          Selected
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="font-serif text-white text-base leading-snug font-medium drop-shadow-sm">
                        {cat.label}
                      </p>
                      <p className="text-white/80 text-[11px] leading-tight mt-0.5 line-clamp-1">
                        {cat.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Early Opportunity Perks */}
      <section className="w-full py-14 bg-spa-blush/45">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.18em] text-spa-purple font-semibold">
              Early Opportunity
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-spa-charcoal mt-2">
              Be the first vendor <span className="text-spa-purple">in your city.</span>
            </h2>
            <p className="text-spa-gray text-sm sm:text-base mt-2">
              Early local partners get front-row visibility as expecting mamas and shower hosts search their area.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Star,
                title: 'Founding Member Badge',
                desc: 'Stand out as an early local partner with a dedicated badge on your profile and search cards.',
              },
              {
                icon: MapPin,
                title: 'Top of Local Search',
                desc: 'Get priority local placement in your city and category when mamas search nearby.',
              },
              {
                icon: Sparkles,
                title: 'Direct Mama Access',
                desc: 'Showcase packages, host or join local events, and connect directly with active families.',
              },
            ].map((perk) => (
              <div key={perk.title} className="bg-white rounded-2xl p-6 shadow-elegant">
                <perk.icon size={22} className="text-spa-purple mb-3" />
                <h3 className="font-serif text-xl text-spa-charcoal">{perk.title}</h3>
                <p className="text-sm text-spa-gray mt-2 leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              type="button"
              onClick={scrollToForm}
              className="btn-primary inline-flex items-center gap-2 px-7 py-3"
            >
              Claim Your Spot <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Ad Designer Preview Section */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.18em] text-spa-purple font-semibold">
                Ad Designer
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-spa-charcoal mt-2">
                Create beautiful <span className="text-spa-purple">advertisements.</span>
              </h2>
              <p className="text-spa-gray mt-3 leading-relaxed">
                Design clean, on-brand promotional cards in minutes. Enterprise partners can feature their ads on the homepage spotlight.
              </p>

              <ul className="space-y-2.5 mt-6 text-sm text-spa-charcoal">
                {[
                  { icon: Upload, text: 'Upload your signature service or product photos' },
                  { icon: Palette, text: 'Customize headlines, badges, and Spa-Pregio styling' },
                  { icon: Eye, text: 'Preview your live card before publishing' },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-2.5">
                    <item.icon size={16} className="text-spa-purple flex-shrink-0" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-3 max-w-md">
                <div>
                  <label className="block text-xs font-medium text-spa-gray mb-1">
                    Preview Headline
                  </label>
                  <input
                    type="text"
                    value={adHeadline}
                    onChange={(e) => setAdHeadline(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-spa-lavender rounded-xl text-sm text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-spa-gray mb-1">
                    Spotlight Tag
                  </label>
                  <input
                    type="text"
                    value={adBadge}
                    onChange={(e) => setAdBadge(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-spa-lavender rounded-xl text-sm text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                  />
                </div>
              </div>
            </div>

            <div className="bg-spa-lavender/60 rounded-3xl p-6 sm:p-8 border border-spa-purple/15">
              <div className="bg-white rounded-2xl overflow-hidden shadow-elegant">
                <div className="aspect-[16/10] relative bg-spa-lavender">
                  <img
                    src={
                      VENDOR_CATEGORIES.find((c) => c.label === selectedCategory)?.image ||
                      VENDOR_CATEGORIES[0].image
                    }
                    alt={selectedCategory}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 text-spa-purple text-xs font-semibold shadow-sm">
                    {adBadge || 'Featured Local Vendor'}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider text-spa-purple font-semibold">
                    {selectedCategory}
                  </p>
                  <h3 className="font-serif text-xl text-spa-charcoal mt-1">
                    {adHeadline || 'Your Featured Offer Headline'}
                  </h3>
                  <p className="text-xs text-spa-gray mt-1.5">
                    {formData.business_name || 'Your Business Name'} - {formData.city || 'Local City'},{' '}
                    {formData.state || 'NC'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founding Vendor Lifetime Access Tiers */}
      <section id="founding-tiers" className="w-full py-16 bg-spa-charcoal text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-spa-blush font-semibold">
              Limited Time Offer
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl mt-2">
              Founding Vendor <span className="text-spa-blush">Lifetime Access</span>
            </h2>
            <p className="text-white/75 text-sm sm:text-base mt-3">
              One payment. No recurring monthly fees. Limited to the first 100 founding partners sitewide.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {/* Starter */}
            <div className="rounded-3xl bg-white/5 border border-white/15 p-7 flex flex-col">
              <p className="font-serif text-2xl">Starter</p>
              <p className="text-xs text-white/70 mt-1">Lock in full Starter access forever.</p>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-serif text-4xl font-bold">$199</span>
                <span className="text-xs text-white/60">one-time</span>
                <span className="text-xs line-through text-white/45">$29/mo</span>
              </div>
              <ul className="space-y-2.5 mt-6 text-sm text-white/85 flex-1">
                {[
                  'Full Starter directory listing',
                  'Founding Member badge',
                  'Up to 2 events/month',
                  'No monthly subscription fee',
                ].map((line) => (
                  <li key={line} className="flex items-center gap-2">
                    <Check size={15} className="text-spa-blush flex-shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <a
                href={FOUNDING_LINKS.Starter}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 w-full py-3.5 px-5 rounded-full bg-spa-pink text-spa-charcoal font-semibold text-sm text-center hover:opacity-95 transition-opacity inline-flex items-center justify-center gap-2"
              >
                Claim Founding Rate - $199 <ArrowRight size={15} />
              </a>
            </div>

            {/* Professional */}
            <div className="rounded-3xl bg-spa-purple border-2 border-spa-blush p-7 flex flex-col shadow-xl relative">
              <span className="self-start px-3 py-1 rounded-full bg-white text-spa-purple text-[11px] font-bold uppercase tracking-wider mb-3">
                Best Value
              </span>
              <p className="font-serif text-2xl">Professional</p>
              <p className="text-xs text-white/80 mt-1">Priority visibility &amp; up to 5 events/month.</p>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-serif text-4xl font-bold">$499</span>
                <span className="text-xs text-white/75">one-time</span>
                <span className="text-xs line-through text-white/55">$79/mo</span>
              </div>
              <ul className="space-y-2.5 mt-6 text-sm text-white/95 flex-1">
                {[
                  'Everything in Starter plan',
                  'Priority local category placement',
                  'Up to 5 events/month',
                  'Founding Member badge + lifetime lock',
                ].map((line) => (
                  <li key={line} className="flex items-center gap-2">
                    <Check size={15} className="text-spa-blush flex-shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <a
                href={FOUNDING_LINKS.Professional}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 w-full py-3.5 px-5 rounded-full bg-white text-spa-purple font-semibold text-sm text-center hover:bg-spa-cream transition-colors inline-flex items-center justify-center gap-2"
              >
                Claim Founding Rate - $499 <ArrowRight size={15} />
              </a>
            </div>

            {/* Enterprise */}
            <div className="rounded-3xl bg-white/5 border border-white/15 p-7 flex flex-col">
              <div className="flex items-center justify-between">
                <p className="font-serif text-2xl">Enterprise</p>
                <Crown size={20} className="text-spa-blush" />
              </div>
              <p className="text-xs text-white/70 mt-1">Unlimited events &amp; homepage spotlight access.</p>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-serif text-4xl font-bold">$999</span>
                <span className="text-xs text-white/60">one-time</span>
                <span className="text-xs line-through text-white/45">$149/mo</span>
              </div>
              <ul className="space-y-2.5 mt-6 text-sm text-white/85 flex-1">
                {[
                  'Everything in Professional plan',
                  'Unlimited local events',
                  'Ad Designer homepage spotlight eligibility',
                  'Founding Member badge + lifetime lock',
                ].map((line) => (
                  <li key={line} className="flex items-center gap-2">
                    <Check size={15} className="text-spa-blush flex-shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <a
                href={FOUNDING_LINKS.Enterprise}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 w-full py-3.5 px-5 rounded-full bg-spa-pink text-spa-charcoal font-semibold text-sm text-center hover:opacity-95 transition-opacity inline-flex items-center justify-center gap-2"
              >
                Claim Founding Rate - $999 <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Free Starter Listing Form */}
      <section ref={signupRef} className="w-full py-16 bg-spa-cream scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-elegant p-6 sm:p-10 border border-spa-purple/10">
            <div className="text-center mb-8">
              <span className="text-xs uppercase tracking-[0.18em] text-spa-purple font-semibold">
                Free Starter Listing
              </span>
              <h2 className="font-serif text-3xl text-spa-charcoal mt-2">
                Submit your business in under 2 minutes.
              </h2>
              <p className="text-sm text-spa-gray mt-2">
                Start with a free listing or manage full profile photos in your Vendor Dashboard.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-spa-purple/10 flex items-center justify-center mx-auto">
                  <Check size={28} className="text-spa-purple" />
                </div>
                <h3 className="font-serif text-2xl text-spa-charcoal">Listing Submitted!</h3>
                <p className="text-sm text-spa-gray max-w-md mx-auto">
                  We received your submission for <strong>{formData.business_name}</strong> under{' '}
                  <strong>{formData.category}</strong>. You can also sign into your Vendor Dashboard to customize your profile.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <Link to="/vendor-dashboard" className="btn-primary justify-center">
                    Go to Vendor Dashboard <ArrowRight size={16} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        business_name: '',
                        contact_name: '',
                        email: '',
                        phone: '',
                        city: '',
                        state: 'NC',
                        category: selectedCategory,
                        description: '',
                        website: '',
                      });
                    }}
                    className="px-6 py-3 rounded-full bg-spa-lavender text-spa-charcoal text-sm font-medium hover:bg-spa-purple/10 transition-colors"
                  >
                    Submit Another Business
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleQuickSignup} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.business_name}
                      onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                      placeholder="e.g., Triad Prenatal Glow Spa"
                      className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => {
                        setFormData({ ...formData, category: e.target.value });
                        setSelectedCategory(e.target.value);
                      }}
                      className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                    >
                      {VENDOR_CATEGORIES.map((c) => (
                        <option key={c.label} value={c.label}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g., High Point"
                      className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={2}
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value.toUpperCase() })
                      }
                      placeholder="NC"
                      className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@business.com"
                      className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">
                      Phone or Website
                    </label>
                    <input
                      type="text"
                      value={formData.phone || formData.website}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(336) 555-0199 or https://..."
                      className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                    />
                  </div>
                </div>

                {submitError && (
                  <p className="text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-xl">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full justify-center py-3.5 text-base disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Free Listing'}
                  <ArrowRight size={17} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="w-full py-14 bg-spa-purple text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl sm:text-4xl text-white">
            Ready to grow your <span className="text-spa-blush italic">business?</span>
          </h2>
          <p className="text-white/80 text-sm sm:text-base mt-2">
            Get in front of local mamas who are ready to plan, celebrate, and book.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <button
              type="button"
              onClick={scrollToForm}
              className="px-6 py-3 rounded-full bg-white text-spa-purple font-semibold text-sm hover:bg-spa-cream transition-colors inline-flex items-center justify-center gap-2"
            >
              Start Free <ArrowRight size={15} />
            </button>
            <a
              href="#founding-tiers"
              className="px-6 py-3 rounded-full bg-spa-pink text-spa-charcoal font-semibold text-sm hover:opacity-95 transition-opacity inline-flex items-center justify-center gap-2"
            >
              <Zap size={15} /> Claim Founding Rate
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
