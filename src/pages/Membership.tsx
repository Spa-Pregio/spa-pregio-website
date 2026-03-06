import { useState } from 'react';
import {
  Check, Users, Calendar, Gift, Sparkles, MapPin,
  ArrowRight, Lock, Mail, User, Baby, Heart
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const benefits = [
  { icon: Users, title: 'Connect Locally', desc: 'Find and meet expectant mothers in your area' },
  { icon: Calendar, title: 'Local Events', desc: 'Discover and join events near you' },
  { icon: Gift, title: 'Venue Discounts', desc: 'Exclusive discounts at partner venues' },
  { icon: Sparkles, title: 'Celebration Suites', desc: 'Free access to printable collections' },
  { icon: MapPin, title: 'Event Creation', desc: 'Host your own meetups and gatherings' },
  { icon: Heart, title: 'Community Support', desc: 'A supportive network of mothers-to-be' },
];

const testimonials = [
  { quote: 'I was feeling isolated in my pregnancy until I found Spa-Pregio. Now I have a group of mom friends I see every week.', author: 'Jessica M.', location: 'Denver, CO' },
  { quote: 'The venue discounts alone have saved me hundreds of dollars. And the community is priceless.', author: 'Amanda K.', location: 'Miami, FL' },
  { quote: 'Hosting my first meetup was scary, but everyone was so welcoming. Now I do it monthly!', author: 'Rachel T.', location: 'Portland, OR' },
];

export default function Membership() {
  const [isLogin, setIsLogin] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dueDate: '',
    location: '',
  });

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          due_date: formData.dueDate,
          location: formData.location,
        },
      },
    });

    if (error) {
      setErrorMsg(error.message);
      setStatus('error');
    } else {
      setStatus('success');
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setErrorMsg(error.message);
      setStatus('error');
    } else {
      setStatus('success');
    }
  };

  if (status === 'success' && !isLogin) {
    return (
      <div className="w-full pt-20 min-h-screen bg-spa-cream flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 rounded-full bg-spa-purple/10 flex items-center justify-center mx-auto mb-6">
            <Check size={36} className="text-spa-purple" />
          </div>
          <h2 className="font-serif text-3xl text-spa-charcoal mb-4">Welcome to Spa-Pregio! 🎉</h2>
          <p className="text-spa-gray leading-relaxed">
            Your account has been created! Please check your email to confirm your address, then you'll be all set.
          </p>
        </div>
      </div>
    );
  }

  if (status === 'success' && isLogin) {
    return (
      <div className="w-full pt-20 min-h-screen bg-spa-cream flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 rounded-full bg-spa-purple/10 flex items-center justify-center mx-auto mb-6">
            <Check size={36} className="text-spa-purple" />
          </div>
          <h2 className="font-serif text-3xl text-spa-charcoal mb-4">Welcome back! 💜</h2>
          <p className="text-spa-gray leading-relaxed">You're signed in successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pt-20">
      {/* Hero Section */}
      <section className="w-full py-16 lg:py-24 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Membership</span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-spa-charcoal leading-tight mt-4">
              Join the <span className="text-spa-purple">movement.</span>
            </h1>
            <p className="mt-6 text-lg text-spa-gray leading-relaxed">
              Free membership. Instant access to local events, Celebration Suites, and a community of expectant mothers who understand your journey.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Member Benefits</span>
            <h2 className="section-title mt-4">
              Everything you need to <span className="text-spa-purple">celebrate.</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-spa-purple/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon size={22} className="text-spa-purple" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-spa-charcoal mb-1">{benefit.title}</h3>
                  <p className="text-spa-gray text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signup/Login Section */}
      <section className="w-full py-16 lg:py-20 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Form */}
            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-elegant">
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => { setIsLogin(false); setStatus('idle'); setErrorMsg(''); }}
                  className={`flex-1 py-3 rounded-full font-medium transition-colors ${
                    !isLogin ? 'bg-spa-purple text-white' : 'bg-spa-lavender text-spa-charcoal'
                  }`}
                >
                  Create Account
                </button>
                <button
                  onClick={() => { setIsLogin(true); setStatus('idle'); setErrorMsg(''); }}
                  className={`flex-1 py-3 rounded-full font-medium transition-colors ${
                    isLogin ? 'bg-spa-purple text-white' : 'bg-spa-lavender text-spa-charcoal'
                  }`}
                >
                  Sign In
                </button>
              </div>

              {isLogin ? (
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">Email</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-spa-gray" />
                      <input
                        type="email"
                        placeholder="you@email.com"
                        required
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">Password</label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-spa-gray" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        required
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                      />
                    </div>
                  </div>

                  {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full justify-center mt-6 disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Signing in...' : 'Sign In'}
                    {status !== 'loading' && <ArrowRight size={18} />}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-spa-charcoal mb-1">First Name</label>
                      <div className="relative">
                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-spa-gray" />
                        <input
                          type="text"
                          placeholder="Jane"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-spa-charcoal mb-1">Last Name</label>
                      <input
                        type="text"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">Email</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-spa-gray" />
                      <input
                        type="email"
                        placeholder="you@email.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">Password</label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-spa-gray" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-spa-charcoal mb-1">
                        <Baby size={16} className="inline mr-1" />
                        Due Date (Optional)
                      </label>
                      <input
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-spa-charcoal mb-1">
                        <MapPin size={16} className="inline mr-1" />
                        Location
                      </label>
                      <input
                        type="text"
                        placeholder="City, State"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <input type="checkbox" required className="mt-1 rounded border-spa-charcoal/20" />
                    <span className="text-sm text-spa-gray">
                      I agree to the <a href="#" className="text-spa-purple hover:underline">Terms of Service</a> and <a href="#" className="text-spa-purple hover:underline">Privacy Policy</a>
                    </span>
                  </div>

                  {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full justify-center mt-6 disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Creating account...' : 'Create Free Account'}
                    {status !== 'loading' && <ArrowRight size={18} />}
                  </button>

                  <p className="text-xs text-spa-gray text-center">
                    No credit card required. Cancel anytime.
                  </p>
                </form>
              )}
            </div>

            {/* Testimonials */}
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl text-spa-charcoal mb-6">
                Why mothers love <span className="text-spa-purple">Spa-Pregio.</span>
              </h2>
              <div className="space-y-6">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-spa-purple flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-medium">{testimonial.author[0]}</span>
                    </div>
                    <div>
                      <p className="text-spa-charcoal leading-relaxed">"{testimonial.quote}"</p>
                      <p className="text-sm text-spa-gray mt-2">— {testimonial.author}, {testimonial.location}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 pt-10 border-t border-spa-purple/10">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Check size={18} className="text-spa-purple" />
                    <span className="text-sm text-spa-gray">Free forever</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={18} className="text-spa-purple" />
                    <span className="text-sm text-spa-gray">No ads</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={18} className="text-spa-purple" />
                    <span className="text-sm text-spa-gray">Cancel anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 lg:py-20 bg-spa-purple">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl text-white">
            Already a <span className="text-spa-pink">member?</span>
          </h2>
          <p className="mt-4 text-white/70 leading-relaxed">
            Welcome back! Sign in to discover events, connect with other mothers, and plan your Celebration Suite.
          </p>
          <button
            onClick={() => { setIsLogin(true); setStatus('idle'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="bg-white text-spa-purple px-6 py-3 rounded-full font-medium hover:bg-spa-cream transition-colors inline-flex items-center gap-2 mt-8"
          >
            Sign In to Your Account
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
