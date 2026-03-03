import { useState, useRef } from 'react';
import { 
  ArrowRight, Check, Star, Users, MapPin, Store,
  Image, Type, Palette, Eye, Download, Upload, Search
} from 'lucide-react';
import VendorDirectory from '../sections/VendorDirectory';
import LocalVendorSearch, { VendorSearchHandle } from '../sections/LocalVendorSearch';

const vendorCategories = [
  { 
    name: 'Maternity Boutiques', 
    description: 'Clothing, accessories, and essentials for expectant mothers',
    icon: Store,
    examples: ['Dresses', 'Nursing wear', 'Jewelry', 'Bags']
  },
  { 
    name: 'Local Crafters', 
    description: 'Handmade items for nursery and baby',
    icon: Store,
    examples: ['Knitted blankets', 'Wooden toys', 'Ceramics', 'Artwork']
  },
  { 
    name: 'Spas & Wellness', 
    description: 'Prenatal massage, facials, and wellness services',
    icon: Users,
    examples: ['Prenatal massage', 'Facials', 'Yoga classes', 'Meditation']
  },
  { 
    name: 'Photographers', 
    description: 'Maternity, newborn, and family photography',
    icon: Image,
    examples: ['Maternity shoots', 'Newborn photos', 'Family portraits', 'Event coverage']
  },
  { 
    name: 'Caterers & Bakers', 
    description: 'Food and desserts for celebrations',
    icon: Store,
    examples: ['Custom cakes', 'Catering', 'Dessert tables', 'Specialty diets']
  },
  { 
    name: 'Event Venues', 
    description: 'Spaces for baby showers and celebrations',
    icon: MapPin,
    examples: ['Country clubs', 'Restaurants', 'Hotels', 'Private estates']
  },
  { 
    name: 'Floral Designers', 
    description: 'Bouquets, centerpieces, and event florals',
    icon: Store,
    examples: ['Centerpieces', 'Bouquets', 'Installations', 'Corsages']
  },
  { 
    name: 'Stationery & Paper', 
    description: 'Invitations, favors, and paper goods',
    icon: Store,
    examples: ['Invitations', 'Thank you cards', 'Favor tags', 'Menus']
  },
];

