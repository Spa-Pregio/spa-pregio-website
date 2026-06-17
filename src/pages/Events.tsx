import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import {
  MapPin, Calendar, Users, Plus, Search, Filter,
  ChevronDown, ArrowRight, Store, Sparkles,
} from 'lucide-react';

const suiteShowcases = [
  {
    id: 'suite-baby-shower',
    title: 'Baby Shower Suite',
    emoji: '🍼',
    description: 'Celebrate the mama-to-be with a curated baby shower experience. Local vendors, beautiful decor, and community all in one place.',
    image: '/images/suite_baby_shower.png',
    badge: 'Baby Shower',
  },
  {
    id: 'suite-gender-reveal',
    title: 'Gender Reveal Suite',
    emoji: '🎉',
    description: 'Make the big reveal unforgettable. Create a customized gender reveal event with vendors, activities, and the perfect setting.',
    image: '/images/suite_gender_reveal.png',
    badge: 'Gender Reveal',
  },
  {
    id: 'suite-sip-and-see',
    title: 'Sip & See Suite',
    emoji: '☕',
    description: 'Introduce your new arrival in style. A relaxed, elegant gathering for friends and family to meet the newest addition.',
    image: '/images/suite_sip_and_see.png',
    badge: 'Sip & See',
  },
  {
    id: 'suite-push-present',
    title: 'Push Present & Pampering Suite',
    emoji: '💆‍♀️',
    description: 'Honor the mama who just did the hard work. A luxurious pampering experience she truly deserves.',
    image: '/images/suite_push_present.png',
    badge: 'Push Present',
  },
  {
    id: 'suite-announcement',
    title: 'Pregnancy Announcement Suite',
    emoji: '✨',
    description: 'Share your exciting news with the world in a meaningful, memorable way. Start the journey with a celebration.',
    image: '/images/suite_announcement.png',
    badge: 'Announcement',
  },
];

const eventTypes = ['All', 'Vendor Market', 'Brunch', 'Virtual', 'Workshop', 'Tea', 'Wellness', 'Gathering'];

