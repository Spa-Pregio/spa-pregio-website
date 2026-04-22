type Suite = {
  id: string;
  type: string;
  title: string;
  italic: string;
  tagline: string;
  summary: string;
  description: string;
  includes: string[];
  payhip: string;
  image: string;
};

import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const SUITES = [
  {
    id: 'baby_shower',
    type: 'baby-shower',
    title: 'Baby',
    italic: 'Shower',
    tagline: 'A spa-inspired celebration for the mama-to-be.',
    summary:
      'Designed for hosts who want a beautiful, intentional baby shower that feels elevated, nurturing, and meaningful.',
    description:
      'The Baby Shower Suite helps you create a warm, beautiful gathering centered on celebrating motherhood with softness, detail, and connection.',
    includes: ['Planning guidance', 'Decor inspiration', 'Host support tools', 'Celebration ideas'],
    payhip: 'https://payhip.com/b/lZ6WG',
    image: '/images/baby-shower.jpg',
  },
  {
    id: 'gender_reveal',
    type: 'gender-reveal',
    title: 'Gender',
    italic: 'Reveal',
    tagline: 'A memorable reveal experience, designed with intention.',
    summary:
      'Created for families who want a reveal that feels beautiful, polished, and emotionally meaningful.',
    description:
      'The Gender Reveal Suite helps you build a moment that feels joyful, elevated, and worthy of the memory you are creating.',
    includes: ['Reveal planning ideas', 'Styling inspiration', 'Host guidance', 'Celebration details'],
    payhip: 'https://payhip.com/b/jLSWB',
    image: '/images/Gender-reveal.jpg',
  },
  {
    id: 'sip_and_see',
    type: 'sip-and-see',
    title: 'Sip',
    italic: '& See',
    tagline: 'Welcome baby with warmth, beauty, and connection.',
    summary:
      'Perfect for a softer, more intimate gathering where loved ones come together to meet and celebrate baby.',
    description:
      'The Sip & See Suite is designed to help you host a beautiful welcome gathering that feels calm, thoughtful, and genuinely special.',
    includes: ['Gathering guidance', 'Hosting ideas', 'Decor inspiration', 'Planning support'],
    payhip: 'https://payhip.com/b/WbdBP',
    image: '/images/sip-and-see.jpg',
  },
  {
    id: 'pregnancy_announcement',
    type: 'pregnancy-announcement',
    title: 'Pregnancy',
    italic: 'Announcement',
    tagline: 'Share your news beautifully.',
    summary:
      'For mamas and families who want to announce a pregnancy in a way that feels elevated, memorable, and heartfelt.',
    description:
      'The Pregnancy Announcement Suite helps turn your announcement into a beautiful experience rather than just a quick share.',
    includes: ['Announcement inspiration', 'Creative ideas', 'Planning guidance', 'Meaningful presentation tools'],
    payhip: 'https://payhip.com/b/j6hfL',
    image: '/images/Pregnancy-Announcement.jpg',
  },
  {
    id: 'push_present_pampering',
    type: 'push-present-pampering',
    title: 'Push Present',
    italic: '& Pampering',
    tagline: 'Honor motherhood with softness, rest, and love.',
    summary:
      'Made for celebrating the mother herself with appreciation, beauty, and nurturing energy.',
    description:
      'The Push Present & Pampering Suite centers the mama and creates a celebration around care, gratitude, and intentional pampering.',
    includes: ['Pampering inspiration', 'Gift ideas', 'Planning support', 'Experience guidance'],
    payhip: 'https://payhip.com/b/Ldkxz',
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

function SuiteHero({ suite }: { suite: Suite }) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <BackgroundImage
        image={suite.image}
        alt={`${suite.title} ${suite.italic}`}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,18,26,0.72)_0%,rgba(22,18,26,0.46)_35%,rgba(22,18,26,0.18)_65%,rgba(22,18,26,0.18)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-white/10" />

      <div className="relative z-10 w-full px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl text-white">
            <span className="inline-flex items-center rounded-full bg-white/15 backdrop-blur-md px-4 py-2 text-xs font-semibold tracking-[0.22em] uppercase border border-white/20 mb-6">
              {TYPE_LABELS[suite.type]}
            </span>

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
              
                href={suite.payhip}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white text-spa-charcoal px-8 py-4 text-sm font-semibold shadow-elegant hover:scale-[1.01] transition"
              >
                Purchase Suite
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SuiteDetails({ suite }: { suite: Suite }) {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-start">
        <div className="rounded-[2rem] overflow-hidden shadow-elegant border border-spa-light bg-spa-cream">
          <div className="relative h-[420px]">
            <BackgroundImage
              image={suite.image}
              alt={`${suite.title} ${suite.italic}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
          </div>
        </div>

        <div className="lg:pt-4">
          <span className="text-xs tracking-[0.25em] uppercase text-spa-purple font-semibold">
            Suite Overview
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-spa-charcoal mt-3 mb-5 font-serif leading-tight">
            A polished, ready-to-use celebration experience
          </h2>

          <p className="text-spa-gray text-lg leading-relaxed mb-6">
            {suite.description}
          </p>

          <div className="rounded-[2rem] bg-spa-cream border border-spa-light p-6 mb-8">
            <h3 className="text-xl font-semibold text-spa-charcoal mb-4 font-serif">
              What is Included
            </h3>

            <div className="grid sm:grid-cols-2 gap-3">
              {suite.includes.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white border border-spa-light px-4 py-3 text-spa-charcoal"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            
              href={suite.payhip}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-spa-purple text-white px-8 py-4 text-sm font-semibold hover:bg-[#7d5fa0] transition-colors"
            >
              Buy on Payhip
            </a>

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
  const selectedType = searchParams.get('type');

  const filteredSuites = selectedType
    ? SUITES.filter((suite) => suite.type === selectedType)
    : SUITES;

  const selectedSuite =
    filteredSuites.length === 1 ? filteredSuites[0] : null;

  if (selectedSuite) {
    return (
      <div className="min-h-screen bg-spa-cream font-sans">
        <SuiteHero suite={selectedSuite} />
        <SuiteDetails suite={selectedSuite} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-spa-cream font-sans">
      <section className="relative overflow-hidden bg-gradient-to-br from-spa-lavender via-spa-cream to-spa-blush py-24 px-6 text-center">
        <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-spa-pink opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-spa-purple opacity-10 blur-3xl" />

        <div className="relative max-w-4xl mx-auto">
          <span className="inline-block mb-4 text-xs tracking-[0.25em] uppercase text-spa-purple font-semibold">
            Celebration Suites
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-spa-charcoal leading-tight mb-6 font-serif">
            Choose the Suite
            <br />
            <span className="italic text-spa-purple">That Fits Your Moment</span>
          </h1>

          <p className="text-lg text-spa-gray max-w-2xl mx-auto mb-10 leading-relaxed">
            Browse the full Spa-Pregio collection and choose the experience
            that best fits the celebration you are planning.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/start"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-spa-purple text-white text-sm font-semibold tracking-wide shadow-elegant hover:bg-[#7d5fa0] transition-colors"
            >
              Start My Celebration
            </Link>

            <Link
              to="/events"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-spa-purple text-spa-purple text-sm font-semibold tracking-wide hover:bg-spa-purple hover:text-white transition-colors"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {SUITES.map((suite) => (
            <div
              key={suite.id}
              className="rounded-3xl overflow-hidden bg-white shadow-elegant border border-spa-light flex flex-col"
            >
              <div className="relative h-64">
                <BackgroundImage
                  image={suite.image}
                  alt={`${suite.title} ${suite.italic}`}
                />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-3xl font-bold font-serif">
                    {suite.title} <span className="italic">{suite.italic}</span>
                  </h3>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <p className="text-spa-gray leading-relaxed mb-6">
                  {suite.summary}
                </p>

                <div className="mt-auto flex flex-col gap-3">
                  <Link
                    to={`/suites?type=${suite.type}`}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-spa-purple text-spa-purple text-sm font-semibold hover:bg-spa-purple hover:text-white transition-colors"
                  >
                    View Suite
                  </Link>

                  
                    href={suite.payhip}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-spa-purple text-white text-sm font-semibold hover:bg-[#7d5fa0] transition-colors"
                  >
                    Purchase Suite
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
