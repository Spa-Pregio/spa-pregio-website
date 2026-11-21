import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Check, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

type Suite = {
  id: string;
  type: string;
  title: string;
  italic: string;
  price: number;
  tagline: string;
  summary: string;
  description: string;
  includes: string[];
  image: string;
};

const SUITES: Suite[] = [
  {
    id: 'baby_shower',
    type: 'baby-shower',
    title: 'Baby',
    italic: 'Shower',
    price: 27,
    tagline: 'A spa-inspired celebration kit for the mama-to-be.',
    summary:
      'Everything a host needs to plan, invite guests, and style a warm, memorable baby shower without starting from scratch.',
    description:
      'The Baby Shower Suite gives hosts ready-to-send digital invitations, printable table signage and shower games, a week-by-week planning checklist, and local vendor pairing ideas.',
    includes: [
      'Digital invitation + RSVP link',
      'Printable shower games & signage',
      'Week-by-week host timeline',
      'Local vendor & menu pairing guide',
    ],
    image: '/images/baby-shower.jpg',
  },
  {
    id: 'gender_reveal',
    type: 'gender-reveal',
    title: 'Gender',
    italic: 'Reveal',
    price: 27,
    tagline: 'A memorable reveal experience, ready to launch.',
    summary:
      'Built for families and hosts who want a polished reveal gathering with creative reveal concepts and guest-ready templates.',
    description:
      'The Gender Reveal Suite includes digital guest invites, interactive prediction cards, creative reveal ideas, and a complete hosting checklist.',
    includes: [
      'Digital reveal invite + RSVP tracker',
      'Printable guest prediction cards',
      'Creative reveal concept guide',
      'Day-of hosting & photo checklist',
    ],
    image: '/images/Gender-reveal.jpg',
  },
  {
    id: 'sip_and_see',
    type: 'sip-and-see',
    title: 'Sip',
    italic: '& See',
    price: 27,
    tagline: 'Welcome baby with warmth, ease, and zero hosting stress.',
    summary:
      'Tailored for relaxed, drop-in gatherings where close friends and family can meet baby in a calm, welcoming setting.',
    description:
      'The Sip & See Suite takes the pressure off new parents and hosts with open-house invite templates, simple refreshment menus, and gentle guest etiquette cards.',
    includes: [
      'Open-house digital invite + RSVP link',
      'Printable welcome & etiquette signage',
      'Simple grazing & mocktail menu ideas',
      'Low-stress hosting checklist',
    ],
    image: '/images/sip-and-see.jpg',
  },
  {
    id: 'pregnancy_announcement',
    type: 'pregnancy-announcement',
    title: 'Pregnancy',
    italic: 'Announcement',
    price: 27,
    tagline: 'Share your big news in a way family will treasure.',
    summary:
      'Turn your pregnancy reveal into a keepsake moment with customizable announcement templates, photo prompts, and family reveal ideas.',
    description:
      'The Pregnancy Announcement Suite gives expecting parents ready-to-use digital announcement cards, grandparent reveal ideas, and photo shoot shot lists.',
    includes: [
      'Customizable digital announcement cards',
      'Grandparent & family reveal ideas',
      'Photo shoot pose & prop shot list',
      'Social & print-ready templates',
    ],
    image: '/images/Pregnancy-Announcement.jpg',
  },
  {
    id: 'push_present_pampering',
    type: 'push-present-pampering',
    title: 'Push Present',
    italic: '& Pampering',
    price: 27,
    tagline: 'Honor mama with rest, care, and thoughtful pampering.',
    summary:
      'Curated for partners, best friends, and family planning a restorative prenatal or postpartum pampering experience for mom.',
    description:
      'The Push Present & Pampering Suite includes a curated spa & self-care wishlist builder, gift voucher templates, and local wellness booking ideas.',
    includes: [
      'Customizable pampering gift vouchers',
      'Prenatal & postpartum care wishlist',
      'At-home spa ritual & basket guide',
      'Local spa & wellness booking ideas',
    ],
    image: '/images/Push-present-pampering.jpg',
  },
];

const TYPE_LABELS: Record<string, string> = {
  'baby-shower': 'Baby Shower',
  'gender-reveal': 'Gender Reveal',
  'sip-and-see': 'Sip & See',
  'pregnancy-announcement': 'Pregnancy Announcement',
  'push-present-pampering': 'Push Present & Pampering',
};

