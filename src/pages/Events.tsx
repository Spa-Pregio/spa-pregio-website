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
    suiteParam: 'baby_shower',
    title: 'Baby Shower Suite',
    description: 'Plan a warm, intentional baby shower with local vendors, themed styling ideas, and guest-ready details in one place.',
    image: '/images/suite_baby_shower.png',
    badge: 'Baby Shower',
  },
  {
    id: 'suite-gender-reveal',
    suiteParam: 'gender_reveal',
    title: 'Gender Reveal Suite',
    description: 'Put together a joyful reveal gathering with creative reveal prompts, local pros, and a smooth hosting timeline.',
    image: '/images/suite_gender_reveal.png',
    badge: 'Gender Reveal',
  },
  {
    id: 'suite-sip-and-see',
    suiteParam: 'sip_and_see',
    title: 'Sip & See Suite',
    description: 'Host a relaxed, welcoming open house for friends and family to meet baby without overwhelming new parents.',
    image: '/images/suite_sip_and_see.png',
    badge: 'Sip & See',
  },
  {
    id: 'suite-push-present',
    suiteParam: 'push_present_pampering',
    title: 'Push Present & Pampering Suite',
    description: 'Plan a restorative prenatal or postpartum pampering day centered on rest, care, and celebrating mom.',
    image: '/images/suite_push_present.png',
    badge: 'Push Present',
  },
  {
    id: 'suite-announcement',
    suiteParam: 'pregnancy_announcement',
    title: 'Pregnancy Announcement Suite',
    description: 'Turn your big news into a keepsake gathering or reveal moment with guided prompts and celebration ideas.',
    image: '/images/suite_announcement.png',
    badge: 'Announcement',
  },
];

const eventTypes = ['All', 'Vendor Market', 'Brunch', 'Virtual', 'Workshop', 'Tea', 'Wellness', 'Gathering'];

