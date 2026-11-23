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
      const res = await fetch('https://api.zippopotam.us/us/' + zip5);
      if (!res.ok) return null;
      const data = await res.json();
      const place = data?.places?.[0];
      if (!place) return null;
      return {
        city: place['place name'] || '',
        state: (place['state abbreviation'] || '').toUpperCase(),
      };
    } catch {
      return null;
    }
  };

  const detectLocationByIp = useCallback(async (isAutoOnMount = false) => {
    setLocating(true);
    if (!isAutoOnMount) setLocationNotice('');
    try {
      const res = await fetch('https://freeipapi.com/api/json');
      if (!res.ok) throw new Error('IP lookup failed');
      const data = await res.json();
      const detectedCity = (data.cityName || data.city || '').trim();
      const rawRegion = (data.regionName || data.region || data.regionCode || '').trim();
      const detectedState =
        rawRegion.length === 2
          ? rawRegion.toUpperCase()
          : (data.regionCode || '').toUpperCase();
      const detectedZip = (data.zipCode || '').trim();

      if (detectedCity) {
        setCity(detectedCity);
        setState(detectedState);
        setActiveZip(detectedZip);
        setLocationInput(detectedState ? detectedCity + ', ' + detectedState : detectedCity);
        if (!isAutoOnMount) {
          setLocationNotice('Detected ' + detectedCity + (detectedState ? ', ' + detectedState : ''));
        }
        return { city: detectedCity, state: detectedState, zip: detectedZip };
      }
      if (!isAutoOnMount) {
        setLocationNotice('Could not detect your location automatically. Enter a ZIP code or city.');
      }
    } catch {
      if (!isAutoOnMount) {
        setLocationNotice('Could not detect your location automatically. Enter a ZIP code or city.');
      }
    } finally {
      setLocating(false);
    }
    return null;
  }, []);

  const runSearch = useCallback(
    async (cat: string, targetCity: string, targetState: string, targetZip = '') => {
      const cleanCity = targetCity.trim();
      const cleanState = targetState.trim().toUpperCase();
      if (!cleanCity && !targetZip) return;

      const locationLabel = [cleanCity, cleanState].filter(Boolean).join(', ') || targetZip;

      setLoading(true);
      setSearched(false);
      setResults([]);
      setSpaResults([]);
      setNearbyVendors([]);

      const center = await geocode(targetZip ? targetZip + ' ' + locationLabel : locationLabel);

      let vendorQuery = supabase.from('vendors').select('*').eq('status', 'active');
      if (cat && cat !== 'All') {
        vendorQuery = vendorQuery.ilike('category', '%' + cat + '%');
      }
      const { data: allVendors } = await vendorQuery;

      if (allVendors && allVendors.length > 0) {
        if (center) {
          const withCoords: VendorWithCoords[] = [];
          await Promise.all(
            allVendors.map(async (v: SupabaseVendor) => {
              const addr = v.city && v.state ? v.city + ', ' + v.state : v.city || '';
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
      const searchTerm =
        cat && cat !== 'All' ? categoryData?.query || cat : 'maternity baby shower wellness vendor';
      const fullQuery = searchTerm + ' in ' + locationLabel;

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
  }, []);

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
  }, [initialCategory]);

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
        setLocationInput(resolved.city + ', ' + resolved.state + ' (' + parsed.zip + ')');
        await runSearch(selectedCategory, resolved.city, resolved.state, parsed.zip);
        return;
      }
      setLocationNotice('Could not look up that ZIP code - searching by entry instead.');
    }

    setCity(parsed.city);
    setState(parsed.state);
    setActiveZip(parsed.zip || '');
    await runSearch(selectedCategory, parsed.city, parsed.state, parsed.zip || '');
  };

  const handleManualIpLocation = async () => {
    const detected = await detectLocationByIp(false);
    if (detected?.city) {
      await runSearch(selectedCategory, detected.city, detected.state || '', detected.zip || '');
    }
  };

  const handleCategoryClick = async (catLabel: string) => {
    setSelectedCategory(catLabel);
    if (city || activeZip) {
      await runSearch(catLabel, city, state, activeZip);
    } else if (locationInput.trim()) {
      const parsed = parseLocationInput(locationInput);
      setCity(parsed.city);
      setState(parsed.state);
      await runSearch(catLabel, parsed.city, parsed.state, parsed.zip || '');
    } else {
      setLocationNotice('Enter a ZIP code or city above (or click Use my location) to search.');
    }
  };

  const openClaimModal = async (place: PlaceResult) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
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
      service_categories: selectedCategory && selectedCategory !== 'All' ? [selectedCategory] : [],
    });
    setClaimStatus('idle');
    setClaimError('');
  };

  const handleClaimSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimPlace) return;
    setClaimStatus('loading');
    const {
      data: { session },
    } = await supabase.auth.getSession();
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

  const activeLocationLabel =
    [city, state].filter(Boolean).join(', ') || activeZip || 'your area';
  const hasResults = spaResults.length > 0 || results.length > 0;

  return (
    <div className="w-full space-y-6">
      <div className="bg-white rounded-2xl shadow-elegant p-5 sm:p-6 border border-spa-purple/10">
        <form onSubmit={handleLocationSubmit} className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <MapPin
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-spa-purple pointer-events-none"
            />
            <input
              type="text"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              placeholder="Enter 5-digit ZIP code or City, ST (e.g., 27370 or Trinity, NC)"
              aria-label="ZIP code or City and State"
              className="w-full pl-11 pr-4 py-3.5 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30 text-sm sm:text-base"
            />
          </div>

          <button
            type="button"
            onClick={handleManualIpLocation}
            disabled={locating}
            className="px-4 py-3.5 rounded-xl bg-spa-lavender hover:bg-spa-purple/10 text-spa-charcoal text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap disabled:opacity-50"
          >
            {locating ? (
              <Loader size={16} className="animate-spin text-spa-purple" />
            ) : (
              <Navigation size={16} className="text-spa-purple" />
            )}
            <span>{locating ? 'Locating...' : 'Use my location'}</span>
          </button>

          <button
            type="submit"
            disabled={loading || !locationInput.trim()}
            className="btn-primary justify-center px-6 py-3.5 text-sm sm:text-base whitespace-nowrap disabled:opacity-40"
          >
            <Search size={16} />
            <span>Search</span>
          </button>
        </form>

        {locationNotice && (
          <p className="text-xs text-spa-purple mt-2.5 px-1">{locationNotice}</p>
        )}

        <div className="mt-5 pt-4 border-t border-spa-charcoal/5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-spa-gray">
              Category
            </span>
            {activeZip && city && (
              <span className="text-xs text-spa-purple font-medium">
                ZIP {activeZip} -&gt; {city}
                {state ? ', ' + state : ''}
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
                  className={
                    'px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium inline-flex items-center gap-1.5 transition-all ' +
                    (isActive
                      ? 'bg-spa-purple text-white shadow-sm'
                      : 'bg-spa-lavender text-spa-charcoal hover:bg-spa-purple/15')
                  }
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-spa-charcoal">
              {selectedCategory}{' '}
              <span className="text-spa-purple">near {activeLocationLabel}</span>
            </h2>
            {searched && !loading && (
              <p className="text-sm text-spa-gray mt-1">
                {nearbyVendors.length > 0
                  ? nearbyVendors.length +
                    ' Spa-Pregio member' +
                    (nearbyVendors.length !== 1 ? 's' : '') +
                    ' within ' +
                    RADIUS_MILES +
                    ' miles' +
                    (results.length > 0 ? ' | ' + results.length + ' local directory picks' : '')
                  : results.length + ' local directory picks'}
              </p>
            )}
          </div>
        </div>

        {(loading || locating) && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-elegant">
            <Loader size={36} className="animate-spin text-spa-purple mx-auto mb-4" />
            <p className="text-spa-gray">
              Finding {selectedCategory} near {activeLocationLabel}...
            </p>
          </div>
        )}

        {searched && !loading && !locating && !hasResults && nearbyVendors.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-elegant px-6">
            <MapPin size={40} className="text-spa-purple/30 mx-auto mb-4" />
            <h3 className="font-serif text-xl text-spa-charcoal">No local listings found yet</h3>
            <p className="text-spa-gray mt-2 mb-6 max-w-md mx-auto">
              Try another ZIP code or city nearby, switch categories above, or list your business first.
            </p>
            <Link to="/vendors" className="btn-primary inline-flex justify-center">
              List Your Business Free <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {searched && !loading && !locating && (hasResults || nearbyVendors.length > 0) && (
          <div className="mb-8 rounded-2xl overflow-hidden border border-spa-purple/20 shadow-elegant">
            <div className="bg-spa-purple/5 px-4 py-2.5 flex items-center justify-between border-b border-spa-purple/10">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-spa-purple" />
                <span className="text-xs font-medium text-spa-purple uppercase tracking-wider">
                  {selectedCategory} near {activeLocationLabel}
                </span>
              </div>
              <span className="text-xs text-spa-gray">Pan &amp; zoom to explore</span>
            </div>
            <iframe
              width="100%"
              height="380"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={
                'https://www.google.com/maps/embed/v1/search?key=' +
                apiKey +
                '&q=' +
                encodeURIComponent(selectedCategory + ' near ' + activeLocationLabel) +
                '&zoom=11'
              }
            />
            {nearbyVendors.length > 0 && (
              <div className="bg-white px-4 py-3 flex flex-wrap gap-2 border-t border-spa-purple/10">
                <span className="text-xs text-spa-gray self-center mr-1">
                  Spa-Pregio members nearby:
                </span>
                {nearbyVendors.map((v) => (
                  <div
                    key={v.id}
                    className="flex items-center gap-1.5 px-3 py-1 bg-spa-purple/10 rounded-full text-xs text-spa-purple font-medium"
                  >
                    <div className="w-2 h-2 rounded-full bg-spa-purple flex-shrink-0" />
                    {v.business_name}{' '}
                    <span className="opacity-60">{Math.round(v.distanceMiles)}mi</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {searched && !loading && !locating && spaResults.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-spa-purple/20" />
              <div className="flex items-center gap-2 bg-spa-purple rounded-full px-4 py-1.5">
                <Star size={14} className="text-spa-pink fill-spa-pink" />
                <span className="text-white text-xs font-medium uppercase tracking-wide">
                  Spa-Pregio Members
                </span>
              </div>
              <div className="h-px flex-1 bg-spa-purple/20" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {spaResults.map((vendor) => (
                <div
                  key={vendor.id}
                  className="bg-white rounded-2xl overflow-hidden border-2 border-spa-purple/20 shadow-elegant"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-spa-lavender to-spa-blush flex items-center justify-center overflow-hidden">
                    {vendor.logo_url ? (
                      <img
                        src={vendor.logo_url}
                        alt={vendor.business_name}
                        className="w-full h-full object-contain p-4"
                      />
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
                    <p className="text-xs text-spa-gray mt-1">
                      {vendor.city}, {vendor.state}
                    </p>
                    <div className="mt-3">
                      {vendor.contact_type === 'phone' ? (
                        <a
                          href={'tel:' + vendor.contact_value}
                          className="flex items-center gap-1 text-xs text-spa-gray hover:text-spa-purple transition-colors"
                        >
                          <Phone size={12} /> {vendor.contact_value}
                        </a>
                      ) : (
                        <a
                          href={vendor.contact_value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-spa-gray hover:text-spa-purple transition-colors"
                        >
                          <Globe size={12} /> Visit Website
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {searched && !loading && !locating && results.length > 0 && (
          <div>
            {spaResults.length > 0 && (
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px flex-1 bg-spa-gray/20" />
                <span className="text-xs text-spa-gray bg-spa-cream px-4 py-1.5 rounded-full">
                  Local businesses near {activeLocationLabel}
                </span>
                <div className="h-px flex-1 bg-spa-gray/20" />
              </div>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((place) => (
                <div
                  key={place.place_id}
                  className="bg-white rounded-2xl overflow-hidden shadow-elegant group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-spa-lavender">
                    {place.photo_url ? (
                      <img
                        src={place.photo_url}
                        alt={place.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <MapPin size={40} className="text-spa-purple/30" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-spa-purple text-xs rounded-full font-medium shadow-sm">
                        Local Pick
                      </span>
                    </div>
                    {place.open_now === true && (
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 text-xs rounded-full font-medium bg-emerald-100 text-emerald-800 shadow-sm">
                          Open Now
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg text-spa-charcoal">{place.name}</h3>
                    <p className="text-xs text-spa-gray mt-1 truncate">
                      {formatCleanAddress(place.vicinity)}
                    </p>
                    {place.rating && (
                      <div className="flex items-center gap-1 mt-2">
                        <Star size={13} className="text-amber-400 fill-amber-400" />
                        <span className="text-sm font-medium text-spa-charcoal">
                          {place.rating}
                        </span>
                        {place.user_ratings_total !== undefined && (
                          <span className="text-xs text-spa-gray">
                            ({place.user_ratings_total.toLocaleString()} reviews)
                          </span>
                        )}
                      </div>
                    )}
                    <div className="flex gap-3 mt-3">
                      {place.formatted_phone_number && (
                        <a
                          href={'tel:' + place.formatted_phone_number}
                          className="flex items-center gap-1 text-xs text-spa-gray hover:text-spa-purple transition-colors"
                        >
                          <Phone size={12} /> Call
                        </a>
                      )}
                      {place.website && (
                        <a
                          href={place.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-spa-gray hover:text-spa-purple transition-colors"
                        >
                          <Globe size={12} /> Website
                        </a>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => openClaimModal(place)}
                      className="w-full mt-4 px-4 py-2.5 bg-amber-50 border border-amber-300 text-amber-800 rounded-xl text-sm font-medium hover:bg-amber-100 transition-colors flex items-center justify-center gap-2"
                    >
                      Claim &amp; Post Events Free <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {claimPlace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spa-charcoal/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-serif text-2xl text-spa-charcoal">Claim &amp; Post Events</h3>
                  <p className="text-sm text-spa-gray mt-1">{claimPlace.name}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setClaimPlace(null);
                    setClaimStatus('idle');
                  }}
                  className="w-8 h-8 rounded-full bg-spa-lavender flex items-center justify-center text-spa-gray hover:text-spa-charcoal"
                >
                  <X size={18} />
                </button>
              </div>

              {claimStatus === 'noauth' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-spa-purple/10 flex items-center justify-center mx-auto mb-4">
                    <Globe size={28} className="text-spa-purple" />
                  </div>
                  <h4 className="font-serif text-xl text-spa-charcoal mb-2">Free Account Required</h4>
                  <p className="text-spa-gray text-sm mb-6">
                    Create a free Spa-Pregio account to claim your listing and post local events.
                  </p>
                  <Link to="/my-account" className="btn-primary inline-flex justify-center">
                    Create Free Account <ArrowRight size={16} />
                  </Link>
                </div>
              )}

              {claimStatus === 'success' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-spa-purple/10 flex items-center justify-center mx-auto mb-4">
                    <Check size={28} className="text-spa-purple" />
                  </div>
                  <h4 className="font-serif text-xl text-spa-charcoal mb-2">Claim Submitted!</h4>
                  <p className="text-spa-gray text-sm mb-6">
                    We will review your listing within 1-2 business days. You can also head to your dashboard to get ready for events and listing upgrades.
                  </p>
                  <Link to="/vendor-dashboard" className="btn-primary inline-flex justify-center">
                    Go to Vendor Dashboard <ArrowRight size={16} />
                  </Link>
                </div>
              )}

              {(claimStatus === 'idle' || claimStatus === 'loading' || claimStatus === 'error') && (
                <form onSubmit={handleClaimSubmit} className="space-y-4">
                  <div className="bg-spa-lavender rounded-xl p-4">
                    <p className="text-xs uppercase tracking-wider text-spa-purple font-medium mb-1">
                      Starter Listing Details
                    </p>
                    <p className="text-sm text-spa-charcoal font-medium">{claimPlace.name}</p>
                    <p className="text-xs text-spa-gray">{formatCleanAddress(claimPlace.vicinity)}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">
                      Business Description *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Tell expectant mothers about your services, baby shower packages, or upcoming events..."
                      value={claimForm.business_description}
                      onChange={(e) =>
                        setClaimForm({ ...claimForm, business_description: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-spa-charcoal mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="(555) 000-0000"
                        value={claimForm.phone}
                        onChange={(e) => setClaimForm({ ...claimForm, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-spa-charcoal mb-1">
                        Website
                      </label>
                      <input
                        type="url"
                        placeholder="https://"
                        value={claimForm.website}
                        onChange={(e) => setClaimForm({ ...claimForm, website: e.target.value })}
                        className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="relative">
                      <Instagram
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-spa-purple"
                      />
                      <input
                        type="text"
                        placeholder="Instagram handle"
                        value={claimForm.instagram}
                        onChange={(e) =>
                          setClaimForm({ ...claimForm, instagram: e.target.value })
                        }
                        className="w-full pl-9 pr-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                      />
                    </div>
                    <div className="relative">
                      <Facebook
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-spa-purple"
                      />
                      <input
                        type="text"
                        placeholder="Facebook page URL"
                        value={claimForm.facebook}
                        onChange={(e) => setClaimForm({ ...claimForm, facebook: e.target.value })}
                        className="w-full pl-9 pr-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-2">
                      Service Categories *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {VENDOR_CATEGORIES.map((cat) => {
                        const selected = claimForm.service_categories.includes(cat.label);
                        return (
                          <button
                            key={cat.label}
                            type="button"
                            onClick={() =>
                              setClaimForm((prev) => ({
                                ...prev,
                                service_categories:
