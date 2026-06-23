import { useState, useEffect } from 'react';
import { MapPin, Star, Phone, Globe, ArrowRight, Loader, X, Check, ChevronRight, Instagram, Facebook } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const CATEGORIES = [
  { label: 'Spas & Wellness', emoji: '💆‍♀️', query: 'prenatal spa wellness' },
  { label: 'Photographers', emoji: '📸', query: 'maternity photographer' },
  { label: 'Caterers & Bakers', emoji: '🎂', query: 'baby shower catering bakery' },
  { label: 'Event Venues', emoji: '🏡', query: 'event venue baby shower' },
  { label: 'Maternity Boutiques', emoji: '👗', query: 'maternity boutique clothing' },
  { label: 'Florists', emoji: '💐', query: 'florist baby shower' },
  { label: 'Doulas & Midwives', emoji: '🤱', query: 'doula midwife' },
  { label: 'Party Planners', emoji: '🎉', query: 'baby shower party planner' },
  { label: 'Pediatricians', emoji: '👶', query: 'pediatrician newborn care' },
  { label: 'OB-GYN & Midwives', emoji: '🏥', query: 'obgyn midwife prenatal' },
  { label: 'Lactation Consultants', emoji: '🍼', query: 'lactation consultant breastfeeding' },
  { label: 'Postpartum Support', emoji: '💜', query: 'postpartum support new mother' },
  { label: 'House Cleaning', emoji: '🏠', query: 'house cleaning service' },
  { label: 'Gift Shops', emoji: '🎁', query: 'baby gift shop' },
];

const US_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

const SERVICE_CATEGORIES = [
  'Maternity Boutique','Local Crafter','Spa & Wellness','Photographer',
  'Caterer / Baker','Event Venue','Florist','Party Planner','Gift Shop','Doula / Midwife','Other',
];

const RADIUS_MILES = 25;

function distanceMiles(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

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
  plan: string;
  logo_url?: string | null;
}

interface VendorWithCoords extends SupabaseVendor {
  lat: number;
  lng: number;
  distanceMiles: number;
}