const pricingTiers = [
  {
    name: 'Starter',
    price: 49,
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
  },
  {
    name: 'Professional',
    price: 149,
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
  },
  {
    name: 'Enterprise',
    price: 299,
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
      'API access for inventory',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const usStates = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 
  'Wisconsin', 'Wyoming'
];

const adSizes = [
  { name: 'Sidebar', dimensions: '300 x 600', width: 150, height: 300 },
  { name: 'Banner', dimensions: '728 x 90', width: 364, height: 45 },
  { name: 'Square', dimensions: '300 x 250', width: 150, height: 125 },
  { name: 'Hero', dimensions: '1200 x 400', width: 300, height: 100 },
];

const successStories = [
  {
    business: 'Bloom Maternity Boutique',
    location: 'Austin, TX',
    category: 'Maternity Boutique',
    quote: 'Since joining Spa-Pregio, our foot traffic has increased by 60%. The event vendor opportunities have been incredible for our business.',
    stat: '60% increase in sales',
  },
  {
    business: 'Willow & Wren Handcrafted',
    location: 'Portland, OR',
    category: 'Local Crafter',
    quote: 'As a small handmade business, Spa-Pregio connected me with customers I never would have found otherwise.',
    stat: '200+ new customers',
  },
  {
    business: 'Serenity Prenatal Spa',
    location: 'Miami, FL',
    category: 'Spa & Wellness',
    quote: 'The partnership has brought us a steady stream of expectant mothers. Our prenatal massage bookings have doubled.',
    stat: '2x booking increase',
  },
];

export default function ForVendors() {
  const [showAdDesigner, setShowAdDesigner] = useState(false);
  const [selectedSize, setSelectedSize] = useState(adSizes[0]);
  const [adText, setAdText] = useState({ headline: '', description: '', cta: 'Learn More' });
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState('');
  const vendorSearchRef = useRef<VendorSearchHandle>(null);

  return (
    <div className="w-full pt-20">
      {/* Hero Section */}
      <section className="w-full py-16 lg:py-24 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">For Vendors</span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-spa-charcoal leading-tight mt-4">
              Reach expectant mothers in <span className="text-spa-purple">your area.</span>
            </h1>
            <p className="mt-6 text-lg text-spa-gray leading-relaxed">
              Join Spa-Pregio's marketplace and connect with thousands of local mothers-to-be actively shopping for maternity products and services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button 
                onClick={() => setShowSignupForm(true)}
                className="btn-primary"
              >
                List Your Business
                <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => setShowAdDesigner(true)}
                className="btn-outline"
              >
                <Eye size={18} />
                Try Ad Designer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 lg:py-16 bg-white border-y border-spa-purple/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid sm:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-serif text-3xl lg:text-4xl text-spa-purple">12,000+</p>
              <p className="text-spa-gray text-sm mt-1">Active members</p>
            </div>
            <div>
              <p className="font-serif text-3xl lg:text-4xl text-spa-purple">$3,500</p>
              <p className="text-spa-gray text-sm mt-1">Avg. event budget</p>
            </div>
            <div>
              <p className="font-serif text-3xl lg:text-4xl text-spa-purple">85%</p>
              <p className="text-spa-gray text-sm mt-1">Book within 30 days</p>
            </div>
            <div>
              <p className="font-serif text-3xl lg:text-4xl text-spa-purple">500+</p>
              <p className="text-spa-gray text-sm mt-1">Cities covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Categories */}
      <section className="w-full py-16 lg:py-20 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Vendor Categories</span>
            <h2 className="section-title mt-4">
              What can you <span className="text-spa-purple">sell?</span>
            </h2>
            <p className="mt-4 text-spa-gray max-w-2xl mx-auto">
              From maternity boutiques to spa services, we welcome all businesses that serve expectant mothers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vendorCategories.map((category, index) => (
              <div 
                key={index} 
                onClick={() => vendorSearchRef.current?.searchCategory(category.name)}
                className="bg-white rounded-2xl p-6 shadow-elegant hover:shadow-elegant-hover transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-spa-purple/10 flex items-center justify-center mb-4 group-hover:bg-spa-purple group-hover:text-white transition-colors">
                  <category.icon size={22} className="text-spa-purple group-hover:text-white" />
                </div>
                <h3 className="font-serif text-lg text-spa-charcoal mb-2">{category.name}</h3>
                <p className="text-spa-gray text-sm mb-4">{category.description}</p>
                <div className="flex flex-wrap gap-1">
                  {category.examples.map((example, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-spa-lavender rounded-full text-spa-gray">
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City/State Directory */}
      <section className="w-full py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Nationwide Directory</span>
              <h2 className="section-title mt-4">
                Find vendors by <span className="text-spa-purple">location.</span>
              </h2>
              <p className="mt-4 text-spa-gray leading-relaxed">
                Our directory covers all 50 states. Members can search for vendors in their city or browse when traveling. From New York to Los Angeles, find local businesses everywhere.
              </p>
              
              <div className="mt-8">
                <label className="block text-sm font-medium text-spa-charcoal mb-2">Browse by State</label>
                <div className="relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-spa-gray" />
                  <select 
                    className="w-full pl-11 pr-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30 appearance-none"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                  >
                    <option value="">Select a state...</option>
                    {usStates.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {['New York', 'California', 'Texas', 'Florida', 'Illinois'].map((state) => (
                  <button
                    key={state}
                    className="px-4 py-2 bg-spa-lavender rounded-full text-sm text-spa-charcoal hover:bg-spa-purple hover:text-white transition-colors"
                  >
                    {state}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant">
                <img
                  src="/images/vendor_crafter.jpg"
                  alt="Vendor at event"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="w-full py-16 lg:py-20 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Pricing</span>
            <h2 className="section-title mt-4">
              Choose your <span className="text-spa-purple">plan.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div 
                key={index} 
                className={`relative rounded-2xl p-8 ${
                  tier.popular 
                    ? 'bg-spa-purple text-white' 
                    : 'bg-white'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-spa-pink text-white text-xs font-medium uppercase tracking-wider rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className={`font-serif text-2xl ${tier.popular ? 'text-white' : 'text-spa-charcoal'}`}>
                  {tier.name}
                </h3>
                <p className={`mt-2 text-sm ${tier.popular ? 'text-white/70' : 'text-spa-gray'}`}>
                  {tier.description}
                </p>
                <div className="mt-6">
                  <span className={`font-serif text-4xl ${tier.popular ? 'text-white' : 'text-spa-charcoal'}`}>
                    ${tier.price}
                  </span>
                  <span className={`text-sm ${tier.popular ? 'text-white/70' : 'text-spa-gray'}`}>
                    /{tier.period}
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={18} className={`flex-shrink-0 mt-0.5 ${tier.popular ? 'text-spa-pink' : 'text-spa-purple'}`} />
                      <span className={`text-sm ${tier.popular ? 'text-white/80' : 'text-spa-gray'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => { setSelectedTier(tier.name); setShowSignupForm(true); }}
                  className={`w-full mt-8 py-3 rounded-full font-medium transition-colors ${
                    tier.popular
                      ? 'bg-white text-spa-purple hover:bg-spa-cream'
                      : 'bg-spa-purple text-white hover:bg-spa-purple/90'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Designer */}
      <section className="w-full py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Ad Designer</span>
              <h2 className="section-title mt-4">
                Create beautiful <span className="text-spa-purple">advertisements.</span>
              </h2>
              <p className="mt-4 text-spa-gray leading-relaxed">
                Our intuitive ad designer lets you create stunning, on-brand advertisements in minutes. No design experience needed.
              </p>
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
              <button 
                onClick={() => setShowAdDesigner(true)}
                className="btn-primary mt-8"
              >
                <Eye size={18} />
                Try the Ad Designer
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

      {/* Success Stories */}
      <section className="w-full py-16 lg:py-20 bg-spa-blush">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Success Stories</span>
            <h2 className="section-title mt-4">
              What our vendors <span className="text-spa-purple">say.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-elegant">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-spa-purple text-spa-purple" />
                  ))}
                </div>
                <p className="text-spa-charcoal leading-relaxed mb-6">
                  "{story.quote}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-spa-charcoal">{story.business}</p>
                    <p className="text-sm text-spa-gray">{story.category}</p>
                    <p className="text-sm text-spa-gray">{story.location}</p>
                  </div>
                  <span className="px-4 py-2 bg-spa-purple/10 rounded-full text-sm text-spa-purple font-medium">
                    {story.stat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 lg:py-20 bg-spa-purple">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl text-white">
            Ready to grow your <span className="text-spa-pink">business?</span>
          </h2>
          <p className="mt-4 text-white/70 leading-relaxed">
            Join hundreds of vendors already partnering with Spa-Pregio. Start reaching local mothers-to-be today.
          </p>
          <button 
            onClick={() => setShowSignupForm(true)}
            className="bg-white text-spa-purple px-6 py-3 rounded-full font-medium hover:bg-spa-cream transition-colors inline-flex items-center gap-2 mt-8"
          >
            List Your Business
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Ad Designer Modal */}
      {showAdDesigner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spa-charcoal/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-2xl text-spa-charcoal">Ad Designer</h3>
                <button 
                  onClick={() => setShowAdDesigner(false)}
                  className="w-8 h-8 rounded-full bg-spa-lavender flex items-center justify-center text-spa-gray hover:text-spa-charcoal transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Controls */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-2">Ad Size</label>
                    <div className="grid grid-cols-2 gap-2">
                      {adSizes.map((size) => (
                        <button
                          key={size.name}
                          onClick={() => setSelectedSize(size)}
                          className={`p-3 rounded-xl text-left transition-colors ${
                            selectedSize.name === size.name
                              ? 'bg-spa-purple text-white'
                              : 'bg-spa-lavender text-spa-charcoal hover:bg-spa-purple/10'
                          }`}
                        >
                          <p className="font-medium">{size.name}</p>
                          <p className={`text-xs ${selectedSize.name === size.name ? 'text-white/70' : 'text-spa-gray'}`}>
                            {size.dimensions}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-2">Headline</label>
                    <input
                      type="text"
                      value={adText.headline}
                      onChange={(e) => setAdText({...adText, headline: e.target.value})}
                      placeholder="Your Business Name"
                      className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-2">Description</label>
                    <textarea
                      value={adText.description}
                      onChange={(e) => setAdText({...adText, description: e.target.value})}
                      placeholder="Describe your products or services..."
                      rows={3}
                      className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-2">Call to Action</label>
                    <input
                      type="text"
                      value={adText.cta}
                      onChange={(e) => setAdText({...adText, cta: e.target.value})}
                      className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-2">Upload Photo</label>
                    <div className="border-2 border-dashed border-spa-charcoal/20 rounded-xl p-8 text-center hover:border-spa-purple/50 transition-colors cursor-pointer">
                      <Upload size={32} className="text-spa-gray mx-auto mb-2" />
                      <p className="text-sm text-spa-gray">Click to upload or drag and drop</p>
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-2">Preview</label>
                  <div className="bg-spa-lavender rounded-xl p-4 flex items-center justify-center min-h-[400px]">
                    <div 
                      className="bg-white rounded-lg overflow-hidden shadow-lg"
                      style={{ width: selectedSize.width, height: selectedSize.height }}
                    >
                      <div className="h-1/2 bg-spa-purple/20 flex items-center justify-center">
                        <Image size={32} className="text-spa-purple/50" />
                      </div>
                      <div className="p-3">
                        <p className="font-serif text-sm text-spa-charcoal font-medium truncate">
                          {adText.headline || 'Your Business Name'}
                        </p>
                        <p className="text-xs text-spa-gray mt-1 line-clamp-2">
                          {adText.description || 'Your business description...'}
                        </p>
                        <button className="mt-2 px-3 py-1 bg-spa-purple text-white text-xs rounded-full">
                          {adText.cta}
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-spa-gray mt-2 text-center">
                    Actual size: {selectedSize.dimensions}px
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button className="flex-1 btn-primary justify-center">
                  <Download size={18} />
                  Save Design
                </button>
                <button 
                  onClick={() => setShowAdDesigner(false)}
                  className="px-6 py-3 border border-spa-charcoal/20 rounded-full text-spa-charcoal hover:bg-spa-lavender transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Signup Form Modal */}
      {showSignupForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spa-charcoal/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-2xl text-spa-charcoal">
                  {selectedTier ? `Sign Up: ${selectedTier}` : 'List Your Business'}
                </h3>
                <button 
                  onClick={() => setShowSignupForm(false)}
                  className="w-8 h-8 rounded-full bg-spa-lavender flex items-center justify-center text-spa-gray hover:text-spa-charcoal transition-colors"
                >
                  ×
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-1">Business Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Bloom Maternity Boutique"
                    className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-1">Category</label>
                  <select className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30">
                    <option>Select a category...</option>
                    {vendorCategories.map((cat) => (
                      <option key={cat.name} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">Contact Name</label>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">Last Name</label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="you@business.com"
                    className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-1">Phone</label>
                  <input
                    type="tel"
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-1">City, State</label>
                  <input
                    type="text"
                    placeholder="e.g., Austin, TX"
                    className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                  />
                </div>

                {!selectedTier && (
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">Select Plan</label>
                    <select className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30">
                      <option>Starter — $49/month</option>
                      <option>Professional — $149/month</option>
                      <option>Enterprise — $299/month</option>
                    </select>
                  </div>
                )}

                <button type="submit" className="btn-primary w-full justify-center mt-6">
                  Submit Application
                </button>

                <p className="text-xs text-spa-gray text-center">
                  Our team will review your application within 24-48 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Vendor Directory */}
      <LocalVendorSearch ref={vendorSearchRef} />
      <div className="mt-16">
        <div className="text-center mb-8">
          <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">All Listings</span>
          <h2 className="section-title mt-2">Browse the <span className="text-spa-purple">directory.</span></h2>
        </div>
        <VendorDirectory />
      </div>
    </div>
  );
}
