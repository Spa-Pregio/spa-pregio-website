import { ArrowRight, Check, Download, Palette, FileText, Clock, Star, Sparkles } from 'lucide-react';

const suites = [
  {
    name: 'The Celebration Suite™',
    subtitle: 'Luxury Baby Shower Planning Collection',
    price: 27,
    url: 'https://payhip.com/b/4w08K',
    badge: 'Flagship Suite',
    badgeColor: 'bg-spa-purple',
    featured: true,
    description: 'The original. The one that started it all. A fully editable luxury planning system that takes the stress out of celebrating and puts the joy back in. This is not just a template — it\'s a structured experience.',
    includes: [
      'Minimalist Invitation Template',
      'Lifestyle Invitation Template',
      'RSVP Card',
      'Baby Shower Planning Checklist',
      'Guest Tracker',
      'Budget Planner',
    ],
    emoji: '✨',
  },
  {
    name: 'The Baby Shower Suite™',
    subtitle: 'Complete Baby Shower Planning Collection',
    price: 27,
    url: 'https://payhip.com/b/lZ6WG',
    badge: 'Available Now',
    badgeColor: 'bg-spa-purple',
    featured: false,
    description: 'She deserves a shower as beautiful as the journey she\'s on. From the first invitation to the last gift unwrapped — every detail covered so the only thing left to do is celebrate.',
    includes: [
      'Customizable Invitation & RSVP Card',
      'Planning Timeline',
      'Complete Celebration Checklist',
      'Guest Tracker & RSVP Organizer',
      'Budget Planner',
      'Vendor Selection Guide',
      'Theme & Decor Inspiration',
      'Keepsake & Memory Pages',
    ],
    emoji: '🛁',
  },
  {
    name: 'The Gender Reveal Suite™',
    subtitle: 'Complete Gender Reveal Planning Collection',
    price: 27,
    url: 'https://payhip.com/b/jLSWB',
    badge: 'Available Now',
    badgeColor: 'bg-spa-purple',
    featured: false,
    description: 'Build the suspense. Capture the joy. Make it unforgettable. Your complete planning companion for the moment that changes everything.',
    includes: [
      'Customizable Invitation & RSVP Card',
      'Step-by-Step Planning Timeline',
      'Complete Reveal Checklist',
      'Guest Tracker & RSVP Organizer',
      'Budget Planner',
      'Vendor Selection Guide',
      'Theme & Decor Inspiration',
      'Keepsake & Memory Pages',
    ],
    emoji: '🎀',
  },
  {
    name: 'The Announcement Suite™',
    subtitle: 'Pregnancy Announcement Planning Collection',
    price: 27,
    url: 'https://payhip.com/b/j6hfL',
    badge: 'Available Now',
    badgeColor: 'bg-spa-purple',
    featured: false,
    description: 'You have the most beautiful secret in the world — and you\'re ready to share it. Plan every detail of your reveal with intention, from telling family first to crafting the post that stops everyone\'s scroll.',
    includes: [
      'Welcome Guide & How to Use',
      'Planning Timeline',
      'Complete Announcement Checklist',
      'Budget Tracker',
      'Vendor Selection Guide',
      'Theme & Photo Inspiration',
      'Contact & Reaction Tracker',
      'Keepsake Pages + Letter to Baby',
    ],
    emoji: '📣',
  },
  {
    name: 'The Push Present & Pampering Suite™',
    subtitle: 'Mama Celebration & Gifting Collection',
    price: 27,
    url: 'https://payhip.com/b/Ldkxz',
    badge: 'Available Now',
    badgeColor: 'bg-spa-purple',
    featured: false,
    description: 'She carried life. She showed up with everything she had. Now it\'s time to honor her. The only planning guide designed specifically for celebrating the mama.',
    includes: [
      'Gifting Timeline Through Postpartum',
      'Push Present Planning Checklist',
      'Pampering Experience Planner',
      'Home Self-Care Setup Guide',
      'Budget Planner',
      'Vendor Selection Guide',
      'Spa & Wellness Inspiration',
      'Keepsake Pages + Love Letter to Herself',
    ],
    emoji: '💜',
  },
  {
    name: 'The Sip & See Suite™',
    subtitle: 'Baby Welcome Gathering Collection',
    price: 27,
    url: 'https://payhip.com/b/WbdBP',
    badge: 'Available Now',
    badgeColor: 'bg-spa-purple',
    featured: false,
    description: 'Baby is here. The world is ready to meet them. Your complete planning guide for a gathering that feels as soft, warm, and beautiful as the moment itself.',
    includes: [
      'Customizable Invitation & RSVP Card',
      'Planning Timeline After Baby Arrives',
      'Complete Celebration Checklist',
      'Guest Tracker & RSVP Organizer',
      'Budget Planner',
      'Vendor Selection Guide',
      'Theme & Decor Inspiration',
      'Keepsake Pages + Letter to Baby',
    ],
    emoji: '🌸',
  },
];

