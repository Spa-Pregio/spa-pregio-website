import { useState } from 'react';
import { Link } from 'react-router-dom';
import EventDirectory from '../sections/EventDirectory';
import { 
  MapPin, Calendar, Users, Plus, Search, Filter, 
  ChevronDown, Star, ArrowRight, Store 
} from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Baby Bloom Market',
    date: 'Aug 12, 2026',
    time: '10:00 AM - 4:00 PM',
    location: 'Brooklyn, NY',
    attendees: 45,
    maxAttendees: 100,
    type: 'Vendor Market',
    host: 'Spa-Pregio',
    image: '/images/gathering_large.jpg',
    vendors: 12,
    featured: true,
  },
  {
    id: 2,
    title: 'Mama Brunch & Shop',
    date: 'Aug 14, 2026',
    time: '11:00 AM - 2:00 PM',
    location: 'Austin, TX',
    attendees: 28,
    maxAttendees: 40,
    type: 'Brunch',
    host: 'The Garden Room',
    partner: true,
    image: '/images/venue_restaurant.jpg',
    vendors: 5,
  },
  {
    id: 3,
    title: 'Virtual Spa Night',
    date: 'Aug 18, 2026',
    time: '7:00 PM - 8:30 PM',
    location: 'Virtual',
    attendees: 56,
    maxAttendees: 100,
    type: 'Virtual',
    host: 'Spa-Pregio',
    image: '/images/spa_bright.jpg',
    vendors: 3,
  },
  {
    id: 4,
    title: 'Celebration Suite Workshop',
    date: 'Aug 20, 2026',
    time: '2:00 PM - 5:00 PM',
    location: 'Seattle, WA',
    attendees: 15,
    maxAttendees: 20,
    type: 'Workshop',
    host: 'Paper & Petal Design',
    partner: true,
    image: '/images/plan_bright.jpg',
    vendors: 2,
  },
  {
    id: 5,
    title: 'Expectant Mothers Tea',
    date: 'Aug 22, 2026',
    time: '2:00 PM - 4:00 PM',
    location: 'Chicago, IL',
    attendees: 22,
    maxAttendees: 30,
    type: 'Tea',
    host: 'The Grand Ballroom',
    partner: true,
    image: '/images/venue_countryclub.jpg',
    vendors: 4,
  },
  {
    id: 6,
    title: 'Prenatal Yoga & Wellness Fair',
    date: 'Aug 25, 2026',
    time: '10:00 AM - 2:00 PM',
    location: 'Los Angeles, CA',
    attendees: 35,
    maxAttendees: 50,
    type: 'Wellness',
    host: 'Serenity Spa',
    partner: true,
    image: '/images/venue_spa_lounge.jpg',
    vendors: 8,
  },
];

const eventTypes = ['All', 'Vendor Market', 'Brunch', 'Virtual', 'Workshop', 'Tea', 'Wellness'];

const customizableOptions = [
  { title: 'Choose Your Venue', desc: 'From country clubs to private estates', icon: MapPin },
  { title: 'Invite Vendors', desc: 'Select from our verified vendor network', icon: Store },
  { title: 'Set Your Size', desc: 'Intimate gatherings to large markets', icon: Users },
  { title: 'Customize Details', desc: 'Theme, catering, decor, and more', icon: Star },
];

