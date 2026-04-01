import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

type EnterpriseAd = {
  id: string;
  business_name: string;
  ad_image: string | null;
  ad_headline: string | null;
  ad_description: string | null;
  ad_cta: string | null;
  website: string | null;
  location: string | null;
  category: string | null;
};

export default function EnterpriseBanner() {
  const [ads, setAds] = useState<EnterpriseAd[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    loadAds();
  }, []);

  useEffect(() => {
    if (ads.length <= 1 || paused) return;
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % ads.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [ads.length, paused]);

  const loadAds = async () => {
    const { data } = await supabase
      .from('vendor_profiles')
      .select('id, business_name, ad_image, ad_headline, ad_description, ad_cta, website, location, category')
      .eq('tier', 'Enterprise')
      .eq('status', 'active')
      .not('ad_image', 'is', null);
    if (data && data.length > 0) setAds(data);
    setLoading(false);
  };

  const prev = useCallback(() => {
    setCurrent(c => (c - 1 + ads.length) % ads.length);
    setPaused(true);
  }, [ads.length]);

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % ads.length);
    setPaused(true);
  }, [ads.length]);

  if (loading || ads.length === 0) return null;

  const ad = ads[current];

  return (
    <section className="w-full py-12 lg:py-16 bg-spa-charcoal">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section label */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.15em] text-spa-pink">Featured Vendors</span>
            <h2 className="font-serif text-xl text-white mt-1">Our Enterprise Partners</h2>
          </div>
          {ads.length > 1 && (
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ArrowLeft size={16} />
              </button>
              <div className="flex gap-1.5">
                {ads.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setCurrent(i); setPaused(true); }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-spa-pink' : 'w-1.5 bg-white/30'}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Banner card */}
        <div
          className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 transition-all duration-500"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="grid lg:grid-cols-5 min-h-[180px]">

            {/* Image */}
            {ad.ad_image && (
              <div className="lg:col-span-2 relative overflow-hidden">
                <img
                  src={ad.ad_image}
                  alt={ad.business_name}
                  className="w-full h-full object-cover min-h-[160px]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-spa-charcoal/20" />
              </div>
            )}

            {/* Content */}
            <div className={`${ad.ad_image ? 'lg:col-span-3' : 'lg:col-span-5'} p-8 flex flex-col justify-center`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2.5 py-1 bg-spa-pink/20 text-spa-pink rounded-full font-medium border border-spa-pink/30">
                  Enterprise Partner
                </span>
                {ad.category && (
                  <span className="text-xs px-2.5 py-1 bg-white/10 text-white/60 rounded-full">
                    {ad.category}
                  </span>
                )}
              </div>

              <h3 className="font-serif text-2xl lg:text-3xl text-white mb-2">
                {ad.ad_headline || ad.business_name}
              </h3>

              {ad.ad_description && (
                <p className="text-white/60 leading-relaxed mb-4 max-w-lg">
                  {ad.ad_description}
                </p>
              )}

              <div className="flex items-center gap-4">
                {ad.website && (
                  <a
                    href={ad.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-spa-pink text-white rounded-full text-sm font-medium hover:bg-spa-pink/90 transition-colors"
                  >
                    {ad.ad_cta || 'Learn More'} <ExternalLink size={14} />
                  </a>
                )}
                {ad.location && (
                  <span className="text-white/40 text-sm">{ad.location}</span>
                )}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          {ads.length > 1 && !paused && (
            <div className="absolute bottom-0 left-0 h-0.5 bg-spa-pink/30 w-full">
              <div
                key={current}
                className="h-full bg-spa-pink"
                style={{
                  animation: 'progress 5s linear forwards',
                }}
              />
            </div>
          )}
        </div>

        <style>{`
          @keyframes progress {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}</style>
      </div>
    </section>
  );
}