export default function LocalVendorSearch() {
  const [step, setStep] = useState(1);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [spaResults, setSpaResults] = useState<SupabaseVendor[]>([]);
  const [nearbyVendors, setNearbyVendors] = useState<VendorWithCoords[]>([]);
  const [searchCenter, setSearchCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedPin, setSelectedPin] = useState<string | null>(null);

  const [claimPlace, setClaimPlace] = useState<PlaceResult | null>(null);
  const [claimStatus, setClaimStatus] = useState<'idle'|'loading'|'success'|'error'|'noauth'>('idle');
  const [claimError, setClaimError] = useState('');
  const [claimForm, setClaimForm] = useState({
    business_description: '', phone: '', website: '', instagram: '', facebook: '', tiktok: '', service_categories: [] as string[],
  });

  const apiKey = (import.meta as any).env?.VITE_GOOGLE_PLACES_API_KEY || '';

  const geocode = async (address: string): Promise<{ lat: number; lng: number } | null> => {
    if (!apiKey) return null;
    try {
      const res = await fetch(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address) + '&key=' + apiKey
      );
      const data = await res.json();
      if (data.results?.[0]?.geometry?.location) return data.results[0].geometry.location;
    } catch (e) {
      console.warn('Geocode failed:', e);
    }
    return null;
  };

  useEffect(() => {
    const handler = (e: Event) => {
      const cat = (e as CustomEvent).detail;
      if (cat) { setSelectedCategory(cat); setStep(3); }
    };
    window.addEventListener('spa-pregio-preset-category', handler);
    return () => window.removeEventListener('spa-pregio-preset-category', handler);
  }, []);

  const searchVendors = async (cat: string) => {
    setLoading(true);
    setSearched(false);
    setResults([]);
    setSpaResults([]);
    setNearbyVendors([]);
    setSearchCenter(null);
    setSelectedPin(null);

    // Geocode the searcher's city/state
    const center = await geocode(city + ', ' + state);
    if (center) {
      setSearchCenter(center);

      // Fetch ALL active vendors in this category and geocode each
      const { data: allVendors } = await supabase
        .from('vendors')
        .select('*')
        .eq('status', 'active')
        .ilike('category', '%' + cat + '%');

      if (allVendors && allVendors.length > 0) {
        const withCoords: VendorWithCoords[] = [];
        await Promise.all(allVendors.map(async (v: SupabaseVendor) => {
          const addr = v.city && v.state ? v.city + ', ' + v.state : '';
          if (!addr) return;
          const coords = await geocode(addr);
          if (!coords) return;
          const dist = distanceMiles(center.lat, center.lng, coords.lat, coords.lng);
          withCoords.push({ ...v, lat: coords.lat, lng: coords.lng, distanceMiles: dist });
        }));

        const inRadius = withCoords
          .filter(v => v.distanceMiles <= RADIUS_MILES)
          .sort((a, b) => a.distanceMiles - b.distanceMiles);

        setNearbyVendors(inRadius);

        // Also set exact-match results for the cards below the map
        const exactMatch = inRadius.filter(v =>
          v.city.toLowerCase() === city.toLowerCase() &&
          v.state.toLowerCase() === state.toLowerCase()
        );
        setSpaResults(exactMatch.length > 0 ? exactMatch : inRadius);
      }
    } else {
      // Fallback: exact city match if geocoding fails
      const { data } = await supabase.from('vendors').select('*').eq('status', 'active').ilike('city', city).ilike('state', state).ilike('category', '%' + cat + '%');
      setSpaResults(data || []);
    }

    // Google Places results
    const categoryData = CATEGORIES.find(c => c.label === cat);
    const query = (categoryData?.query || cat) + ' in ' + city + ' ' + state;
    if (apiKey) {
      try {
        const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.photos,places.currentOpeningHours,places.websiteUri,places.nationalPhoneNumber',
          },
          body: JSON.stringify({ textQuery: query, maxResultCount: 9 }),
        });
        const data = await res.json();
        if (data.places) {
          setResults(data.places.map((p: any) => ({
            place_id: p.id,
            name: p.displayName?.text || '',
            vicinity: p.formattedAddress || '',
            rating: p.rating,
            user_ratings_total: p.userRatingCount,
            photo_url: p.photos?.[0] ? 'https://places.googleapis.com/v1/' + p.photos[0].name + '/media?maxWidthPx=400&key=' + apiKey : undefined,
            open_now: p.currentOpeningHours?.openNow,
            website: p.websiteUri,
            formatted_phone_number: p.nationalPhoneNumber,
          })));
        }
      } catch (e) {
        console.warn('Places search failed:', e);
      }
    }

    setLoading(false);
    setSearched(true);
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setStep(4);
    searchVendors(cat);
  };

  const resetSearch = () => {
    setStep(1);
    setCity('');
    setState('');
    setSelectedCategory('');
    setResults([]);
    setSpaResults([]);
    setNearbyVendors([]);
    setSearchCenter(null);
    setSearched(false);
    setSelectedPin(null);
  };

  const openClaimModal = async (place: PlaceResult) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setClaimPlace(place); setClaimStatus('noauth'); return; }
    setClaimPlace(place);
    setClaimForm({ business_description: '', phone: place.formatted_phone_number || '', website: place.website || '', instagram: '', facebook: '', tiktok: '', service_categories: [] });
    setClaimStatus('idle');
    setClaimError('');
  };

  const handleClaimSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimPlace) return;
    setClaimStatus('loading');
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setClaimStatus('noauth'); return; }
    const { error } = await supabase.from('vendor_profiles').upsert({
      user_id: session.user.id, google_place_id: claimPlace.place_id, business_name: claimPlace.name,
      address: claimPlace.vicinity, phone: claimForm.phone, website: claimForm.website,
      business_description: claimForm.business_description, instagram: claimForm.instagram,
      facebook: claimForm.facebook, tiktok: claimForm.tiktok, service_categories: claimForm.service_categories,
      google_rating: claimPlace.rating || null, claimed: true, approved: false, submitted_at: new Date().toISOString(),
    });
    if (error) { setClaimError(error.message); setClaimStatus('error'); }
    else setClaimStatus('success');
  };

  const hasResults = spaResults.length > 0 || results.length > 0;

  return (
    <div className="w-full">

      {step < 4 && (
        <div className="flex items-center justify-center gap-3 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${step === s ? 'bg-spa-purple text-white scale-110' : step > s ? 'bg-spa-purple/30 text-spa-purple' : 'bg-spa-lavender text-spa-gray'}`}>
                {step > s ? <Check size={14} /> : s}
              </div>
              {s < 3 && <div className={`h-px w-8 transition-all ${step > s ? 'bg-spa-purple' : 'bg-spa-lavender'}`} />}
            </div>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="bg-white rounded-2xl shadow-elegant p-8 lg:p-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-spa-lavender flex items-center justify-center mx-auto mb-4">
              <MapPin size={24} className="text-spa-purple" />
            </div>
            <h2 className="font-serif text-2xl text-spa-charcoal">What city are you in?</h2>
            <p className="text-spa-gray text-sm mt-2">We'll find vendors right in your area.</p>
          </div>
          <input
            type="text"
            placeholder="e.g. Charlotte, Greensboro, Raleigh..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && city.trim() && setStep(2)}
            autoFocus
            className="w-full px-5 py-4 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30 text-lg text-center"
          />
          <button onClick={() => setStep(2)} disabled={!city.trim()} className="btn-primary w-full justify-center mt-4 disabled:opacity-40 text-base py-4">
            Next <ChevronRight size={18} />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-2xl shadow-elegant p-8 lg:p-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-spa-lavender flex items-center justify-center mx-auto mb-4">
              <MapPin size={24} className="text-spa-purple" />
            </div>
            <h2 className="font-serif text-2xl text-spa-charcoal">Which state?</h2>
            <p className="text-spa-gray text-sm mt-2">Searching near <span className="text-spa-purple font-medium">{city}</span></p>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-8 gap-2 max-h-64 overflow-y-auto">
            {US_STATES.map((s) => (
              <button key={s} onClick={() => { setState(s); setStep(3); }}
                className={`py-2 rounded-lg text-sm font-medium transition-all ${state === s ? 'bg-spa-purple text-white' : 'bg-spa-lavender text-spa-charcoal hover:bg-spa-purple/20'}`}>
                {s}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="text-spa-gray text-sm mt-6 hover:text-spa-purple transition-colors mx-auto block">← Back</button>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white rounded-2xl shadow-elegant p-8 lg:p-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-spa-lavender flex items-center justify-center mx-auto mb-4">
              <Star size={24} className="text-spa-purple" />
            </div>
            <h2 className="font-serif text-2xl text-spa-charcoal">What are you looking for?</h2>
            <p className="text-spa-gray text-sm mt-2">Searching in <span className="text-spa-purple font-medium">{city}, {state}</span></p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CATEGORIES.map((cat) => (
              <button key={cat.label} onClick={() => handleCategorySelect(cat.label)}
                className="flex flex-col items-center gap-2 p-4 bg-spa-lavender hover:bg-spa-purple hover:text-white rounded-xl text-spa-charcoal transition-all group">
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-xs font-medium text-center leading-tight">{cat.label}</span>
              </button>
            ))}
          </div>
          <button onClick={() => setStep(2)} className="text-spa-gray text-sm mt-6 hover:text-spa-purple transition-colors mx-auto block">← Back</button>
        </div>
      )}

      {step === 4 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-serif text-2xl text-spa-charcoal">
                {selectedCategory} <span className="text-spa-purple">near {city}, {state}</span>
              </h2>
              {searched && !loading && (
                <p className="text-sm text-spa-gray mt-1">
                  {nearbyVendors.length > 0 ? nearbyVendors.length + ' Spa-Pregio member' + (nearbyVendors.length !== 1 ? 's' : '') + ' within ' + RADIUS_MILES + ' miles' + (results.length > 0 ? ' · ' + results.length + ' Google results' : '') : results.length + ' results found'}
                </p>
              )}
            </div>
            <button onClick={resetSearch} className="text-sm text-spa-purple hover:underline flex items-center gap-1">← New search</button>
          </div>

          {loading && (
            <div className="text-center py-20">
              <Loader size={36} className="animate-spin text-spa-purple mx-auto mb-4" />
              <p className="text-spa-gray">Finding {selectedCategory} near {city}, {state}...</p>
            </div>
          )}

          {searched && !loading && !hasResults && nearbyVendors.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl">
              <MapPin size={40} className="text-spa-purple/30 mx-auto mb-4" />
              <h3 className="font-serif text-xl text-spa-charcoal">No results found</h3>
              <p className="text-spa-gray mt-2 mb-6">Try a nearby city or different category.</p>
              <button onClick={resetSearch} className="btn-primary inline-flex justify-center">Search Again <ArrowRight size={16} /></button>
            </div>
          )}

          {searched && !loading && (hasResults || nearbyVendors.length > 0) && (
            <div className="mb-8 rounded-2xl overflow-hidden border border-spa-purple/20 shadow-elegant">
              <div className="bg-spa-purple/5 px-4 py-2.5 flex items-center justify-between border-b border-spa-purple/10">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-spa-purple" />
                  <span className="text-xs font-medium text-spa-purple uppercase tracking-wider">
                    {selectedCategory} near {city}, {state}
                  </span>
                </div>
                <span className="text-xs text-spa-gray">Pan &amp; zoom to explore · Click any pin for details</span>
              </div>
              <iframe
                width="100%"
                height="400"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={'https://www.google.com/maps/embed/v1/search?key=' + apiKey + '&q=' + encodeURIComponent(selectedCategory + ' near ' + city + ' ' + state) + '&zoom=11'}
              />
              {nearbyVendors.length > 0 && (
                <div className="bg-white px-4 py-3 flex flex-wrap gap-2 border-t border-spa-purple/10">
                  <span className="text-xs text-spa-gray self-center mr-1">Spa-Pregio members nearby:</span>
                  {nearbyVendors.map(v => (
                    <div key={v.id} className="flex items-center gap-1.5 px-3 py-1 bg-spa-purple/10 rounded-full text-xs text-spa-purple font-medium">
                      <div className="w-2 h-2 rounded-full bg-spa-purple flex-shrink-0" />
                      {v.business_name} <span className="opacity-60">{Math.round(v.distanceMiles)}mi</span>
                    </div>
                  ))}
                </div>
              )}
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
                  <div key={vendor.id} className="bg-white rounded-2xl overflow-hidden border-2 border-spa-purple/20 shadow-elegant">
                    <div className="aspect-[4/3] bg-gradient-to-br from-spa-lavender to-spa-blush flex items-center justify-center overflow-hidden">
                      {vendor.logo_url ? (
                        <img src={vendor.logo_url} alt={vendor.business_name} className="w-full h-full object-contain p-4" />
                      ) : (
                        <div className="text-center">
                          <div className="w-16 h-16 rounded-full bg-spa-purple/10 flex items-center justify-center mx-auto mb-2">
                            <MapPin size={28} className="text-spa-purple" />
                          </div>
                          <p className="text-xs text-spa-purple font-medium">{vendor.category}</p>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-1">
                        <Star size={10} className="fill-spa-pink text-spa-pink" />
                        <span className="text-xs text-spa-purple font-medium">Spa-Pregio Member</span>
                      </div>
                      <h3 className="font-serif text-lg text-spa-charcoal">{vendor.business_name}</h3>
                      <p className="text-xs text-spa-gray mt-1">{vendor.city}, {vendor.state}</p>
                      <div className="mt-3">
                        {vendor.contact_type === 'phone' ? (
                          <a href={'tel:' + vendor.contact_value} className="flex items-center gap-1 text-xs text-spa-gray hover:text-spa-purple transition-colors"><Phone size={12} /> {vendor.contact_value}</a>
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
              {spaResults.length > 0 && (
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px flex-1 bg-spa-gray/20" />
                  <span className="text-xs text-spa-gray bg-spa-cream px-4 py-1.5 rounded-full">More local results from Google</span>
                  <div className="h-px flex-1 bg-spa-gray/20" />
                </div>
              )}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((place) => (
                  <div key={place.place_id} className="bg-white rounded-2xl overflow-hidden shadow-elegant group">
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
                          <span className={'px-3 py-1 text-xs rounded-full font-medium ' + (place.open_now ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')}>
                            {place.open_now ? 'Open Now' : 'Closed'}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-lg text-spa-charcoal">{place.name}</h3>
                      <p className="text-xs text-spa-gray mt-1 truncate">{place.vicinity}</p>
                      {place.rating && (
                        <div className="flex items-center gap-1 mt-2">
                          <Star size={13} className="text-amber-400 fill-amber-400" />
                          <span className="text-sm font-medium text-spa-charcoal">{place.rating}</span>
                          <span className="text-xs text-spa-gray">({place.user_ratings_total?.toLocaleString()})</span>
                        </div>
                      )}
                      <div className="flex gap-3 mt-3">
                        {place.formatted_phone_number && (
                          <a href={'tel:' + place.formatted_phone_number} className="flex items-center gap-1 text-xs text-spa-gray hover:text-spa-purple transition-colors"><Phone size={12} /> Call</a>
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
        </div>
      )}

      {claimPlace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spa-charcoal/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-serif text-2xl text-spa-charcoal">Claim Your Listing</h3>
                  <p className="text-sm text-spa-gray mt-1">{claimPlace.name}</p>
                </div>
                <button onClick={() => { setClaimPlace(null); setClaimStatus('idle'); }} className="w-8 h-8 rounded-full bg-spa-lavender flex items-center justify-center text-spa-gray hover:text-spa-charcoal">
                  <X size={18} />
                </button>
              </div>
              {claimStatus === 'noauth' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-spa-purple/10 flex items-center justify-center mx-auto mb-4"><Globe size={28} className="text-spa-purple" /></div>
                  <h4 className="font-serif text-xl text-spa-charcoal mb-2">Account Required</h4>
                  <p className="text-spa-gray text-sm mb-6">You need a free Spa-Pregio account to claim your listing.</p>
                  <a href="/my-account" className="btn-primary inline-flex justify-center">Create Free Account <ArrowRight size={16} /></a>
                </div>
              )}
              {claimStatus === 'success' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-spa-purple/10 flex items-center justify-center mx-auto mb-4"><Check size={28} className="text-spa-purple" /></div>
                  <h4 className="font-serif text-xl text-spa-charcoal mb-2">Claim Submitted!</h4>
                  <p className="text-spa-gray text-sm">We'll review your listing within 1-2 business days.</p>
                </div>
              )}
              {(claimStatus === 'idle' || claimStatus === 'loading' || claimStatus === 'error') && (
                <form onSubmit={handleClaimSubmit} className="space-y-4">
                  <div className="bg-spa-lavender rounded-xl p-4">
                    <p className="text-xs uppercase tracking-wider text-spa-purple font-medium mb-1">From Google Places</p>
                    <p className="text-sm text-spa-charcoal font-medium">{claimPlace.name}</p>
                    <p className="text-xs text-spa-gray">{claimPlace.vicinity}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">Business Description *</label>
                    <textarea rows={3} required placeholder="Tell expectant mothers about your business..." value={claimForm.business_description} onChange={(e) => setClaimForm({...claimForm, business_description: e.target.value})} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30 resize-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-spa-charcoal mb-1">Phone</label>
                      <input type="tel" placeholder="(555) 000-0000" value={claimForm.phone} onChange={(e) => setClaimForm({...claimForm, phone: e.target.value})} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-spa-charcoal mb-1">Website</label>
                      <input type="url" placeholder="https://" value={claimForm.website} onChange={(e) => setClaimForm({...claimForm, website: e.target.value})} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <Instagram size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-spa-purple" />
                      <input type="text" placeholder="Instagram handle" value={claimForm.instagram} onChange={(e) => setClaimForm({...claimForm, instagram: e.target.value})} className="w-full pl-9 pr-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                    </div>
                    <div className="relative">
                      <Facebook size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-spa-purple" />
                      <input type="text" placeholder="Facebook page URL" value={claimForm.facebook} onChange={(e) => setClaimForm({...claimForm, facebook: e.target.value})} className="w-full pl-9 pr-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-2">Service Categories *</label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICE_CATEGORIES.map((cat) => (
                        <button key={cat} type="button" onClick={() => setClaimForm(prev => ({...prev, service_categories: prev.service_categories.includes(cat) ? prev.service_categories.filter(c => c !== cat) : [...prev.service_categories, cat]}))} className={'px-3 py-1.5 rounded-full text-xs font-medium transition-colors ' + (claimForm.service_categories.includes(cat) ? 'bg-spa-purple text-white' : 'bg-spa-lavender text-spa-charcoal hover:bg-spa-purple/10')}>
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  {claimError && <p className="text-red-500 text-sm">{claimError}</p>}
                  <button type="submit" disabled={claimStatus === 'loading' || claimForm.service_categories.length === 0} className="btn-primary w-full justify-center disabled:opacity-50">
                    {claimStatus === 'loading' ? <><Loader size={16} className="animate-spin" /> Submitting...</> : <>Submit Claim <ArrowRight size={16} /></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
