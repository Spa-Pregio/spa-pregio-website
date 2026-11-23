import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Star,
  Phone,
  Globe,
  ArrowRight,
  Loader,
  X,
  Check,
  Instagram,
  Facebook,
  Navigation,
  Search,
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export const VENDOR_CATEGORIES = [
  { label: 'Maternity Boutiques', emoji: '👗', query: 'maternity boutique clothing' },
  { label: 'Local Crafters', emoji: '🧶', query: 'handmade gifts local crafter baby' },
  { label: 'Spas & Wellness', emoji: '💆‍♀️', query: 'prenatal spa wellness' },
  { label: 'Photographers', emoji: '📸', query: 'maternity photographer' },
  { label: 'Caterers & Bakers', emoji: '🎂', query: 'baby shower catering bakery' },
  { label: 'Event Venues', emoji: '🏡', query: 'event venue baby shower' },
  { label: 'Florists', emoji: '💐', query: 'florist baby shower' },
  { label: 'Party Planners', emoji: '🎉', query: 'baby shower party planner' },
  { label: 'Realtors', emoji: '🔑', query: 'family realtor home buying' },
  { label: 'Pediatricians', emoji: '👶', query: 'pediatrician newborn care' },
  { label: 'OB-GYN & Midwives', emoji: '🏥', query: 'obgyn midwife prenatal' },
  { label: 'Doulas', emoji: '🤱', query: 'birth doula postpartum doula' },
  { label: 'Lactation Consultants', emoji: '🍼', query: 'lactation consultant breastfeeding' },
  { label: 'Postpartum Support', emoji: '💜', query: 'postpartum support new mother' },
  { label: 'Family Therapists & Counselors', emoji: '🌿', query: 'family therapist maternal counselor' },
  { label: 'Insurance Agents', emoji: '🛡️', query: 'family life health insurance agent' },
  { label: 'House Cleaning Services', emoji: '🏠', query: 'house cleaning service' },
  { label: 'Estate Planning & Attorneys', emoji: '📄', query: 'estate planning family attorney' },
];

const RADIUS_MILES = 25;

