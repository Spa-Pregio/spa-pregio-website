import { ArrowRight, Star, Heart, Share2, DollarSign, Gift, Crown, Sparkles } from 'lucide-react';

const tiers = [
  {
    icon: Heart,
    name: 'Blossom Sister',
    requirement: 'Just getting started',
    commission: '30%',
    perks: [
      'Unique affiliate tracking link',
      'Real-time dashboard (clicks & sales)',
      '30% commission on every sale',
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
    commission: '30% + Perks',
    perks: [
      'Everything in Blossom',
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
    commission: '30% + All Suites Free',
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

const steps = [
  { icon: Share2, number: '01', title: 'Sign Up Free', desc: 'Click the button below and create your free affiliate account in under 2 minutes. No experience needed.' },
  { icon: DollarSign, number: '02', title: 'Get Your Link', desc: 'You\'ll receive a unique tracking link for every Spa-Pregio® product. Share it anywhere — TikTok, Instagram, Facebook, text message.' },
  { icon: Gift, number: '03', title: 'Share & Earn', desc: 'Every time someone buys through your link you earn 30% commission. We track it all. You just share.' },
  { icon: Sparkles, number: '04', title: 'Level Up', desc: 'Hit milestones and unlock free products, features, and VIP perks. The more you share, the more you earn.' },
];

const faqs = [
  { q: 'How much can I earn?', a: 'You earn 30% of every sale you refer. The Celebration Suite™ is $27, so that\'s $8.10 per sale. With 10 sales that\'s $81. With 100 sales that\'s $810 — from one product.' },
  { q: 'When do I get paid?', a: 'Commissions are paid monthly via PayPal. You\'ll receive a payment for all sales from the previous month.' },
  { q: 'Do I need a big following?', a: 'Not at all! Some of our best ambassadors are regular mamas sharing with their small circle. Authentic beats big every time.' },
  { q: 'What do I share?', a: 'We give you ready-made graphics, caption ideas, and talking points. You just post and let your link do the work.' },
  { q: 'Is there a cost to join?', a: 'Zero. Free to join, free to share, free to earn. You only get paid — never pay us.' },
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
              Share the movement. Earn real money. Help mamas celebrate in style. 
              You only get paid when you bring in sales — zero risk, all reward.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://payhip.com/auth/register/af699c7e55b3f58"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary justify-center"
              >
                Join the Suite Sisters™ — Free
                <ArrowRight size={18} />
              </a>
            </div>
            <p className="text-xs text-spa-gray mt-3">Free to join. 30% commission. No experience needed.</p>
          </div>
        </div>
      </section>

      {/* The Numbers */}
      <section className="w-full py-12 bg-spa-purple">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="font-serif text-4xl lg:text-5xl text-white">30%</p>
              <p className="text-white/70 text-sm mt-1">Commission per sale</p>
            </div>
            <div>
              <p className="font-serif text-4xl lg:text-5xl text-spa-pink">$0</p>
              <p className="text-white/70 text-sm mt-1">Cost to join</p>
            </div>
            <div>
              <p className="font-serif text-4xl lg:text-5xl text-white">∞</p>
              <p className="text-white/70 text-sm mt-1">Earning potential</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-16 lg:py-20 bg-white">
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
      <section className="w-full py-16 lg:py-24 bg-spa-cream">
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
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${tier.badge}`}>{tier.commission}</span>
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
      <section className="w-full py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Perfect For</span>
          <h2 className="section-title mt-4">You don't need a <span className="text-spa-purple">big following.</span></h2>
          <p className="text-spa-gray mt-4 leading-relaxed max-w-2xl mx-auto">
            Suite Sisters come in all sizes — from micro influencers with 500 followers to mamas who just want to text their friends a link. Authentic wins every time.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {['Pregnant mamas', 'Mom bloggers', 'TikTok creators', 'Instagram moms', 'Baby shower planners', 'Doulas & midwives', 'Postpartum coaches', 'Anyone who loves mamas'].map((who) => (
              <div key={who} className="bg-spa-lavender rounded-xl px-4 py-3 text-sm text-spa-charcoal font-medium">
                💜 {who}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-16 lg:py-20 bg-spa-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">FAQ</span>
            <h2 className="section-title mt-4">Your <span className="text-spa-purple">questions.</span></h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-6 shadow-sm">
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
            Join free. Share your link. Earn 30% on every sale you bring in. Help mamas celebrate — and get paid for it.
          </p>
          <a
            href="https://payhip.com/auth/register/af699c7e55b3f58"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-spa-purple px-8 py-4 rounded-full font-semibold hover:bg-spa-cream transition-colors mt-8 text-lg"
          >
            Join the Suite Sisters™ — It's Free
            <ArrowRight size={20} />
          </a>
          <p className="text-white/50 text-xs mt-4">No cost. No catch. Just commissions.</p>
        </div>
      </section>

    </div>
  );
}
