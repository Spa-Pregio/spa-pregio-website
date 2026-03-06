import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import {
  MapPin, Calendar, Users, Plus, Search, Filter,
  ChevronDown, Star, ArrowRight, Store, X, Check
} from 'lucide-react';

const staticEvents = [
  {
    id: 's1',
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
    description: 'A beautiful outdoor market celebrating expectant mothers and local vendors.',
  },
  {
    id: 's2',
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
    description: 'Enjoy a relaxing brunch surrounded by local vendors and fellow mamas.',
  },
  {
    id: 's3',
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
    description: 'A relaxing virtual evening of self-care, community, and celebration.',
  },
  {
    id: 's4',
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
    description: 'Learn how to plan the perfect celebration suite for your pregnancy milestones.',
  },
  {
    id: 's5',
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
    description: 'An elegant afternoon tea celebrating the journey of motherhood.',
  },
  {
    id: 's6',
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
    description: 'A full day of prenatal wellness, yoga, and curated vendor experiences.',
  },
];

const eventTypes = ['All', 'Vendor Market', 'Brunch', 'Virtual', 'Workshop', 'Tea', 'Wellness'];

const customizableOptions = [
  { title: 'Choose Your Venue', desc: 'From country clubs to private estates', icon: MapPin },
  { title: 'Invite Vendors', desc: 'Select from our verified vendor network', icon: Store },
  { title: 'Set Your Size', desc: 'Intimate gatherings to large markets', icon: Users },
  { title: 'Customize Details', desc: 'Theme, catering, decor, and more', icon: Star },
];

const emptyForm = {
  title: '', date: '', time: '', location: '',
  type: 'Vendor Market', description: '', max_attendees: '',
  vendor_tables: '', special_offer: '',
};

export default function Events() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState<'member' | 'vendor' | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [userEvents, setUserEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpStatus, setRsvpStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [attendeeCounts, setAttendeeCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    loadEvents();
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUser(user);
    if (user) {
      setRsvpEmail(user.email || '');
      setRsvpName(user.user_metadata?.first_name || '');
    }
  };

  const loadEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setUserEvents(data);

    const { data: rsvps } = await supabase.from('event_rsvps').select('event_id');
    if (rsvps) {
      const counts: Record<string, number> = {};
      rsvps.forEach((r: any) => {
        counts[r.event_id] = (counts[r.event_id] || 0) + 1;
      });
      setAttendeeCounts(counts);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    const { error } = await supabase.from('events').insert([{
      title: formData.title,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      type: formData.type,
      description: formData.description,
      max_attendees: formData.max_attendees ? parseInt(formData.max_attendees) : null,
      vendor_tables: formData.vendor_tables ? parseInt(formData.vendor_tables) : null,
      special_offer: formData.special_offer,
      event_kind: createType,
    }]);
    if (error) {
      setSubmitStatus('error');
    } else {
      setSubmitStatus('success');
      setFormData(emptyForm);
      loadEvents();
      setTimeout(() => { setShowCreateModal(false); setSubmitStatus('idle'); }, 2000);
    }
  };

  const handleRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;
    setRsvpStatus('loading');

    const { error } = await supabase.from('event_rsvps').insert([{
      event_id: String(selectedEvent.id),
      user_email: rsvpEmail,
      user_name: rsvpName,
    }]);

    if (error) {
      setRsvpStatus('error');
    } else {
      setRsvpStatus('success');
      loadEvents();
    }
  };

  const allEvents = [
    ...staticEvents,
    ...userEvents.map((e) => ({
      id: e.id,
      title: e.title,
      date: e.date,
      time: e.time,
      location: e.location,
      attendees: 0,
      maxAttendees: e.max_attendees || 50,
      type: e.type,
      host: 'Community Member',
      image: '/images/gathering_large.jpg',
      vendors: e.vendor_tables || 0,
      description: e.description || '',
    })),
  ];

  const filteredEvents = activeFilter === 'All'
    ? allEvents
    : allEvents.filter(e => e.type === activeFilter);

  return (
    <div className="w-full pt-20">

      {/* Hero */}
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
              <button onClick={() => { setCreateType('member'); setShowCreateModal(true); }} className="btn-primary">
                <Plus size={18} /> Create an Event
              </button>
              <Link to="/join" className="btn-outline">Become a Member</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Customizable Gatherings */}
      <section className="w-full py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Customizable Gatherings</span>
              <h2 className="section-title mt-4">Create your perfect <span className="text-spa-purple">event.</span></h2>
              <p className="mt-4 text-spa-gray leading-relaxed">
                From intimate brunches to full vendor showcases, customize every detail.
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
              <button onClick={() => { setCreateType('member'); setShowCreateModal(true); }} className="btn-primary mt-8">
                Start Planning <ArrowRight size={18} />
              </button>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant">
                <img src="/images/gathering_large.jpg" alt="Customizable gathering" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Discovery */}
      <section className="w-full py-16 lg:py-20 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-10">
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-spa-gray" />
              <input type="text" placeholder="Search events by location..." className="w-full pl-11 pr-4 py-3 bg-white rounded-full text-spa-charcoal placeholder:text-spa-gray shadow-elegant focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Filter size={18} className="text-spa-gray flex-shrink-0" />
              {eventTypes.map((type) => (
                <button key={type} onClick={() => setActiveFilter(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === type ? 'bg-spa-purple text-white' : 'bg-white text-spa-charcoal hover:bg-spa-purple/10'}`}>
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => {
              const rsvpCount = attendeeCounts[String(event.id)] || 0;
              const totalAttendees = (event.attendees || 0) + rsvpCount;
              return (
                <div key={event.id} className="elegant-card group cursor-pointer" onClick={() => { setSelectedEvent(event); setRsvpStatus('idle'); }}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-spa-charcoal">{event.type}</span>
                      {(event as any).partner && (
                        <span className="px-3 py-1 bg-spa-purple rounded-full text-xs font-medium text-white flex items-center gap-1">
                          <Star size={12} className="fill-white" /> Partner
                        </span>
                      )}
                    </div>
                    {event.vendors > 0 && (
                      <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-spa-charcoal flex items-center gap-1">
                        <Store size={12} /> {event.vendors} vendors
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl text-spa-charcoal group-hover:text-spa-purple transition-colors">{event.title}</h3>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-spa-gray">
                        <Calendar size={16} className="text-spa-purple" /> {event.date} · {event.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-spa-gray">
                        <MapPin size={16} className="text-spa-purple" /> {event.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-spa-gray">
                        <Users size={16} className="text-spa-purple" /> {totalAttendees} / {event.maxAttendees} attending
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-spa-charcoal/5">
                      <span className="text-sm text-spa-gray">Hosted by {event.host}</span>
                      <button className="text-spa-purple font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                        Join <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <button className="btn-outline">Load More Events <ChevronDown size={18} /></button>
          </div>
        </div>
      </section>

      {/* Create Event CTA */}
      <section className="w-full py-16 lg:py-20 bg-spa-purple">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl text-white">Host your own <span className="text-spa-pink">celebration.</span></h2>
              <p className="mt-4 text-white/70 leading-relaxed">Whether you're a member or a vendor, creating an event is simple and free.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => { setCreateType('member'); setShowCreateModal(true); }} className="bg-white text-spa-purple px-6 py-3 rounded-full font-medium hover:bg-spa-cream transition-colors flex items-center justify-center gap-2">
                <Users size={18} /> Create Member Event
              </button>
              <button onClick={() => { setCreateType('vendor'); setShowCreateModal(true); }} className="px-6 py-3 border-2 border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                <Store size={18} /> Create Vendor Event
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Event Detail + RSVP Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spa-charcoal/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full aspect-[16/7] object-cover rounded-t-2xl" />
              <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md">
                <X size={18} className="text-spa-charcoal" />
              </button>
            </div>
            <div className="p-6 lg:p-8">
              <span className="text-xs uppercase tracking-widest text-spa-purple">{selectedEvent.type}</span>
              <h3 className="font-serif text-2xl text-spa-charcoal mt-1">{selectedEvent.title}</h3>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-spa-gray">
                  <Calendar size={16} className="text-spa-purple" /> {selectedEvent.date} · {selectedEvent.time}
                </div>
                <div className="flex items-center gap-2 text-sm text-spa-gray">
                  <MapPin size={16} className="text-spa-purple" /> {selectedEvent.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-spa-gray">
                  <Users size={16} className="text-spa-purple" /> {(selectedEvent.attendees || 0) + (attendeeCounts[String(selectedEvent.id)] || 0)} / {selectedEvent.maxAttendees} attending
                </div>
              </div>
              {selectedEvent.description && (
                <p className="mt-4 text-spa-gray leading-relaxed">{selectedEvent.description}</p>
              )}

              <div className="mt-6 pt-6 border-t border-spa-charcoal/5">
                {!currentUser ? (
                  <div className="text-center">
                    <p className="text-spa-gray mb-4">You need a free account to RSVP for events.</p>
                    <Link to="/join" onClick={() => setSelectedEvent(null)} className="btn-primary justify-center w-full">
                      Create Free Account <ArrowRight size={18} />
                    </Link>
                  </div>
                ) : rsvpStatus === 'success' ? (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 rounded-full bg-spa-purple/10 flex items-center justify-center mx-auto mb-3">
                      <Check size={24} className="text-spa-purple" />
                    </div>
                    <h4 className="font-serif text-xl text-spa-charcoal">You're in! 🎉</h4>
                    <p className="text-spa-gray text-sm mt-1">We'll see you at {selectedEvent.title}.</p>
                  </div>
                ) : (
                  <form onSubmit={handleRsvp} className="space-y-4">
                    <h4 className="font-serif text-lg text-spa-charcoal">RSVP for this event</h4>
                    <div>
                      <label className="block text-sm font-medium text-spa-charcoal mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={rsvpName}
                        onChange={(e) => setRsvpName(e.target.value)}
                        className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-spa-charcoal mb-1">Your Email</label>
                      <input
                        type="email"
                        required
                        value={rsvpEmail}
                        onChange={(e) => setRsvpEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                      />
                    </div>
                    {rsvpStatus === 'error' && <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>}
                    <button type="submit" disabled={rsvpStatus === 'loading'} className="btn-primary w-full justify-center disabled:opacity-50">
                      {rsvpStatus === 'loading' ? 'Saving...' : 'Confirm RSVP'}
                      {rsvpStatus !== 'loading' && <ArrowRight size={18} />}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spa-charcoal/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-2xl text-spa-charcoal">Create {createType === 'vendor' ? 'Vendor' : 'Member'} Event</h3>
                <button onClick={() => { setShowCreateModal(false); setSubmitStatus('idle'); }} className="w-8 h-8 rounded-full bg-spa-lavender flex items-center justify-center text-spa-gray hover:text-spa-charcoal transition-colors">
                  <X size={18} />
                </button>
              </div>

              {submitStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-spa-purple/10 flex items-center justify-center mx-auto mb-4">
                    <Check size={28} className="text-spa-purple" />
                  </div>
                  <h4 className="font-serif text-xl text-spa-charcoal mb-2">Event Created! 🎉</h4>
                  <p className="text-spa-gray">Your event is now live on the events page.</p>
                </div>
              ) : (
                <form onSubmit={handleCreateSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">Event Name</label>
                    <input type="text" name="title" required value={formData.title} onChange={handleChange} placeholder="e.g., Sunset Park Meetup" className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-spa-charcoal mb-1">Date</label>
                      <input type="date" name="date" required value={formData.date} onChange={handleChange} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-spa-charcoal mb-1">Time</label>
                      <input type="time" name="time" required value={formData.time} onChange={handleChange} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">Location</label>
                    <input type="text" name="location" required value={formData.location} onChange={handleChange} placeholder="e.g., Brooklyn, NY" className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">Event Type</label>
                    <select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30">
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
                    <textarea rows={3} name="description" value={formData.description} onChange={handleChange} placeholder="Tell us about your event..." className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30 resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">Max Attendees</label>
                    <input type="number" name="max_attendees" value={formData.max_attendees} onChange={handleChange} placeholder="20" className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                  </div>
                  {createType === 'vendor' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-spa-charcoal mb-1">Number of Vendor Tables</label>
                        <input type="number" name="vendor_tables" value={formData.vendor_tables} onChange={handleChange} placeholder="5" className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-spa-charcoal mb-1">Special Offer for Attendees</label>
                        <input type="text" name="special_offer" value={formData.special_offer} onChange={handleChange} placeholder="e.g., 15% off all products" className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                      </div>
                    </>
                  )}
                  {submitStatus === 'error' && <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>}
                  <button type="submit" disabled={submitStatus === 'loading'} className="btn-primary w-full justify-center mt-6 disabled:opacity-50">
                    <Plus size={18} /> {submitStatus === 'loading' ? 'Creating...' : 'Create Event'}
                  </button>
                  <p className="text-xs text-spa-gray text-center">
                    {createType === 'vendor' ? 'Vendor events require partner status. Contact us to learn more.' : 'Member events are free to create and subject to community guidelines.'}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