const howItWorks = [
  { icon: Download, step: '01', title: 'Purchase & Download', desc: 'Complete your purchase and instantly receive your digital access file.' },
  { icon: Palette, step: '02', title: 'Open & Personalize', desc: 'Fill in your event details digitally or print and complete by hand. No design experience needed.' },
  { icon: FileText, step: '03', title: 'Print or Share', desc: 'Export as PDF, print at home, or use digitally on any device.' },
  { icon: Clock, step: '04', title: 'Celebrate', desc: 'You\'re fully prepared. Now enjoy every moment of the celebration.' },
];

const featuredSuite = suites[0];
const remainingSuites = suites.slice(1);

export default function CelebrationSuites() {
  return (
    <div className="w-full pt-20">

      {/* Hero */}
      <section className="w-full py-16 lg:py-24 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">The Celebration Suite Movement™</span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-spa-charcoal leading-tight mt-4">
            Every mama deserves an <span className="text-spa-purple">elevated</span> celebration.
          </h1>
          <p className="mt-6 text-lg text-spa-gray leading-relaxed max-w-2xl mx-auto">
            Six thoughtfully designed planning collections — one for every milestone on the journey to motherhood. Beautiful, editable, and made with love.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-spa-lavender px-5 py-2 rounded-full">
            <Sparkles size={14} className="text-spa-purple" />
            <span className="text-sm text-spa-purple font-medium">All suites $27 · Digital Download · Instant Access</span>
          </div>
        </div>
      </section>

      {/* Flagship Suite */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Where It All Began</span>
            <h2 className="section-title mt-4">The <span className="text-spa-purple">Flagship Suite.</span></h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Badge side */}
            <div className="relative flex items-center justify-center bg-spa-lavender rounded-2xl min-h-[360px]">
              <div className="text-center p-12">
                <div className="text-6xl mb-4">{featuredSuite.emoji}</div>
                <div className="font-serif text-3xl text-spa-purple">{featuredSuite.name}</div>
                <div className="text-spa-gray mt-2">{featuredSuite.subtitle}</div>
                <div className="mt-6 w-20 h-20 rounded-full bg-spa-purple flex flex-col items-center justify-center mx-auto shadow-elegant">
                  <span className="text-xs text-white/80">Only</span>
                  <span className="font-bold text-2xl text-white">$27</span>
                </div>
              </div>
              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 bg-spa-purple text-white rounded-full text-sm font-semibold">✨ Flagship Suite</span>
              </div>
            </div>

            {/* Details */}
            <div>
              <h3 className="font-serif text-3xl text-spa-charcoal">{featuredSuite.name}</h3>
              <p className="text-spa-purple font-medium mt-1">{featuredSuite.subtitle}</p>
              <p className="text-spa-gray leading-relaxed mt-4">{featuredSuite.description}</p>

              <div className="mt-8">
                <p className="font-semibold text-spa-charcoal mb-4">✨ What's Included:</p>
                <ul className="space-y-2">
                  {featuredSuite.includes.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-spa-gray">
                      <Check size={16} className="text-spa-purple flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 p-4 bg-spa-lavender rounded-xl">
                <p className="text-xs text-spa-gray flex items-center gap-2">
                  <Star size={13} className="text-amber-400 fill-amber-400" />
                  Digital download. Print at home or complete digitally. No design experience needed.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href={featuredSuite.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary justify-center text-center"
                >
                  Get The Celebration Suite™ — $27
                  <ArrowRight size={18} />
                </a>
              </div>
              <p className="text-xs text-spa-gray mt-3">Instant access. Download immediately after purchase.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-16 lg:py-20 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Simple Process</span>
            <h2 className="section-title mt-4">How it <span className="text-spa-purple">works.</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white shadow-elegant flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-spa-purple" />
                  </div>
                  <p className="text-xs font-bold text-spa-purple tracking-widest mb-2">{step.step}</p>
                  <h3 className="font-serif text-lg text-spa-charcoal mb-2">{step.title}</h3>
                  <p className="text-sm text-spa-gray leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full Suite Collection */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-4">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">The Full Collection</span>
            <h2 className="section-title mt-4">Five suites. <span className="text-spa-purple">Every milestone.</span></h2>
            <p className="text-spa-gray mt-4 max-w-xl mx-auto">From the moment you share the news to the day the world meets your baby — there's a suite for every step of the journey.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {remainingSuites.map((suite) => (
              <div key={suite.name} className="elegant-card group flex flex-col">
                {/* Card header */}
                <div className="bg-spa-lavender rounded-t-2xl p-8 text-center">
                  <div className="text-4xl mb-3">{suite.emoji}</div>
                  <span className="px-3 py-1 bg-spa-purple text-white rounded-full text-xs font-medium">
                    {suite.badge}
                  </span>
                  <h3 className="font-serif text-xl text-spa-charcoal mt-4">{suite.name}</h3>
                  <p className="text-spa-purple text-xs font-medium mt-1">{suite.subtitle}</p>
                </div>

                {/* Card body */}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-sm text-spa-gray leading-relaxed">{suite.description}</p>

                  <div className="mt-5 space-y-1.5 flex-1">
                    {suite.includes.slice(0, 5).map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-spa-gray">
                        <Check size={13} className="text-spa-purple flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                    {suite.includes.length > 5 && (
                      <div className="text-xs text-spa-purple font-medium pl-5">
                        + {suite.includes.length - 5} more included
                      </div>
                    )}
                  </div>

                  {/* Price + CTA */}
                  <div className="mt-6 pt-5 border-t border-spa-lavender">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-spa-gray">Digital Download</span>
                      <span className="font-bold text-2xl text-spa-purple">$27</span>
                    </div>
                    <a
                      href={suite.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full btn-primary justify-center text-center text-sm py-3"
                    >
                      Get This Suite — $27
                      <ArrowRight size={16} />
                    </a>
                    <p className="text-xs text-spa-gray text-center mt-2">Instant access after purchase</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle callout */}
      <section className="w-full py-16 lg:py-20 bg-spa-cream">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="bg-spa-lavender rounded-2xl p-8 lg:p-12 text-center">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">The Complete Journey</span>
            <h3 className="font-serif text-2xl lg:text-3xl text-spa-charcoal mt-4">
              Want to give her <span className="text-spa-purple">everything?</span>
            </h3>
            <p className="text-spa-gray mt-4 max-w-xl mx-auto leading-relaxed">
              Each suite is $27 on its own — or gift her the full Celebration Suite Movement™ collection and cover every milestone from announcement to baby's first hello.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://payhip.com/SpaPregio"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary justify-center"
              >
                Shop All Suites
                <ArrowRight size={18} />
              </a>
            </div>
            <p className="text-xs text-spa-gray mt-4">All suites $27 each · Digital download · Instant access · Print at home</p>
          </div>
        </div>
      </section>

      {/* Suite Sisters CTA */}
      <section className="w-full py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Suite Sisters™</span>
          <h3 className="font-serif text-2xl lg:text-3xl text-spa-charcoal mt-4">
            Love these suites? <span className="text-spa-purple">Share them and earn.</span>
          </h3>
          <p className="text-spa-gray mt-4 max-w-xl mx-auto leading-relaxed">
            Join the Suite Sisters™ affiliate program and earn 30% commission on every suite you share. Beautiful products that practically sell themselves.
          </p>
          <a
            href="https://payhip.com/auth/register/af699c7e55b3f58"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 btn-primary justify-center"
          >
            Become a Suite Sister™
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-16 lg:py-20 bg-spa-purple">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl text-white">
            Ready to celebrate <span className="italic">her?</span>
          </h2>
          <p className="mt-4 text-white/70 leading-relaxed">
            Six suites. Every milestone. One movement built for the mama in your life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a
              href="https://payhip.com/b/4w08K"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-spa-purple px-8 py-4 rounded-full font-semibold hover:bg-spa-cream transition-colors"
            >
              Get The Celebration Suite™ — $27
              <ArrowRight size={18} />
            </a>
            <a
              href="https://payhip.com/SpaPregio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-colors border border-white/30"
            >
              Shop All Suites
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
