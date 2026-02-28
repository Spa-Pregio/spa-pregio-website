import { useState, useMemo } from 'react';
import { MapPin, ChevronDown, Calendar, Users, Store, Star, ArrowRight, Building2, Utensils, Sparkles, Heart, Leaf } from 'lucide-react';

// --- Data ---

const stateData: Record<string, Record<string, Event[]>> = {
  'Alabama': { 'Birmingham': [], 'Huntsville': [], 'Mobile': [] },
  'Alaska': { 'Anchorage': [], 'Fairbanks': [] },
  'Arizona': { 'Phoenix': [], 'Scottsdale': [], 'Tucson': [], 'Mesa': [] },
  'Arkansas': { 'Little Rock': [], 'Fayetteville': [] },
  'California': {
    'Los Angeles': [
      { id: 101, title: 'Prenatal Yoga & Wellness Fair', date: 'Aug 25, 2026', time: '10:00 AM – 2:00 PM', location: 'Los Angeles, CA', attendees: 35, maxAttendees: 50, type: 'Wellness', hostType: 'vendor', host: 'Serenity Spa', image: '/images/venue_spa_lounge.jpg', vendors: 8 },
      { id: 102, title: 'Mama Market LA', date: 'Sep 6, 2026', time: '11:00 AM – 4:00 PM', location: 'Los Angeles, CA', attendees: 62, maxAttendees: 100, type: 'Vendor Market', hostType: 'vendor', host: 'The Grove Events', image: '/images/gathering_large.jpg', vendors: 14 },
    ],
    'San Francisco': [
      { id: 103, title: 'Bay Area Bump Brunch', date: 'Sep 12, 2026', time: '10:30 AM – 1:00 PM', location: 'San Francisco, CA', attendees: 24, maxAttendees: 40, type: 'Brunch', hostType: 'member', host: 'Sarah K.', image: '/images/venue_restaurant.jpg', vendors: 3 },
    ],
    'San Diego': [],
    'Sacramento': [],
  },
  'Colorado': { 'Denver': [], 'Boulder': [], 'Colorado Springs': [] },
  'Connecticut': { 'Hartford': [], 'New Haven': [], 'Stamford': [] },
  'Delaware': { 'Wilmington': [], 'Dover': [] },
  'Florida': {
    'Miami': [
      { id: 201, title: 'Luxe Baby Shower Expo', date: 'Aug 30, 2026', time: '12:00 PM – 5:00 PM', location: 'Miami, FL', attendees: 48, maxAttendees: 80, type: 'Vendor Market', hostType: 'vendor', host: 'Brickell Country Club', image: '/images/venue_countryclub.jpg', vendors: 18, featured: true },
    ],
    'Orlando': [
      { id: 202, title: 'Central FL Mama Meetup', date: 'Sep 3, 2026', time: '10:00 AM – 12:00 PM', location: 'Orlando, FL', attendees: 19, maxAttendees: 30, type: 'Meetup', hostType: 'member', host: 'Jessica R.', image: '/images/connect_bright.jpg', vendors: 0 },
    ],
    'Tampa': [],
    'Jacksonville': [],
    'Fort Lauderdale': [],
  },
  'Georgia': { 'Atlanta': [], 'Savannah': [], 'Augusta': [] },
  'Hawaii': { 'Honolulu': [], 'Maui': [] },
  'Idaho': { 'Boise': [], 'Idaho Falls': [] },
  'Illinois': {
    'Chicago': [
      { id: 301, title: 'Expectant Mothers Tea', date: 'Aug 22, 2026', time: '2:00 PM – 4:00 PM', location: 'Chicago, IL', attendees: 22, maxAttendees: 30, type: 'Tea', hostType: 'vendor', host: 'The Grand Ballroom', image: '/images/venue_countryclub.jpg', vendors: 4, featured: true },
      { id: 302, title: 'Wicker Park Prenatal Walk', date: 'Sep 8, 2026', time: '9:00 AM – 11:00 AM', location: 'Chicago, IL', attendees: 14, maxAttendees: 25, type: 'Wellness', hostType: 'member', host: 'Amanda P.', image: '/images/plan_bright.jpg', vendors: 0 },
    ],
    'Springfield': [],
    'Naperville': [],
  },
  'Indiana': { 'Indianapolis': [], 'Fort Wayne': [] },
  'Iowa': { 'Des Moines': [], 'Cedar Rapids': [] },
  'Kansas': { 'Wichita': [], 'Overland Park': [] },
  'Kentucky': { 'Louisville': [], 'Lexington': [] },
  'Louisiana': { 'New Orleans': [], 'Baton Rouge': [] },
  'Maine': { 'Portland': [], 'Augusta': [] },
  'Maryland': { 'Baltimore': [], 'Annapolis': [] },
  'Massachusetts': { 'Boston': [], 'Cambridge': [], 'Worcester': [] },
  'Michigan': { 'Detroit': [], 'Grand Rapids': [], 'Ann Arbor': [] },
  'Minnesota': { 'Minneapolis': [], 'Saint Paul': [] },
  'Mississippi': { 'Jackson': [], 'Gulfport': [] },
  'Missouri': { 'Kansas City': [], 'St. Louis': [] },
  'Montana': { 'Billings': [], 'Missoula': [] },
  'Nebraska': { 'Omaha': [], 'Lincoln': [] },
  'Nevada': { 'Las Vegas': [], 'Reno': [] },
  'New Hampshire': { 'Manchester': [], 'Concord': [] },
  'New Jersey': { 'Newark': [], 'Jersey City': [], 'Princeton': [] },
  'New Mexico': { 'Albuquerque': [], 'Santa Fe': [] },
  'New York': {
    'New York City': [
      { id: 401, title: 'Baby Bloom Market', date: 'Aug 12, 2026', time: '10:00 AM – 4:00 PM', location: 'Brooklyn, NY', attendees: 45, maxAttendees: 100, type: 'Vendor Market', hostType: 'vendor', host: 'Spa-Pregio', image: '/images/gathering_large.jpg', vendors: 12, featured: true },
    ],
    'Buffalo': [],
    'Albany': [],
    'Rochester': [],
  },
  'North Carolina': {
    'Charlotte': [],
    'Raleigh': [],
    'Greensboro': [
      { id: 501, title: 'Triad Mama Meetup', date: 'Sep 15, 2026', time: '11:00 AM – 1:00 PM', location: 'Greensboro, NC', attendees: 12, maxAttendees: 25, type: 'Meetup', hostType: 'member', host: 'Lauren T.', image: '/images/connect_bright.jpg', vendors: 0 },
    ],
    'Durham': [],
    'High Point': [],
  },
  'North Dakota': { 'Fargo': [], 'Bismarck': [] },
  'Ohio': { 'Columbus': [], 'Cleveland': [], 'Cincinnati': [] },
  'Oklahoma': { 'Oklahoma City': [], 'Tulsa': [] },
  'Oregon': { 'Portland': [], 'Eugene': [], 'Salem': [] },
  'Pennsylvania': { 'Philadelphia': [], 'Pittsburgh': [], 'Harrisburg': [] },
  'Rhode Island': { 'Providence': [], 'Newport': [] },
  'South Carolina': { 'Charleston': [], 'Columbia': [], 'Greenville': [] },
  'South Dakota': { 'Sioux Falls': [], 'Rapid City': [] },
  'Tennessee': { 'Nashville': [], 'Memphis': [], 'Knoxville': [] },
  'Texas': {
    'Austin': [
      { id: 601, title: 'Mama Brunch & Shop', date: 'Aug 14, 2026', time: '11:00 AM – 2:00 PM', location: 'Austin, TX', attendees: 28, maxAttendees: 40, type: 'Brunch', hostType: 'vendor', host: 'The Garden Room', image: '/images/venue_restaurant.jpg', vendors: 5, featured: true },
      { id: 602, title: 'Austin Baby Shower Pop-Up', date: 'Sep 20, 2026', time: '1:00 PM – 5:00 PM', location: 'Austin, TX', attendees: 33, maxAttendees: 60, type: 'Vendor Market', hostType: 'vendor', host: 'Domain Venue', image: '/images/kit_grid_01.jpg', vendors: 10 },
    ],
    'Houston': [],
    'Dallas': [],
    'San Antonio': [],
    'Fort Worth': [],
  },
  'Utah': { 'Salt Lake City': [], 'Provo': [] },
  'Vermont': { 'Burlington': [], 'Montpelier': [] },
  'Virginia': { 'Richmond': [], 'Virginia Beach': [], 'Arlington': [] },
  'Washington': {
    'Seattle': [
      { id: 701, title: 'Celebration Suite Workshop', date: 'Aug 20, 2026', time: '2:00 PM – 5:00 PM', location: 'Seattle, WA', attendees: 15, maxAttendees: 20, type: 'Workshop', hostType: 'vendor', host: 'Paper & Petal Design', image: '/images/plan_bright.jpg', vendors: 2 },
    ],
    'Spokane': [],
    'Tacoma': [],
  },
  'West Virginia': { 'Charleston': [], 'Huntington': [] },
  'Wisconsin': { 'Milwaukee': [], 'Madison': [] },
  'Wyoming': { 'Cheyenne': [], 'Casper': [] },
};

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  type: string;
  hostType: 'member' | 'vendor';
  host: string;
  image: string;
  vendors: number;
  featured?: boolean;
}

