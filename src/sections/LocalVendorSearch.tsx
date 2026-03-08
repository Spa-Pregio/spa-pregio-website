import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Search, MapPin, Star, Phone, Globe, ArrowRight, Loader, X, Check, Instagram, Facebook } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

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

const SERVICE_CATEGORIES = [
  'Maternity Boutique', 'Local Crafter', 'Spa & Wellness', 'Photographer',
  'Caterer / Baker', 'Event Venue', 'Florist', 'Party Planner',
  'Gift Shop', 'Doula / Midwife', 'Other',
];

declare global {
  interface Window { google: any; }
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

export interface VendorSearchHandle {
  searchCategory: (category: string) => void;
}

const LocalVendorSearch = forwardRef<VendorSearchHandle>((_, ref) => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [category, setCategory] = useState('Spas & Wellness');
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [locating, setLocating] = useState(false);

  // Claim modal state
  const [claimPlace, setClaimPlace] = useState<PlaceResult | null>(null);
  const [claimStatus, setClaimStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'noauth'>('idle');
  const [claimError, setClaimError] = useState('');
  const [claimForm, setClaimForm] = useState({
    business_description: '',
    phone: '',
    website: '',
    instagram: '',
    facebook: '',
    tiktok: '',
    service_categories: [] as string[],
  });

  const mapRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<any>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
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

  const doSearch = (searchCity: string, searchState: string, searchCategory: string) => {
    if (!searchCity || !searchState || !serviceRef.current) return;
    setLoading(true);
    setSearched(false);
    setResults([]);

    const query = `${CATEGORY_SEARCHES[searchCategory] || searchCategory} in ${searchCity} ${searchState}`;
    serviceRef.current.textSearch({ query }, (places: any[], status: string) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && places) {
        const detailPromises = places.slice(0, 9).map((place: any) =>
          new Promise<PlaceResult>((resolve) => {
            serviceRef.current.getDetails(
              { placeId: place.place_id, fields: ['name', 'vicinity', 'rating', 'user_ratings_total', 'photos', 'opening_hours', 'website', 'formatted_phone_number', 'place_id'] },
              (detail: any, s: string) => resolve(s === window.google.maps.places.PlacesServiceStatus.OK ? detail : place)
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

  const getLocation = (): Promise<{ city: string; state: string }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) { reject('no geolocation'); return; }
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.coords.latitude},${pos.coords.longitude}&key=${apiKey}`);
          const data = await res.json();
          let detectedCity = '';
          let detectedState = '';
          for (const result of data.results) {
            for (const comp of result.address_components) {
              if (comp.types.includes('locality')) detectedCity = comp.long_name;
              if (comp.types.includes('administrative_area_level_1')) detectedState = comp.short_name;
            }
            if (detectedCity && detectedState) break;
          }
          resolve({ city: detectedCity, state: detectedState });
        } catch { reject('geocode failed'); }
      }, () => reject('denied'));
    });
  };

  useImperativeHandle(ref, () => ({
    searchCategory: async (selectedCategory: string) => {
      setCategory(selectedCategory);
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (city && state) {
        doSearch(city, state, selectedCategory);
        return;
      }
      setLocating(true);
      try {
        const { city: detectedCity, state: detectedState } = await getLocation();
        setCity(detectedCity);
        setState(detectedState);
        setLocating(false);
        doSearch(detectedCity, detectedState, selectedCategory);
      } catch {
        setLocating(false);
      }
    }
  }));

  const openClaimModal = async (place: PlaceResult) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setClaimPlace(place);
      setClaimStatus('noauth');
      return;
    }
    setClaimPlace(place);
    setClaimForm({
      business_description: '',
      phone: place.formatted_phone_number || '',
      website: place.website || '',
      instagram: '',
      facebook: '',
      tiktok: '',
      service_categories: [],
    });
    setClaimStatus('idle');
    setClaimError('');
  };

  const toggleCategory = (cat: string) => {
    setClaimForm(prev => ({
      ...prev,
      service_categories: prev.service_categories.includes(cat)
        ? prev.service_categories.filter(c => c !== cat)
        : [...prev.service_categories, cat],
    }));
  };

  const handleClaimSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimPlace) return;
    setClaimStatus('loading');
    setClaimError('');

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setClaimStatus('noauth');
      return;
    }

    const { error } = await supabase.from('vendor_profiles').upsert({
      user_id: session.user.id,
      google_place_id: claimPlace.place_id,
      business_name: claimPlace.name,
      address: claimPlace.vicinity,
      phone: claimForm.phone,
      website: claimForm.website,
      business_description: claimForm.business_description,
      instagram: claimForm.instagram,
      facebook: claimForm.facebook,
      tiktok: claimForm.tiktok,
      service_categories: claimForm.service_categories,
      google_rating: claimPlace.rating || null,
      claimed: true,
      approved: false,
      submitted_at: new Date().toISOString(),
    });

    if (error) {
      setClaimError(error.message);
      setClaimStatus('error');
    } else {
      setClaimStatus('success');
    }
  };

  return (
    <div className="w-full" ref={sectionRef}>
      <div ref={mapRef} style={{ display: 'none' }} />

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-elegant p-6 mb-8">
        <h3 className="font-serif text-2xl text-spa-charcoal mb-2 text-center">
          Find Local <span className="text-spa-purple">Mama-Friendly Vendors</span>
        </h3>
        <p className="text-center text-sm text-spa-gray mb-6">Search by city or click any category above to auto-detect your location</p>

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
                onKeyDown={(e) => e.key === 'Enter' && doSearch(city, state, category)}
                className="w-full pl-9 pr-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-spa-charcoal mb-1 uppercase tracking-wide">State</label>
            <select value={state} onChange={(e) => setState(e.target.value)} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30">
              <option value="">Select state...</option>
              {['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-spa-charcoal mb-1 uppercase tracking-wide">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30">
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="flex items-end">
            <button onClick={() => doSearch(city, state, category)} disabled={loading || locating || !mapsLoaded || !city || !state} className="w-full btn-primary justify-center disabled:opacity-60">
              {loading || locating ? <><Loader size={16} className="animate-spin" />{locating ? 'Locating...' : 'Searching...'}</> : <><Search size={16} /> Search</>}
            </button>
          </div>
        </div>
      </div>

      {/* Loading */}
      {(loading || locating) && (
        <div className="text-center py-16">
          <Loader size={32} className="animate-spin text-spa-purple mx-auto mb-4" />
          <p className="text-spa-gray">{locating ? 'Detecting your location...' : `Finding ${category} vendors in ${city}, ${state}...`}</p>
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
                    <img src={place.photos[0].getUrl({ maxWidth: 400 })} alt={place.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"><MapPin size={40} className="text-spa-purple/30" /></div>
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
                      <a href={`tel:${place.formatted_phone_number}`} className="flex items-center gap-1 text-xs text-spa-gray hover:text-spa-purple transition-colors"><Phone size={12} /> Call</a>
                    )}
                    {place.website && (
                      <a href={place.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-spa-gray hover:text-spa-purple transition-colors"><Globe size={12} /> Website</a>
                    )}
                  </div>
                  <button
                    onClick={() => openClaimModal(place)}
                    className="w-full mt-4 px-4 py-2 bg-amber-50 border border-amber-300 text-amber-700 rounded-xl text-sm font-medium hover:bg-amber-100 transition-colors flex items-center justify-center gap-2"
                  >
                    Claim This Listing <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Claim Modal */}
      {claimPlace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spa-charcoal/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full my-8">
            <div className="p-6 lg:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-serif text-2xl text-spa-charcoal">Claim Your Listing</h3>
                  <p className="text-sm text-spa-gray mt-1">{claimPlace.name}</p>
                </div>
                <button
                  onClick={() => { setClaimPlace(null); setClaimStatus('idle'); }}
                  className="w-8 h-8 rounded-full bg-spa-lavender flex items-center justify-center text-spa-gray hover:text-spa-charcoal transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Not logged in */}
              {claimStatus === 'noauth' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-spa-purple/10 flex items-center justify-center mx-auto mb-4">
                    <Globe size={28} className="text-spa-purple" />
                  </div>
                  <h4 className="font-serif text-xl text-spa-charcoal mb-2">Account Required</h4>
                  <p className="text-spa-gray text-sm leading-relaxed mb-6">
                    You need a free Spa-Pregio account to claim your listing.
                  </p>
                  <a
                    href="/join"
                    className="btn-primary inline-flex justify-center"
                  >
                    Create Free Account <ArrowRight size={16} />
                  </a>
                  <p className="text-xs text-spa-gray mt-4">Already have an account? <a href="/join" className="text-spa-purple underline">Sign in</a></p>
                </div>
              )}

              {/* Success */}
              {claimStatus === 'success' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-spa-purple/10 flex items-center justify-center mx-auto mb-4">
                    <Check size={28} className="text-spa-purple" />
                  </div>
                  <h4 className="font-serif text-xl text-spa-charcoal mb-2">Claim Submitted!</h4>
                  <p className="text-spa-gray text-sm leading-relaxed">
                    We'll review your listing and approve it within 1–2 business days. You'll receive a confirmation at your email.
                  </p>
                </div>
              )}

              {/* Claim Form */}
              {(claimStatus === 'idle' || claimStatus === 'loading' || claimStatus === 'error') && (
                <form onSubmit={handleClaimSubmit} className="space-y-5">
                  {/* Pre-filled from Google */}
                  <div className="bg-spa-lavender rounded-xl p-4 space-y-1">
                    <p className="text-xs uppercase tracking-wider text-spa-purple font-medium mb-2">From Google Places</p>
                    <p className="text-sm text-spa-charcoal font-medium">{claimPlace.name}</p>
                    <p className="text-xs text-spa-gray">{claimPlace.vicinity}</p>
                    {claimPlace.rating && <p className="text-xs text-spa-gray">⭐ {claimPlace.rating} ({claimPlace.user_ratings_total?.toLocaleString()} reviews)</p>}
                  </div>

                  {/* Business Description */}
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">Business Description <span className="text-red-400">*</span></label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Tell expectant mothers about your business and what makes you special..."
                      value={claimForm.business_description}
                      onChange={(e) => setClaimForm({ ...claimForm, business_description: e.target.value })}
                      className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30 resize-none"
                    />
                  </div>

                  {/* Phone & Website */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-spa-charcoal mb-1">Phone</label>
                      <input
                        type="tel"
                        placeholder="(555) 000-0000"
                        value={claimForm.phone}
                        onChange={(e) => setClaimForm({ ...claimForm, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-spa-charcoal mb-1">Website</label>
                      <input
                        type="url"
                        placeholder="https://"
                        value={claimForm.website}
                        onChange={(e) => setClaimForm({ ...claimForm, website: e.target.value })}
                        className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                      />
                    </div>
                  </div>

                  {/* Social Links */}
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-2">Social Media</label>
                    <div className="space-y-3">
                      <div className="relative">
                        <Instagram size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-spa-purple" />
                        <input
                          type="text"
                          placeholder="Instagram handle (e.g. @yourbusiness)"
                          value={claimForm.instagram}
                          onChange={(e) => setClaimForm({ ...claimForm, instagram: e.target.value })}
                          className="w-full pl-9 pr-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                        />
                      </div>
                      <div className="relative">
                        <Facebook size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-spa-purple" />
                        <input
                          type="text"
                          placeholder="Facebook page URL"
                          value={claimForm.facebook}
                          onChange={(e) => setClaimForm({ ...claimForm, facebook: e.target.value })}
                          className="w-full pl-9 pr-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                        />
                      </div>
                      <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-spa-purple" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
                        </svg>
                        <input
                          type="text"
                          placeholder="TikTok handle (e.g. @yourbusiness)"
                          value={claimForm.tiktok}
                          onChange={(e) => setClaimForm({ ...claimForm, tiktok: e.target.value })}
                          className="w-full pl-9 pr-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Service Categories */}
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-2">Service Categories <span className="text-red-400">*</span></label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICE_CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => toggleCategory(cat)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                            claimForm.service_categories.includes(cat)
                              ? 'bg-spa-purple text-white'
                              : 'bg-spa-lavender text-spa-charcoal hover:bg-spa-purple/10'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {claimError && <p className="text-red-500 text-sm">{claimError}</p>}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={claimStatus === 'loading' || claimForm.service_categories.length === 0}
                      className="btn-primary w-full justify-center disabled:opacity-50"
                    >
                      {claimStatus === 'loading' ? <><Loader size={16} className="animate-spin" /> Submitting...</> : <>Submit Claim <ArrowRight size={16} /></>}
                    </button>
                    <p className="text-xs text-spa-gray text-center mt-3">
                      Your listing will be reviewed and approved within 1–2 business days.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default LocalVendorSearch;
