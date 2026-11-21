import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Users, Sparkles, Mail, MapPin } from 'lucide-react';

const WEB3FORMS_URL = 'https://api.web3forms.com/submit';
const ACCESS_KEY = '8a7fd579-fb85-441e-a3e8-40a96c2ca782';

const values = [
  {
    icon: Heart,
    title: 'Celebration is Sacred',
    desc: 'Every pregnancy — first or fifth — deserves to be honored. We believe the world needs more joy, more gathering, and more intentional celebration of the women bringing life into it.',
  },
  {
    icon: Sparkles,
    title: 'Warm & Intentional',
    desc: "After 25 years in the beauty industry, we know what it feels like to be truly pampered. Spa-Pregio brings that thoughtful, personal care to every mama's journey.",
  },
  {
    icon: Users,
    title: 'Community at the Core',
    desc: "Raising a child takes a village. We're building that village — locally, intentionally, and with heart — so no mama has to figure it out alone.",
  },
];

const BrandTM = () => (
  <>
    Spa-Pregio
    <span className="align-super text-[10px] ml-0.5">TM</span>
  </>
);

export default function About() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(WEB3FORMS_URL, {
        method: 'POST',
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          firstName: formData.get('firstName'),
          lastName: formData.get('lastName'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="w-full pt-16 lg:pt-20">
      {/* Hero */}
      <section className="w-full py-16 lg:py-22 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple font-medium">Our Story</span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-spa-charcoal leading-tight mt-4">
              It started with a <span className="text-spa-purple">shrimp ring.</span>
            </h1>
            <p className="mt-5 text-lg text-spa-gray leading-relaxed">
              And a late-night craving. And a joke that became a calling.
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="w-full py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-sm uppercase tracking-[0.15em] text-spa-purple font-medium">The "Uh Oh" Moment</span>
              <h2 className="section-title mt-4">
                "Uh Oh, <span className="text-spa-purple"><BrandTM /></span>"
              </h2>
              <div className="mt-6 space-y-5 text-spa-gray leading-relaxed">
                <p>
                  It was 11pm when my daughter sent her husband out for a shrimp ring. You know — one of those late-night pregnancy cravings that sends everyone scrambling. And right then, something popped into my head. The old SpaghettiOs jingle. Except the words that came out were:
                </p>
                <p className="font-serif text-xl text-spa-charcoal italic pl-4 border-l-4 border-spa-purple">
                  "Uh Oh, <BrandTM />."
                </p>
                <p>
                  I was teasing her — her husband had just had a vasectomy, and here she was craving shrimp rings at midnight. We laughed. But that name? It stuck. And somewhere between the laughter and the shrimp ring, a brand was born.
                </p>
              </div>
            </div>
            <div className="relative pb-4 pl-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant">
                <img src="/images/connect_bright.jpg" alt="Mothers connecting" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 left-0 bg-spa-purple text-white px-6 py-4 rounded-2xl shadow-lg max-w-[230px]">
                <p className="font-serif text-sm italic">"Every mama deserves to be celebrated."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Why */}
      <section className="w-full py-16 lg:py-20 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant">
                <img src="/images/spa_photo.jpg" alt="Founder story" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-sm uppercase tracking-[0.15em] text-spa-purple font-medium">The Mission</span>
              <h2 className="section-title mt-4">
                25 years of listening to <span className="text-spa-purple">women.</span>
              </h2>
              <div className="mt-6 space-y-5 text-spa-gray leading-relaxed">
                <p>
                  I've been in the beauty industry for 25 years. I started with nails — because creativity was always in me and I wanted to follow it. But what I discovered behind that nail table was something far more valuable than any service I could offer.
                </p>
                <p>
                  I had the most engaging, real, soul-level conversations with my clients. Women opened up to me about their lives, their fears, their celebrations, their heartbreaks. I served high-end clients. I listened. I learned. And over 25 years, I came to understand women deeply — what they carry, what they crave, and what they deserve.
                </p>
                <p>
                  What they deserve — especially when they're pregnant — is to be <em>seen</em>. To be <em>celebrated</em>. Not just at a shower, not just once, but throughout the entire journey of bringing a life into this world.
                </p>
                <p className="font-medium text-spa-charcoal">
                  That's an underserved market. And <BrandTM /> exists to change that.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grandma Section */}
      <section className="w-full py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative pb-5 pr-4">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-elegant">
                <img
                  src="/images/angie_founder.jpeg"
                  alt="Angie, Founder of Spa-PregioTM"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-white border border-spa-light rounded-2xl shadow-elegant px-6 py-4 max-w-[235px]">
                <p className="font-serif text-sm text-spa-charcoal italic">"Every gift deserves to be wrapped with love."</p>
                <p className="text-xs text-spa-purple mt-2 font-medium">— Angie, Founder</p>
              </div>
            </div>
            <div>
              <span className="text-sm uppercase tracking-[0.15em] text-spa-purple font-medium">From a Grandmother's Heart</span>
              <h2 className="section-title mt-4">
                The world has stopped <span className="text-spa-purple">celebrating mamas.</span>
              </h2>
              <div className="mt-6 space-y-5 text-spa-gray leading-relaxed">
                <p>
                  As a grandmother — I call my grandchildren my "nuggets" — I watch closely. And what I see is a quiet decline in how we honor the women who are literally growing the next generation.
                </p>
                <p>
                  Pregnancy is hard. The world is hard. And yet, right in the middle of all of it, a woman is doing the most extraordinary thing a human being can do — she is creating life.
                </p>
                <p>
                  She deserves a shrimp ring at 11pm. She deserves a spa day. She deserves a community of women who get it, who show up, who celebrate her — whether it's her first pregnancy or her fifth.
                </p>
                <p className="font-serif text-xl text-spa-charcoal italic">
                  <BrandTM /> is my love letter to every mama bringing something beautiful into this hard world.
                </p>
              </div>
              <div className="mt-8">
                <p className="text-spa-purple font-medium">— Angie, Founder of <BrandTM /></p>
                <p className="text-spa-gray text-sm mt-1">Beauty industry veteran. Grandmother. Advocate for maternal celebration.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full py-16 lg:py-20 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple font-medium">What We Stand For</span>
            <h2 className="section-title mt-4">
              What we <span className="text-spa-purple">believe.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-spa-purple/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon size={28} className="text-spa-purple" />
                </div>
                <h3 className="font-serif text-xl text-spa-charcoal mb-3">{value.title}</h3>
                <p className="text-spa-gray leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="w-full py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <span className="text-sm uppercase tracking-[0.15em] text-spa-purple font-medium">Contact</span>
              <h2 className="section-title mt-4">
                Get in <span className="text-spa-purple">touch.</span>
              </h2>
              <p className="mt-4 text-spa-gray leading-relaxed">
                Whether you're an expectant mama, a local vendor, or just someone who believes in this movement — we'd love to hear from you.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-spa-purple" />
                  <span className="text-spa-charcoal">support@spa-pregio.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-spa-purple" />
                  <span className="text-spa-charcoal">North Carolina & nationwide</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-spa-charcoal mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-spa-charcoal mb-1">Message</label>
                <textarea
                  rows={4}
                  name="message"
                  required
                  className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30 resize-none"
                />
              </div>

              {status === 'success' && (
                <p className="text-green-600 text-sm font-medium">✅ Message sent! We'll be in touch soon.</p>
              )}
              {status === 'error' && (
                <p className="text-red-500 text-sm font-medium">Something went wrong. Please try again or email us directly.</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
                {status !== 'sending' && <ArrowRight size={18} />}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Curiosity-Led CTA */}
      <section className="w-full py-16 lg:py-20 bg-spa-purple">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-spa-blush font-semibold mb-3">
            See It In Action
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl text-white">
            Curious what a <BrandTM /> celebration looks like?
          </h2>
          <p className="mt-4 text-white/80 leading-relaxed max-w-2xl mx-auto">
            Peek inside our ready-to-launch digital suites or see what local spas, bakers, and hosts are planning near you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              to="/suites"
              className="group bg-white text-spa-purple px-7 py-3.5 rounded-full font-semibold hover:bg-spa-cream transition-colors inline-flex items-center justify-center gap-2 shadow-sm"
            >
              Peek Inside a Celebration Suite
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/events"
              className="group px-7 py-3.5 border-2 border-white/40 text-white rounded-full font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
            >
              See What's Happening Near You
            </Link>
          </div>
          <p className="text-xs italic text-white/65 mt-4 font-serif">
            No account needed to browse — take a look around in 60 seconds.
          </p>
        </div>
      </section>
    </div>
  );
}
