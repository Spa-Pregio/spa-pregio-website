import { useState, useRef } from 'react';
import { 
  ArrowRight, Check, Star, Users, MapPin, Store,
  Image, Type, Palette, Eye, Download, Search, X
} from 'lucide-react';
import LocalVendorSearch, { VendorSearchHandle } from '../sections/LocalVendorSearch';

const vendorCategories = [
  { name: 'Maternity Boutiques', description: 'Clothing, accessories, and essentials for expectant mothers', icon: Store, examples: ['Dresses', 'Nursing wear', 'Jewelry', 'Bags'] },
  { name: 'Local Crafters', description: 'Handmade items for nursery and baby', icon: Store, examples: ['Knitted blankets', 'Wooden toys', 'Ceramics', 'Artwork'] },
  { name: 'Spas & Wellness', description: 'Prenatal massage, facials, and wellness services', icon: Users, examples: ['Prenatal massage', 'Facials', 'Yoga classes', 'Meditation'] },
  { name: 'Photographers', description: 'Maternity, newborn, and family photography', icon: Image, examples: ['Maternity shoots', 'Newborn photos', 'Family portraits', 'Event coverage'] },
  { name: 'Caterers & Bakers', description: 'Food and desserts for celebrations', icon: Store, examples: ['Custom cakes', 'Catering', 'Dessert tables', 'Specialty diets'] },
  { name: 'Event Venues', description: 'Spaces for baby showers and celebrations', icon: MapPin, examples: ['Country clubs', 'Restaurants', 'Hotels', 'Private estates'] },
  { name: 'Florists', description: 'Bouquets, centerpieces, and event florals', icon: Store, examples: ['Centerpieces', 'Bouquets', 'Installations', 'Corsages'] },
  { name: 'Party Planners', description: 'Full-service event planning and coordination', icon: Store, examples: ['Full planning', 'Day-of coordination', 'Styling', 'Vendors'] },
];