function BackgroundImage({
  image,
  alt,
  className = '',
}: {
  image?: string;
  alt: string;
  className?: string;
}) {
  if (!image) {
    return (
      <div
        className={`absolute inset-0 bg-gradient-to-br from-spa-lavender via-spa-cream to-spa-blush ${className}`}
      />
    );
  }

  return (
    <img
      src={image}
      alt={alt}
      className={`absolute inset-0 w-full h-full object-cover ${className}`}
    />
  );
}

function SuiteHero({
  suite,
  buySuite,
  buyingId,
}: {
  suite: Suite;
  buySuite: (id: string) => void;
  buyingId: string | null;
}) {
  const isBuying = buyingId === suite.id;

  return (
    <section className="relative min-h-[82vh] flex items-center overflow-hidden pt-20">
      <BackgroundImage
        image={suite.image}
        alt={`${suite.title} ${suite.italic}`}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,18,26,0.78)_0%,rgba(22,18,26,0.52)_45%,rgba(22,18,26,0.22)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15" />

      <div className="relative z-10 w-full px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl text-white">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center rounded-full bg-white/15 backdrop-blur-md px-4 py-1.5 text-xs font-semibold tracking-[0.22em] uppercase border border-white/20">
                {TYPE_LABELS[suite.type]}
              </span>
              <span className="inline-flex items-center rounded-full bg-spa-pink text-white px-4 py-1.5 text-xs font-bold tracking-wide">
                ${suite.price} Instant Digital Access
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl leading-[0.95] font-serif font-bold mb-5">
              {suite.title} <span className="italic">{suite.italic}</span>
            </h1>

            <p className="text-lg md:text-xl text-white/95 mb-4 leading-relaxed">
              {suite.tagline}
            </p>

            <p className="text-base md:text-lg text-white/85 leading-relaxed mb-8">
              {suite.summary}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => buySuite(suite.id)}
                disabled={isBuying}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-spa-charcoal px-8 py-4 text-sm font-semibold shadow-elegant hover:bg-spa-cream transition disabled:opacity-70"
              >
                {isBuying ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Starting Checkout...
                  </>
                ) : (
                  <>Purchase Suite — ${suite.price}</>
                )}
              </button>
              <Link
                to="/suites"
                className="inline-flex items-center justify-center rounded-full border border-white/60 text-white px-8 py-4 text-sm font-semibold hover:bg-white/10 transition"
              >
                All Suites
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SuiteDetails({
  suite,
  buySuite,
  buyingId,
}: {
  suite: Suite;
  buySuite: (id: string) => void;
  buyingId: string | null;
}) {
  const isBuying = buyingId === suite.id;

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-start">
        <div className="rounded-[2rem] overflow-hidden shadow-elegant border border-spa-light bg-spa-cream">
          <div className="relative h-[420px]">
            <BackgroundImage
              image={suite.image}
              alt={`${suite.title} ${suite.italic}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
          </div>
        </div>

        <div className="lg:pt-2">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs tracking-[0.25em] uppercase text-spa-purple font-semibold">
              Suite Overview
            </span>
            <span className="text-lg font-serif font-bold text-spa-purple">
              ${suite.price} <span className="text-xs font-sans font-normal text-spa-gray">one-time</span>
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-spa-charcoal mt-3 mb-4 font-serif leading-tight">
            Ready-to-use digital celebration kit
          </h2>

          <p className="text-spa-gray text-base md:text-lg leading-relaxed mb-6">
            {suite.description}
          </p>

          <div className="rounded-[2rem] bg-spa-cream border border-spa-light p-6 mb-8">
            <h3 className="text-lg font-semibold text-spa-charcoal mb-4 font-serif">
              What’s Included
            </h3>

            <div className="grid sm:grid-cols-2 gap-3">
              {suite.includes.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white border border-spa-light px-4 py-3 text-sm text-spa-charcoal flex items-center gap-2.5"
                >
                  <Check size={15} className="text-spa-purple flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => buySuite(suite.id)}
              disabled={isBuying}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-spa-purple text-white px-8 py-4 text-sm font-semibold hover:bg-[#7d5fa0] transition-colors disabled:opacity-70"
            >
              {isBuying ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Starting Checkout...
                </>
              ) : (
                <>Purchase Suite — ${suite.price}</>
              )}
            </button>

            <Link
              to="/suites"
              className="inline-flex items-center justify-center rounded-full border border-spa-purple text-spa-purple px-8 py-4 text-sm font-semibold hover:bg-spa-purple hover:text-white transition-colors"
            >
              View All Suites
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CelebrationSuites() {
  const [searchParams] = useSearchParams();
  const [buyingId, setBuyingId] = useState<string | null>(null);

  // Remember a Suite Sister's referral code if they arrived via her link.
  React.useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      try {
        localStorage.setItem('sp_ref', ref);
      } catch {
        /* ignore */
      }
    }
  }, [searchParams]);

  const buySuite = async (suiteId: string) => {
    setBuyingId(suiteId);
    let ref: string | null = searchParams.get('ref');
    if (!ref) {
      try {
        ref = localStorage.getItem('sp_ref');
      } catch {
        ref = null;
      }
    }
    const { data, error } = await supabase.functions.invoke('create-suite-checkout', {
      body: { suite_id: suiteId, ref: ref || undefined, origin: window.location.origin },
    });
    if (error || !data?.url) {
      console.error('Suite checkout error:', error);
      setBuyingId(null);
      alert('Sorry — something went wrong starting checkout. Please try again.');
      return;
    }
    window.location.href = data.url as string;
  };

  const selectedType = searchParams.get('type');
  const filteredSuites = selectedType
    ? SUITES.filter((suite) => suite.type === selectedType)
    : SUITES;
  const selectedSuite = filteredSuites.length === 1 ? filteredSuites[0] : null;

  if (selectedSuite) {
    return (
      <div className="min-h-screen bg-spa-cream font-sans">
        <SuiteHero suite={selectedSuite} buySuite={buySuite} buyingId={buyingId} />
        <SuiteDetails suite={selectedSuite} buySuite={buySuite} buyingId={buyingId} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-spa-cream font-sans pt-16 lg:pt-20">
      <section className="relative overflow-hidden py-16 lg:py-20 px-6 text-center">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-spa-purple via-[#8a6aa8] to-spa-pink" />
        <div className="absolute inset-0 bg-spa-charcoal/25" />

        <div className="relative w-full max-w-4xl mx-auto">
          <span className="inline-block mb-3 text-xs tracking-[0.25em] uppercase text-white/90 font-semibold">
            Celebration Suites
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-5 font-serif">
            Choose the Suite
            <br />
            <span className="italic text-spa-blush">That Fits Your Moment</span>
          </h1>

          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
            Instant digital celebration kits with invitations, host timelines, printable signage, and local vendor pairing guides.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#suites-grid"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-spa-purple text-sm font-semibold tracking-wide shadow-elegant hover:bg-spa-cream transition-colors"
            >
              Browse All Suites
            </a>

            <Link
              to="/events"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-white/75 text-white text-sm font-semibold tracking-wide hover:bg-white/15 transition-colors"
            >
              Explore Local Events
            </Link>
          </div>
        </div>
      </section>

      <section id="suites-grid" className="py-14 lg:py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {SUITES.map((suite) => {
            const isBuying = buyingId === suite.id;
            return (
              <div
                key={suite.id}
                className="rounded-3xl overflow-hidden bg-white shadow-elegant border border-spa-light flex flex-col"
              >
                <div className="relative h-60">
                  <BackgroundImage
                    image={suite.image}
                    alt={`${suite.title} ${suite.italic}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
                  <div className="absolute top-4 right-4">
                    <span className="px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-spa-purple text-sm font-bold shadow-sm">
                      ${suite.price}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-3xl font-bold font-serif leading-tight">
                      {suite.title} <span className="italic">{suite.italic}</span>
                    </h3>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <p className="text-spa-gray text-sm leading-relaxed mb-4">
                    {suite.summary}
                  </p>

                  <ul className="space-y-1.5 mb-6 text-xs text-spa-charcoal/85">
                    {suite.includes.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check size={13} className="text-spa-purple flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-col gap-2.5">
                    <Link
                      to={`/suites?type=${suite.type}`}
                      className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-spa-purple text-spa-purple text-sm font-semibold hover:bg-spa-lavender/50 transition-colors"
                    >
                      View Details
                    </Link>

                    <button
                      onClick={() => buySuite(suite.id)}
                      disabled={isBuying}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-spa-purple text-white text-sm font-semibold hover:bg-[#7d5fa0] transition-colors disabled:opacity-70"
                    >
                      {isBuying ? (
                        <>
                          <Loader2 size={15} className="animate-spin" /> Starting Checkout...
                        </>
                      ) : (
                        <>Purchase Suite — ${suite.price}</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
