import { ArrowRight, Star, Heart, Share2, DollarSign, Gift, Crown, Sparkles, Store, Zap } from 'lucide-react';

const tiers = [
  {
    icon: Heart,
    name: 'Blossom Sister',
    requirement: 'Just getting started',
    commission: '30% digital · 10% vendors',
    perks: [
      'Unique referral tracking link',
      'Real-time Sister dashboard',
      '30% commission on digital suite sales',
      '10% recurring on monthly vendor referrals',
      '15% on founding lifetime vendor referrals',
      'Access to promo graphics & captions',
      'Spa-Pregio® Ambassador badge',
    ],
    color: 'border-spa-pink bg-spa-blush',
    badge: 'bg-spa-pink text-white',
    cta: 'Start Here',
  },
  {
    icon: Star,
    name: 'Mama Sister',
    requirement: '10+ sales',
    commission: '30% digital · 10% vendors + Perks',
    perks: [
      'Everything in Blossom Sister',
      'Free Celebration Suite™ ($27 value)',
      'Featured on Spa-Pregio® website',
      'Early access to new suite drops',
      'Personal shoutout on our socials',
    ],
    color: 'border-spa-purple bg-spa-lavender',
    badge: 'bg-spa-purple text-white',
    highlight: true,
    cta: 'Most Popular',
  },
  {
    icon: Crown,
    name: 'VIP Suite Sister',
    requirement: '25+ sales',
    commission: '30% digital · 10% vendors + All Suites Free',
    perks: [
      'Everything in Mama Sister',
      'ALL Celebration Suites free (forever)',
      'Featured in our email newsletter',
      'First access to every new product',
      'Direct line to Angie (founder)',
    ],
    color: 'border-amber-400 bg-amber-50',
    badge: 'bg-amber-400 text-white',
    cta: 'Elite Level',
  },
];

const earningStreams = [
  {
    icon: Gift,
    title: 'Digital Suite Sales',
    commission: '30%',
    color: 'bg-spa-blush border-spa-pink',
    iconColor: 'text-spa-pink',
    description: 'Earn 30% on every Celebration Suite™ sold through your link.',
    examples: [
      { label: '1 sale', value: '$8.10' },
      { label: '10 sales', value: '$81' },
      { label: '50 sales', value: '$405' },
    ],
    note: 'Tracked via Payhip — paid monthly',
  },
  {
    icon: Store,
    title: 'Monthly Vendor Referrals',
    commission: '10% recurring',
    color: 'bg-spa-lavender border-spa-purple',
    iconColor: 'text-spa-purple',
    description: 'Earn 10% every month a vendor you referred stays active.',
    examples: [
      { label: 'Starter ($29/mo)', value: '$2.90/mo' },
      { label: 'Professional ($79/mo)', value: '$7.90/mo' },
      { label: 'Enterprise ($149/mo)', value: '$14.90/mo' },
    ],
    note: 'Recurring — keeps paying every month',
  },
  {
    icon: Zap,
    title: 'Founding Lifetime Vendors',
    commission: '15% one-time',
    color: 'bg-spa-charcoal border-spa-charcoal',
    iconColor: 'text-spa-pink',
    dark: true,
    description: 'Earn 15% on any founding lifetime vendor package.',
    examples: [
      { label: 'Founding Starter ($199)', value: '$29.85' },
      { label: 'Founding Pro ($499)', value: '$74.85' },
      { label: 'Founding Enterprise ($999)', value: '$149.85' },
    ],
    note: 'One-time payout — highest per-sale earning',
  },
];

const steps = [
  { icon: Share2, number: '01', title: 'Apply Free', desc: 'Create your account and apply to become a Suite Sister in under 2 minutes. No experience needed.' },
  { icon: DollarSign, number: '02', title: 'Get Your Link', desc: 'You\'ll receive a unique referral link. Share it anywhere — TikTok, Instagram, Facebook, text message.' },
  { icon: Store, number: '03', title: 'Refer Vendors', desc: 'Share the vendor listing opportunity with local businesses. Every vendor who signs up through your link earns you recurring commission.' },
  { icon: Sparkles, number: '04', title: 'Watch It Stack', desc: 'Digital sales pay once. Vendor referrals keep paying every month. The more active vendors you refer, the bigger your recurring income.' },
];

