import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import {
  Heart, Download, Calendar, User, LogOut, Star,
  Edit2, Check, X, ChevronRight, Baby, Gift,
  Ticket, Clock, MapPin, ExternalLink, ShoppingBag,
  Sparkles, AlertCircle, Eye, EyeOff
} from 'lucide-react';

// All 5 Suites with Payhip links
const SUITES = [
  {
    id: 'celebration',
    name: 'The Celebration Suite™',
    subtitle: 'The Flagship',
    price: '$27',
    payhip: 'https://payhip.com/b/celebration-suite',
    color: 'from-spa-purple to-spa-pink',
    icon: '👑',
    description: 'The complete maternal celebration planning kit — checklists, vendor guides, budgeting tools & more.',
  },
  {
    id: 'baby-shower',
    name: 'The Baby Shower Suite™',
    subtitle: 'Plan the Perfect Shower',
    price: '$27',
    payhip: 'https://payhip.com/b/baby-shower-suite',
    color: 'from-pink-300 to-spa-purple',
    icon: '🍼',
    description: 'Everything you need to host or attend the most beautiful baby shower — themes, timelines & checklists.',
  },
  {
    id: 'gender-reveal',
    name: 'The Gender Reveal Suite™',
    subtitle: 'Make It a Moment',
    price: '$27',
    payhip: 'https://payhip.com/b/gender-reveal-suite',
    color: 'from-blue-300 to-pink-300',
    icon: '🎉',
    description: 'Creative reveal ideas, vendor checklists, and planning guides for an unforgettable gender reveal.',
  },
  {
    id: 'sip-and-see',
    name: 'The Sip & See Suite™',
    subtitle: 'Welcome Baby in Style',
    price: '$27',
    payhip: 'https://payhip.com/b/sip-and-see-suite',
    color: 'from-green-200 to-spa-purple',
    icon: '🌸',
    description: 'Host a gorgeous post-birth sip & see that celebrates mama and baby with grace and ease.',
  },
  {
    id: 'push-present',
    name: 'The Push Present Suite™',
    subtitle: 'She Deserves It',
    price: '$27',
    payhip: 'https://payhip.com/b/push-present-suite',
    color: 'from-yellow-200 to-spa-pink',
    icon: '💐',
    description: 'Pampering gift guides, spa & wellness vendor lists, and self-care checklists for the new mama.',
  },
  {
    id: 'pregnancy-announcement',
    name: 'The Announcement Suite™',
    subtitle: 'Share Your Joy',
    price: '$27',
    payhip: 'https://payhip.com/b/announcement-suite',
    color: 'from-spa-pink to-yellow-200',
    icon: '✨',
    description: 'Creative pregnancy announcement ideas, photo guides, and keepsake checklists for your big reveal.',
  },
];

type Tab = 'overview' | 'downloads' | 'events' | 'profile';

