import { useState, useMemo } from 'react';
import {
  MapPin, ChevronDown, Search, Star, ArrowRight, Phone, Globe,
  Camera, UtensilsCrossed, Shirt, Baby, Building2, FileText,
  Flower2, Sparkles, Music, Gift, Dumbbell, Heart, ShoppingBag, X,
  Check, Lock, Crown, Zap, Shield, AlertCircle
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

type ClaimStep = 'view' | 'claim' | 'verify' | 'packages' | 'checkout' | 'success';
type PackageId = 'basic' | 'professional' | 'featured';

interface Vendor {
  id: number;
  name: string;
  category: string;
  city: string;
  state: string;
  rating: number;
  reviews: number;
  tagline: string;
  tags: string[];
  phone?: string;
  website?: string;
  image: string;
  featured?: boolean;
  verified?: boolean;
  claimed?: boolean;
}

// ─── Packages ────────────────────────────────────────────────────────────────

const packages = [
  {
    id: 'basic' as PackageId,
    name: 'Basic Listing',
    price: 0,
    period: 'Free forever',
    icon: Shield,
    tagline: 'Claim your spot in the directory',
    features: [
      'Business name & category',
      'City & state location',
      'Up to 3 specialty tags',
      'Contact information',
      '"Claimed" verified badge',
    ],
    locked: [
      'Featured placement in directory',
      'Full photo gallery',
      'Priority search ranking',
      'Event host opportunities',
      'Analytics dashboard',
    ],
    cta: 'Claim for Free',
    popular: false,
    highlight: false,
    accentClass: 'border-spa-light',
    badgeClass: 'bg-spa-lavender text-spa-gray',
  },
  {
    id: 'professional' as PackageId,
    name: 'Professional',
    price: 49,
    period: '/month',
    icon: Zap,
    tagline: 'Get discovered by local mamas',
    features: [
      'Everything in Basic',
      'Full photo gallery (up to 20 photos)',
      '"Verified" badge on profile',
      'Priority search ranking in your city',
      'Direct inquiry & booking button',
      'Customer reviews & star ratings',
      'Monthly performance analytics',
    ],
    locked: [
      'Homepage featured spot',
      'Event host sponsorships',
      'Dedicated member email blast',
    ],
    cta: 'Start 14-Day Free Trial',
    popular: true,
    highlight: false,
    accentClass: 'border-spa-purple',
    badgeClass: 'bg-spa-purple text-white',
  },
  {
    id: 'featured' as PackageId,
    name: 'Featured',
    price: 149,
    period: '/month',
    icon: Crown,
    tagline: 'Maximum visibility in your local market',
    features: [
      'Everything in Professional',
      '⭐ Featured badge across directory',
      'Top placement in city & category',
      'Homepage spotlight rotation',
      'Invite to host or sponsor events',
      'Dedicated email to local members',
      'Advanced analytics & lead tracking',
      'Priority Spa-Pregio team support',
    ],
    locked: [],
    cta: 'Get Featured Now',
    popular: false,
    highlight: true,
    accentClass: 'border-amber-400',
    badgeClass: 'bg-amber-400 text-white',
  },
];

// ─── Category Config ──────────────────────────────────────────────────────────

const categories = [
  { id: 'all',           label: 'All Vendors',          icon: Heart },
  { id: 'photographers', label: 'Photographers',         icon: Camera },
  { id: 'caterers',      label: 'Caterers & Bakers',     icon: UtensilsCrossed },
  { id: 'maternity',     label: 'Maternity Boutiques',   icon: Shirt },
  { id: 'baby',          label: 'Baby & Nursery',        icon: Baby },
  { id: 'venues',        label: 'Venues & Restaurants',  icon: Building2 },
  { id: 'stationery',    label: 'Stationery & Paper',    icon: FileText },
  { id: 'florals',       label: 'Floral Designers',      icon: Flower2 },
  { id: 'spas',          label: 'Spas & Wellness',       icon: Sparkles },
  { id: 'entertainment', label: 'Entertainment',         icon: Music },
  { id: 'gifts',         label: 'Gifts & Favors',        icon: Gift },
  { id: 'fitness',       label: 'Prenatal Fitness',      icon: Dumbbell },
  { id: 'shopping',      label: 'Baby Gear & Registry',  icon: ShoppingBag },
];

// ─── Sample Vendor Data ───────────────────────────────────────────────────────

const allVendors: Vendor[] = [
  { id: 1,  name: 'Golden Hour Maternity',    category: 'photographers', city: 'Los Angeles',   state: 'California',     rating: 5.0, reviews: 142, tagline: 'Glowing portraits for expectant mamas',                   tags: ['Maternity', 'Newborn', 'Studio & Outdoor'],           image: '/images/spa_photo.jpg',          featured: true,  verified: true,  claimed: true  },
  { id: 2,  name: 'Blossom Cakery',           category: 'caterers',      city: 'Los Angeles',   state: 'California',     rating: 4.9, reviews: 87,  tagline: 'Custom cakes & dessert tables for every celebration',     tags: ['Custom Cakes', 'Dessert Tables', 'Dietary Options'],  image: '/images/celebrate_bright.jpg',   verified: true,  claimed: true  },
  { id: 3,  name: 'Bump to Baby Boutique',    category: 'maternity',     city: 'Los Angeles',   state: 'California',     rating: 4.8, reviews: 63,  tagline: 'Luxury maternity & nursing wear',                         tags: ['Maternity Wear', 'Nursing', 'Accessories'],           image: '/images/vendor_boutique.jpg',    featured: true,  verified: true,  claimed: true  },
  { id: 4,  name: 'Serenity Prenatal Spa',    category: 'spas',          city: 'Los Angeles',   state: 'California',     rating: 5.0, reviews: 211, tagline: 'Prenatal massage, facials & full wellness packages',       tags: ['Prenatal Massage', 'Facials', 'Yoga'],                image: '/images/venue_spa_lounge.jpg',   verified: true,  claimed: true,  website: 'serenityprenatalspa.com' },
  { id: 5,  name: 'Little Sprout Nursery Co', category: 'baby',          city: 'Los Angeles',   state: 'California',     rating: 4.7, reviews: 44,  tagline: 'Beautiful nursery decor & heirloom gifts',                tags: ['Nursery Decor', 'Heirloom Gifts', 'Handmade'],        image: '/images/kit_grid_01.jpg',        claimed: false },
  { id: 6,  name: 'Bay Bloom Photography',    category: 'photographers', city: 'San Francisco', state: 'California',     rating: 4.9, reviews: 98,  tagline: 'Documentary-style maternity & birth photography',         tags: ['Maternity', 'Birth', 'Lifestyle'],                    image: '/images/story_photo.jpg',        claimed: false },
  { id: 7,  name: 'The Gilded Venue',         category: 'venues',        city: 'San Francisco', state: 'California',     rating: 4.8, reviews: 56,  tagline: 'Intimate event spaces with stunning bay views',           tags: ['Private Events', 'Bay Views', 'Full-Service'],        image: '/images/venue_featured.jpg',     featured: true,  verified: true,  claimed: true  },
  { id: 8,  name: 'Paper & Petal Stationery', category: 'stationery',    city: 'San Francisco', state: 'California',     rating: 4.9, reviews: 73,  tagline: 'Handcrafted invitations & bespoke paper goods',           tags: ['Invitations', 'Custom Design', 'Letterpress'],        image: '/images/plan_bright.jpg',        claimed: false },
  { id: 9,  name: 'Wildflower Maternity',     category: 'photographers', city: 'Austin',        state: 'Texas',          rating: 5.0, reviews: 167, tagline: 'Outdoor & studio maternity sessions with heart',          tags: ['Outdoor', 'Studio', 'Newborn', 'Golden Hour'],        image: '/images/hero_bright.jpg',        featured: true,  verified: true,  claimed: true,  website: 'wildflowermaternity.com' },
  { id: 10, name: 'The Garden Room',          category: 'venues',        city: 'Austin',        state: 'Texas',          rating: 4.9, reviews: 129, tagline: 'Botanical-inspired venue for intimate celebrations',       tags: ['Baby Showers', 'Brunch Events', 'Full Catering'],     image: '/images/venue_restaurant.jpg',   featured: true,  verified: true,  claimed: true,  phone: '(512) 555-0247' },
  { id: 11, name: 'Sweet Southern Cakes',     category: 'caterers',      city: 'Austin',        state: 'Texas',          rating: 4.8, reviews: 91,  tagline: 'Stunning cakes & full dessert table styling',             tags: ['Custom Cakes', 'Catering', 'Brunch Menus'],           image: '/images/celebrate_bright.jpg',   claimed: false },
  { id: 12, name: 'Mama Bear Boutique',       category: 'maternity',     city: 'Austin',        state: 'Texas',          rating: 4.7, reviews: 52,  tagline: 'Cozy, curated maternity & baby styles',                  tags: ['Maternity Fashion', 'Baby Clothing', 'Gifts'],        image: '/images/vendor_boutique.jpg',    claimed: false },
  { id: 13, name: 'Austin Paper Co.',         category: 'stationery',    city: 'Austin',        state: 'Texas',          rating: 4.9, reviews: 38,  tagline: 'Custom shower invitations, menus & signage',             tags: ['Invitations', 'Menus', 'Day-Of Signage'],             image: '/images/plan_bright.jpg',        claimed: false },
  { id: 14, name: 'Bloom Floral Studio',      category: 'florals',       city: 'Austin',        state: 'Texas',          rating: 5.0, reviews: 84,  tagline: 'Lush, romantic florals for your biggest moments',         tags: ['Baby Shower Florals', 'Centerpieces', 'Arches'],      image: '/images/venue_bright.jpg',       featured: true,  verified: true,  claimed: true  },
  { id: 15, name: 'Luxe Mama Photography',    category: 'photographers', city: 'New York City', state: 'New York',       rating: 5.0, reviews: 203, tagline: 'Editorial maternity portraits in NYC & beyond',           tags: ['Editorial', 'Studio', 'Location Shoots'],             image: '/images/spa_photo.jpg',          featured: true,  verified: true,  claimed: true,  website: 'luxemamaphoto.com' },
  { id: 16, name: 'The Brooklyn Blossom',     category: 'florals',       city: 'New York City', state: 'New York',       rating: 4.9, reviews: 115, tagline: 'Garden-style florals for events & celebrations',          tags: ['Baby Showers', 'Dried Florals', 'Sustainable'],       image: '/images/venue_bright.jpg',       claimed: false },
  { id: 17, name: 'Fifth Ave Maternity',      category: 'maternity',     city: 'New York City', state: 'New York',       rating: 4.8, reviews: 76,  tagline: 'Designer maternity & occasion wear',                     tags: ['Designer', 'Occasion Wear', 'Alterations'],           image: '/images/vendor_boutique.jpg',    featured: true,  verified: true,  claimed: true  },
  { id: 18, name: 'Petit Papier NYC',         category: 'stationery',    city: 'New York City', state: 'New York',       rating: 4.9, reviews: 92,  tagline: 'Luxury invitations & bespoke paper suites',              tags: ['Luxury', 'Letterpress', 'Foil Printing'],             image: '/images/plan_bright.jpg',        claimed: false },
  { id: 19, name: 'The Grand Ballroom',       category: 'venues',        city: 'New York City', state: 'New York',       rating: 4.8, reviews: 148, tagline: 'Timeless elegance for unforgettable gatherings',          tags: ['Grand Venue', 'Full Catering', 'Event Planning'],     image: '/images/venue_countryclub.jpg',  featured: true,  verified: true,  claimed: true  },
  { id: 20, name: 'Bump & Beyond Wellness',   category: 'spas',          city: 'New York City', state: 'New York',       rating: 4.9, reviews: 134, tagline: "NYC's premier prenatal spa experience",                   tags: ['Prenatal Massage', 'Yoga', 'Float Therapy'],          image: '/images/spa_bright.jpg',         claimed: false },
  { id: 21, name: 'Windy City Maternity',     category: 'photographers', city: 'Chicago',       state: 'Illinois',       rating: 4.9, reviews: 88,  tagline: 'Natural light maternity sessions in Chicago',             tags: ['Natural Light', 'Studio', 'Newborn'],                 image: '/images/hero_bright.jpg',        claimed: false },
  { id: 22, name: 'The Grand Ballroom',       category: 'venues',        city: 'Chicago',       state: 'Illinois',       rating: 4.9, reviews: 177, tagline: 'Classic Chicago elegance for private events',             tags: ['Country Club Style', 'Full Catering', 'Coordination'],image: '/images/venue_countryclub.jpg',  featured: true,  verified: true,  claimed: true,  phone: '(312) 555-0391' },
  { id: 23, name: 'Sugar & Lace Bakery',      category: 'caterers',      city: 'Chicago',       state: 'Illinois',       rating: 4.8, reviews: 65,  tagline: 'Baby shower cakes & custom dessert spreads',             tags: ['Custom Cakes', 'Cookies', 'Dessert Tables'],          image: '/images/celebrate_bright.jpg',   claimed: false },
  { id: 24, name: 'Sunshine Bump Photography',category: 'photographers', city: 'Miami',         state: 'Florida',        rating: 5.0, reviews: 156, tagline: "Sun-drenched maternity sessions on Miami's shores",       tags: ['Beach', 'Studio', 'Aerial', 'Lifestyle'],             image: '/images/hero_bright.jpg',        featured: true,  verified: true,  claimed: true  },
  { id: 25, name: 'Brickell Country Club',    category: 'venues',        city: 'Miami',         state: 'Florida',        rating: 4.9, reviews: 201, tagline: 'Upscale venue with world-class catering',                tags: ['Luxury', 'Full Catering', 'Private Events'],          image: '/images/venue_countryclub.jpg',  featured: true,  verified: true,  claimed: true,  website: 'brickellcc.com' },
  { id: 26, name: 'Tropical Blooms Floral',   category: 'florals',       city: 'Miami',         state: 'Florida',        rating: 4.8, reviews: 73,  tagline: 'Lush tropical florals for Miami celebrations',            tags: ['Tropical', 'Baby Showers', 'Arches'],                 image: '/images/venue_bright.jpg',       claimed: false },
  { id: 27, name: 'La Bella Maternity',       category: 'maternity',     city: 'Miami',         state: 'Florida',        rating: 4.9, reviews: 61,  tagline: 'Curated Latin-inspired maternity & occasion wear',        tags: ['Maternity Fashion', 'Occasion Wear', 'Jewelry'],      image: '/images/vendor_boutique.jpg',    claimed: false },
  { id: 28, name: 'Carolina Light Photography',category:'photographers', city: 'Greensboro',    state: 'North Carolina', rating: 4.9, reviews: 54,  tagline: 'Soft, natural maternity sessions in the Triad',           tags: ['Natural Light', 'Outdoor', 'Studio'],                 image: '/images/story_photo.jpg',        claimed: false },
  { id: 29, name: 'Southern Stork Boutique',  category: 'baby',          city: 'Greensboro',    state: 'North Carolina', rating: 4.7, reviews: 28,  tagline: 'Handpicked baby gifts, clothing & nursery decor',         tags: ['Baby Gifts', 'Nursery', 'Local Artisans'],            image: '/images/kit_grid_02.jpg',        claimed: false },
  { id: 30, name: 'Pacific NW Portraits',     category: 'photographers', city: 'Seattle',       state: 'Washington',     rating: 5.0, reviews: 112, tagline: 'Moody, luminous maternity photography',                  tags: ['Fine Art', 'Black & White', 'Outdoor'],               image: '/images/spa_photo.jpg',          featured: true,  verified: true,  claimed: true  },
  { id: 31, name: 'Evergreen Wellness Spa',   category: 'spas',          city: 'Seattle',       state: 'Washington',     rating: 4.8, reviews: 89,  tagline: 'Holistic prenatal wellness in the PNW',                  tags: ['Prenatal Massage', 'Reiki', 'Acupuncture'],           image: '/images/spa_bright.jpg',         claimed: false },
];

// ─── State/City Index ─────────────────────────────────────────────────────────

const stateIndex = Array.from(new Set(allVendors.map(v => v.state))).sort();
function getCities(state: string) {
  return Array.from(new Set(allVendors.filter(v => v.state === state).map(v => v.city))).sort();
}

// ─── Claim / Package Modal ────────────────────────────────────────────────────

function ClaimModal({ vendor, onClose }: { vendor: Vendor; onClose: () => void }) {
  const [step, setStep] = useState<ClaimStep>(vendor.claimed ? 'view' : 'claim');
  const [selectedPackage, setSelectedPackage] = useState<PackageId | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: '' });
  const [cardForm, setCardForm] = useState({ number: '', expiry: '', cvc: '', name: '' });

  const pkg = packages.find(p => p.id === selectedPackage);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-spa-charcoal/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-spa-light px-6 py-4 flex items-center justify-between z-10">
          <div>
            <p className="text-xs text-spa-gray uppercase tracking-widest">
              {step === 'view' ? 'Vendor Profile' :
               step === 'claim' ? 'Step 1 of 3 — Verify Ownership' :
               step === 'packages' ? 'Step 2 of 3 — Choose a Plan' :
               step === 'checkout' ? 'Step 3 of 3 — Checkout' :
               step === 'success' ? 'All done!' : ''}
            </p>
            <h3 className="font-serif text-xl text-spa-charcoal mt-0.5">{vendor.name}</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-spa-lavender flex items-center justify-center text-spa-gray hover:text-spa-charcoal">
            <X size={16} />
          </button>
        </div>

        <div className="p-6">

          {/* ── STEP: VIEW (already claimed) ── */}
          {step === 'view' && (
            <div>
              <div className="relative aspect-[16/7] rounded-xl overflow-hidden mb-6">
                <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {vendor.featured && <span className="px-2.5 py-1 bg-amber-400 text-white rounded-full text-xs font-semibold flex items-center gap-1"><Crown size={11} /> Featured</span>}
                  {vendor.claimed && <span className="px-2.5 py-1 bg-white/90 text-spa-purple rounded-full text-xs font-medium">✓ Claimed</span>}
                </div>
              </div>
              <p className="text-spa-gray leading-relaxed mb-4">{vendor.tagline}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {vendor.tags.map(t => <span key={t} className="px-3 py-1 bg-spa-lavender rounded-full text-sm text-spa-purple">{t}</span>)}
              </div>
              {vendor.phone && <p className="text-sm text-spa-gray flex items-center gap-2 mb-2"><Phone size={14} className="text-spa-purple" />{vendor.phone}</p>}
              {vendor.website && <p className="text-sm text-spa-purple flex items-center gap-2 mb-6"><Globe size={14} />{vendor.website}</p>}
              <div className="grid grid-cols-2 gap-3">
                <button className="btn-primary justify-center text-sm">Contact Vendor</button>
                <button className="btn-outline justify-center text-sm">Save to List</button>
              </div>
              {/* Upsell if not featured */}
              {!vendor.featured && (
                <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                  <Crown size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-amber-900">Is this your business?</p>
                    <p className="text-xs text-amber-700 mt-0.5">Upgrade to Featured to get top placement and more bookings.</p>
                    <button onClick={() => setStep('packages')} className="mt-2 text-xs font-semibold text-amber-700 underline underline-offset-2">
                      View upgrade options →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── STEP: CLAIM ── */}
          {step === 'claim' && (
            <div>
              <div className="flex items-start gap-4 p-4 bg-spa-lavender rounded-xl mb-6">
                <AlertCircle size={20} className="text-spa-purple mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-spa-charcoal">This listing was auto-generated from public data.</p>
                  <p className="text-xs text-spa-gray mt-1">Claim it to manage your profile, respond to reviews, and upgrade your visibility.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-1.5">Your Full Name</label>
                  <input type="text" placeholder="Jane Smith" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-1.5">Business Email</label>
                  <input type="email" placeholder="hello@yourbusiness.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-1.5">Business Phone</label>
                  <input type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-1.5">Your Role</label>
                  <select value={form.role} onChange={e => setForm({...form, role: e.target.value})}
                    className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30">
                    <option value="">Select your role...</option>
                    <option>Owner</option>
                    <option>Manager</option>
                    <option>Marketing Director</option>
                    <option>Authorized Representative</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => setStep('packages')}
                disabled={!form.name || !form.email || !form.role}
                className="btn-primary w-full justify-center mt-6 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue — Choose a Plan
                <ArrowRight size={16} />
              </button>
              <p className="text-xs text-spa-gray text-center mt-3">We'll verify ownership within 24 hours. You can start with a free listing immediately.</p>
            </div>
          )}

          {/* ── STEP: PACKAGES ── */}
          {step === 'packages' && (
            <div>
              <p className="text-spa-gray text-sm mb-6">Choose the plan that fits your goals. You can always upgrade later.</p>
              <div className="space-y-4">
                {packages.map(p => {
                  const Icon = p.icon;
                  const isSelected = selectedPackage === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPackage(p.id)}
                      className={`w-full text-left rounded-2xl border-2 p-5 transition-all ${
                        isSelected ? `${p.accentClass} bg-spa-lavender/50` : 'border-spa-light hover:border-spa-purple/30'
                      } ${p.highlight ? 'ring-2 ring-amber-400/30' : ''}`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center ${isSelected ? 'bg-spa-purple' : 'bg-spa-lavender'}`}>
                            <Icon size={17} className={isSelected ? 'text-white' : 'text-spa-purple'} />
                          </div>
                          <div>
                            <span className="font-semibold text-spa-charcoal">{p.name}</span>
                            {p.popular && <span className="ml-2 text-xs px-2 py-0.5 bg-spa-purple text-white rounded-full">Most Popular</span>}
                            {p.highlight && <span className="ml-2 text-xs px-2 py-0.5 bg-amber-400 text-white rounded-full">Best Value</span>}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-spa-charcoal text-lg">{p.price === 0 ? 'Free' : `$${p.price}`}</span>
                          {p.price > 0 && <span className="text-spa-gray text-xs block">{p.period}</span>}
                        </div>
                      </div>
                      <p className="text-xs text-spa-gray mb-3">{p.tagline}</p>
                      <ul className="space-y-1.5">
                        {p.features.map(f => (
                          <li key={f} className="flex items-center gap-2 text-xs text-spa-charcoal">
                            <Check size={13} className="text-green-500 flex-shrink-0" />{f}
                          </li>
                        ))}
                        {p.locked.map(f => (
                          <li key={f} className="flex items-center gap-2 text-xs text-spa-gray/50">
                            <Lock size={11} className="flex-shrink-0" />{f}
                          </li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  if (selectedPackage === 'basic') { setStep('success'); }
                  else { setStep('checkout'); }
                }}
                disabled={!selectedPackage}
                className="btn-primary w-full justify-center mt-6 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {selectedPackage === 'basic' ? 'Claim Free Listing' : `Continue to Checkout`}
                <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* ── STEP: CHECKOUT ── */}
          {step === 'checkout' && pkg && (
            <div>
              {/* Order summary */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-spa-lavender mb-6">
                <div>
                  <p className="font-medium text-spa-charcoal">{pkg.name} — {vendor.name}</p>
                  <p className="text-xs text-spa-gray mt-0.5">{pkg.popular ? '14-day free trial, then billed monthly' : 'Billed monthly, cancel anytime'}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-spa-charcoal">${pkg.price}<span className="text-xs text-spa-gray font-normal">/mo</span></p>
                  {pkg.popular && <p className="text-xs text-green-600">First 14 days free</p>}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-1.5">Cardholder Name</label>
                  <input type="text" placeholder="Jane Smith" value={cardForm.name} onChange={e => setCardForm({...cardForm, name: e.target.value})}
                    className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-1.5">Card Number</label>
                  <input type="text" placeholder="1234 5678 9012 3456" maxLength={19} value={cardForm.number}
                    onChange={e => setCardForm({...cardForm, number: e.target.value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim()})}
                    className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30 font-mono tracking-widest" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1.5">Expiry</label>
                    <input type="text" placeholder="MM / YY" maxLength={7} value={cardForm.expiry}
                      onChange={e => setCardForm({...cardForm, expiry: e.target.value})}
                      className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30 font-mono" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1.5">CVC</label>
                    <input type="text" placeholder="123" maxLength={4} value={cardForm.cvc}
                      onChange={e => setCardForm({...cardForm, cvc: e.target.value.replace(/\D/,'')})}
                      className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30 font-mono" />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep('success')}
                disabled={!cardForm.name || cardForm.number.length < 19 || !cardForm.expiry || !cardForm.cvc}
                className="btn-primary w-full justify-center mt-6 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Shield size={16} />
                {pkg.popular ? 'Start Free Trial' : `Pay $${pkg.price}/month`}
              </button>
              <p className="text-xs text-center text-spa-gray mt-3">🔒 Secured by Stripe. Cancel anytime.</p>
            </div>
          )}

          {/* ── STEP: SUCCESS ── */}
          {step === 'success' && (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <Check size={36} className="text-green-500" />
              </div>
              <h3 className="font-serif text-2xl text-spa-charcoal">
                {selectedPackage === 'basic' ? "You're listed!" : "Welcome aboard! 🎉"}
              </h3>
              <p className="text-spa-gray mt-3 leading-relaxed max-w-sm mx-auto">
                {selectedPackage === 'basic'
                  ? `Your listing for ${vendor.name} has been claimed. We'll verify your ownership within 24 hours.`
                  : selectedPackage === 'professional'
                  ? `Your 14-day free trial for ${vendor.name} has started. Check your email for login details.`
                  : `${vendor.name} is now a Featured vendor on Spa-Pregio! Expect a welcome call from our team within 24 hours.`}
              </p>
              {selectedPackage !== 'basic' && (
                <div className="mt-6 p-4 rounded-xl bg-spa-lavender text-left space-y-2">
                  <p className="text-sm font-medium text-spa-charcoal">What happens next:</p>
                  <p className="text-xs text-spa-gray flex items-center gap-2"><Check size={12} className="text-green-500" /> Profile goes live within 1 business day</p>
                  <p className="text-xs text-spa-gray flex items-center gap-2"><Check size={12} className="text-green-500" /> Dashboard login sent to your email</p>
                  {selectedPackage === 'featured' && <p className="text-xs text-spa-gray flex items-center gap-2"><Check size={12} className="text-green-500" /> Team will call to schedule your homepage spotlight</p>}
                </div>
              )}
              <button onClick={onClose} className="btn-primary mt-8 inline-flex">
                Back to Directory
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// ─── Vendor Card ──────────────────────────────────────────────────────────────

function VendorCard({ vendor, onClick }: { vendor: Vendor; onClick: () => void }) {
  const CategoryIcon = categories.find(c => c.id === vendor.category)?.icon ?? Heart;
  const catLabel = categories.find(c => c.id === vendor.category)?.label ?? '';

  return (
    <div className="elegant-card group cursor-pointer hover:shadow-lg transition-all duration-300" onClick={onClick}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {vendor.featured && (
            <span className="px-2.5 py-1 bg-amber-400 text-white rounded-full text-xs font-semibold flex items-center gap-1">
              <Crown size={10} /> Featured
            </span>
          )}
          {vendor.claimed && !vendor.featured && (
            <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-spa-purple">
              ✓ Claimed
            </span>
          )}
          {!vendor.claimed && (
            <span className="px-2.5 py-1 bg-spa-charcoal/70 backdrop-blur-sm text-white/80 rounded-full text-xs">
              Unclaimed
            </span>
          )}
        </div>

        {/* Category pill */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-spa-charcoal flex items-center gap-1.5">
          <CategoryIcon size={11} />
          {catLabel}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-serif text-lg text-spa-charcoal group-hover:text-spa-purple transition-colors leading-snug">{vendor.name}</h3>
          {vendor.claimed && (
            <span className="flex items-center gap-1 flex-shrink-0">
              <Star size={13} className="text-amber-400 fill-amber-400" />
              <span className="text-spa-charcoal font-medium text-sm">{vendor.rating.toFixed(1)}</span>
            </span>
          )}
        </div>
        <p className="text-sm text-spa-gray leading-relaxed">{vendor.tagline}</p>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {vendor.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-spa-lavender rounded-full text-xs text-spa-purple">{tag}</span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-spa-charcoal/5">
          <span className="text-xs text-spa-gray flex items-center gap-1">
            <MapPin size={12} className="text-spa-purple" />{vendor.city}, {vendor.state}
          </span>
          {vendor.claimed ? (
            <button className="text-spa-purple font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
              View <ArrowRight size={15} />
            </button>
          ) : (
            <button className="text-amber-600 font-semibold text-xs flex items-center gap-1 hover:gap-1.5 transition-all bg-amber-50 px-3 py-1.5 rounded-full">
              Claim Listing <ArrowRight size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function VendorDirectory() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [stateOpen, setStateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [claimFilter, setClaimFilter] = useState<'all' | 'claimed' | 'unclaimed'>('all');

  const cities = useMemo(() => selectedState ? getCities(selectedState) : [], [selectedState]);

  const filteredVendors = useMemo(() => {
    return allVendors.filter(v => {
      const matchesState    = !selectedState || v.state === selectedState;
      const matchesCity     = !selectedCity  || v.city  === selectedCity;
      const matchesCategory = activeCategory === 'all' || v.category === activeCategory;
      const matchesClaim    = claimFilter === 'all' || (claimFilter === 'claimed' ? v.claimed : !v.claimed);
      const matchesSearch   = !searchQuery ||
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesState && matchesCity && matchesCategory && matchesClaim && matchesSearch;
    });
  }, [selectedState, selectedCity, activeCategory, searchQuery, claimFilter]);

  const unclaimedCount = allVendors.filter(v => !v.claimed).length;

  return (
    <section className="w-full py-16 lg:py-24 bg-spa-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Vendor Directory</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-spa-charcoal mt-4 leading-tight">
            Trusted local <span className="text-spa-purple">vendors.</span>
          </h2>
          <p className="mt-4 text-spa-gray leading-relaxed">
            Photographers, caterers, florists, venues, boutiques & more — curated for expectant mamas and their celebrations.
          </p>
          {/* Unclaimed callout */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-sm text-amber-800">
            <AlertCircle size={15} className="text-amber-500" />
            <span><strong>{unclaimedCount} listings</strong> are unclaimed — is one yours?</span>
          </div>
        </div>

        {/* Search + Location Row */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 max-w-4xl mx-auto">

          {/* State */}
          <div className="relative flex-1">
            <button onClick={() => { setStateOpen(!stateOpen); setCityOpen(false); }}
              className="w-full flex items-center justify-between gap-3 px-5 py-4 bg-white rounded-2xl text-left hover:bg-spa-blush focus:outline-none focus:ring-2 focus:ring-spa-purple/30 shadow-sm transition-all">
              <div className="flex items-center gap-3">
                <MapPin size={17} className="text-spa-purple flex-shrink-0" />
                <span className={selectedState ? 'text-spa-charcoal font-medium' : 'text-spa-gray'}>{selectedState || 'All states'}</span>
              </div>
              <ChevronDown size={17} className={`text-spa-gray transition-transform duration-200 ${stateOpen ? 'rotate-180' : ''}`} />
            </button>
            {stateOpen && (
              <div className="absolute z-30 mt-2 w-full bg-white rounded-2xl shadow-elegant border border-spa-light overflow-hidden">
                <button onClick={() => { setSelectedState(''); setSelectedCity(''); setStateOpen(false); }}
                  className="w-full text-left px-5 py-3 text-sm text-spa-gray hover:bg-spa-lavender border-b border-spa-light">All states</button>
                <div className="max-h-56 overflow-y-auto">
                  {stateIndex.map(state => (
                    <button key={state} onClick={() => { setSelectedState(state); setSelectedCity(''); setStateOpen(false); }}
                      className={`w-full text-left px-5 py-3 text-sm transition-colors hover:bg-spa-lavender ${selectedState === state ? 'bg-spa-blush text-spa-purple font-medium' : 'text-spa-charcoal'}`}>
                      {state}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* City */}
          <div className="relative flex-1">
            <button onClick={() => { if (selectedState) { setCityOpen(!cityOpen); setStateOpen(false); } }}
              disabled={!selectedState}
              className={`w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl text-left focus:outline-none focus:ring-2 focus:ring-spa-purple/30 shadow-sm transition-all ${selectedState ? 'bg-white hover:bg-spa-blush' : 'bg-spa-light opacity-50 cursor-not-allowed'}`}>
              <div className="flex items-center gap-3">
                <MapPin size={17} className="text-spa-purple flex-shrink-0" />
                <span className={selectedCity ? 'text-spa-charcoal font-medium' : 'text-spa-gray'}>{selectedCity || (selectedState ? 'All cities' : 'Choose state first')}</span>
              </div>
              <ChevronDown size={17} className={`text-spa-gray transition-transform duration-200 ${cityOpen ? 'rotate-180' : ''}`} />
            </button>
            {cityOpen && (
              <div className="absolute z-30 mt-2 w-full bg-white rounded-2xl shadow-elegant border border-spa-light overflow-hidden">
                <button onClick={() => { setSelectedCity(''); setCityOpen(false); }}
                  className="w-full text-left px-5 py-3 text-sm text-spa-gray hover:bg-spa-lavender border-b border-spa-light">All cities in {selectedState}</button>
                <div className="max-h-56 overflow-y-auto">
                  {cities.map(city => (
                    <button key={city} onClick={() => { setSelectedCity(city); setCityOpen(false); }}
                      className={`w-full text-left px-5 py-3 text-sm transition-colors hover:bg-spa-lavender ${selectedCity === city ? 'bg-spa-blush text-spa-purple font-medium' : 'text-spa-charcoal'}`}>
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search */}
          <div className="relative flex-[2]">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-spa-gray" />
            <input type="text" placeholder="Search by name, specialty, or keyword..."
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-4 bg-white rounded-2xl text-spa-charcoal placeholder:text-spa-gray shadow-sm focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 shadow-sm ${activeCategory === cat.id ? 'bg-spa-purple text-white' : 'bg-white text-spa-charcoal hover:bg-spa-blush'}`}>
                <Icon size={14} />{cat.label}
              </button>
            );
          })}
        </div>

        {/* Claimed / Unclaimed toggle */}
        <div className="flex gap-2 mb-8">
          {(['all', 'claimed', 'unclaimed'] as const).map(f => (
            <button key={f} onClick={() => setClaimFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${claimFilter === f ? 'bg-spa-charcoal text-white' : 'bg-white text-spa-charcoal hover:bg-spa-blush shadow-sm'}`}>
              {f === 'all' ? 'All Listings' : f === 'claimed' ? '✓ Claimed' : '🔓 Unclaimed'}
            </button>
          ))}
          <div className="ml-auto flex items-center">
            <span className="text-sm text-spa-gray"><strong className="text-spa-charcoal">{filteredVendors.length}</strong> vendor{filteredVendors.length !== 1 ? 's' : ''}</span>
            {(selectedState || searchQuery || activeCategory !== 'all' || claimFilter !== 'all') && (
              <button onClick={() => { setSelectedState(''); setSelectedCity(''); setSearchQuery(''); setActiveCategory('all'); setClaimFilter('all'); }}
                className="ml-3 text-sm text-spa-purple hover:underline flex items-center gap-1">
                <X size={13} /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        {filteredVendors.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-spa-blush flex items-center justify-center mx-auto mb-4">
              <Search size={26} className="text-spa-purple" />
            </div>
            <h3 className="font-serif text-2xl text-spa-charcoal">No vendors found</h3>
            <p className="text-spa-gray mt-2 max-w-sm mx-auto">Try adjusting your filters — or add your business!</p>
            <button className="btn-primary mt-6">List Your Business</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVendors.map(vendor => (
              <VendorCard key={vendor.id} vendor={vendor} onClick={() => setSelectedVendor(vendor)} />
            ))}
          </div>
        )}

        {/* CTA banner */}
        <div className="mt-16 rounded-2xl bg-spa-purple p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl lg:text-3xl text-white">Are you a local vendor?</h3>
            <p className="text-white/70 mt-2">Join the directory and connect with expectant mamas in your area. Free to list, premium to shine.</p>
          </div>
          <button className="bg-white text-spa-purple px-8 py-3 rounded-full font-medium hover:bg-spa-cream transition-colors whitespace-nowrap flex-shrink-0">
            List Your Business
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedVendor && (
        <ClaimModal vendor={selectedVendor} onClose={() => setSelectedVendor(null)} />
      )}
    </section>
  );
}
