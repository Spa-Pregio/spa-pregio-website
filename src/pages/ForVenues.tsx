import { useState } from 'react';
import { 
  ArrowRight, Check, Star, TrendingUp, Users, MapPin, 
  Image, Type, Palette, Eye, Download, Upload 
} from 'lucide-react';

const pricingTiers = [
  {
    name: 'Local Listing',
    price: 99,
    period: 'month',
    description: 'Perfect for venues just starting to reach expectant mothers',
    features: [
      'Venue profile page',
      'Photo gallery (up to 10 images)',
      'Contact information',
      'Website link',
      'Appear in local search results',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Featured Partner',
    price: 249,
    period: 'month',
    description: 'Enhanced visibility with event creation tools',
    features: [
      'Everything in Local Listing',
      'Featured placement on Events page',
      '"Partner" badge on profile',
      'Priority in search results',
      'Event creation tools',
      'Analytics dashboard',
    ],
    cta: 'Become a Partner',
    popular: true,
  },
  {
    name: 'Premium Partner',
    price: 499,
    period: 'month',
    description: 'Maximum exposure with dedicated marketing support',
    features: [
      'Everything in Featured Partner',
      'Homepage featured placement',
      'Quarterly email to local members',
      'Custom advertisement design',
      'Multiple location support',
      'Exclusive category placement',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const adSizes = [
  { name: 'Sidebar', dimensions: '300 x 600', width: 150, height: 300 },
  { name: 'Banner', dimensions: '728 x 90', width: 364, height: 45 },
  { name: 'Square', dimensions: '300 x 250', width: 150, height: 125 },
  { name: 'Hero', dimensions: '1200 x 400', width: 300, height: 100 },
];

const successStories = [
  {
    venue: 'The Grand Ballroom',
    location: 'New York, NY',
    quote: 'Since partnering with Spa-Pregio, we\'ve seen a 40% increase in baby shower bookings. The quality of clients is exceptional.',
    stat: '40% increase in bookings',
  },
  {
    venue: 'Serenity Spa & Wellness',
    location: 'Los Angeles, CA',
    quote: 'The event creation tools make it so easy to host spa days for expectant mothers. It\'s become one of our most popular offerings.',
    stat: '50+ events hosted',
  },
];

export default function ForVenues() {
  const [showAdDesigner, setShowAdDesigner] = useState(false);
  const [selectedSize, setSelectedSize] = useState(adSizes[0]);
  const [adText, setAdText] = useState({ headline: '', description: '', cta: 'Learn More' });
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  return (
    <div className="w-full pt-20">
      {/* Hero Section */}
      <section className="w-full py-16 lg:py-24 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">For Venues</span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-spa-charcoal leading-tight mt-4">
              Reach expectant mothers in <span className="text-spa-purple">your area.</span>
            </h1>
            <p className="mt-6 text-lg text-spa-gray leading-relaxed">
              Partner with Spa-Pregio and connect with thousands of local mothers-to-be planning their celebrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button 
                onClick={() => setShowSignupForm(true)}
                className="btn-primary"
              >
                Get Started
                <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => setShowAdDesigner(true)}
                className="btn-outline"
              >
                <Eye size={18} />
                Preview Ad Designer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 lg:py-16 bg-white border-y border-spa-purple/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users size={24} className="text-spa-purple" />
              </div>
              <p className="font-serif text-3xl lg:text-4xl text-spa-charcoal">12,000+</p>
              <p className="text-spa-gray text-sm mt-1">Active members</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp size={24} className="text-spa-purple" />
              </div>
              <p className="font-serif text-3xl lg:text-4xl text-spa-charcoal">$3,500</p>
              <p className="text-spa-gray text-sm mt-1">Average event budget</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Check size={24} className="text-spa-purple" />
              </div>
              <p className="font-serif text-3xl lg:text-4xl text-spa-charcoal">85%</p>
              <p className="text-spa-gray text-sm mt-1">Book within 30 days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-16 lg:py-20 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Why Partner With Us</span>
            <h2 className="section-title mt-4">
              Benefits of <span className="text-spa-purple">partnership.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, title: 'Targeted Reach', desc: 'Connect directly with expectant mothers actively planning celebrations' },
              { icon: MapPin, title: 'Local Focus', desc: 'Appear in searches from mothers in your specific area' },
              { icon: Star, title: 'Premium Positioning', desc: 'Associate your brand with elegance and sophistication' },
              { icon: TrendingUp, title: 'Measurable Results', desc: 'Track views, clicks, and bookings with our analytics' },
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 rounded-full bg-spa-purple/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon size={24} className="text-spa-purple" />
                </div>
                <h3 className="font-serif text-xl text-spa-charcoal mb-2">{benefit.title}</h3>
                <p className="text-spa-gray text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="w-full py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Pricing</span>
            <h2 className="section-title mt-4">
              Choose your <span className="text-spa-purple">partnership.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div 
                key={index} 
                className={`relative rounded-2xl p-8 ${
                  tier.popular 
                    ? 'bg-spa-purple text-white' 
                    : 'bg-spa-lavender'
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

      {/* Ad Designer Preview */}
      <section className="w-full py-16 lg:py-20 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Ad Designer</span>
              <h2 className="section-title mt-4">
                Design your own <span className="text-spa-purple">advertisement.</span>
              </h2>
              <p className="mt-4 text-spa-gray leading-relaxed">
                Our intuitive ad designer lets you create beautiful, on-brand advertisements in minutes. Choose from multiple sizes, upload your photos, and customize every detail.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: Image, text: 'Upload your venue photos' },
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
      <section className="w-full py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Success Stories</span>
            <h2 className="section-title mt-4">
              What our partners <span className="text-spa-purple">say.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="elegant-card p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-spa-purple text-spa-purple" />
                  ))}
                </div>
                <p className="text-spa-charcoal leading-relaxed text-lg mb-6">
                  "{story.quote}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-spa-charcoal">{story.venue}</p>
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
            Ready to reach <span className="text-spa-pink">expectant mothers?</span>
          </h2>
          <p className="mt-4 text-white/70 leading-relaxed">
            Join hundreds of venues already partnering with Spa-Pregio. Start reaching local mothers-to-be today.
          </p>
          <button 
            onClick={() => setShowSignupForm(true)}
            className="bg-white text-spa-purple px-6 py-3 rounded-full font-medium hover:bg-spa-cream transition-colors inline-flex items-center gap-2 mt-8"
          >
            Get Started
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
                      placeholder="Your Venue Name"
                      className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-2">Description</label>
                    <textarea
                      value={adText.description}
                      onChange={(e) => setAdText({...adText, description: e.target.value})}
                      placeholder="Elegant venue for baby showers and celebrations..."
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
                          {adText.headline || 'Your Venue Name'}
                        </p>
                        <p className="text-xs text-spa-gray mt-1 line-clamp-2">
                          {adText.description || 'Elegant venue description...'}
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
                  {selectedTier ? `Sign Up: ${selectedTier}` : 'Partner With Us'}
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
                  <label className="block text-sm font-medium text-spa-charcoal mb-1">Venue Name</label>
                  <input
                    type="text"
                    placeholder="e.g., The Grand Ballroom"
                    className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                  />
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
                    placeholder="you@venue.com"
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
                  <label className="block text-sm font-medium text-spa-charcoal mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="City, State"
                    className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                  />
                </div>

                {!selectedTier && (
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">Interested Tier</label>
                    <select className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30">
                      <option>Local Listing — $99/month</option>
                      <option>Featured Partner — $249/month</option>
                      <option>Premium Partner — $499/month</option>
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
    </div>
  );
}