export default function Events() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [locationQuery, setLocationQuery] = useState('');
  const [userEvents, setUserEvents] = useState<any[]>([]);
  const [attendeeCounts, setAttendeeCounts] = useState<Record<string, number>>({});
  const [showAllEvents, setShowAllEvents] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    const { data } = await supabase
      .from('events')
      .select('*')
      .eq('is_private', false)
      .gte('date', todayStr)
      .order('date', { ascending: true });
    if (data) setUserEvents(data);

    const { data: rsvps } = await supabase.from('event_rsvps').select('event_id');
    if (rsvps) {
      const counts: Record<string, number> = {};
      rsvps.forEach((r: any) => {
        counts[r.event_id] = (counts[r.event_id] || 0) + 1;
      });
      setAttendeeCounts(counts);
    }
  };

  const filteredEvents = userEvents.filter((e) => {
    const matchesType = activeFilter === 'All' || e.type === activeFilter;
    const q = locationQuery.trim().toLowerCase();
    const matchesLocation =
      !q ||
      String(e.location || '').toLowerCase().includes(q) ||
      String(e.title || '').toLowerCase().includes(q);
    return matchesType && matchesLocation;
  });

  const visibleEvents = showAllEvents ? filteredEvents : filteredEvents.slice(0, 6);
  const hasMoreEvents = !showAllEvents && filteredEvents.length > 6;

  return (
    <div className="w-full pt-16 lg:pt-20">

      {/* Hero */}
      <section className="w-full py-16 lg:py-22 bg-spa-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-sm uppercase tracking-[0.15em] text-spa-purple font-semibold">Events</span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-spa-charcoal leading-tight mt-4">
            Local <span className="text-spa-purple">celebrations.</span>
          </h1>
          <p className="mt-5 text-lg text-spa-gray leading-relaxed">
            Browse mom-to-be brunches, wellness mornings, and local gatherings near you — or launch your own event in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button onClick={() => navigate('/create-event')} className="btn-primary group">
              <Plus size={18} /> Launch an Event
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <a href="#community-events" className="btn-outline">
              See What's Happening Near You
            </a>
          </div>
          <p className="text-xs italic text-spa-gray mt-3 font-serif">
            Host free community meetups or ticketed events (10% platform fee on paid tickets).
          </p>
        </div>
      </section>

      {/* Host Your Own CTA Banner */}
      <section className="w-full py-14 lg:py-18 bg-spa-purple">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-spa-blush font-semibold">
                For Hosts &amp; Local Businesses
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl text-white mt-2">
                Host your own <span className="text-spa-pink">celebration.</span>
              </h2>
              <p className="mt-3 text-white/80 leading-relaxed">
                Create free or ticketed events, manage RSVPs or ticket sales in one place, and bring expecting mamas into your space.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <button
                onClick={() => navigate('/create-event')}
                className="group bg-white text-spa-purple px-6 py-3.5 rounded-full font-semibold hover:bg-spa-cream transition-colors flex items-center justify-center gap-2"
              >
                <Users size={18} /> Create an Event
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <Link
                to="/vendors"
                className="px-6 py-3.5 border-2 border-white/35 text-white rounded-full font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <Store size={18} /> Claim Your Local Spot
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Suite Showcase Cards */}
      <section className="w-full py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple font-semibold">Start With a Theme</span>
            <h2 className="section-title mt-3">
              Pick a <span className="text-spa-purple">celebration suite.</span>
            </h2>
            <p className="mt-4 text-spa-gray max-w-xl mx-auto">
              Curious which format fits your gathering? Select a celebration style to start your event page with a matching theme.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {suiteShowcases.map((suite) => (
              <div key={suite.id} className="elegant-card group flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-spa-lavender">
                  <img
                    src={suite.image}
                    alt={suite.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-xs font-medium text-spa-charcoal shadow-sm">
                      {suite.badge}
                    </span>
                  </div>
                </div>
                <div className="p-6 lg:p-7 flex flex-col flex-1">
                  <h3 className="font-serif text-xl lg:text-2xl text-spa-charcoal mb-2">{suite.title}</h3>
                  <p className="text-spa-gray text-sm leading-relaxed mb-6 flex-1">{suite.description}</p>
                  <button
                    onClick={() => navigate(`/create-event?suite=${encodeURIComponent(suite.suiteParam)}`)}
                    className="btn-primary w-full justify-center group/btn"
                  >
                    <Sparkles size={16} /> Start With This Suite
                    <ArrowRight size={15} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Events Grid */}
      <section id="community-events" className="w-full py-16 lg:py-20 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple font-semibold">Community Events</span>
            <h2 className="section-title mt-3">
              Events near <span className="text-spa-purple">you.</span>
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-10">
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-spa-gray" />
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="Search by city, state, or event name..."
                className="w-full pl-11 pr-4 py-3 bg-white rounded-full text-spa-charcoal placeholder:text-spa-gray shadow-elegant focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Filter size={18} className="text-spa-gray flex-shrink-0" />
              {eventTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setActiveFilter(type);
                    setShowAllEvents(false);
                  }}
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
            <div className="text-center py-16 px-6 bg-white rounded-2xl shadow-elegant">
              <span className="text-4xl mb-3 block">🎉</span>
              <h3 className="font-serif text-2xl text-spa-charcoal mb-2">
                {locationQuery || activeFilter !== 'All'
                  ? 'No matching events right now'
                  : 'No local events posted yet — be the first!'}
              </h3>
              <p className="text-spa-gray mb-6 max-w-md mx-auto">
                {locationQuery || activeFilter !== 'All'
                  ? 'Try clearing your filter or search, or host the first gathering in your area.'
                  : 'Pick a celebration suite above and publish the first mom-to-be event or vendor meetup in your city.'}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {(locationQuery || activeFilter !== 'All') && (
                  <button
                    onClick={() => {
                      setLocationQuery('');
                      setActiveFilter('All');
                    }}
                    className="btn-outline"
                  >
                    Reset Filters
                  </button>
                )}
                <button onClick={() => navigate('/create-event')} className="btn-primary">
                  <Plus size={18} /> Create an Event
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleEvents.map((event) => {
                  const rsvpCount = attendeeCounts[String(event.id)] || 0;
                  const tickets = Array.isArray(event.tickets) ? event.tickets : [];
                  const numericPrices = tickets
                    .map((t: any) => Number(t.price))
                    .filter((n: number) => !Number.isNaN(n) && n > 0);
                  const minPrice = numericPrices.length > 0 ? Math.min(...numericPrices) : null;
                  const isFreeEvent = Boolean(event.is_free) || minPrice === null;

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
                          <span className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-xs font-medium text-spa-charcoal shadow-sm">
                            {event.type}
                          </span>
                        </div>
                        <div
                          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                            isFreeEvent ? 'bg-emerald-600 text-white' : 'bg-spa-pink text-white'
                          }`}
                        >
                          {isFreeEvent ? 'Free RSVP' : `From $${minPrice}`}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-serif text-xl text-spa-charcoal group-hover:text-spa-purple transition-colors">
                          {event.title}
                        </h3>
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center gap-2 text-sm text-spa-gray">
                            <Calendar size={16} className="text-spa-purple" /> {event.date} · {event.time}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-spa-gray">
                            <MapPin size={16} className="text-spa-purple" /> {event.location}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-spa-gray">
                            <Users size={16} className="text-spa-purple" /> {rsvpCount} / {event.max_attendees || 50} attending
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-spa-charcoal/5">
                          <span className="text-xs text-spa-gray">
                            {isFreeEvent ? 'Community Event' : 'Ticketed Event · 10% platform fee'}
                          </span>
                          <span className="text-spa-purple font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                            {isFreeEvent ? 'RSVP Free' : 'Get Tickets'} <ArrowRight size={16} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              {hasMoreEvents && (
                <div className="text-center mt-12">
                  <button onClick={() => setShowAllEvents(true)} className="btn-outline inline-flex items-center gap-2">
                    Show All {filteredEvents.length} Events <ChevronDown size={18} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