export default function Events() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState<'member' | 'vendor' | null>(null);

  const filteredEvents = activeFilter === 'All'
    ? events
    : events.filter(e => e.type === activeFilter);

  return (
    <div className="w-full pt-20">
      {/* Hero Section */}
      <section className="w-full py-16 lg:py-24 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Events</span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-spa-charcoal leading-tight mt-4">
              Local <span className="text-spa-purple">celebrations.</span>
            </h1>
            <p className="mt-6 text-lg text-spa-gray leading-relaxed">
              Discover vendor markets, brunches, workshops, and more. Or create your own customizable gathering.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button 
                onClick={() => { setCreateType('member'); setShowCreateModal(true); }}
                className="btn-primary"
              >
                <Plus size={18} />
                Create an Event
              </button>
              <Link to="/join" className="btn-outline">
                Become a Member
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Customizable Gatherings Section */}
      <section className="w-full py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Customizable Gatherings</span>
              <h2 className="section-title mt-4">
                Create your perfect <span className="text-spa-purple">event.</span>
              </h2>
              <p className="mt-4 text-spa-gray leading-relaxed">
                From intimate brunches to full vendor showcases, customize every detail. Choose your venue, invite vendors, and create an experience that's uniquely yours.
              </p>
              
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {customizableOptions.map((option, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-spa-purple/10 flex items-center justify-center flex-shrink-0">
                      <option.icon size={18} className="text-spa-purple" />
                    </div>
                    <div>
                      <p className="font-medium text-spa-charcoal">{option.title}</p>
                      <p className="text-sm text-spa-gray">{option.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => { setCreateType('member'); setShowCreateModal(true); }}
                className="btn-primary mt-8"
              >
                Start Planning
                <ArrowRight size={18} />
              </button>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant">
                <img
                  src="/images/gathering_large.jpg"
                  alt="Customizable gathering"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* State & City Event Directory */}
      <EventDirectory />

      {/* Events Discovery */}
      <section className="w-full py-16 lg:py-20 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Search & Filter */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-10">
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-spa-gray" />
              <input
                type="text"
                placeholder="Search events by location..."
                className="w-full pl-11 pr-4 py-3 bg-white rounded-full text-spa-charcoal placeholder:text-spa-gray shadow-elegant focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Filter size={18} className="text-spa-gray flex-shrink-0" />
              {eventTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeFilter === type
                      ? 'bg-spa-purple text-white'
                      : 'bg-white text-spa-charcoal hover:bg-spa-purple/10'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div key={event.id} className="elegant-card group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-spa-charcoal">
                      {event.type}
                    </span>
                    {event.partner && (
                      <span className="px-3 py-1 bg-spa-purple rounded-full text-xs font-medium text-white flex items-center gap-1">
                        <Star size={12} className="fill-white" />
                        Partner
                      </span>
                    )}
                  </div>
                  {event.vendors > 0 && (
                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-spa-charcoal flex items-center gap-1">
                      <Store size={12} />
                      {event.vendors} vendors
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-spa-charcoal group-hover:text-spa-purple transition-colors">
                    {event.title}
                  </h3>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-spa-gray">
                      <Calendar size={16} className="text-spa-purple" />
                      {event.date} · {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-spa-gray">
                      <MapPin size={16} className="text-spa-purple" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-spa-gray">
                      <Users size={16} className="text-spa-purple" />
                      {event.attendees} / {event.maxAttendees} attending
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-spa-charcoal/5">
                    <span className="text-sm text-spa-gray">
                      Hosted by {event.host}
                    </span>
                    <button className="text-spa-purple font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      Join
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="btn-outline">
              Load More Events
              <ChevronDown size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Create Event CTA */}
      <section className="w-full py-16 lg:py-20 bg-spa-purple">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl text-white">
                Host your own <span className="text-spa-pink">celebration.</span>
              </h2>
              <p className="mt-4 text-white/70 leading-relaxed">
                Whether you're a member looking to connect or a vendor wanting to showcase your products, creating an event is simple and free.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => { setCreateType('member'); setShowCreateModal(true); }}
                className="bg-white text-spa-purple px-6 py-3 rounded-full font-medium hover:bg-spa-cream transition-colors flex items-center justify-center gap-2"
              >
                <Users size={18} />
                Create Member Event
              </button>
              <button 
                onClick={() => { setCreateType('vendor'); setShowCreateModal(true); }}
                className="px-6 py-3 border-2 border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <Store size={18} />
                Create Vendor Event
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spa-charcoal/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-2xl text-spa-charcoal">
                  Create {createType === 'vendor' ? 'Vendor' : 'Member'} Event
                </h3>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="w-8 h-8 rounded-full bg-spa-lavender flex items-center justify-center text-spa-gray hover:text-spa-charcoal transition-colors"
                >
                  ×
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-1">Event Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Sunset Park Meetup"
                    className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">Time</label>
                    <input
                      type="time"
                      className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g., Brooklyn, NY"
                    className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-1">Event Type</label>
                  <select className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30">
                    <option>Vendor Market</option>
                    <option>Brunch</option>
                    <option>Virtual</option>
                    <option>Workshop</option>
                    <option>Tea</option>
                    <option>Wellness</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-1">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your event..."
                    className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-1">Max Attendees</label>
                  <input
                    type="number"
                    placeholder="20"
                    className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                  />
                </div>

                {createType === 'vendor' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-spa-charcoal mb-1">Number of Vendor Tables</label>
                      <input
                        type="number"
                        placeholder="5"
                        className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-spa-charcoal mb-1">Special Offer for Attendees</label>
                      <input
                        type="text"
                        placeholder="e.g., 15% off all products"
                        className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                      />
                    </div>
                  </>
                )}

                <button type="submit" className="btn-primary w-full justify-center mt-6">
                  <Plus size={18} />
                  Create Event
                </button>

                <p className="text-xs text-spa-gray text-center">
                  {createType === 'vendor' 
                    ? 'Vendor events require partner status. Contact us to learn more.'
                    : 'Member events are free to create and subject to community guidelines.'}
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