const faqs = [
  { q: 'How much can I earn?', a: 'Two ways: 30% on digital suite sales ($8.10 per sale) plus 10% recurring on every vendor you refer. One Enterprise vendor alone pays you $14.90 every single month they\'re active.' },
  { q: 'When do I get paid?', a: 'Digital suite commissions are tracked via Payhip and paid monthly. Vendor referral commissions are confirmed after 30 days and paid via Venmo, PayPal, or Zelle.' },
  { q: 'What\'s the difference between digital and vendor commissions?', a: 'Digital suite sales are one-time payments you earn when a mama buys a suite. Vendor commissions are recurring — you keep earning every month that vendor stays on the platform.' },
  { q: 'Do I need a big following?', a: 'Not at all! Some of the best referrals come from a simple conversation with a local spa owner or photographer. Authentic beats big every time.' },
  { q: 'Is there a cost to join?', a: 'Zero. Free to join, free to share, free to earn. You only get paid — never pay us.' },
  { q: 'How do I refer vendors?', a: 'Once you\'re approved, your Sister dashboard gives you a referral link that goes directly to the vendor listing page. Any vendor who signs up through that link is credited to you automatically.' },
];

export default function Ambassadors() {
  return (
    <div className="w-full pt-20">

      {/* Hero */}
      <section className="w-full py-16 lg:py-24 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Affiliate Program</span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-spa-charcoal leading-tight mt-4">
              Become a <span className="text-spa-purple">Suite Sister™</span>
            </h1>
            <p className="mt-6 text-lg text-spa-gray leading-relaxed">
              Two ways to earn. Share digital suites with mamas and earn 30% per sale.
              Refer vendors to the platform and earn recurring monthly commission — forever.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/sister-dashboard"
                className="btn-primary justify-center"
              >
                Join the Suite Sisters™ — Free
                <ArrowRight size={18} />
              </a>
            </div>
            <p className="text-xs text-spa-gray mt-3">Free to join. Two commission streams. No experience needed.</p>
          </div>
        </div>
      </section>

      {/* The Numbers */}
      <section className="w-full py-12 bg-spa-purple">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="font-serif text-4xl lg:text-5xl text-white">30%</p>
              <p className="text-white/70 text-sm mt-1">On digital suite sales</p>
            </div>
            <div>
              <p className="font-serif text-4xl lg:text-5xl text-spa-pink">10%</p>
              <p className="text-white/70 text-sm mt-1">Recurring on vendor referrals</p>
            </div>
            <div>
              <p className="font-serif text-4xl lg:text-5xl text-white">15%</p>
              <p className="text-white/70 text-sm mt-1">On founding lifetime vendors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Two Earning Streams */}
      <section className="w-full py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">How You Earn</span>
            <h2 className="section-title mt-4">Two streams. <span className="text-spa-purple">One link.</span></h2>
            <p className="mt-4 text-spa-gray max-w-xl mx-auto">
              Most affiliate programs pay once. Suite Sisters™ earn recurring income every month vendors stay active — on top of digital suite commissions.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {earningStreams.map((stream, i) => (
              <div key={i} className={`rounded-2xl border-2 p-8 ${stream.color} ${stream.dark ? 'text-white' : ''}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stream.dark ? 'bg-white/10' : 'bg-white'}`}>
                    <stream.icon size={22} className={stream.iconColor} />
                  </div>
                  <div>
                    <h3 className={`font-serif text-xl ${stream.dark ? 'text-white' : 'text-spa-charcoal'}`}>{stream.title}</h3>
                    <span className={`text-sm font-bold ${stream.dark ? 'text-spa-pink' : 'text-spa-purple'}`}>{stream.commission}</span>
                  </div>
                </div>
                <p className={`text-sm mb-6 leading-relaxed ${stream.dark ? 'text-white/70' : 'text-spa-gray'}`}>{stream.description}</p>
                <div className="space-y-2">
                  {stream.examples.map((ex, j) => (
                    <div key={j} className={`flex items-center justify-between text-sm px-4 py-2 rounded-xl ${stream.dark ? 'bg-white/10' : 'bg-white/60'}`}>
                      <span className={stream.dark ? 'text-white/70' : 'text-spa-gray'}>{ex.label}</span>
                      <span className={`font-medium ${stream.dark ? 'text-spa-pink' : 'text-spa-purple'}`}>{ex.value}</span>
                    </div>
                  ))}
                </div>
                <p className={`text-xs mt-4 ${stream.dark ? 'text-white/40' : 'text-spa-gray/60'}`}>{stream.note}</p>
              </div>
            ))}
          </div>

          {/* Earnings scenario callout */}
          <div className="mt-12 bg-spa-purple rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="font-serif text-2xl text-white">What could you actually earn?</h3>
              <p className="text-white/60 text-sm mt-2">Example: moderate activity, mix of both streams</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { label: 'Light', desc: '3 suite sales + 1 vendor referral', digital: '$24.30', vendor: '$2.90/mo', total: '~$27+/mo' },
                { label: 'Moderate', desc: '8 suite sales + 3 vendor referrals', digital: '$64.80', vendor: '$16.70/mo', total: '~$108+/mo' },
                { label: 'Strong', desc: '15 suite sales + 6 vendor referrals', digital: '$121.50', vendor: '$39.40/mo', total: '~$235+/mo' },
              ].map((scenario, i) => (
                <div key={i} className="bg-white/10 rounded-xl p-6 text-center">
                  <p className="text-spa-pink font-bold text-sm uppercase tracking-wide mb-1">{scenario.label}</p>
                  <p className="text-white/50 text-xs mb-4">{scenario.desc}</p>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-white/60">Digital</span>
                      <span className="text-white">{scenario.digital}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Vendors (recurring)</span>
                      <span className="text-white">{scenario.vendor}</span>
                    </div>
                  </div>
                  <p className="font-serif text-2xl text-spa-pink">{scenario.total}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-white/30 text-xs mt-6">Vendor commissions grow every month active vendors stay on the platform.</p>
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
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-spa-lavender flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-spa-purple" />
                  </div>
                  <p className="text-xs font-bold text-spa-purple tracking-widest mb-2">{step.number}</p>
                  <h3 className="font-serif text-lg text-spa-charcoal mb-2">{step.title}</h3>
                  <p className="text-sm text-spa-gray leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Ambassador Tiers</span>
            <h2 className="section-title mt-4">Level up as you <span className="text-spa-purple">grow.</span></h2>
            <p className="text-spa-gray mt-4 max-w-xl mx-auto">Everyone starts as a Blossom Sister. Hit milestones and unlock free products, features, and VIP perks.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <div key={tier.name} className={`relative rounded-2xl border-2 p-8 ${tier.color} ${tier.highlight ? 'shadow-elegant scale-105' : ''}`}>
                  {tier.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 bg-spa-purple text-white text-xs font-bold rounded-full uppercase tracking-wider">Most Popular</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Icon size={22} className="text-spa-purple" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-spa-charcoal">{tier.name}</h3>
                      <p className="text-xs text-spa-gray">{tier.requirement}</p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${tier.badge}`}>{tier.commission}</span>
                  </div>
                  <ul className="space-y-3">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2 text-sm text-spa-gray">
                        <span className="text-spa-purple mt-0.5">✓</span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="w-full py-16 lg:py-20 bg-spa-cream">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Perfect For</span>
          <h2 className="section-title mt-4">You don't need a <span className="text-spa-purple">big following.</span></h2>
          <p className="text-spa-gray mt-4 leading-relaxed max-w-2xl mx-auto">
            Suite Sisters come in all sizes. A regular mama who texts her local spa owner a referral link earns just as real as a TikTok creator with 100K followers.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {['Pregnant mamas', 'Mom bloggers', 'TikTok creators', 'Instagram moms', 'Baby shower planners', 'Doulas & midwives', 'Postpartum coaches', 'Anyone who loves mamas'].map((who) => (
              <div key={who} className="bg-white rounded-xl px-4 py-3 text-sm text-spa-charcoal font-medium shadow-sm">
                💜 {who}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">FAQ</span>
            <h2 className="section-title mt-4">Your <span className="text-spa-purple">questions.</span></h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-spa-cream rounded-2xl p-6">
                <h3 className="font-semibold text-spa-charcoal mb-2">{faq.q}</h3>
                <p className="text-spa-gray text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-16 lg:py-24 bg-spa-purple">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-serif text-3xl lg:text-5xl text-white leading-tight">
            Ready to become a <span className="text-spa-pink">Suite Sister™?</span>
          </h2>
          <p className="mt-4 text-white/70 leading-relaxed max-w-xl mx-auto">
            Join free. Share your link. Earn on digital sales and recurring vendor referrals. Help mamas celebrate — and get paid for it.
          </p>
          <a
            href="/sister-dashboard"
            className="inline-flex items-center gap-2 bg-white text-spa-purple px-8 py-4 rounded-full font-semibold hover:bg-spa-cream transition-colors mt-8 text-lg"
          >
            Join the Suite Sisters™ — It's Free
            <ArrowRight size={20} />
          </a>
          <p className="text-white/50 text-xs mt-4">No cost. No catch. Two commission streams.</p>
        </div>
      </section>

    </div>
  );
}
