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
  'Doulas': 'doula midwife',
  'Party Planners': 'baby shower party planner',
  'Local Crafters': 'handmade baby nursery crafts',
  'Realtors': 'realtor family homes',
  'Pediatricians': 'pediatrician newborn care',
  'OB-GYN & Midwives': 'obgyn midwife prenatal',
  'Lactation Consultants': 'lactation consultant breastfeeding',
  'Postpartum Support': 'postpartum support new mother',
  'Family Therapists & Counselors': 'family therapist counselor',
  'Insurance Agents': 'life insurance family',
  'Estate Planning & Attorneys': 'estate planning attorney wills',
  'House Cleaning Services': 'house cleaning service',
};

const CATEGORIES = Object.keys(CATEGORY_SEARCHES);

const SERVICE_CATEGORIES = [
  'Maternity Boutique', 'Local Crafter', 'Spa & Wellness', 'Photographer',
  'Caterer / Baker', 'Event Venue', 'Florist', 'Party Planner',
  'Gift Shop', 'Doula / Midwife', 'Other',
];

interface PlaceResult {
  place_id: string;
  name: string;
  vicinity: string;
  rating?: number;
  user_ratings_total?: number;
  photo_url?: string;
  open_now?: boolean;
  website?: string;
  formatted_phone_number?: string;
}

interface SupabaseVendor {
  id: string;
  business_name: string;
  category: string;
  city: string;
  state: string;
  contact_type: string;
  contact_value: string;
  owner_name: string | null;
  plan: string;
}

export interface VendorSearchHandle {
  searchCategory: (category: string) => void;
}