export default function MommaDashboard() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [editing, setEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [myRsvps, setMyRsvps] = useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);

  // Auth
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [authForm, setAuthForm] = useState({ email: '', password: '', first_name: '', last_name: '' });
  const [authStatus, setAuthStatus] = useState<'idle' | 'loading' | 'error' | 'verify'>('idle');
  const [authError, setAuthError] = useState('');

  // Profile form
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    due_date: '',
    city: '',
    state: '',
  });

  useEffect(() => { checkUser(); }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      await loadProfile(user.id);
      await loadMyRsvps(user.email);
      await loadUpcomingEvents();
    }
    setLoading(false);
  };

  const loadProfile = async (userId: string) => {
    const { data } = await supabase
      .from('momma_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    if (data) {
      setProfile(data);
      setFormData({
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        phone: data.phone || '',
        due_date: data.due_date || '',
        city: data.city || '',
        state: data.state || '',
      });
    }
  };

  const loadMyRsvps = async (email: string) => {
    const { data } = await supabase
      .from('event_rsvps')
      .select('*, events(*)')
      .eq('user_email', email)
      .order('created_at', { ascending: false });
    if (data) setMyRsvps(data);
  };

  const loadUpcomingEvents = async () => {
    const { data } = await supabase
      .from('events')
      .select('*')
      .gte('date', new Date().toISOString())
      .order('date', { ascending: true })
      .limit(4);
    if (data) setUpcomingEvents(data);
  };

  const handleAuth = async () => {
    setAuthStatus('loading');
    setAuthError('');
    try {
      if (authMode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email: authForm.email,
          password: authForm.password,
          options: { data: { first_name: authForm.first_name, last_name: authForm.last_name } }
        });
        if (error) throw error;
        if (data.user) {
          await supabase.from('momma_profiles').insert({
            user_id: data.user.id,
            first_name: authForm.first_name,
            last_name: authForm.last_name,
          });
        }
        setAuthStatus('verify');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: authForm.email,
          password: authForm.password,
        });
        if (error) throw error;
        await checkUser();
        setAuthStatus('idle');
      }
    } catch (err: any) {
      setAuthError(err.message || 'Something went wrong.');
      setAuthStatus('error');
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const handleSaveProfile = async () => {
    setSaveStatus('saving');
    const { error } = await supabase
      .from('momma_profiles')
      .upsert({ user_id: user.id, ...formData }, { onConflict: 'user_id' });
    if (error) { setSaveStatus('error'); return; }
    await loadProfile(user.id);
    setSaveStatus('saved');
    setEditing(false);
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'overview', label: 'Overview', icon: Heart },
    { id: 'downloads', label: 'My Suites', icon: Download },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  // ─── LOADING ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-spa-cream flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-spa-purple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-spa-charcoal/60 font-sans">Loading your sanctuary...</p>
        </div>
      </div>
    );
  }

  // ─── NOT LOGGED IN ───────────────────────────────────────────────────────────
  if (!user) {
    return (
      <div className="min-h-screen bg-spa-cream flex items-center justify-center pt-20 px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-spa-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Baby size={28} className="text-spa-purple" />
            </div>
            <h1 className="font-serif text-3xl text-spa-charcoal mb-2">
              {authMode === 'login' ? 'Welcome Back, Mama' : 'Join the Suite'}
            </h1>
            <p className="text-spa-charcoal/60 font-sans text-sm">
              {authMode === 'login'
                ? 'Sign in to access your downloads, events & profile'
                : 'Create your account to start your celebration journey'}
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-spa-purple/10 p-8">
            {authStatus === 'verify' ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={24} className="text-green-600" />
                </div>
                <h3 className="font-serif text-xl text-spa-charcoal mb-2">Check Your Email</h3>
                <p className="text-spa-charcoal/60 font-sans text-sm">
                  We sent a confirmation link to <strong>{authForm.email}</strong>. Click it to activate your account.
                </p>
                <button
                  onClick={() => setAuthStatus('idle')}
                  className="mt-6 text-spa-purple text-sm font-medium hover:underline"
                >
                  Back to login
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {authMode === 'signup' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-spa-charcoal/60 mb-1.5">First Name</label>
                      <input
                        type="text"
                        value={authForm.first_name}
                        onChange={e => setAuthForm({ ...authForm, first_name: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-spa-charcoal/20 font-sans text-sm focus:outline-none focus:border-spa-purple"
                        placeholder="First"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-spa-charcoal/60 mb-1.5">Last Name</label>
                      <input
                        type="text"
                        value={authForm.last_name}
                        onChange={e => setAuthForm({ ...authForm, last_name: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-spa-charcoal/20 font-sans text-sm focus:outline-none focus:border-spa-purple"
                        placeholder="Last"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-spa-charcoal/60 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={authForm.email}
                    onChange={e => setAuthForm({ ...authForm, email: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-spa-charcoal/20 font-sans text-sm focus:outline-none focus:border-spa-purple"
                    placeholder="you@email.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-spa-charcoal/60 mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={authForm.password}
                      onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
                      onKeyDown={e => e.key === 'Enter' && handleAuth()}
                      className="w-full px-3 py-2.5 pr-10 rounded-lg border border-spa-charcoal/20 font-sans text-sm focus:outline-none focus:border-spa-purple"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-spa-charcoal/40 hover:text-spa-charcoal"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                {authStatus === 'error' && (
                  <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2">
                    <AlertCircle size={14} />
                    <span>{authError}</span>
                  </div>
                )}

                <button
                  onClick={handleAuth}
                  disabled={authStatus === 'loading'}
                  className="w-full bg-spa-purple text-white font-sans font-medium py-3 rounded-lg hover:bg-spa-purple/90 transition-colors disabled:opacity-60"
                >
                  {authStatus === 'loading' ? 'Please wait...' : authMode === 'login' ? 'Sign In' : 'Create Account'}
                </button>

                <p className="text-center text-sm text-spa-charcoal/60">
                  {authMode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                  <button
                    onClick={() => { setAuthMode(authMode === 'login' ? 'signup' : 'login'); setAuthError(''); setAuthStatus('idle'); }}
                    className="text-spa-purple font-medium hover:underline"
                  >
                    {authMode === 'login' ? 'Sign up free' : 'Sign in'}
                  </button>
                </p>
              </div>
            )}
          </div>

          {/* Suite Sisters CTA */}
          <div className="mt-6 text-center">
            <p className="text-spa-charcoal/50 text-xs font-sans">
              Want to earn commissions?{' '}
              <Link to="/ambassadors" className="text-spa-purple hover:underline">
                Become a Suite Sister™
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ─── LOGGED IN DASHBOARD ─────────────────────────────────────────────────────
  const displayName = profile?.first_name || user.email?.split('@')[0] || 'Mama';

  return (
    <div className="min-h-screen bg-spa-cream pt-20">
      {/* Header Bar */}
      <div className="bg-white border-b border-spa-purple/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between">
          <div>
            <p className="text-spa-charcoal/50 text-xs font-sans uppercase tracking-widest">Member Dashboard</p>
            <h1 className="font-serif text-2xl text-spa-charcoal">Hello, {displayName} 💜</h1>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-spa-charcoal/50 hover:text-spa-charcoal text-sm font-sans transition-colors"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3.5 text-sm font-sans font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-spa-purple text-spa-purple'
                      : 'border-transparent text-spa-charcoal/50 hover:text-spa-charcoal'
                  }`}
                >
                  <Icon size={15} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-8">

        {/* ── OVERVIEW TAB ───────────────────────────────────────────────────── */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Welcome card */}
            <div className="bg-gradient-to-r from-spa-purple to-spa-pink rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles size={20} />
                <span className="font-sans text-sm font-medium uppercase tracking-widest opacity-80">Your Celebration Journey</span>
              </div>
              <h2 className="font-serif text-3xl mb-1">Welcome to Spa-Pregio™</h2>
              <p className="font-sans text-sm opacity-80">
                {profile?.due_date
                  ? `Your estimated due date: ${new Date(profile.due_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
                  : 'Update your profile to personalize your experience.'}
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Suites Owned', value: '—', icon: Download, note: 'Browse suites ↓' },
                { label: 'Events RSVPd', value: myRsvps.length, icon: Ticket, note: `${myRsvps.filter(r => r.events?.date > new Date().toISOString()).length} upcoming` },
                { label: 'Upcoming Events', value: upcomingEvents.length, icon: Calendar, note: 'In the community' },
                { label: 'Member Since', value: new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }), icon: Heart, note: 'Suite member' },
              ].map(stat => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="bg-white rounded-xl p-5 border border-spa-purple/10">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon size={16} className="text-spa-purple" />
                      <span className="text-xs font-sans text-spa-charcoal/50 uppercase tracking-wider">{stat.label}</span>
                    </div>
                    <p className="font-serif text-2xl text-spa-charcoal">{stat.value}</p>
                    <p className="text-xs text-spa-charcoal/40 font-sans mt-1">{stat.note}</p>
                  </div>
                );
              })}
            </div>

            {/* Suite Shop preview */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-xl text-spa-charcoal">Shop Celebration Suites™</h3>
                <button onClick={() => setActiveTab('downloads')} className="text-spa-purple text-sm font-sans flex items-center gap-1 hover:underline">
                  View all <ChevronRight size={14} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {SUITES.slice(0, 3).map(suite => (
                  <div key={suite.id} className="bg-white rounded-xl border border-spa-purple/10 overflow-hidden hover:shadow-md transition-shadow">
                    <div className={`h-2 bg-gradient-to-r ${suite.color}`} />
                    <div className="p-5">
                      <div className="text-2xl mb-2">{suite.icon}</div>
                      <h4 className="font-serif text-base text-spa-charcoal mb-1">{suite.name}</h4>
                      <p className="text-xs text-spa-charcoal/50 font-sans mb-3 line-clamp-2">{suite.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-spa-purple font-bold">{suite.price}</span>
                        <a href={suite.payhip} target="_blank" rel="noopener noreferrer"
                          className="text-xs bg-spa-purple text-white px-3 py-1.5 rounded-full font-sans hover:bg-spa-purple/90 transition-colors flex items-center gap-1">
                          Get It <ExternalLink size={10} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events preview */}
            {upcomingEvents.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-xl text-spa-charcoal">Upcoming Events</h3>
                  <button onClick={() => setActiveTab('events')} className="text-spa-purple text-sm font-sans flex items-center gap-1 hover:underline">
                    View all <ChevronRight size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {upcomingEvents.slice(0, 2).map(event => (
                    <div key={event.id} className="bg-white rounded-xl p-5 border border-spa-purple/10 flex gap-4">
                      <div className="w-12 h-12 bg-spa-purple/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Calendar size={20} className="text-spa-purple" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-serif text-base text-spa-charcoal truncate">{event.title}</h4>
                        <p className="text-xs text-spa-charcoal/50 font-sans">
                          {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </p>
                        <p className="text-xs text-spa-purple font-sans mt-1">{event.is_free ? 'Free' : event.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── DOWNLOADS / SUITES TAB ─────────────────────────────────────────── */}
        {activeTab === 'downloads' && (
          <div>
            <div className="mb-6">
              <h2 className="font-serif text-2xl text-spa-charcoal mb-1">Celebration Suites™</h2>
              <p className="text-spa-charcoal/50 font-sans text-sm">Each suite is a complete digital planning kit — download instantly after purchase.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SUITES.map(suite => (
                <div key={suite.id} className="bg-white rounded-2xl border border-spa-purple/10 overflow-hidden hover:shadow-lg transition-all group">
                  <div className={`h-3 bg-gradient-to-r ${suite.color}`} />
                  <div className="p-6">
                    <div className="text-3xl mb-3">{suite.icon}</div>
                    <div className="mb-1">
                      <span className="text-xs font-sans text-spa-purple/60 uppercase tracking-widest">{suite.subtitle}</span>
                    </div>
                    <h3 className="font-serif text-lg text-spa-charcoal mb-2">{suite.name}</h3>
                    <p className="text-sm text-spa-charcoal/60 font-sans mb-4 leading-relaxed">{suite.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-spa-charcoal/5">
                      <span className="font-serif text-xl text-spa-purple font-bold">{suite.price}</span>
                      <a
                        href={suite.payhip}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-spa-purple text-white text-sm font-sans px-4 py-2 rounded-full hover:bg-spa-purple/90 transition-colors group-hover:scale-105 transform duration-200"
                      >
                        <ShoppingBag size={14} />
                        Purchase
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bundle note */}
            <div className="mt-8 bg-spa-purple/5 border border-spa-purple/20 rounded-2xl p-6 text-center">
              <Gift size={24} className="text-spa-purple mx-auto mb-3" />
              <h3 className="font-serif text-lg text-spa-charcoal mb-1">Want All 6 Suites?</h3>
              <p className="text-spa-charcoal/60 font-sans text-sm mb-4">A bundle option is coming soon. Join the Suite Sisters™ affiliate program to earn 30% on every suite you share!</p>
              <Link to="/ambassadors" className="inline-flex items-center gap-2 bg-spa-purple text-white text-sm font-sans px-5 py-2.5 rounded-full hover:bg-spa-purple/90 transition-colors">
                <Star size={14} />
                Become a Suite Sister™
              </Link>
            </div>
          </div>
        )}

        {/* ── EVENTS TAB ─────────────────────────────────────────────────────── */}
        {activeTab === 'events' && (
          <div className="space-y-8">
            {/* My RSVPs */}
            <div>
              <h2 className="font-serif text-2xl text-spa-charcoal mb-1">My RSVPs & Tickets</h2>
              <p className="text-spa-charcoal/50 font-sans text-sm mb-5">Events you've signed up for or purchased tickets to.</p>

              {myRsvps.length === 0 ? (
                <div className="bg-white rounded-2xl border border-spa-purple/10 p-10 text-center">
                  <Ticket size={32} className="text-spa-purple/30 mx-auto mb-3" />
                  <p className="font-serif text-lg text-spa-charcoal/50">No RSVPs yet</p>
                  <p className="text-sm text-spa-charcoal/40 font-sans mt-1 mb-4">Browse community events and reserve your spot!</p>
                  <Link to="/events" className="inline-flex items-center gap-2 bg-spa-purple text-white text-sm font-sans px-5 py-2.5 rounded-full hover:bg-spa-purple/90 transition-colors">
                    <Calendar size={14} />
                    Browse Events
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {myRsvps.map(rsvp => {
                    const event = rsvp.events;
                    const isPast = event?.date && new Date(event.date) < new Date();
                    return (
                      <div key={rsvp.id} className={`bg-white rounded-xl border p-5 flex items-center gap-4 ${isPast ? 'border-spa-charcoal/10 opacity-60' : 'border-spa-purple/10'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isPast ? 'bg-spa-charcoal/10' : 'bg-spa-purple/10'}`}>
                          <Ticket size={18} className={isPast ? 'text-spa-charcoal/40' : 'text-spa-purple'} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-base text-spa-charcoal truncate">{event?.title || 'Event'}</h4>
                          <div className="flex items-center gap-3 mt-0.5">
                            {event?.date && (
                              <span className="flex items-center gap-1 text-xs text-spa-charcoal/50 font-sans">
                                <Clock size={11} />
                                {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                            )}
                            {event?.location && (
                              <span className="flex items-center gap-1 text-xs text-spa-charcoal/50 font-sans">
                                <MapPin size={11} />
                                {event.location}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className={`text-xs font-sans px-2.5 py-1 rounded-full ${isPast ? 'bg-spa-charcoal/10 text-spa-charcoal/40' : 'bg-green-100 text-green-700'}`}>
                          {isPast ? 'Past' : 'Upcoming'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Upcoming community events */}
            <div>
              <h2 className="font-serif text-2xl text-spa-charcoal mb-1">Upcoming Events</h2>
              <p className="text-spa-charcoal/50 font-sans text-sm mb-5">Community events you can join.</p>

              {upcomingEvents.length === 0 ? (
                <div className="bg-white rounded-2xl border border-spa-purple/10 p-10 text-center">
                  <Calendar size={32} className="text-spa-purple/30 mx-auto mb-3" />
                  <p className="font-serif text-lg text-spa-charcoal/50">No upcoming events yet</p>
                  <p className="text-sm text-spa-charcoal/40 font-sans mt-1">Check back soon — we're always adding new celebrations!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {upcomingEvents.map(event => (
                    <Link to="/events" key={event.id} className="bg-white rounded-xl border border-spa-purple/10 p-5 hover:shadow-md transition-shadow block">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-spa-purple/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Calendar size={20} className="text-spa-purple" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-base text-spa-charcoal mb-1 truncate">{event.title}</h4>
                          <p className="text-xs text-spa-charcoal/50 font-sans">
                            {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                          </p>
                          {event.location && (
                            <p className="text-xs text-spa-charcoal/40 font-sans flex items-center gap-1 mt-0.5">
                              <MapPin size={10} /> {event.location}
                            </p>
                          )}
                          <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full font-sans ${event.is_free ? 'bg-green-100 text-green-700' : 'bg-spa-purple/10 text-spa-purple'}`}>
                            {event.is_free ? 'Free' : 'Ticketed'}
                          </span>
                        </div>
                        <ChevronRight size={16} className="text-spa-charcoal/30 flex-shrink-0 mt-1" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <div className="mt-4 text-center">
                <Link to="/events" className="inline-flex items-center gap-2 text-spa-purple font-sans text-sm hover:underline">
                  See all events <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ── PROFILE TAB ────────────────────────────────────────────────────── */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-serif text-2xl text-spa-charcoal">My Profile</h2>
                <p className="text-spa-charcoal/50 font-sans text-sm">Your personal details and preferences</p>
              </div>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 text-sm text-spa-purple font-sans border border-spa-purple/30 px-4 py-2 rounded-full hover:bg-spa-purple/5 transition-colors"
                >
                  <Edit2 size={13} /> Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => { setEditing(false); setSaveStatus('idle'); }}
                    className="flex items-center gap-1.5 text-sm text-spa-charcoal/50 font-sans px-3 py-2 rounded-full hover:bg-spa-charcoal/5 transition-colors"
                  >
                    <X size={13} /> Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    disabled={saveStatus === 'saving'}
                    className="flex items-center gap-1.5 text-sm bg-spa-purple text-white font-sans px-4 py-2 rounded-full hover:bg-spa-purple/90 transition-colors"
                  >
                    <Check size={13} />
                    {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save Changes'}
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-spa-purple/10 p-6 space-y-5">
              {/* Account info (read-only) */}
              <div className="pb-5 border-b border-spa-charcoal/5">
                <label className="block text-xs font-medium text-spa-charcoal/50 uppercase tracking-wider mb-1.5">Email Address</label>
                <p className="font-sans text-spa-charcoal">{user.email}</p>
                <p className="text-xs text-spa-charcoal/40 font-sans mt-0.5">Contact support to change your email</p>
              </div>

              {/* Editable fields */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: 'first_name', label: 'First Name', type: 'text', placeholder: 'First name' },
                  { key: 'last_name', label: 'Last Name', type: 'text', placeholder: 'Last name' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-xs font-medium text-spa-charcoal/50 uppercase tracking-wider mb-1.5">{field.label}</label>
                    {editing ? (
                      <input
                        type={field.type}
                        value={formData[field.key as keyof typeof formData]}
                        onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        className="w-full px-3 py-2.5 rounded-lg border border-spa-charcoal/20 font-sans text-sm focus:outline-none focus:border-spa-purple"
                      />
                    ) : (
                      <p className="font-sans text-spa-charcoal">{formData[field.key as keyof typeof formData] || <span className="text-spa-charcoal/30 italic">Not set</span>}</p>
                    )}
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-medium text-spa-charcoal/50 uppercase tracking-wider mb-1.5">Phone</label>
                {editing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 000-0000"
                    className="w-full px-3 py-2.5 rounded-lg border border-spa-charcoal/20 font-sans text-sm focus:outline-none focus:border-spa-purple"
                  />
                ) : (
                  <p className="font-sans text-spa-charcoal">{formData.phone || <span className="text-spa-charcoal/30 italic">Not set</span>}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-spa-charcoal/50 uppercase tracking-wider mb-1.5">City</label>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      placeholder="City"
                      className="w-full px-3 py-2.5 rounded-lg border border-spa-charcoal/20 font-sans text-sm focus:outline-none focus:border-spa-purple"
                    />
                  ) : (
                    <p className="font-sans text-spa-charcoal">{formData.city || <span className="text-spa-charcoal/30 italic">Not set</span>}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-spa-charcoal/50 uppercase tracking-wider mb-1.5">State</label>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.state}
                      onChange={e => setFormData({ ...formData, state: e.target.value })}
                      placeholder="NC"
                      maxLength={2}
                      className="w-full px-3 py-2.5 rounded-lg border border-spa-charcoal/20 font-sans text-sm focus:outline-none focus:border-spa-purple uppercase"
                    />
                  ) : (
                    <p className="font-sans text-spa-charcoal">{formData.state || <span className="text-spa-charcoal/30 italic">Not set</span>}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-spa-charcoal/50 uppercase tracking-wider mb-1.5">
                  <span className="flex items-center gap-1"><Baby size={12} /> Estimated Due Date</span>
                </label>
                {editing ? (
                  <input
                    type="date"
                    value={formData.due_date}
                    onChange={e => setFormData({ ...formData, due_date: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-spa-charcoal/20 font-sans text-sm focus:outline-none focus:border-spa-purple"
                  />
                ) : (
                  <p className="font-sans text-spa-charcoal">
                    {formData.due_date
                      ? new Date(formData.due_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                      : <span className="text-spa-charcoal/30 italic">Not set</span>}
                  </p>
                )}
              </div>
            </div>

            {/* Danger zone */}
            <div className="mt-6 bg-red-50 border border-red-100 rounded-xl p-5">
              <h4 className="font-sans text-sm font-medium text-red-700 mb-1">Account</h4>
              <p className="text-xs text-red-500 font-sans mb-3">Need to delete your account or change your email? Contact us.</p>
              <a href="mailto:hello@spa-pregio.com" className="text-xs text-red-600 font-medium hover:underline">hello@spa-pregio.com</a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