function distanceMiles(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatCleanAddress(address: string): string {
  return address.replace(/,\s*(USA|United States)$/i, '').trim();
}

function parseLocationInput(raw: string): { city: string; state: string; zip?: string } {
  const trimmed = raw.trim();
  const zipMatch = trimmed.match(/\b(\d{5})\b/);
  const zip = zipMatch ? zipMatch[1] : undefined;

  const parts = trimmed
    .replace(/\b\d{5}\b/, '')
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);

  if (parts.length >= 2) {
    return {
      city: parts[0],
      state: parts[1].replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase(),
      zip,
    };
  }

  return {
    city: parts[0] || '',
    state: '',
    zip,
  };
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

interface LocalVendorSearchProps {
  initialCategory?: string;
}

export default function LocalVendorSearch({ initialCategory = 'All' }: LocalVendorSearchProps) {
  const [locationInput, setLocationInput] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [activeZip, setActiveZip] = useState('');
  const [locating, setLocating] = useState(false);
  const [locationNotice, setLocationNotice] = useState('');

  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory && initialCategory !== 'All' ? initialCategory : 'Spas & Wellness'
  );
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [spaResults, setSpaResults] = useState<SupabaseVendor[]>([]);
  const [nearbyVendors, setNearbyVendors] = useState<VendorWithCoords[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

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

  const apiKey = (import.meta as any).env?.VITE_GOOGLE_PLACES_API_KEY || '';

  const geocode = useCallback(
    async (address: string): Promise<{ lat: number; lng: number } | null> => {
      if (!apiKey || !address.trim()) return null;
      try {
        const res = await fetch(
          'https://maps.googleapis.com/maps/api/geocode/json?address=' +
            encodeURIComponent(address) +
            '&key=' +
            apiKey
        );
        const data = await res.json();
        if (data.results?.[0]?.geometry?.location) return data.results[0].geometry.location;
      } catch (e) {
        console.warn('Geocode failed:', e);
      }
      return null;
    },
    [apiKey]
  );

  const resolveZipToCityState = async (zip5: string): Promise<{ city: string; state: string } | null> => {
    try {
      const res = await fetch(`https://api.zippopotam.us/us/${zip5}`); if (!res.ok) return null; const data = await res.json(); const place = data?.places?.[0]; if (!place) return null; return { city: place['place name'] \vert{}\vert{} '', state: (place['state abbreviation'] \vert{}\vert{} '').toUpperCase(), }; } catch { return null; } };  const detectLocationByIp = useCallback(async (isAutoOnMount = false) => { setLocating(true); if (!isAutoOnMount) setLocationNotice(''); try { const res = await fetch('https://freeipapi.com/api/json'); if (!res.ok) throw new Error('IP lookup failed'); const data = await res.json(); const detectedCity = (data.cityName \vert{}\vert{} data.city \vert{}\vert{} '').trim(); const rawRegion = (data.regionName \vert{}\vert{} data.region \vert{}\vert{} data.regionCode \vert{}\vert{} '').trim(); const detectedState = rawRegion.length === 2 ? rawRegion.toUpperCase() : (data.regionCode \vert{}\vert{} '').toUpperCase(); const detectedZip = (data.zipCode \vert{}\vert{} '').trim();  if (detectedCity) { setCity(detectedCity); setState(detectedState); setActiveZip(detectedZip); setLocationInput(detectedState ? `${detectedCity}, ${detectedState}` : detectedCity); if (!isAutoOnMount) { setLocationNotice(`Detected ${detectedCity}${detectedState ? `, ${detectedState}` : ''}`); } return { city: detectedCity, state: detectedState, zip: detectedZip }; } if (!isAutoOnMount) { setLocationNotice('Could not detect your location automatically. Enter a ZIP code or city.'); } } catch { if (!isAutoOnMount) { setLocationNotice('Could not detect your location automatically. Enter a ZIP code or city.'); } } finally { setLocating(false); } return null; }, []);  const runSearch = useCallback( async (cat: string, targetCity: string, targetState: string, targetZip = '') => { const cleanCity = targetCity.trim(); const cleanState = targetState.trim().toUpperCase(); if (!cleanCity && !targetZip) return;  const locationLabel = [cleanCity, cleanState].filter(Boolean).join(', ') \vert{}\vert{} targetZip;  setLoading(true); setSearched(false); setResults([]); setSpaResults([]); setNearbyVendors([]);  const center = await geocode(targetZip ? `${targetZip} ${locationLabel}` : locationLabel);  let vendorQuery = supabase.from('vendors').select('*').eq('status', 'active'); if (cat && cat !== 'All') { vendorQuery = vendorQuery.ilike('category', `\%${cat}%`);
      }
      const { data: allVendors } = await vendorQuery;

      if (allVendors && allVendors.length > 0) {
        if (center) {
          const withCoords: VendorWithCoords[] = [];
          await Promise.all(
            allVendors.map(async (v: SupabaseVendor) => {
              const addr = v.city && v.state ? `${v.city},${v.state}` : v.city || '';
              if (!addr) return;
              const coords = await geocode(addr);
              if (!coords) return;
              const dist = distanceMiles(center.lat, center.lng, coords.lat, coords.lng);
              withCoords.push({ ...v, lat: coords.lat, lng: coords.lng, distanceMiles: dist });
            })
          );

          const inRadius = withCoords
            .filter((v) => v.distanceMiles <= RADIUS_MILES)
            .sort((a, b) => a.distanceMiles - b.distanceMiles);

          setNearbyVendors(inRadius);

          const exactMatch = inRadius.filter(
            (v) =>
              v.city.toLowerCase() === cleanCity.toLowerCase() &&
              (!cleanState || v.state.toLowerCase() === cleanState.toLowerCase())
          );
          setSpaResults(exactMatch.length > 0 ? exactMatch : inRadius);
        } else if (cleanCity) {
          const exact = allVendors.filter(
            (v: SupabaseVendor) =>
              v.city?.toLowerCase() === cleanCity.toLowerCase() &&
              (!cleanState || v.state?.toLowerCase() === cleanState.toLowerCase())
          );
          setSpaResults(exact);
        }
      }

      const categoryData = VENDOR_CATEGORIES.find((c) => c.label === cat);
      const searchTerm = cat && cat !== 'All' ? categoryData?.query || cat : 'maternity baby shower wellness vendor';
      const fullQuery = `${searchTerm} in${locationLabel}`;

      if (apiKey) {
        try {
          const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Goog-Api-Key': apiKey,
              'X-Goog-FieldMask':
                'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.photos,places.currentOpeningHours,places.websiteUri,places.nationalPhoneNumber',
            },
            body: JSON.stringify({ textQuery: fullQuery, maxResultCount: 9 }),
          });
          const data = await res.json();
          if (data.places) {
            setResults(
              data.places.map((p: any) => ({
                place_id: p.id,
                name: p.displayName?.text || '',
                vicinity: formatCleanAddress(p.formattedAddress || ''),
                rating: p.rating,
                user_ratings_total: p.userRatingCount,
                photo_url: p.photos?.[0]
                  ? 'https://places.googleapis.com/v1/' +
                    p.photos[0].name +
                    '/media?maxWidthPx=400&key=' +
                    apiKey
                  : undefined,
                open_now: p.currentOpeningHours?.openNow,
                website: p.websiteUri,
                formatted_phone_number: p.nationalPhoneNumber,
              }))
            );
          }
        } catch (e) {
          console.warn('Places search failed:', e);
        }
      }

      setLoading(false);
      setSearched(true);
    },
    [apiKey, geocode]
  );

  // Auto-detect visitor location on initial load and run initial search once resolved
  useEffect(() => {
    let active = true;
    (async () => {
      const detected = await detectLocationByIp(true);
      if (!active) return;
      if (detected?.city) {
        await runSearch(selectedCategory, detected.city, detected.state || '', detected.zip || '');
      }
    })();
    return () => {
      active = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update category if URL query param changes
  useEffect(() => {
    if (initialCategory && initialCategory !== 'All') {
      const matched = VENDOR_CATEGORIES.find(
        (c) => c.label.toLowerCase() === initialCategory.toLowerCase()
      );
      const nextCat = matched ? matched.label : initialCategory;
      setSelectedCategory(nextCat);
      if (city || activeZip) {
        runSearch(nextCat, city, state, activeZip);
      }
    }
  }, [initialCategory]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLocationSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const raw = locationInput.trim();
    if (!raw) return;

    setLocationNotice('');
    const parsed = parseLocationInput(raw);

    if (parsed.zip && parsed.zip.length === 5) {
      const resolved = await resolveZipToCityState(parsed.zip);
      if (resolved?.city) {
        setCity(resolved.city);
        setState(resolved.state);
        setActiveZip(parsed.zip);
        setLocationInput(`${resolved.city},${resolved.state} (${parsed.zip})`); await runSearch(selectedCategory, resolved.city, resolved.state, parsed.zip); return; } setLocationNotice('Could not look up that ZIP code — searching by entry instead.'); }  setCity(parsed.city); setState(parsed.state); setActiveZip(parsed.zip \vert{}\vert{} ''); await runSearch(selectedCategory, parsed.city, parsed.state, parsed.zip \vert{}\vert{} ''); };  const handleManualIpLocation = async () => { const detected = await detectLocationByIp(false); if (detected?.city) { await runSearch(selectedCategory, detected.city, detected.state \vert{}\vert{} '', detected.zip \vert{}\vert{} ''); } };  const handleCategoryClick = async (catLabel: string) => { setSelectedCategory(catLabel); if (city \vert{}\vert{} activeZip) { await runSearch(catLabel, city, state, activeZip); } else if (locationInput.trim()) { const parsed = parseLocationInput(locationInput); setCity(parsed.city); setState(parsed.state); await runSearch(catLabel, parsed.city, parsed.state, parsed.zip \vert{}\vert{} ''); } else { setLocationNotice('Enter a ZIP code or city above (or click Use my location) to search.'); } };  const openClaimModal = async (place: PlaceResult) => { const { data: { session }, } = await supabase.auth.getSession(); if (!session) { setClaimPlace(place); setClaimStatus('noauth'); return; } setClaimPlace(place); setClaimForm({ business_description: '', phone: place.formatted_phone_number \vert{}\vert{} '', website: place.website \vert{}\vert{} '', instagram: '', facebook: '', tiktok: '', service_categories: selectedCategory && selectedCategory !== 'All' ? [selectedCategory] : [], }); setClaimStatus('idle'); setClaimError(''); };  const handleClaimSubmit = async (e: React.FormEvent) => { e.preventDefault(); if (!claimPlace) return; setClaimStatus('loading'); const { data: { session }, } = await supabase.auth.getSession(); if (!session) { setClaimStatus('noauth'); return; } const { error } = await supabase.from('vendor_profiles').upsert({ user_id: session.user.id, google_place_id: claimPlace.place_id, business_name: claimPlace.name, address: claimPlace.vicinity, phone: claimForm.phone, website: claimForm.website, business_description: claimForm.business_description, instagram: claimForm.instagram, facebook: claimForm.facebook, tiktok: claimForm.tiktok, service_categories: claimForm.service_categories, google_rating: claimPlace.rating \vert{}\vert{} null, claimed: true, approved: false, submitted_at: new Date().toISOString(), }); if (error) { setClaimError(error.message); setClaimStatus('error'); } else { setClaimStatus('success'); } };  const activeLocationLabel = [city, state].filter(Boolean).join(', ') \vert{}\vert{} activeZip \vert{}\vert{} 'your area'; const hasResults = spaResults.length > 0 \vert{}\vert{} results.length > 0;  return ( <div className="w-full space-y-6"> {/* 1-Step Location (ZIP or City) + IP Location Bar */} <div className="bg-white rounded-2xl shadow-elegant p-5 sm:p-6 border border-spa-purple/10"> <form onSubmit={handleLocationSubmit} className="flex flex-col md:flex-row gap-3"> <div className="relative flex-1"> <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-spa-purple pointer-events-none" /> <input type="text" value={locationInput} onChange={(e) => setLocationInput(e.target.value)} placeholder="Enter 5-digit ZIP code or City, ST (e.g., 27370 or Trinity, NC)" aria-label="ZIP code or City and State" className="w-full pl-11 pr-4 py-3.5 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30 text-sm sm:text-base" /> </div>  <button type="button" onClick={handleManualIpLocation} disabled={locating} className="px-4 py-3.5 rounded-xl bg-spa-lavender hover:bg-spa-purple/10 text-spa-charcoal text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap disabled:opacity-50" > {locating ? ( <Loader size={16} className="animate-spin text-spa-purple" /> ) : ( <Navigation size={16} className="text-spa-purple" /> )} <span>{locating ? 'Locating...' : 'Use my location'}</span> </button>  <button type="submit" disabled={loading \vert{}\vert{} !locationInput.trim()} className="btn-primary justify-center px-6 py-3.5 text-sm sm:text-base whitespace-nowrap disabled:opacity-40" > <Search size={16} /> <span>Search</span> </button> </form>  {locationNotice && ( <p className="text-xs text-spa-purple mt-2.5 px-1">{locationNotice}</p> )}  {/* Inline Category Pills (Aligned with Vendor Listings) */} <div className="mt-5 pt-4 border-t border-spa-charcoal/5"> <div className="flex items-center justify-between mb-2.5"> <span className="text-xs font-semibold uppercase tracking-wider text-spa-gray"> Category </span> {activeZip && city && ( <span className="text-xs text-spa-purple font-medium"> ZIP {activeZip} → {city} {state ? `, ${state}` : ''}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {VENDOR_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => handleCategoryClick(cat.label)}
                  className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium inline-flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-spa-purple text-white shadow-sm'
                      : 'bg-spa-lavender text