const LocalVendorSearch = forwardRef<VendorSearchHandle>((_, ref) => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [category, setCategory] = useState('Spas & Wellness');
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [spaResults, setSpaResults] = useState<SupabaseVendor[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locationDenied, setLocationDenied] = useState(false);

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

  const sectionRef = useRef<HTMLDivElement>(null);
  const apiKey = (import.meta as any).env?.VITE_GOOGLE_PLACES_API_KEY || '';

  // Load Google Maps script (for Geocoding only — Places uses fetch now)
  useEffect(() => {
    if (!apiKey) return;
    if (document.querySelector('script[data-google-maps]')) return;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.setAttribute('data-google-maps', 'true');
    document.head.appendChild(script);
  }, [apiKey]);

  const searchSupabaseVendors = async (searchCity: string, searchState: string, searchCategory: string) => {
    const { data } = await supabase
      .from('vendors')
      .select('*')
      .eq('status', 'active')
      .ilike('city', searchCity)
      .ilike('state', searchState)
      .ilike('category', `%${searchCategory}%`);
    setSpaResults(data || []);
  };

  // New Places API (Text Search) via fetch
  const searchGooglePlaces = async (searchCity: string, searchState: string, searchCategory: string): Promise<PlaceResult[]> => {
    if (!apiKey) return [];
    const query = `${CATEGORY_SEARCHES[searchCategory] || searchCategory} in ${searchCity} ${searchState}`;
    try {
      const res = await fetch(
        `https://places.googleapis.com/v1/places:searchText`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.photos,places.currentOpeningHours,places.websiteUri,places.nationalPhoneNumber',
          },
          body: JSON.stringify({ textQuery: query, maxResultCount: 9 }),
        }
      );
      const data = await res.json();
      if (!data.places) return [];
      return data.places.map((p: any) => ({
        place_id: p.id,
        name: p.displayName?.text || '',
        vicinity: p.formattedAddress || '',
        rating: p.rating,
        user_ratings_total: p.userRatingCount,
        photo_url: p.photos?.[0]
          ? `https://places.googleapis.com/v1/${p.photos[0].name}/media?maxWidthPx=400&key=${apiKey}`
          : undefined,
        open_now: p.currentOpeningHours?.openNow,
        website: p.websiteUri,
        formatted_phone_number: p.nationalPhoneNumber,
      }));
    } catch (e) {
      console.warn('Places search failed:', e);
      return [];
    }
  };

  const doSearch = async (searchCity: string, searchState: string, searchCategory: string) => {
    if (!searchCity || !searchState) return;
    setLoading(true);
    setSearched(false);
    setResults([]);
    setSpaResults([]);

    const [googleResults] = await Promise.all([
      searchGooglePlaces(searchCity, searchState, searchCategory),
      searchSupabaseVendors(searchCity, searchState, searchCategory),
    ]);

    setResults(googleResults);
    setLoading(false);
    setSearched(true);
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
      // Check if browser supports geolocation
      if (!navigator.geolocation) {
        // No geolocation — just focus the city field
        return;
      }
      setLocating(true);
      try {
        const { city: detectedCity, state: detectedState } = await getLocation();
        if (detectedCity && detectedState) {
          setCity(detectedCity);
          setState(detectedState);
          setLocating(false);
          doSearch(detectedCity, detectedState, selectedCategory);
        } else {
          setLocating(false);
        }
      } catch {
        // User denied location or it failed — let them type manually
        setLocating(false);
        setLocationDenied(true);
      }
    }
  }));

  const openClaimModal = async (place: PlaceResult) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setClaimPlace(place); setClaimStatus('noauth'); return; }
    setClaimPlace(place);
    setClaimForm({ business_description: '', phone: place.formatted_phone_number || '', website: place.website || '', instagram: '', facebook: '', tiktok: '', service_categories: [] });
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
    if (!session) { setClaimStatus('noauth'); return; }
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
    if (error) { setClaimError(error.message); setClaimStatus('error'); }
    else setClaimStatus('success');
  };

  const hasAnyResults = spaResults.length > 0 || results.length > 0;

  return (
    <div className="w-full" ref={sectionRef}>
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
              <input type="text" placeholder="e.g. Charlotte" value={city} onChange={(e) => setCity(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && doSearch(city, state, category)} className="w-full pl-9 pr-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
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
            <button onClick={() => doSearch(city, state, category)} disabled={loading || locating || !city || !state} className="w-full btn-primary justify-center disabled:opacity-60">
              {loading || locating ? <><Loader size={16} className="animate-spin" />{locating ? 'Locating...' : 'Searching...'}</> : <><Search size={16} /> Search</>}
            </button>
          </div>
        </div>
      </div>

      {locationDenied && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6 flex items-center gap-3">
          <MapPin size={16} className="text-amber-500 flex-shrink-0" />
          <p className="text-sm text-amber-700">Location access was denied — enter your city and state above to search.</p>
          <button onClick={() => setLocationDenied(false)} className="ml-auto text-amber-400 hover:text-amber-600"><X size={16} /></button>
        </div>
      )}

      {(loading || locating) && (
        <div className="text-center py-16">
          <Loader size={32} className="animate-spin text-spa-purple mx-auto mb-4" />
          <p className="text-spa-gray">{locating ? 'Detecting your location...' : `Finding ${category} vendors in ${city}, ${state}...`}</p>
        </div>
      )}

      {searched && !loading && !hasAnyResults && (
        <div className="text-center py-16 bg-white rounded-2xl">
          <MapPin size={40} className="text-spa-purple/30 mx-auto mb-4" />
          <h3 className="font-serif text-xl text-spa-charcoal">No results found</h3>
          <p className="text-spa-gray mt-2">Try a different city or category.</p>
        </div>
      )}

      {searched && !loading && spaResults.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-spa-purple/20" />
            <div className="flex items-center gap-2 bg-spa-purple rounded-full px-4 py-1.5">
              <Star size={14} className="text-spa-pink fill-spa-pink" />
              <span className="text-white text-xs font-medium uppercase tracking-wide">Spa-Pregio Members</span>
            </div>
            <div className="h-px flex-1 bg-spa-purple/20" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaResults.map((vendor) => (
              <div key={vendor.id} className="bg-white rounded-2xl overflow-hidden border-2 border-spa-purple/20 shadow-elegant relative">
                <div className="absolute top-3 left-3 z-10">
                  <span className="flex items-center gap-1 px-3 py-1 bg-spa-purple text-white text-xs rounded-full font-medium">
                    <Star size={10} className="fill-spa-pink text-spa-pink" /> Spa-Pregio Member
                  </span>
                </div>
                <div className="aspect-[4/3] bg-gradient-to-br from-spa-lavender to-spa-blush flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-spa-purple/10 flex items-center justify-center mx-auto mb-2">
                      <MapPin size={28} className="text-spa-purple" />
                    </div>
                    <p className="text-xs text-spa-purple font-medium">{vendor.category}</p>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg text-spa-charcoal leading-tight">{vendor.business_name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={12} className="text-spa-purple flex-shrink-0" />
                    <p className="text-xs text-spa-gray">{vendor.city}, {vendor.state}</p>
                  </div>
                  <div className="flex gap-3 mt-3">
                    {vendor.contact_type === 'phone' ? (
                      <a href={`tel:${vendor.contact_value}`} className="flex items-center gap-1 text-xs text-spa-gray hover:text-spa-purple transition-colors"><Phone size={12} /> {vendor.contact_value}</a>
                    ) : (
                      <a href={vendor.contact_value} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-spa-gray hover:text-spa-purple transition-colors"><Globe size={12} /> Visit Website</a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {searched && !loading && results.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-spa-gray/20" />
            <span className="text-xs text-spa-gray bg-spa-cream px-4 py-1.5 rounded-full">More local results from Google</span>
            <div className="h-px flex-1 bg-spa-gray/20" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((place) => (
              <div key={place.place_id} className="elegant-card group overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden bg-spa-lavender">
                  {place.photo_url ? (
                    <img src={place.photo_url} alt={place.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"><MapPin size={40} className="text-spa-purple/30" /></div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-spa-gray text-xs rounded-full font-medium">Unclaimed</span>
                  </div>
                  {place.open_now !== undefined && (
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 text-xs rounded-full font-medium ${place.open_now ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {place.open_now ? 'Open Now' : 'Closed'}
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
                  <button onClick={() => openClaimModal(place)} className="w-full mt-4 px-4 py-2 bg-amber-50 border border-amber-300 text-amber-700 rounded-xl text-sm font-medium hover:bg-amber-100 transition-colors flex items-center justify-center gap-2">
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
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-serif text-2xl text-spa-charcoal">Claim Your Listing</h3>
                  <p className="text-sm text-spa-gray mt-1">{claimPlace.name}</p>
                </div>
                <button onClick={() => { setClaimPlace(null); setClaimStatus('idle'); }} className="w-8 h-8 rounded-full bg-spa-lavender flex items-center justify-center text-spa-gray hover:text-spa-charcoal transition-colors">
                  <X size={18} />
                </button>
              </div>
              {claimStatus === 'noauth' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-spa-purple/10 flex items-center justify-center mx-auto mb-4"><Globe size={28} className="text-spa-purple" /></div>
                  <h4 className="font-serif text-xl text-spa-charcoal mb-2">Account Required</h4>
                  <p className="text-spa-gray text-sm leading-relaxed mb-6">You need a free Spa-Pregio account to claim your listing.</p>
                  <a href="/my-account" className="btn-primary inline-flex justify-center">Create Free Account <ArrowRight size={16} /></a>
                </div>
              )}
              {claimStatus === 'success' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-spa-purple/10 flex items-center justify-center mx-auto mb-4"><Check size={28} className="text-spa-purple" /></div>
                  <h4 className="font-serif text-xl text-spa-charcoal mb-2">Claim Submitted!</h4>
                  <p className="text-spa-gray text-sm leading-relaxed">We'll review your listing and approve it within 1–2 business days.</p>
                </div>
              )}
              {(claimStatus === 'idle' || claimStatus === 'loading' || claimStatus === 'error') && (
                <form onSubmit={handleClaimSubmit} className="space-y-5">
                  <div className="bg-spa-lavender rounded-xl p-4">
                    <p className="text-xs uppercase tracking-wider text-spa-purple font-medium mb-2">From Google Places</p>
                    <p className="text-sm text-spa-charcoal font-medium">{claimPlace.name}</p>
                    <p className="text-xs text-spa-gray">{claimPlace.vicinity}</p>
                    {claimPlace.rating && <p className="text-xs text-spa-gray">{claimPlace.rating} stars ({claimPlace.user_ratings_total?.toLocaleString()} reviews)</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">Business Description <span className="text-red-400">*</span></label>
                    <textarea rows={3} required placeholder="Tell expectant mothers about your business..." value={claimForm.business_description} onChange={(e) => setClaimForm({ ...claimForm, business_description: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30 resize-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-spa-charcoal mb-1">Phone</label>
                      <input type="tel" placeholder="(555) 000-0000" value={claimForm.phone} onChange={(e) => setClaimForm({ ...claimForm, phone: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-spa-charcoal mb-1">Website</label>
                      <input type="url" placeholder="https://" value={claimForm.website} onChange={(e) => setClaimForm({ ...claimForm, website: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-2">Social Media</label>
                    <div className="space-y-3">
                      <div className="relative">
                        <Instagram size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-spa-purple" />
                        <input type="text" placeholder="Instagram handle" value={claimForm.instagram} onChange={(e) => setClaimForm({ ...claimForm, instagram: e.target.value })} className="w-full pl-9 pr-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                      </div>
                      <div className="relative">
                        <Facebook size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-spa-purple" />
                        <input type="text" placeholder="Facebook page URL" value={claimForm.facebook} onChange={(e) => setClaimForm({ ...claimForm, facebook: e.target.value })} className="w-full pl-9 pr-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-2">Service Categories <span className="text-red-400">*</span></label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICE_CATEGORIES.map((cat) => (
                        <button key={cat} type="button" onClick={() => toggleCategory(cat)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${claimForm.service_categories.includes(cat) ? 'bg-spa-purple text-white' : 'bg-spa-lavender text-spa-charcoal hover:bg-spa-purple/10'}`}>
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  {claimError && <p className="text-red-500 text-sm">{claimError}</p>}
                  <div className="pt-2">
                    <button type="submit" disabled={claimStatus === 'loading' || claimForm.service_categories.length === 0} className="btn-primary w-full justify-center disabled:opacity-50">
                      {claimStatus === 'loading' ? <><Loader size={16} className="animate-spin" /> Submitting...</> : <>Submit Claim <ArrowRight size={16} /></>}
                    </button>
                    <p className="text-xs text-spa-gray text-center mt-3">Your listing will be reviewed within 1–2 business days.</p>
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