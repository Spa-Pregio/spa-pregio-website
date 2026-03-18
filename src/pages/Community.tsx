import { ArrowRight, Heart, Store, Star, Instagram, Play } from 'lucide-react';

const socials = [
  {
    platform: 'TikTok',
    handle: '@spapregio',
    url: 'https://tiktok.com/@spapregio',
    description: 'Daily inspiration, behind-the-scenes, and celebration ideas for mamas.',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
      </svg>
    ),
    color: 'bg-spa-charcoal',
    textColor: 'text-white',
    accentColor: 'text-spa-pink',
    stat: 'Follow for daily mama content',
  },
  {
    platform: 'Instagram',
    handle: '@spapregio',
    url: 'https://instagram.com/spapregio',
    description: 'Beautiful celebration content, vendor spotlights, and Suite previews.',
    icon: () => <Instagram className="w-7 h-7" />,
    color: 'bg-spa-pink',
    textColor: 'text-white',
    accentColor: 'text-white',
    stat: 'Follow for visual inspiration',
  },
  {
    platform: 'Pinterest',
    handle: '@spapregio',
    url: 'https://pinterest.com/spapregio',
    description: 'Save celebration ideas, suite planning boards, and mama wellness inspo.',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
      </svg>
    ),
    color: 'bg-spa-purple',
    textColor: 'text-white',
    accentColor: 'text-spa-lavender',
    stat: 'Save and collect ideas',
  },
  {
    platform: 'Facebook',
    handle: 'Spa-Pregio',
    url: 'https://facebook.com/spapregio',
    description: 'Join our Facebook community, share your celebrations, and connect with local mamas.',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    color: 'bg-spa-lavender',
    textColor: 'text-spa-charcoal',
    accentColor: 'text-spa-purple',
    stat: 'Join the conversation',
  },
];

const audiences = [
  {
    icon: Heart,
    label: 'For Mamas',
    title: 'You deserve to be celebrated.',
    description: 'Browse our Celebration Suites, find local vendors who specialize in maternal moments, and let the people who love you know exactly how to honor you.',
    cta: 'Explore Suites',
    href: '/suites',
    color: 'bg-spa-blush border-spa-pink',
    iconBg: 'bg-spa-pink',
    ctaStyle: 'bg-spa-pink text-white hover:bg-spa-pink/90',
  },
  {
    icon: Store,
    label: 'For Vendors',
    title: 'Get in front of celebrating mamas.',
    description: 'List your business on the only platform built exclusively around maternal celebrations. Spas, photographers, bakers, florists — your next loyal client is here.',
    cta: 'List Your Business',
    href: '/vendors',
    color: 'bg-spa-lavender border-spa-purple',
    iconBg: 'bg-spa-purple',
    ctaStyle: 'bg-spa-purple text-white hover:bg-spa-purple/90',
  },
  {
    icon: Star,
    label: 'For Suite Sisters',
    title: 'Share the movement. Earn real income.',
    description: 'Refer vendors and digital suites to your network and earn recurring commissions every month. Two income streams, zero cost to join.',
    cta: 'Become a Suite Sister',
    href: '/sister-dashboard',
    color: 'bg-amber-50 border-amber-300',
    iconBg: 'bg-amber-400',
    ctaStyle: 'bg-amber-400 text-white hover:bg-amber-500',
  },
];

const tiktokPreviews = [
  { bg: 'bg-spa-purple/40', height: 'h-64', label: 'Celebration ideas', views: '12.4K' },
  { bg: 'bg-spa-pink/40', height: 'h-80', label: 'Relationship series', views: '38.2K' },
  { bg: 'bg-spa-purple/20', height: 'h-56', label: 'Vendor spotlight', views: '8.9K' },
];