export default function Events() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [userEvents, setUserEvents] = useState<any[]>([]);
  const [attendeeCounts, setAttendeeCounts] = useState<Record<string, number>>({});

  useEffect(() => { loadEvents(); }, []);

  const loadEvents = async () => {
    const { data } = await supabase
      .from('events')
      .select('*')
      .eq('is_private', false)
      .order('created_at', { ascending: false });
    if (data) setUserEvents(data);

    const { data: rsvps } = await supabase.from('event_rsvps').select('event_id');
    if (rsvps) {
      const counts: Record<string, number> = {};
      rsvps.forEach((r: any) => { counts[r.event_id] = (counts[r.event_id] || 0) + 1; });
      setAttendeeCounts(counts);
    }
  };

  const filteredEvents = activeFilter === 'All'
    ? userEvents
    : userEvents.filter(e => e.type === activeFilter);

  return (
    <div className="w-full pt-20">

      {/* Hero */}
      <section className="w-full py-16 lg:py-24 bg-spa-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Events</span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-spa-charcoal leading-tight mt-4">
            Local <span className="text-spa-purple">celebrations.</span>
          </h1>
          <p className="mt-6 text-lg text-spa-gray leading-relaxed">
            Choose a Celebration Suite below and create your own event — or browse community events already happening near you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button onClick={() => navigate('/create-event')} className="btn-primary">
              <Plus size={18} /> Create an Event
            </button>
            <Link to="/join" className="btn-outline">Become a Member</Link>
          </div>
        </div>
      </section>

      {/* Host Your Own CTA Banner */}
      <section className="w-full py-16 lg:py-20 bg-spa-purple">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl text-white">
                Host your own <span className="text-spa-pink">celebration.</span>
              </h2>
              <p className="mt-4 text-white/70 leading-relaxed">
                Free or ticketed, public or private — create your event and we will handle the rest.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/create-event')}
                className="bg-white text-spa-purple px-6 py-3 rounded-full font-medium hover:bg-spa-cream transition-colors flex items-center justify-center gap-2"
              >
                <Users size={18} /> Create an Event
              </button>
              <Link
                to="/vendors"
                className="px-6 py-3 border-2 border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <Store size={18} /> List Your Business
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Suite Showcase Cards */}
      <section className="w-full py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Celebration Suites</span>
            <h2 className="section-title mt-4">
              Choose your <span className="text-spa-purple">suite.</span>
            </h2>
            <p className="mt-4 text-spa-gray max-w-xl mx-auto">
              Each suite is designed for a specific milestone in your pregnancy journey. Pick one and create your event — you can add your own photo or use a stock image.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {suiteShowcases.map((suite) => (
              <div key={suite.id} className="elegant-card group">
                <div className="relative aspect-[4/3] overflow-hidden bg-spa-lavender">
                  <img
                    src={suite.image}
                    alt={suite.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-spa-charcoal">
                      {suite.badge}
                    </span>
                  </div>
                </div>
                <div className="p-6 lg:p-8">
                  <h3 className="font-serif text-xl lg:text-2xl text-spa-charcoal mb-2">{suite.title}</h3>
                  <p className="text-spa-gray text-sm leading-relaxed mb-6">{suite.description}</p>
                  <button onClick={() => navigate('/create-event')} className="btn-primary w-full justify-center">
                    <Sparkles size={16} /> Create This Event
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Events Grid */}
      <section className="w-full py-16 lg:py-20 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Community Events</span>
            <h2 className="section-title mt-4">
              Events near <span className="text-spa-purple">you.</span>
            </h2>
          </div>
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
                    activeFilter === type ? 'bg-spa-purple text-white' : 'bg-white text-spa-charcoal hover:bg-spa-purple/10'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl">
              <span className="text-5xl mb-4 block">🎉</span>
              <h3 className="font-serif text-2xl text-spa-charcoal mb-2">No events yet — be the first!</h3>
              <p className="text-spa-gray mb-6 max-w-sm mx-auto">
                Choose a Celebration Suite above and create the first event in your area.
              </p>
              <button onClick={() => navigate('/create-event')} className="btn-primary">
                <Plus size={18} /> Create an Event
              </button>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => {
                  const rsvpCount = attendeeCounts[String(event.id)] || 0;
                  const tickets = event.tickets || [];
                  const minPrice = tickets.length > 0 ? Math.min(...tickets.map((t: any) => Number(t.price))) : 0;
                  return (
                    <Link
                      key={event.id}
                      to={`/events/${event.id}`}
                      className="elegant-card group cursor-pointer block"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-spa-lavender">
                        <img
                          src={event.image || '/images/gathering_large.jpg'}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-spa-charcoal">{event.type}</span>
                        </div>
                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${event.is_free ? 'bg-green-500 text-white' : 'bg-spa-pink text-white'}`}>
                          {event.is_free ? 'Free' : `From $${minPrice}`}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-serif text-xl text-spa-charcoal group-hover:text-spa-purple transition-colors">{event.title}</h3>
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center gap-2 text-sm text-spa-gray"><Calendar size={16} className="text-spa-purple" /> {event.date} · {event.time}</div>
                          <div className="flex items-center gap-2 text-sm text-spa-gray"><MapPin size={16} className="text-spa-purple" /> {event.location}</div>
                          <div className="flex items-center gap-2 text-sm text-spa-gray"><Users size={16} className="text-spa-purple" /> {rsvpCount} / {event.max_attendees || 50} attending</div>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-spa-charcoal/5">
                          <span className="text-sm text-spa-gray">Community Event</span>
                          <span className="text-spa-purple font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                            {event.is_free ? 'Join Free' : 'Get Tickets'} <ArrowRight size={16} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="text-center mt-12">
                <button className="btn-outline">Load More Events <ChevronDown size={18} /></button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
