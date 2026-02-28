import { Link } from 'react-router-dom';
import { ArrowRight, Users, Store, MapPin, Star, Check, Search } from 'lucide-react';

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

const featuredCities = [
  { name: 'New York, NY', venues: 45, events: 12 },
  { name: 'Los Angeles, CA', venues: 38, events: 8 },
  { name: 'Chicago, IL', venues: 32, events: 6 },
  { name: 'Austin, TX', venues: 28, events: 10 },
  { name: 'Miami, FL', venues: 24, events: 5 },
  { name: 'Seattle, WA', venues: 22, events: 7 },
];

const testimonials = [
  { quote: 'I found my closest mom friends through Spa-Pregio. Our monthly gatherings with local vendors are the highlight of my month!', author: 'Alexandra M.', location: 'Chicago, IL' },
  { quote: 'As a maternity boutique owner, Spa-Pregio has connected me with hundreds of expectant mothers in my area.', author: 'Sarah K.', location: 'Boston, MA' },
  { quote: 'The vendor marketplace made planning my shower so easy. I found everything I needed locally.', author: 'Maya T.', location: 'Austin, TX' },
];

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section - Video Ready */}
      <section className="relative w-full min-h-screen flex items-center pt-20 bg-spa-cream overflow-hidden">
        {/* Video Background (replace with your video) */}
        <div className="absolute inset-0 z-0">
          {/* 
            TO ADD YOUR VIDEO:
            1. Upload your video file to your server or video hosting platform
            2. Replace the div below with:
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/your-video.mp4" type="video/mp4" />
            </video>
            3. Add a poster image for loading:
            poster="/images/hero-poster.jpg"
          */}
          <div className="absolute inset-0 bg-gradient-to-br from-spa-cream via-spa-lavender to-spa-blush" />
          
          {/* Fallback image until video is added */}
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
            
            {/* Search Bar */}
            <div className="mt-8 relative max-w-md">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-spa-gray" />
              <input
                type="text"
                placeholder="Search by city or state..."
                className="w-full pl-12 pr-4 py-4 bg-white rounded-full text-spa-charcoal placeholder:text-spa-gray shadow-elegant focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary py-2 px-4 text-sm">
                Search
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link to="/join" className="btn-primary">
                Become a Member — Free
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
                to="/vendors"
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

      {/* City Directory Section */}
      <section className="w-full py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
            <div>
              <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">City Directory</span>
              <h2 className="section-title mt-4">
                Find your <span className="text-spa-purple">city.</span>
              </h2>
              <p className="mt-4 text-spa-gray max-w-lg">
                Browse vendors, venues, and events by location. From coast to coast, we're building communities everywhere.
              </p>
            </div>
            <Link to="/vendors" className="text-spa-purple font-medium flex items-center gap-2 mt-4 lg:mt-0 hover:gap-3 transition-all">
              View All Cities
              <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCities.map((city, index) => (
              <Link
                key={index}
                to={`/events?city=${city.name}`}
                className="flex items-center justify-between p-6 bg-spa-lavender rounded-2xl hover:bg-spa-purple/10 transition-colors group"
              >
                <div>
                  <h3 className="font-serif text-lg text-spa-charcoal group-hover:text-spa-purple transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-sm text-spa-gray mt-1">
                    {city.venues} vendors · {city.events} upcoming events
                  </p>
                </div>
                <ArrowRight size={20} className="text-spa-purple opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
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

      {/* Testimonials Section */}
      <section className="w-full py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Testimonials</span>
            <h2 className="section-title mt-4">
              What our community <span className="text-spa-purple">says.</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-spa-lavender rounded-2xl p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-spa-purple text-spa-purple" />
                  ))}
                </div>
                <p className="text-spa-charcoal leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-medium text-spa-charcoal">{testimonial.author}</p>
                  <p className="text-sm text-spa-gray">{testimonial.location}</p>
                </div>
              </div>
            ))}
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
          
          {/* Benefits List */}
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