export default function Community() {
  return (
    <div className="w-full pt-20">

      {/* Hero */}
      <section className="w-full py-20 lg:py-28 bg-spa-purple relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-spa-pink/20 translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10">
          <span className="text-spa-pink text-sm uppercase tracking-[0.15em]">The Celebration Suite Movement</span>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mt-4">
            Join our<br /><span className="text-spa-pink">community.</span>
          </h1>
          <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Whether you are a mama deserving celebration, a vendor ready to serve her, or a Suite Sister
            ready to earn — there is a place for you in this movement.
          </p>
        </div>
      </section>

      {/* Three Paths */}
      <section className="w-full py-16 lg:py-24 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Find Your Place</span>
            <h2 className="font-serif text-4xl lg:text-5xl text-spa-charcoal mt-4">
              Which path <span className="text-spa-purple">is yours?</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {audiences.map((a) => {
              const Icon = a.icon;
              return (
                <div key={a.label} className={`rounded-2xl border-2 p-8 ${a.color} flex flex-col`}>
                  <div className={`w-14 h-14 rounded-full ${a.iconBg} flex items-center justify-center mb-5`}>
                    <Icon size={26} className="text-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-spa-gray mb-2">{a.label}</span>
                  <h3 className="font-serif text-2xl text-spa-charcoal mb-3 leading-snug">{a.title}</h3>
                  <p className="text-spa-gray text-sm leading-relaxed flex-1">{a.description}</p>
                  <a
                    href={a.href}
                    className={`mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-colors ${a.ctaStyle}`}
                  >
                    {a.cta} <ArrowRight size={16} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social / Follow Us */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Follow Along</span>
            <h2 className="font-serif text-4xl lg:text-5xl text-spa-charcoal mt-4">
              We are everywhere <span className="text-spa-purple">mamas are.</span>
            </h2>
            <p className="text-spa-gray mt-4 max-w-xl mx-auto leading-relaxed">
              Follow @spapregio across all platforms for daily celebration content, vendor spotlights,
              suite drops, and behind-the-scenes of the movement.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {socials.map((s) => {
              const SocialIcon = s.icon;
              return (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${s.color} rounded-2xl p-7 flex flex-col gap-4 group hover:scale-[1.02] transition-transform duration-200`}
                >
                  <div className="flex items-center justify-between">
                    <div className={s.textColor}>
                      <SocialIcon />
                    </div>
                    <ArrowRight size={18} className={`${s.accentColor} group-hover:translate-x-1 transition-transform`} />
                  </div>
                  <div>
                    <p className={`font-serif text-2xl ${s.textColor}`}>{s.platform}</p>
                    <p className={`text-sm font-mono mt-0.5 opacity-70 ${s.textColor}`}>{s.handle}</p>
                  </div>
                  <p className={`text-sm leading-relaxed opacity-75 ${s.textColor} flex-1`}>{s.description}</p>
                  <div className={`text-xs font-medium uppercase tracking-wide ${s.accentColor} opacity-80`}>
                    {s.stat} →
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* TikTok Feature */}
      <section className="w-full py-16 lg:py-20 bg-spa-charcoal">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <span className="text-spa-pink text-sm uppercase tracking-[0.15em]">Most Active On</span>
              <h2 className="font-serif text-4xl lg:text-5xl text-white mt-4 leading-tight">
                Watch us on <span className="text-spa-pink">TikTok.</span>
              </h2>
              <p className="text-white/60 mt-4 leading-relaxed max-w-lg">
                Daily content for mamas, vendors, and Suite Sisters. Celebration ideas, vendor spotlights,
                relationship wisdom, and the real story behind the movement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
                <a
                  href="https://tiktok.com/@spapregio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-spa-pink text-white px-7 py-3.5 rounded-full font-medium hover:bg-spa-pink/90 transition-colors"
                >
                  <Play size={18} /> Follow @spapregio
                </a>
                <a
                  href="https://instagram.com/spapregio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-full font-medium hover:bg-white/10 transition-colors"
                >
                  <Instagram size={18} /> Instagram Too
                </a>
              </div>
            </div>

            {/* Faux TikTok video cards */}
            <div className="flex-shrink-0 flex gap-4 items-end">
              {tiktokPreviews.map((card, i) => (
                <div key={i} className={`${card.bg} ${card.height} w-32 rounded-2xl border border-white/10 flex flex-col justify-end p-3 relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <Play size={16} className="text-white ml-0.5" />
                    </div>
                  </div>
                  <div className="relative z-10">
                    <p className="text-white text-xs font-medium leading-tight">{card.label}</p>
                    <p className="text-white/50 text-xs mt-0.5">{card.views} views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-16 lg:py-24 bg-spa-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-serif text-4xl lg:text-5xl text-spa-charcoal leading-tight">
            Ready to be part of <span className="text-spa-purple">the movement?</span>
          </h2>
          <p className="text-spa-gray mt-4 leading-relaxed max-w-xl mx-auto">
            Every mama deserves to be celebrated. Every vendor deserves to be found.
            Every Suite Sister deserves to earn. Start wherever you are.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <a href="/suites" className="btn-primary justify-center">
              Shop Celebration Suites <ArrowRight size={18} />
            </a>
            <a href="/vendors" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-spa-purple text-spa-purple rounded-full font-medium hover:bg-spa-purple hover:text-white transition-colors">
              List Your Business
            </a>
            <a href="/sister-dashboard" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-spa-charcoal text-spa-charcoal rounded-full font-medium hover:bg-spa-charcoal hover:text-white transition-colors">
              Become a Suite Sister
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