const pricingTiers = [
  {
    name: 'Starter',
    price: 29,
    period: 'month',
    description: 'Perfect for individual vendors just starting out',
    features: [
      'Business profile page',
      'Photo gallery (up to 15 images)',
      'Contact information',
      'Website & social links',
      'Appear in local search results',
      'Basic analytics',
    ],
    cta: 'Get Started',
    popular: false,
    badge: 'Founding Member Rate',
    stripeLink: 'https://buy.stripe.com/8x23cwgC8d987N79Fx2go00',
    eventAccess: 'Up to 2 events/month',
  },
  {
    name: 'Professional',
    price: 79,
    period: 'month',
    description: 'Enhanced visibility with event participation',
    features: [
      'Everything in Starter',
      'Featured placement in category',
      '"Verified" badge on profile',
      'Priority in search results',
      'Event vendor opportunities',
      'Customer reviews & ratings',
      'Advanced analytics dashboard',
    ],
    cta: 'Become a Partner',
    popular: true,
    badge: 'Most Popular',
    stripeLink: 'https://buy.stripe.com/9B6cN6adKfhg5EZ7xp2go01',
    eventAccess: 'Up to 5 events/month',
  },
  {
    name: 'Enterprise',
    price: 149,
    period: 'month',
    description: 'Maximum exposure for established businesses',
    features: [
      'Everything in Professional',
      'Homepage featured placement',
      'Dedicated email to local members',
      'Custom advertisement design',
      'Multiple location listings',
      'Exclusive event sponsorships',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
    popular: false,
    badge: 'Unlimited Events',
    stripeLink: 'https://buy.stripe.com/8x24gA71y0mm6J304X2go02',
    eventAccess: 'Unlimited events',
  },
];

const adSizes = [
  { name: 'Sidebar', dimensions: '300 x 600', width: 150, height: 300 },
  { name: 'Banner', dimensions: '728 x 90', width: 364, height: 45 },
  { name: 'Square', dimensions: '300 x 250', width: 150, height: 125 },
  { name: 'Hero', dimensions: '1200 x 400', width: 300, height: 100 },
];

export default function ForVendors() {
  const [showAdDesigner, setShowAdDesigner] = useState(false);
  const [selectedSize, setSelectedSize] = useState(adSizes[0]);
  const [adText, setAdText] = useState({ headline: '', description: '', cta: 'Learn More' });
  const [selectedTier, setSelectedTier] = useState<typeof pricingTiers[0] | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const vendorSearchRef = useRef<VendorSearchHandle>(null);

  const handleSelectTier = (tier: typeof pricingTiers[0]) => {
    setSelectedTier(tier);
    setShowConfirmModal(true);
  };

  const handleProceedToCheckout = () => {
    if (selectedTier) {
      window.open(selectedTier.stripeLink, '_blank');
      setShowConfirmModal(false);
    }
  };

  return (
    <div className="w-full pt-20">

      {/* Hero */}
      <section className="w-full py-16 lg:py-24 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">For Vendors</span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-spa-charcoal leading-tight mt-4">
              Reach expectant mothers in <span className="text-spa-purple">your area.</span>
            </h1>
            <p className="mt-6 text-lg text-spa-gray leading-relaxed">
              Join Spa-Pregio's directory and get discovered by local mamas actively shopping for maternity products and services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a href="#pricing" className="btn-primary">
                List Your Business <ArrowRight size={18} />
              </a>
              <button onClick={() => setShowAdDesigner(true)} className="btn-outline">
                <Eye size={18} /> Try Ad Designer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Categories */}
      <section className="w-full py-16 lg:py-20 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Vendor Categories</span>
            <h2 className="section-title mt-4">What can you <span className="text-spa-purple">sell?</span></h2>
            <p className="mt-4 text-spa-gray max-w-2xl mx-auto">
              Click any category to find local vendors in your area — or list your own business below.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vendorCategories.map((category, index) => (
              <div
                key={index}
                onClick={() => vendorSearchRef.current?.searchCategory(category.name)}
                className="bg-white rounded-2xl p-6 shadow-elegant hover:shadow-elegant-hover transition-all cursor-pointer group border-2 border-transparent hover:border-spa-purple/20"
              >
                <div className="w-12 h-12 rounded-full bg-spa-purple/10 flex items-center justify-center mb-4 group-hover:bg-spa-purple transition-colors">
                  <category.icon size={22} className="text-spa-purple group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-serif text-lg text-spa-charcoal mb-2">{category.name}</h3>
                <p className="text-spa-gray text-sm mb-4">{category.description}</p>
                <div className="flex flex-wrap gap-1">
                  {category.examples.map((example, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-spa-lavender rounded-full text-spa-gray">{example}</span>
                  ))}
                </div>
                <p className="text-xs text-spa-purple font-medium mt-4 flex items-center gap-1">
                  <Search size={11} /> Find local vendors →
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Vendor Search */}
      <section className="w-full py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <LocalVendorSearch ref={vendorSearchRef} />
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="w-full py-16 lg:py-20 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-6">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Pricing</span>
            <h2 className="section-title mt-4">Choose your <span className="text-spa-purple">plan.</span></h2>
            <p className="mt-4 text-spa-gray max-w-xl mx-auto">
              These are our founding member rates — locked in for early vendors. Prices increase as the platform grows.
            </p>
          </div>

          <div className="bg-spa-purple/10 border border-spa-purple/20 rounded-2xl p-4 max-w-2xl mx-auto mb-12 text-center">
            <p className="text-spa-purple text-sm font-medium">
              🎉 All plans include event access — Enterprise members get <strong>unlimited</strong> events to showcase their products!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div key={index} className={`relative rounded-2xl p-8 ${tier.popular ? 'bg-spa-purple text-white' : 'bg-white'}`}>
                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-white text-xs font-medium uppercase tracking-wider rounded-full ${tier.popular ? 'bg-spa-pink' : 'bg-spa-charcoal/60'}`}>
                  {tier.badge}
                </span>
                <h3 className={`font-serif text-2xl mt-2 ${tier.popular ? 'text-white' : 'text-spa-charcoal'}`}>{tier.name}</h3>
                <p className={`mt-2 text-sm ${tier.popular ? 'text-white/70' : 'text-spa-gray'}`}>{tier.description}</p>
                <div className="mt-6">
                  <span className={`font-serif text-4xl ${tier.popular ? 'text-white' : 'text-spa-charcoal'}`}>${tier.price}</span>
                  <span className={`text-sm ${tier.popular ? 'text-white/70' : 'text-spa-gray'}`}>/{tier.period}</span>
                </div>
                <div className={`mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${tier.popular ? 'bg-white/20 text-white' : 'bg-spa-purple/10 text-spa-purple'}`}>
                  <Store size={12} /> {tier.eventAccess}
                </div>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={18} className={`flex-shrink-0 mt-0.5 ${tier.popular ? 'text-spa-pink' : 'text-spa-purple'}`} />
                      <span className={`text-sm ${tier.popular ? 'text-white/80' : 'text-spa-gray'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSelectTier(tier)}
                  className={`w-full mt-8 py-3 rounded-full font-medium transition-colors ${tier.popular ? 'bg-white text-spa-purple hover:bg-spa-cream' : 'bg-spa-purple text-white hover:bg-spa-purple/90'}`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Be First CTA */}
      <section className="w-full py-16 lg:py-20 bg-spa-blush">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Early Opportunity</span>
          <h2 className="section-title mt-4">Be the first vendor <span className="text-spa-purple">in your city.</span></h2>
          <p className="mt-4 text-spa-gray leading-relaxed max-w-2xl mx-auto">
            Spa-Pregio is growing fast. Early vendors get premium placement, founding member rates, and first access to every mama searching in their area. The sooner you list, the bigger your head start.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            {[
              { icon: Star, title: 'Founding Member Badge', desc: 'Stand out as one of the first vendors to join the movement.' },
              { icon: MapPin, title: 'Top of Local Search', desc: 'Early listings get priority placement in their city and category.' },
              { icon: Users, title: 'Direct Mama Access', desc: 'Connect with expectant mothers actively looking for what you offer.' },
            ].map((perk) => (
              <div key={perk.title} className="bg-white rounded-2xl p-6 shadow-elegant text-left">
                <perk.icon size={24} className="text-spa-purple mb-3" />
                <h3 className="font-serif text-lg text-spa-charcoal mb-2">{perk.title}</h3>
                <p className="text-sm text-spa-gray leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
          <a href="#pricing" className="btn-primary mt-10 mx-auto inline-flex">
            Claim Your Spot <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* Ad Designer Section */}
      <section className="w-full py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Ad Designer</span>
              <h2 className="section-title mt-4">Create beautiful <span className="text-spa-purple">advertisements.</span></h2>
              <p className="mt-4 text-spa-gray leading-relaxed">Design stunning, on-brand ads in minutes. No design experience needed.</p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: Image, text: 'Upload your product photos' },
                  { icon: Type, text: 'Customize headlines and copy' },
                  { icon: Palette, text: 'Match your brand colors' },
                  { icon: Eye, text: 'Preview in real-time' },
                  { icon: Download, text: 'Export in multiple formats' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <item.icon size={20} className="text-spa-purple" />
                    <span className="text-spa-charcoal">{item.text}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setShowAdDesigner(true)} className="btn-primary mt-8">
                <Eye size={18} /> Try the Ad Designer
              </button>
            </div>
            <div className="relative">
              <div className="elegant-card p-6">
                <div className="aspect-[4/3] bg-spa-lavender rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Palette size={48} className="text-spa-purple mx-auto mb-4" />
                    <p className="text-spa-gray">Ad Designer Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-16 lg:py-20 bg-spa-purple">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl text-white">Ready to grow your <span className="text-spa-pink">business?</span></h2>
          <p className="mt-4 text-white/70 leading-relaxed">Get in front of local mamas who are ready to buy. List your business today.</p>
          <a href="#pricing" className="bg-white text-spa-purple px-6 py-3 rounded-full font-medium hover:bg-spa-cream transition-colors inline-flex items-center gap-2 mt-8">
            List Your Business <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* Plan Confirmation Modal */}
      {showConfirmModal && selectedTier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spa-charcoal/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-2xl text-spa-charcoal">Confirm Your Plan</h3>
              <button onClick={() => setShowConfirmModal(false)} className="w-8 h-8 rounded-full bg-spa-lavender flex items-center justify-center text-spa-gray hover:text-spa-charcoal transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="bg-spa-lavender rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-serif text-xl text-spa-charcoal">{selectedTier.name}</h4>
                <span className="text-spa-purple font-medium">${selectedTier.price}/mo</span>
              </div>
              <p className="text-sm text-spa-gray mb-4">{selectedTier.description}</p>
              <div className="flex items-center gap-2 text-sm text-spa-purple font-medium">
                <Store size={14} /> {selectedTier.eventAccess}
              </div>
            </div>
            <p className="text-sm text-spa-gray mb-6 text-center">
              You'll be taken to Stripe's secure checkout to complete your subscription. Cancel anytime.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirmModal(false)} className="flex-1 px-6 py-3 border border-spa-charcoal/20 rounded-full text-spa-charcoal hover:bg-spa-lavender transition-colors text-sm font-medium">
                Go Back
              </button>
              <button onClick={handleProceedToCheckout} className="flex-1 btn-primary justify-center">
                Proceed to Checkout <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ad Designer Modal */}
      {showAdDesigner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spa-charcoal/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-2xl text-spa-charcoal">Ad Designer</h3>
                <button onClick={() => setShowAdDesigner(false)} className="w-8 h-8 rounded-full bg-spa-lavender flex items-center justify-center text-spa-gray hover:text-spa-charcoal transition-colors">
                  <X size={18} />
                </button>
              </div>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-2">Ad Size</label>
                    <div className="grid grid-cols-2 gap-2">
                      {adSizes.map((size) => (
                        <button key={size.name} onClick={() => setSelectedSize(size)} className={`p-3 rounded-xl text-left transition-colors ${selectedSize.name === size.name ? 'bg-spa-purple text-white' : 'bg-spa-lavender text-spa-charcoal hover:bg-spa-purple/10'}`}>
                          <p className="font-medium">{size.name}</p>
                          <p className={`text-xs ${selectedSize.name === size.name ? 'text-white/70' : 'text-spa-gray'}`}>{size.dimensions}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-2">Headline</label>
                    <input type="text" placeholder="Your business name or tagline" value={adText.headline} onChange={(e) => setAdText({ ...adText, headline: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-2">Description</label>
                    <textarea rows={3} placeholder="Brief description of your services..." value={adText.description} onChange={(e) => setAdText({ ...adText, description: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30 resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-2">Call to Action</label>
                    <select value={adText.cta} onChange={(e) => setAdText({ ...adText, cta: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30">
                      {['Learn More', 'Book Now', 'Shop Now', 'Get a Quote', 'Contact Us'].map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-2">Preview</label>
                  <div className="bg-spa-lavender rounded-xl p-4 flex items-center justify-center min-h-[400px]">
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg" style={{ width: selectedSize.width, height: selectedSize.height }}>
                      <div className="h-1/2 bg-spa-purple/20 flex items-center justify-center">
                        <Image size={32} className="text-spa-purple/50" />
                      </div>
                      <div className="p-3">
                        <p className="font-serif text-sm text-spa-charcoal font-medium truncate">{adText.headline || 'Your Business Name'}</p>
                        <p className="text-xs text-spa-gray mt-1 line-clamp-2">{adText.description || 'Your business description...'}</p>
                        <button className="mt-2 px-3 py-1 bg-spa-purple text-white text-xs rounded-full">{adText.cta}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button className="flex-1 btn-primary justify-center"><Download size={18} /> Save Design</button>
                <button onClick={() => setShowAdDesigner(false)} className="px-6 py-3 border border-spa-charcoal/20 rounded-full text-spa-charcoal hover:bg-spa-lavender transition-colors">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
