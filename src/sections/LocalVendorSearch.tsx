import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Star, Phone, Globe, ArrowRight, Loader } from 'lucide-react';

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

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

interface PlaceResult {
  place_id: string;
  name: string;
  vicinity: string;
  rating?: number;
  user_ratings_total?: number;
  photos?: any[];
  opening_hours?: { open_now: boolean };
  website?: string;
  formatted_phone_number?: string;
}

export default function LocalVendorSearch() {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [category, setCategory] = useState('Spas & Wellness');
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<any>(null);
  const apiKey = (import.meta as any).env?.VITE_GOOGLE_PLACES_API_KEY || '';

  useEffect(() => {
    if (!apiKey || window.google) {
      if (window.google) setMapsLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.onload = () => setMapsLoaded(true);
    document.head.appendChild(script);
  }, [apiKey]);

  useEffect(() => {
    if (mapsLoaded && mapRef.current && !serviceRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 37.0902, lng: -95.7129 },
        zoom: 4,
      });
      serviceRef.current = new window.google.maps.places.PlacesService(map);
    }
  }, [mapsLoaded]);

  const searchVendors = () => {
    if (!city || !state) return;
    if (!serviceRef.current) return;

    setLoading(true);
    setSearched(false);
    setResults([]);

    const query = `${CATEGORY_SEARCHES[category]} in ${city} ${state}`;

    serviceRef.current.textSearch({ query }, (results: any[], status: string) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        // Get details for first 9 results
        const detailPromises = results.slice(0, 9).map((place: any) =>
          new Promise<PlaceResult>((resolve) => {
            serviceRef.current.getDetails(
              { placeId: place.place_id, fields: ['name', 'vicinity', 'rating', 'user_ratings_total', 'photos', 'opening_hours', 'website', 'formatted_phone_number', 'place_id'] },
              (detail: any, detailStatus: string) => {
                if (detailStatus === window.google.maps.places.PlacesServiceStatus.OK) {
                  resolve(detail);
                } else {
                  resolve(place);
                }
              }
            );
          })
        );
        Promise.all(detailPromises).then((detailed) => {
          setResults(detailed);
          setLoading(false);
          setSearched(true);
        });
      } else {
        setResults([]);
        setLoading(false);
        setSearched(true);
      }
    });
  };

  return (
    <div className="w-full">
      {/* Hidden map div required by Places API */}
      <div ref={mapRef} style={{ display: 'none' }} />

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
              disabled={loading || !mapsLoaded || !city || !state}
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
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-16">
          <Loader size={32} className="animate-spin text-spa-purple mx-auto mb-4" />
          <p className="text-spa-gray">Finding vendors in {city}, {state}...</p>
        </div>
      )}

      {/* No results */}
      {searched && !loading && results.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl">
          <MapPin size={40} className="text-spa-purple/30 mx-auto mb-4" />
          <h3 className="font-serif text-xl text-spa-charcoal">No results found</h3>
          <p className="text-spa-gray mt-2">Try a different city or category.</p>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-spa-gray">
              Found <span className="font-semibold text-spa-charcoal">{results.length} vendors</span> for <span className="text-spa-purple">{category}</span> in <span className="text-spa-purple">{city}, {state}</span>
            </p>
            <span className="text-xs text-spa-gray bg-spa-lavender px-3 py-1 rounded-full">Powered by Google</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((place) => (
              <div key={place.place_id} className="elegant-card group overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden bg-spa-lavender">
                  {place.photos?.[0] ? (
                    <img
                      src={place.photos[0].getUrl({ maxWidth: 400 })}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <MapPin size={40} className="text-spa-purple/30" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-spa-gray text-xs rounded-full font-medium">Unclaimed</span>
                  </div>
                  {place.opening_hours && (
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 text-xs rounded-full font-medium ${place.opening_hours.open_now ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {place.opening_hours.open_now ? 'Open Now' : 'Closed'}
                      </span>
                    </div>
                  )}
                </div>

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

                  <div className="flex gap-3 mt-3">
                    {place.formatted_phone_number && (
                      <a href={`tel:${place.formatted_phone_number}`} className="flex items-center gap-1 text-xs text-spa-gray hover:text-spa-purple transition-colors">
                        <Phone size={12} /> Call
                      </a>
                    )}
                    {place.website && (
                      <a href={place.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-spa-gray hover:text-spa-purple transition-colors">
                        <Globe size={12} /> Website
                      </a>
                    )}
                  </div>

                  <button className="w-full mt-4 px-4 py-2 bg-amber-50 border border-amber-300 text-amber-700 rounded-xl text-sm font-medium hover:bg-amber-100 transition-colors flex items-center justify-center gap-2">
                    Claim This Listing <ArrowRight size={14} />
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
