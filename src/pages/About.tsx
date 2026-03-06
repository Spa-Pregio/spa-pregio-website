import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Users, Sparkles, Mail, MapPin } from 'lucide-react';

const SERVICE_ID = 'service_lmaajah';
const TEMPLATE_ID = 'template_ifdr09o';
const PUBLIC_KEY = 'WSKOBiLAfd1hQ6jLg';

declare global {
  interface Window {
    emailjs: any;
  }
}

const values = [
  { icon: Heart, title: 'Celebration is Sacred', desc: 'Every pregnancy — first or fifth — deserves to be honored. We believe the world needs more joy, more gathering, and more intentional celebration of the women bringing life into it.' },
  { icon: Sparkles, title: 'Elevated & Intimate', desc: 'After 25 years in the beauty industry, we know what it feels like to be truly pampered. Spa-Pregio brings that elevated, personal touch to every mama\'s journey.' },
  { icon: Users, title: 'Community at the Core', desc: 'Raising a child takes a village. We\'re building that village — locally, intentionally, and with heart — so no mama has to figure it out alone.' },
];

export default function About() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.firstName || !formData.email || !formData.message) {
      alert('Please fill in your name, email, and message.');
      return;
    }
    setStatus('sending');

    try {
      window.emailjs.init(PUBLIC_KEY);
      await window.emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          message: formData.message,
          email: formData.email,
        }
      );
      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="w-full pt-20">

      {/* Hero */}
      <section className="w-full py-16 lg:py-24 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Our Story</span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-spa-charcoal leading-tight mt-4">
              It started with a <span className="text-spa-purple">shrimp ring.</span>
            </h1>
            <p className="mt-6 text-lg text-spa-gray leading-relaxed">
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
              <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">The "Uh Oh" Moment</span>
              <h2 className="section-title mt-4">
                "Uh Oh, <span className="text-spa-purple">Spa-Pregio."</span>
              </h2>
              <div className="mt-6 space-y-5 text-spa-gray leading-relaxed">
                <p>
                  It was 11pm when my daughter sent her husband out for a shrimp ring. You know — one of those late-night pregnancy cravings that sends everyone scrambling. And right then, something popped into my head. The old SpaghettiOs jingle. Except the words that came out were:
                </p>
                <p className="font-serif text-xl text-spa-charcoal italic pl-4 border-l-4 border-spa-purple">
                  "Uh Oh, Spa-Pregio."
                </p>
                <p>
                  I was teasing her — her husband had just had a vasectomy, and here she was craving shrimp rings at midnight. We laughed. But that name? It stuck. And somewhere between the laughter and the shrimp ring, a brand was born.
                </p>
                <p>
                  That's the thing about real moments — they have a way of becoming something bigger than you expected.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant">
                <img src="/images/connect_bright.jpg" alt="Mothers connecting" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-spa-purple text-white px-6 py-4 rounded-2xl shadow-lg max-w-[220px]">
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
              <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">The Mission</span>
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
                  That's an underserved market. And Spa-Pregio® exists to change that.
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
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-elegant">
                <img src="/images/angie_founder.jpeg" alt="Angie, Founder of Spa-Pregio®" className="w-full h-full object-cover object-top" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white border border-spa-light rounded-2xl shadow-elegant px-6 py-4 max-w-[220px]">
                <p className="font-serif text-sm text-spa-charcoal italic">"Every gift deserves to be wrapped with love."</p>
                <p className="text-xs text-spa-purple mt-2 font-medium">— Angie, Founder</p>
              </div>
            </div>
            <div>
              <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">From a Grandmother's Heart</span>
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
                  Spa-Pregio® is my love letter to every mama bringing something beautiful into this hard world.
                </p>
              </div>
              <div className="mt-8">
                <p className="text-spa-purple font-medium">— Angie, Founder of Spa-Pregio®</p>
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
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">What We Stand For</span>
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
              <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Contact</span>
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

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-spa-charcoal mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-spa-charcoal mb-1">Message</label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
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
                onClick={handleSubmit}
                disabled={status === 'sending'}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
                {status !== 'sending' && <ArrowRight size={18} />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-16 lg:py-20 bg-spa-purple">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl text-white">
            Ready to join the <span className="text-spa-pink">movement?</span>
          </h2>
          <p className="mt-4 text-white/70 leading-relaxed">
            Free membership. A community of mamas who celebrate each other. Local vendors who show up for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/membership" className="bg-white text-spa-purple px-6 py-3 rounded-full font-medium hover:bg-spa-cream transition-colors inline-flex items-center justify-center gap-2">
              Become a Member — Free
              <ArrowRight size={18} />
            </Link>
            <Link to="/events" className="px-6 py-3 border-2 border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-colors">
              Explore Events
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
