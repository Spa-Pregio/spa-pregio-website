import { useState } from 'react';
import { Search, MapPin, Star, Phone, Globe, ArrowRight, AlertCircle, Loader } from 'lucide-react';

const CATEGORY_SEARCHES: Record<string, string> = {
  'Spas & Wellness': 'prenatal spa wellness',
  'Photographers': 'maternity photographer',
  'Caterers & Bakers': 'baby shower catering bakery',
  'Event Venues': 'event venue baby shower',
  'Maternity Boutiques': 'maternity boutique clothing',
  'Florists': 'florist baby shower',
  'Doulas & Midwives': 'doula midwife',
  'Party Planners': 'baby shower party planner',
  'Gift Shops': 'baby gift shop boutique',
  'Local Crafters': 'handmade baby nursery crafts',
};

const CATEGORIES = Object.keys(CATEGORY_SEARCHES);

interface PlaceResult {
  place_id: string;
  name: string;
  vicinity: string;
  rating?: number;
  user_ratings_total?: number;
  photos?: { photo_reference: string }[];
  opening_hours?: { open_now: boolean };
  website?: string;
  formatted_phone_number?: string;
  types: string[];
}

export default function LocalVendorSearch() {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [category, setCategory] = useState('Spas & Wellness');
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');
  const [apiKey] = useState(import.meta.env.VITE_GOOGLE_PLACES_API_KEY || '');

  const searchVendors = async () => {
    if (!city || !state) {
      setError('Please enter a city and state to search.');
      return;
    }
    if (!apiKey) {
      setError('Google Places API key not configured. Please add VITE_GOOGLE_PLACES_API_KEY to your environment variables.');
      return;
    }

    setError('');
    setLoading(true);
    setSearched(false);

    try {
      const query = `${CATEGORY_SEARCHES[category]} in ${city}, ${state}`;
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;
      
      // Use a CORS proxy for browser-side requests
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      const data = await response.json();

      if (data.results) {
        setResults(data.results.slice(0, 12));
      } else {
        setResults([]);
      }
    } catch (err) {
      setError('Unable to fetch results. Please try again.');
    }

    setSearched(true);
    setLoading(false);
  };

  const getPhotoUrl = (photoRef: string) => {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${apiKey}`;
  };

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-elegant p-6 mb-8">
        <h3 className="font-serif text-2xl text-spa-charcoal mb-6 text-center">
          Find Local <span className="text-spa-purple">Mama-Friendly Vendors</span>
        </h3>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-spa-charcoal mb-1 uppercase tracking-wide">City</label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-spa-purple" />
              <input
                type="text"
                placeholder="e.g. Charlotte"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchVendors()}
                className="w-full pl-9 pr-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-spa-charcoal mb-1 uppercase tracking-wide">State</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
            >
              <option value="">Select state...</option>
              {['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-spa-charcoal mb-1 uppercase tracking-wide">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={searchVendors}
              disabled={loading}
              className="w-full btn-primary justify-center disabled:opacity-60"
            >
              {loading ? (
                <><Loader size={16} className="animate-spin" /> Searching...</>
              ) : (
                <><Search size={16} /> Search</>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-4 flex items-start gap-2 text-amber-700 bg-amber-50 rounded-xl p-4">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}
      </div>

      {/* Results */}
      {loading && (
        <div className="text-center py-16">
          <Loader size={32} className="animate-spin text-spa-purple mx-auto mb-4" />
          <p className="text-spa-gray">Finding vendors in {city}, {state}...</p>
        </div>
      )}

      {searched && !loading && results.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl">
          <MapPin size={40} className="text-spa-purple/30 mx-auto mb-4" />
          <h3 className="font-serif text-xl text-spa-charcoal">No results found</h3>
          <p className="text-spa-gray mt-2">Try a different city or category.</p>
        </div>
      )}

      {results.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-spa-gray">
              Found <span className="font-semibold text-spa-charcoal">{results.length} vendors</span> for <span className="text-spa-purple">{category}</span> in <span className="text-spa-purple">{city}, {state}</span>
            </p>
            <span className="text-xs text-spa-gray bg-spa-lavender px-3 py-1 rounded-full">Powered by Google Places</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((place) => (
              <div key={place.place_id} className="elegant-card group overflow-hidden">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-spa-lavender">
                  {place.photos?.[0] ? (
                    <img
                      src={getPhotoUrl(place.photos[0].photo_reference)}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <MapPin size={40} className="text-spa-purple/30" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-spa-gray text-xs rounded-full">
                      Unclaimed
                    </span>
                  </div>
                  {place.opening_hours && (
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 text-xs rounded-full ${place.opening_hours.open_now ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {place.opening_hours.open_now ? 'Open Now' : 'Closed'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-serif text-lg text-spa-charcoal leading-tight">{place.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={12} className="text-spa-purple flex-shrink-0" />
                    <p className="text-xs text-spa-gray truncate">{place.vicinity}</p>
                  </div>

                  {place.rating && (
                    <div className="flex items-center gap-1 mt-2">
                      <Star size={13} className="text-amber-400 fill-amber-400" />
                      <span className="text-sm font-medium text-spa-charcoal">{place.rating}</span>
                      <span className="text-xs text-spa-gray">({place.user_ratings_total?.toLocaleString()} reviews)</span>
                    </div>
                  )}

                  <div className="flex gap-2 mt-4">
                    {place.formatted_phone_number && (
                      <a
                        href={`tel:${place.formatted_phone_number}`}
                        className="flex items-center gap-1 text-xs text-spa-gray hover:text-spa-purple transition-colors"
                      >
                        <Phone size={12} />
                        Call
                      </a>
                    )}
                    {place.website && (
                      <a
                        href={place.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-spa-gray hover:text-spa-purple transition-colors"
                      >
                        <Globe size={12} />
                        Website
                      </a>
                    )}
                  </div>

                  <button className="w-full mt-4 px-4 py-2 bg-amber-50 border border-amber-300 text-amber-700 rounded-xl text-sm font-medium hover:bg-amber-100 transition-colors flex items-center justify-center gap-2">
                    Claim This Listing
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
