import { ArrowRight, Check, Download, Palette, FileText, Clock, Star } from 'lucide-react';

const activeSuite = {
  name: 'The Celebration Suite™',
  subtitle: 'Luxury Baby Shower Planning Collection',
  price: 27,
  url: 'https://payhip.com/b/4w08K',
  image: '/images/product_blush_bloom.jpg',
  badge: 'Available Now',
  badgeColor: 'bg-spa-purple',
  description: 'Elevate your celebration with a thoughtfully designed, fully editable planning system created to simplify every detail. This is not just a template — it\'s a structured experience.',
  includes: [
    'Minimalist Invitation Template',
    'Lifestyle Invitation Template',
    'RSVP Card',
    'Baby Shower Planning Checklist',
    'Guest Tracker',
    'Budget Planner',
  ],
  for: [
    'Expecting mothers',
    'Hosts planning an elevated celebration',
    'Lovers of modern, neutral aesthetics',
    'Those who value elegance and organization',
  ],
};

const comingSuites = [
  {
    name: 'The Milestone Suite™',
    subtitle: 'Pregnancy Journey Keepsake Collection',
    badge: 'Coming Soon',
    description: 'Capture every beautiful moment from first trimester to birth — bump photos, cravings, feelings, and milestones all in one elegant keepsake.',
    image: '/images/kit_grid_01.jpg',
  },
  {
    name: 'The Push Party Suite™',
    subtitle: 'Co-Ed Celebration Planning Collection',
    badge: 'Coming Soon',
    description: 'The modern baby shower isn\'t just for the girls. This suite helps you plan an elevated co-ed celebration that everyone will love.',
    image: '/images/kit_grid_02.jpg',
  },
  {
    name: 'The Spa Day Suite™',
    subtitle: 'Prenatal Pampering Experience Guide',
    badge: 'Coming Soon',
    description: 'A complete guide to planning the ultimate prenatal spa experience — at home or with your favorite local vendors.',
    image: '/images/spa_bright.jpg',
  },
  {
    name: 'The Village Suite™',
    subtitle: 'Postpartum Support Planning Collection',
    badge: 'Coming Soon',
    description: 'Because the celebration doesn\'t end at birth. Help your community show up for the new mama in the weeks and months that follow.',
    image: '/images/connect_bright.jpg',
  },
];

const howItWorks = [
  { icon: Download, step: '01', title: 'Purchase & Download', desc: 'Complete your purchase and instantly receive your digital access file.' },
  { icon: Palette, step: '02', title: 'Open in Canva', desc: 'Click the secure Canva template link. A free Canva account works perfectly.' },
  { icon: FileText, step: '03', title: 'Personalize', desc: 'Add your event details, colors, and personal touches. No design experience needed.' },
  { icon: Clock, step: '04', title: 'Download & Share', desc: 'Export as PDF or PNG and share with your guests or send to print.' },
];

export default function CelebrationSuites() {
  return (
    <div className="w-full pt-20">

      {/* Hero */}
      <section className="w-full py-16 lg:py-24 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Celebration Suites</span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-spa-charcoal leading-tight mt-4">
            Every mama deserves an <span className="text-spa-purple">elevated</span> celebration.
          </h1>
          <p className="mt-6 text-lg text-spa-gray leading-relaxed max-w-2xl mx-auto">
            Thoughtfully designed planning collections that take the stress out of celebrating. Beautiful, editable, and made with love for the mama in your life.
          </p>
        </div>
      </section>

      {/* Featured Suite */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Featured Suite</span>
            <h2 className="section-title mt-4">Start here. <span className="text-spa-purple">Celebrate now.</span></h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant">
                <img src={activeSuite.image} alt={activeSuite.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 bg-spa-purple text-white rounded-full text-sm font-semibold">✨ Available Now</span>
              </div>
              {/* Price badge */}
              <div className="absolute -bottom-5 -right-5 w-24 h-24 rounded-full bg-white shadow-elegant flex flex-col items-center justify-center border-2 border-spa-purple/20">
                <span className="text-xs text-spa-gray">Only</span>
                <span className="font-bold text-2xl text-spa-purple">$27</span>
              </div>
            </div>

            {/* Details */}
            <div>
              <h3 className="font-serif text-3xl text-spa-charcoal">{activeSuite.name}</h3>
              <p className="text-spa-purple font-medium mt-1">{activeSuite.subtitle}</p>
              <p className="text-spa-gray leading-relaxed mt-4">{activeSuite.description}</p>

              {/* What's included */}
              <div className="mt-8">
                <p className="font-semibold text-spa-charcoal mb-4">✨ What's Included:</p>
                <ul className="space-y-2">
                  {activeSuite.includes.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-spa-gray">
                      <Check size={16} className="text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 p-4 bg-spa-lavender rounded-xl">
                <p className="text-xs text-spa-gray flex items-center gap-2">
                  <Star size={13} className="text-amber-400 fill-amber-400" />
                  All templates are fully editable in Canva. A free Canva account works perfectly.
                </p>
              </div>

              {/* CTA */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href={activeSuite.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary justify-center text-center"
                >
                  Get The Celebration Suite™ — $27
                  <ArrowRight size={18} />
                </a>
              </div>
              <p className="text-xs text-spa-gray mt-3">Digital download. Instant access. No design experience needed.</p>
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

      {/* Coming Soon Suites */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-4">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">The Collection</span>
            <h2 className="section-title mt-4">More suites <span className="text-spa-purple">coming soon.</span></h2>
            <p className="text-spa-gray mt-4 max-w-xl mx-auto">We're building out the full Celebration Suite collection — five milestone experiences for every stage of the journey.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {comingSuites.map((suite) => (
              <div key={suite.name} className="elegant-card group overflow-hidden opacity-80">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={suite.image} alt={suite.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute inset-0 bg-spa-charcoal/40" />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium">Coming Soon</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg text-spa-charcoal">{suite.name}</h3>
                  <p className="text-spa-purple text-xs font-medium mt-0.5">{suite.subtitle}</p>
                  <p className="text-sm text-spa-gray mt-2 leading-relaxed">{suite.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Notify me */}
          <div className="mt-16 bg-spa-lavender rounded-2xl p-8 lg:p-12 text-center">
            <h3 className="font-serif text-2xl text-spa-charcoal">Be the first to know.</h3>
            <p className="text-spa-gray mt-2 max-w-md mx-auto">Join our list and get notified when new Celebration Suites drop — plus exclusive early access pricing.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-6">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 bg-white rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
              />
              <button className="btn-primary whitespace-nowrap">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-16 lg:py-20 bg-spa-purple">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl text-white">
            Ready to celebrate <span className="text-spa-pink">her?</span>
          </h2>
          <p className="mt-4 text-white/70 leading-relaxed">
            The Celebration Suite™ is everything you need to plan a beautiful, elevated baby shower — all for $27.
          </p>
          <a
            href="https://payhip.com/b/4w08K"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-spa-purple px-8 py-4 rounded-full font-semibold hover:bg-spa-cream transition-colors mt-8"
          >
            Get The Celebration Suite™ — $27
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

    </div>
  );
}
