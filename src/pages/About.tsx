import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Users, Sparkles, Mail, MapPin } from 'lucide-react';

const values = [
  { icon: Heart, title: 'Community First', desc: 'We believe no mother-to-be should feel alone. Connection is at the heart of everything we do.' },
  { icon: Sparkles, title: 'Elevated Experiences', desc: 'Every mother deserves to celebrate in style. We bring elegance to every moment.' },
  { icon: Users, title: 'Inclusivity', desc: 'All expectant mothers are welcome. Our community thrives on diversity and mutual support.' },
];

const press = [
  { name: 'Vogue', quote: 'The most elegant approach to baby shower planning we\'ve seen.' },
  { name: 'Parents Magazine', quote: 'A game-changer for expectant mothers seeking community.' },
  { name: 'The Bump', quote: 'Where sophistication meets motherhood.' },
];

const team = [
  { name: 'Alexandra Chen', role: 'Founder & CEO', bio: 'After feeling isolated during her own pregnancy, Alexandra created Spa-Pregio to ensure no mother-to-be would celebrate alone.' },
  { name: 'Sarah Mitchell', role: 'Head of Community', bio: 'Sarah brings 10 years of event planning experience and a passion for building meaningful connections.' },
  { name: 'Emma Rodriguez', role: 'Creative Director', bio: 'Emma leads our design team, creating the elegant Celebration Suites that define the Spa-Pregio aesthetic.' },
];

export default function About() {
  return (
    <div className="w-full pt-20">
      {/* Hero Section */}
      <section className="w-full py-16 lg:py-24 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">About</span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-spa-charcoal leading-tight mt-4">
              The Celebration Suite <span className="text-spa-purple">Movement.</span>
            </h1>
            <p className="mt-6 text-lg text-spa-gray leading-relaxed">
              We're redefining how expectant mothers celebrate, connect, and support each other. This is more than a platform—it's a movement.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="w-full py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Our Story</span>
              <h2 className="section-title mt-4">
                From one mother's <span className="text-spa-purple">vision.</span>
              </h2>
              <div className="mt-6 space-y-4 text-spa-gray leading-relaxed">
                <p>
                  Spa-Pregio began with a simple observation: pregnancy can be isolating. Despite being surrounded by well-wishers, many expectant mothers feel alone in their journey.
                </p>
                <p>
                  Our founder, Alexandra Chen, experienced this firsthand. During her pregnancy, she longed for connection with other mothers-to-be who understood what she was going through. She wanted to celebrate this special time, not just endure it.
                </p>
                <p>
                  What started as a small gathering of local expectant mothers has grown into a nationwide movement. Today, Spa-Pregio connects thousands of mothers-to-be, helping them find community, plan beautiful celebrations, and support each other through one of life's most transformative journeys.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant">
                <img
                  src="/images/connect_bright.jpg"
                  alt="Mothers connecting"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full py-16 lg:py-20 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Our Values</span>
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

      {/* Team */}
      <section className="w-full py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">The Team</span>
            <h2 className="section-title mt-4">
              Meet the <span className="text-spa-purple">people.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 rounded-full bg-spa-purple/10 flex items-center justify-center mx-auto mb-6">
                  <span className="font-serif text-2xl text-spa-purple">{member.name[0]}</span>
                </div>
                <h3 className="font-serif text-xl text-spa-charcoal">{member.name}</h3>
                <p className="text-spa-purple text-sm mt-1">{member.role}</p>
                <p className="text-spa-gray text-sm mt-3 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="w-full py-16 lg:py-20 bg-spa-blush">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Press</span>
            <h2 className="section-title mt-4">
              As featured <span className="text-spa-purple">in.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {press.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-elegant text-center">
                <p className="font-serif text-lg text-spa-charcoal italic">"{item.quote}"</p>
                <p className="text-spa-purple font-medium mt-4">— {item.name}</p>
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
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-spa-purple" />
                  <span className="text-spa-charcoal">hello@spapregio.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-spa-purple" />
                  <span className="text-spa-charcoal">New York, NY</span>
                </div>
              </div>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-1">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-1">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-spa-charcoal mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-spa-charcoal mb-1">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30 resize-none"
                />
              </div>
              <button type="submit" className="btn-primary">
                Send Message
                <ArrowRight size={18} />
              </button>
            </form>
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
            Free membership. Instant access to a community of expectant mothers who understand your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/join" className="bg-white text-spa-purple px-6 py-3 rounded-full font-medium hover:bg-spa-cream transition-colors inline-flex items-center justify-center gap-2">
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
