import { useState, useEffect, useCallback, useRef } from 'react';
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
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export const VENDOR_CATEGORIES = [
  {
    label: 'Spas & Wellness',
    subtitle: 'Prenatal massage & pampering',
    emoji: '💆‍♀️',
    query: 'prenatal spa wellness',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Photographers',
    subtitle: 'Maternity & newborn portraits',
    emoji: '📸',
    query: 'maternity photographer',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Caterers & Bakers',
    subtitle: 'Custom cakes & shower spreads',
    emoji: '🎂',
    query: 'baby shower catering bakery',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Event Venues',
    subtitle: 'Intimate spaces for sip & sees',
    emoji: '🏡',
    query: 'event venue baby shower',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Maternity Boutiques',
    subtitle: 'Bump-friendly style & robes',
    emoji: '👗',
    query: 'maternity boutique clothing',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Florists',
    subtitle: 'Lush bouquets & table florals',
    emoji: '💐',
    query: 'florist baby shower',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Party Planners',
    subtitle: 'Stress-free shower styling',
    emoji: '🎉',
    query: 'baby shower party planner',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Local Crafters',
    subtitle: 'Custom keepsakes & signage',
    emoji: '🧶',
    query: 'handmade gifts local crafter baby',
    image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Doulas',
    subtitle: 'Birth & postpartum guidance',
    emoji: '🤱',
    query: 'birth doula postpartum doula',
    image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'OB-GYN & Midwives',
    subtitle: 'Trusted prenatal care',
    emoji: '🏥',
    query: 'obgyn midwife prenatal',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Lactation Consultants',
    subtitle: 'Feeding & nursing support',
    emoji: '🍼',
    query: 'lactation consultant breastfeeding',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Postpartum Support',
    subtitle: 'Fourth-trimester recovery',
    emoji: '💜',
    query: 'postpartum support new mother',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Pediatricians',
    subtitle: 'Newborn & infant doctors',
    emoji: '👶',
    query: 'pediatrician newborn care',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Family Therapists & Counselors',
    subtitle: 'Maternal & family wellbeing',
    emoji: '🌿',
    query: 'family therapist maternal counselor',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'House Cleaning Services',
    subtitle: 'Nesting & pre-baby deep cleans',
    emoji: '🏠',
    query: 'house cleaning service',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Realtors',
    subtitle: 'Room to grow for your family',
    emoji: '🔑',
    query: 'family realtor home buying',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Insurance Agents',
    subtitle: 'Family & life protection',
    emoji: '🛡️',
    query: 'family life health insurance agent',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Estate Planning & Attorneys',
    subtitle: 'Wills & guardianship peace of mind',
    emoji: '📄',
    query: 'estate planning family attorney',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
  },
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
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory && initialCategory !== 'All' ? initialCategory : 'Spas & Wellness'
  );
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [spaResults, setSpaResults] = useState<SupabaseVendor[]>([]);
  const [nearbyVendors, setNearbyVendors] = useState<VendorWithCoords[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const resultsSectionRef = useRef<HTMLDivElement>(null);

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

  const scrollCategories = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const distance = direction === 'left' ? -320 : 320;
    carouselRef.current.scrollBy({ left: distance, behavior: 'smooth' });
  };

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
      resultsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (locationInput.trim()) {
      const parsed = parseLocationInput(locationInput);
      setCity(parsed.city);
      setState(parsed.state);
      await runSearch(catLabel, parsed.city, parsed.state, parsed.zip || '');
      resultsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    <div className="w-full space-y-8">
      {/* Location Bar + Visual Category Gallery */}
      <div className="bg-white rounded-3xl shadow-elegant p-5 sm:p-7 border border-spa-purple/10">
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

        {/* Visual Photo Category Selector */}
        <div className="mt-6 pt-5 border-t border-spa-charcoal/5">
          <div className="flex items-center justify-between gap-2 mb-3.5">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-spa-purple flex items-center gap-1.5">
                <Sparkles size={13} /> Tap a category to explore
              </span>
              {activeZip && city && (
                <p className="text-xs text-spa-gray mt-0.5">
                  ZIP {activeZip} -&gt; {city}
                  {state ? ', ' + state : ''}
                </p>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-spa-gray mr-1 sm:hidden">Swipe -&gt;</span>
              <button
                type="button"
                onClick={() => scrollCategories('left')}
                aria-label="Scroll categories left"
                className="hidden sm:inline-flex w-8 h-8 rounded-full bg-spa-lavender hover:bg-spa-purple hover:text-white text-spa-charcoal items-center justify-center transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => scrollCategories('right')}
                aria-label="Scroll categories right"
                className="hidden sm:inline-flex w-8 h-8 rounded-full bg-spa-lavender hover:bg-spa-purple hover:text-white text-spa-charcoal items-center justify-center transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="flex gap-3.5 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none' }}
          >
            {VENDOR_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.label;
              const imgBroken = Boolean(failedImages[cat.label]);

              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => handleCategoryClick(cat.label)}
                  className={
                    'group relative flex-shrink-0 w-40 sm:w-44 h-48 rounded-2xl overflow-hidden text-left snap-start transition-all duration-300 focus:outline-none ' +
                    (isActive
                      ? 'ring-4 ring-spa-purple shadow-lg scale-[1.01]'
                      : 'ring-1 ring-spa-charcoal/10 hover:ring-2 hover:ring-spa-purple/50 hover:shadow-md')
                  }
                >
                  {!imgBroken ? (
                    <img
                      src={cat.image}
                      alt={cat.label}
                      loading="lazy"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [cat.label]: true }))
                      }
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-spa-lavender via-spa-blush to-spa-purple/30 flex items-center justify-center">
                      <span className="text-4xl">{cat.emoji}</span>
                    </div>
                  )}

                  {/* Editorial Gradient Overlay */}
                  <div
                    className={
                      'absolute inset-0 transition-opacity ' +
                      (isActive
                        ? 'bg-gradient-to-t from-spa-charcoal/90 via-spa-purple/40 to-transparent'
                        : 'bg-gradient-to-t from-spa-charcoal/85 via-spa-charcoal/25 to-transparent group-hover:from-spa-charcoal/90')
                    }
                  />

                  {/* Top Badge */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-sm shadow-sm">
                      {cat.emoji}
                    </span>
                    {isActive && (
                      <span className="px-2.5 py-0.5 rounded-full bg-spa-purple text-white text-[10px] font-semibold uppercase tracking-wide shadow-sm">
                        Viewing
                      </span>
                    )}
                  </div>

                  {/* Bottom Title & Subtitle */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="font-serif text-white text-base leading-snug font-medium drop-shadow-sm">
                      {cat.label}
                    </p>
                    <p className="text-white/80 text-[11px] leading-tight mt-0.5 line-clamp-1">
                      {cat.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