const hostTypeIcons: Record<string, React.ReactNode> = {
  member: <Heart size={12} className="text-spa-pink" />,
  vendor: <Star size={12} className="text-spa-purple fill-spa-purple" />,
};

const vendorTypeIcons: Record<string, React.ReactNode> = {
  Wellness: <Leaf size={14} />,
  Brunch: <Utensils size={14} />,
  Tea: <Sparkles size={14} />,
  'Vendor Market': <Store size={14} />,
  Workshop: <Building2 size={14} />,
  Meetup: <Users size={14} />,
};

const states = Object.keys(stateData).sort();

// --- Component ---

export default function EventDirectory() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [stateOpen, setStateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [activeHostFilter, setActiveHostFilter] = useState<'all' | 'member' | 'vendor'>('all');

  const cities = useMemo(() => {
    if (!selectedState) return [];
    return Object.keys(stateData[selectedState] || {}).sort();
  }, [selectedState]);

  const events: Event[] = useMemo(() => {
    if (!selectedState || !selectedCity) return [];
    return stateData[selectedState]?.[selectedCity] || [];
  }, [selectedState, selectedCity]);

  const filteredEvents = useMemo(() => {
    if (activeHostFilter === 'all') return events;
    return events.filter(e => e.hostType === activeHostFilter);
  }, [events, activeHostFilter]);

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    setSelectedCity('');
    setStateOpen(false);
    setActiveHostFilter('all');
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setCityOpen(false);
    setActiveHostFilter('all');
  };

  const hasResults = selectedState && selectedCity;
  const noEvents = hasResults && filteredEvents.length === 0;

  return (
    <section className="w-full py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Find Events Near You</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-spa-charcoal mt-4 leading-tight">
            Local celebrations, <span className="text-spa-purple">your city.</span>
          </h2>
          <p className="mt-4 text-spa-gray leading-relaxed">
            Browse events hosted by expectant mamas and local vendors — spas, restaurants, venues, yoga studios, and more.
          </p>
        </div>

        {/* Dropdowns */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-10">
          {/* State Dropdown */}
          <div className="relative flex-1">
            <button
              onClick={() => { setStateOpen(!stateOpen); setCityOpen(false); }}
              className="w-full flex items-center justify-between gap-3 px-5 py-4 bg-spa-lavender rounded-2xl text-left transition-all hover:bg-spa-blush focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
            >
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-spa-purple flex-shrink-0" />
                <span className={selectedState ? 'text-spa-charcoal font-medium' : 'text-spa-gray'}>
                  {selectedState || 'Select a state'}
                </span>
              </div>
              <ChevronDown
                size={18}
                className={`text-spa-gray transition-transform duration-200 flex-shrink-0 ${stateOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {stateOpen && (
              <div className="absolute z-30 mt-2 w-full bg-white rounded-2xl shadow-elegant border border-spa-light overflow-hidden">
                <div className="max-h-64 overflow-y-auto">
                  {states.map(state => (
                    <button
                      key={state}
                      onClick={() => handleStateSelect(state)}
                      className={`w-full text-left px-5 py-3 text-sm transition-colors hover:bg-spa-lavender ${
                        selectedState === state ? 'bg-spa-blush text-spa-purple font-medium' : 'text-spa-charcoal'
                      }`}
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* City Dropdown */}
          <div className="relative flex-1">
            <button
              onClick={() => { if (selectedState) { setCityOpen(!cityOpen); setStateOpen(false); } }}
              disabled={!selectedState}
              className={`w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl text-left transition-all focus:outline-none focus:ring-2 focus:ring-spa-purple/30 ${
                selectedState
                  ? 'bg-spa-lavender hover:bg-spa-blush'
                  : 'bg-spa-light cursor-not-allowed opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-spa-purple flex-shrink-0" />
                <span className={selectedCity ? 'text-spa-charcoal font-medium' : 'text-spa-gray'}>
                  {selectedCity || (selectedState ? 'Select a city' : 'Choose state first')}
                </span>
              </div>
              <ChevronDown
                size={18}
                className={`text-spa-gray transition-transform duration-200 flex-shrink-0 ${cityOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {cityOpen && (
              <div className="absolute z-30 mt-2 w-full bg-white rounded-2xl shadow-elegant border border-spa-light overflow-hidden">
                <div className="max-h-64 overflow-y-auto">
                  {cities.map(city => (
                    <button
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      className={`w-full text-left px-5 py-3 text-sm transition-colors hover:bg-spa-lavender ${
                        selectedCity === city ? 'bg-spa-blush text-spa-purple font-medium' : 'text-spa-charcoal'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Host Type Filter — shown once city is selected */}
        {hasResults && (
          <div className="flex justify-center gap-3 mb-10 animate-fade-in">
            {(['all', 'member', 'vendor'] as const).map(type => (
              <button
                key={type}
                onClick={() => setActiveHostFilter(type)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeHostFilter === type
                    ? 'bg-spa-purple text-white'
                    : 'bg-spa-lavender text-spa-charcoal hover:bg-spa-blush'
                }`}
              >
                {type === 'all' ? 'All Events' : type === 'member' ? '💜 Mama-Hosted' : '⭐ Vendor-Hosted'}
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        {!hasResults && (
          <div className="text-center py-16 text-spa-gray">
            <MapPin size={40} className="mx-auto mb-4 text-spa-purple/30" />
            <p className="text-lg font-serif text-spa-charcoal/50">Pick a state and city to discover local events</p>
          </div>
        )}

        {noEvents && (
          <div className="text-center py-16">
            <div className="inline-flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-spa-blush flex items-center justify-center">
                <Calendar size={28} className="text-spa-purple" />
              </div>
              <h3 className="font-serif text-2xl text-spa-charcoal">No events yet in {selectedCity}</h3>
              <p className="text-spa-gray max-w-sm">
                Be the first! Create a mama meetup or invite a local vendor to host an event in your city.
              </p>
              <button className="btn-primary mt-2">
                <Star size={16} />
                Host the First Event
              </button>
            </div>
          </div>
        )}

        {hasResults && filteredEvents.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-spa-gray text-sm">
                <span className="font-medium text-spa-charcoal">{filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}</span> in {selectedCity}, {selectedState}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map(event => (
                <div key={event.id} className="elegant-card group cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-spa-charcoal flex items-center gap-1">
                        {vendorTypeIcons[event.type] || <Calendar size={12} />}
                        {event.type}
                      </span>
                      {event.featured && (
                        <span className="px-3 py-1 bg-spa-purple rounded-full text-xs font-medium text-white flex items-center gap-1">
                          <Star size={12} className="fill-white" />
                          Featured
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
                        <Calendar size={15} className="text-spa-purple" />
                        {event.date} · {event.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-spa-gray">
                        <MapPin size={15} className="text-spa-purple" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-spa-gray">
                        <Users size={15} className="text-spa-purple" />
                        {event.attendees} / {event.maxAttendees} attending
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-spa-charcoal/5">
                      <span className="text-sm text-spa-gray flex items-center gap-1.5">
                        {hostTypeIcons[event.hostType]}
                        {event.host}
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
          </>
        )}

        {/* Host Type Legend */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center text-sm text-spa-gray">
          <div className="flex items-center gap-2">
            <Heart size={14} className="text-spa-pink" />
            <span>Mama-hosted — free member events</span>
          </div>
          <span className="hidden sm:block text-spa-light">|</span>
          <div className="flex items-center gap-2">
            <Star size={14} className="text-spa-purple fill-spa-purple" />
            <span>Vendor-hosted — spas, venues, restaurants & more</span>
          </div>
        </div>

      </div>
    </section>
  );
}
