import { Link } from 'react-router-dom';
import { ArrowRight, Users, Store, MapPin, Star, Check } from 'lucide-react';

const experienceCards = [
  {
    title: 'Connect Locally',
    description: 'Find expectant mothers in your area who share your journey. Build friendships that last beyond pregnancy.',
    image: '/images/gathering_large.jpg',
  },
  {
    title: 'Shop Local Vendors',
    description: 'Discover maternity boutiques, local crafters, and pregnancy-focused businesses in your community.',
    image: '/images/vendor_boutique.jpg',
  },
  {
    title: 'Celebrate Together',
    description: 'Host or attend customizable gatherings with vendor tables, spa experiences, and community support.',
    image: '/images/venue_countryclub.jpg',
  },
];

const vendorTypes = [
  { name: 'Maternity Boutiques', icon: Store },
  { name: 'Local Crafters', icon: Store },
  { name: 'Spas & Wellness', icon: Users },
  { name: 'Photographers', icon: Store },
  { name: 'Caterers', icon: Store },
  { name: 'Event Venues', icon: MapPin },
];

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section - Video Ready */}
      <section className="relative w-full min-h-screen flex items-center pt-20 bg-spa-cream overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-spa-cream via-spa-lavender to-spa-blush" />
          <img
            src="/images/gathering_large.jpg"
            alt="Spa-Pregio community gathering"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-spa-cream/90 via-spa-cream/70 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1 bg-spa-purple/10 text-spa-purple text-sm font-medium rounded-full mb-6">
              The Celebration Suite Movement
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-spa-charcoal leading-[1.1]">
              Where motherhood becomes a{' '}
              <span className="text-spa-purple">celebration.</span>
            </h1>

            <p className="mt-6 lg:mt-8 text-lg text-spa-gray leading-relaxed">
              Join thousands of expectant mothers and local vendors. Connect, shop, and celebrate together in your community.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link to="/join" className="btn-primary">
                Become a Member — Free
                <ArrowRight size={18} />
              </Link>
              <Link to="/find-vendors" className="btn-primary">
                Find Vendors Near Me
                <ArrowRight size={18} />
              </Link>
              <Link to="/vendors" className="btn-outline">
                List Your Business
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 mt-10">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-spa-purple" />
                <span className="text-sm text-spa-gray">12,000+ members</span>
              </div>
              <div className="flex items-center gap-2">
                <Store size={18} className="text-spa-purple" />
                <span className="text-sm text-spa-gray">800+ local vendors</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-spa-purple" />
                <span className="text-sm text-spa-gray">500+ cities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Types Section */}
      <section className="w-full py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Local Marketplace</span>
            <h2 className="section-title mt-4">
              Find everything you need <span className="text-spa-purple">locally.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {vendorTypes.map((type, index) => (
              <Link
                key={index}
                to="/find-vendors"
                className="flex flex-col items-center p-6 bg-spa-lavender rounded-2xl hover:bg-spa-purple/10 transition-colors group"
              >
                <type.icon size={28} className="text-spa-purple mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-spa-charcoal text-center">{type.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The Experience Section */}
      <section className="w-full py-20 lg:py-28 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">The Experience</span>
            <h2 className="section-title mt-4">
              Your journey, <span className="text-spa-purple">elevated.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {experienceCards.map((card, index) => (
              <div key={index} className="elegant-card group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 lg:p-8">
                  <h3 className="font-serif text-xl lg:text-2xl text-spa-charcoal mb-3">
                    {card.title}
                  </h3>
                  <p className="text-spa-gray leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customizable Gatherings Section */}
      <section className="w-full py-20 lg:py-28 bg-spa-blush">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Customizable Gatherings</span>
              <h2 className="section-title mt-4">
                Create your perfect <span className="text-spa-purple">event.</span>
              </h2>
              <p className="mt-4 text-spa-gray leading-relaxed">
                From intimate brunches to full vendor showcases, customize every detail of your gathering. Choose your venue, invite vendors, and create an experience that's uniquely yours.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  'Choose from verified venues in your area',
                  'Invite local vendors to showcase their products',
                  'Customize your guest list and event size',
                  'Access exclusive member discounts',
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check size={20} className="text-spa-purple flex-shrink-0" />
                    <span className="text-spa-charcoal">{feature}</span>
                  </div>
                ))}
              </div>

              <Link to="/events" className="btn-primary mt-8 inline-flex">
                Plan Your Event
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant">
                <img
                  src="/images/venue_restaurant.jpg"
                  alt="Customizable gathering"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials — Coming Soon */}
      <section className="w-full py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Testimonials</span>
          <h2 className="section-title mt-4">
            What our community <span className="text-spa-purple">says.</span>
          </h2>
          <div className="mt-12 inline-flex flex-col items-center gap-4 px-10 py-10 bg-spa-lavender rounded-2xl">
            <Star size={32} className="text-spa-purple opacity-40" />
            <p className="font-serif text-xl text-spa-charcoal">Community stories coming soon.</p>
            <p className="text-spa-gray text-sm max-w-sm">
              We're just getting started. Be among the first to share your Spa-Pregio experience.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 lg:py-28 bg-spa-purple">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            Ready to join the <span className="text-spa-pink">movement?</span>
          </h2>
          <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
            Free membership. Instant access to local vendors, customizable events, and a community of expectant mothers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link to="/join" className="bg-white text-spa-purple px-6 py-3 rounded-full font-medium hover:bg-spa-cream transition-colors inline-flex items-center justify-center gap-2">
              Become a Member — Free
              <ArrowRight size={18} />
            </Link>
            <Link to="/vendors" className="px-6 py-3 border-2 border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-colors">
              List Your Business
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {['Free Membership', 'Local Vendors', 'Custom Events', 'Community Support'].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-white/70">
                <Check size={16} className="text-spa-pink" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
