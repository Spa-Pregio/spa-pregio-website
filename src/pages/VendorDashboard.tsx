import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import {
  Store, User, Calendar, BarChart2, Settings, LogOut,
  Edit2, Check, X, Plus, Camera, MapPin, Globe, Instagram,
  Phone, ArrowRight, Star, Users, Eye, TrendingUp, ChevronRight,
  AlertCircle, Crown
} from 'lucide-react';

const vendorCategories = [
  'Maternity Boutiques', 'Local Crafters', 'Spas & Wellness',
  'Photographers', 'Caterers & Bakers', 'Event Venues',
  'Florists', 'Party Planners', 'Doulas & Midwives',
];

const tierColors: Record<string, string> = {
  Starter: 'bg-spa-charcoal/10 text-spa-charcoal',
  Professional: 'bg-spa-purple/10 text-spa-purple',
  Enterprise: 'bg-spa-pink/10 text-spa-pink',
};

const tierIcons: Record<string, any> = {
  Starter: Store,
  Professional: Star,
  Enterprise: Crown,
};

const eventLimits: Record<string, string> = {
  Starter: 'Up to 2 events/month',
  Professional: 'Up to 5 events/month',
  Enterprise: 'Unlimited events',
};

type Tab = 'overview' | 'profile' | 'events' | 'subscription';

export default function VendorDashboard() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [editing, setEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [myEvents, setMyEvents] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    business_name: '',
    category: '',
    description: '',
    location: '',
    phone: '',
    website: '',
    instagram: '',
    tier: 'Starter',
  });

  // Auth states
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authForm, setAuthForm] = useState({ email: '', password: '', business_name: '', first_name: '' });
  const [authStatus, setAuthStatus] = useState<'idle' | 'loading' | 'error' | 'verify'>('idle');
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      await loadProfile(user.id);
      await loadMyEvents(user.id);
    }
    setLoading(false);
  };

  const loadProfile = async (userId: string) => {
    const { data } = await supabase
      .from('vendor_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    if (data) {
      setProfile(data);
      setFormData({
        business_name: data.business_name || '',
        category: data.category || '',
        description: data.description || '',
        location: data.location || '',
        phone: data.phone || '',
        website: data.website || '',
        instagram: data.instagram || '',
        tier: data.tier || 'Starter',
      });
    }
  };

  const loadMyEvents = async (userId: string) => {
    const { data: rsvps } = await supabase
      .from('event_rsvps')
      .select('event_id')
      .eq('user_email', user?.email || '');

    if (rsvps && rsvps.length > 0) {
      const eventIds = rsvps.map((r: any) => r.event_id);
      const { data: events } = await supabase
        .from('events')
        .select('*')
        .in('id', eventIds);
      setMyEvents(events || []);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaveStatus('saving');
    const { error } = await supabase
      .from('vendor_profiles')
      .upsert({ ...formData, user_id: user.id }, { onConflict: 'user_id' });

    if (error) {
      setSaveStatus('error');
    } else {
      setSaveStatus('saved');
      setEditing(false);
      await loadProfile(user.id);
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthStatus('loading');
    setAuthError('');
    const { error } = await supabase.auth.signUp({
      email: authForm.email,
      password: authForm.password,
      options: {
        data: { first_name: authForm.first_name, business_name: authForm.business_name, role: 'vendor' }
      }
    });
    if (error) { setAuthError(error.message); setAuthStatus('error'); }
    else setAuthStatus('verify');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthStatus('loading');
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({
      email: authForm.email,
      password: authForm.password,
    });
    if (error) { setAuthError(error.message); setAuthStatus('error'); }
    else { await checkUser(); setAuthStatus('idle'); }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  if (loading) {
    return (
      <div className="w-full pt-20 min-h-screen bg-spa-cream flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-spa-purple border-t-transparent animate-spin" />
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="w-full pt-20 min-h-screen bg-spa-cream">
        <div className="max-w-md mx-auto px-6 py-16">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-spa-purple/10 flex items-center justify-center mx-auto mb-4">
              <Store size={28} className="text-spa-purple" />
            </div>
            <h1 className="font-serif text-3xl text-spa-charcoal">Vendor Dashboard</h1>
            <p className="text-spa-gray mt-2">Manage your listing, events, and subscription.</p>
          </div>

          {authStatus === 'verify' ? (
            <div className="bg-white rounded-2xl p-8 shadow-elegant text-center">
              <Check size={32} className="text-spa-purple mx-auto mb-4" />
              <h3 className="font-serif text-xl text-spa-charcoal mb-2">Check your email!</h3>
              <p className="text-spa-gray text-sm">We sent a confirmation link to <strong>{authForm.email}</strong>. Click it to activate your vendor account.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 shadow-elegant">
              <div className="flex gap-2 mb-6 p-1 bg-spa-lavender rounded-full">
                <button onClick={() => setAuthMode('login')} className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${authMode === 'login' ? 'bg-white text-spa-charcoal shadow-sm' : 'text-spa-gray'}`}>
                  Sign In
                </button>
                <button onClick={() => setAuthMode('signup')} className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${authMode === 'signup' ? 'bg-white text-spa-charcoal shadow-sm' : 'text-spa-gray'}`}>
                  Create Account
                </button>
              </div>

              <form onSubmit={authMode === 'login' ? handleLogin : handleSignup} className="space-y-4">
                {authMode === 'signup' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-spa-charcoal mb-1">Your Name</label>
                      <input type="text" required value={authForm.first_name} onChange={e => setAuthForm({ ...authForm, first_name: e.target.value })} placeholder="First name" className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-spa-charcoal mb-1">Business Name</label>
                      <input type="text" required value={authForm.business_name} onChange={e => setAuthForm({ ...authForm, business_name: e.target.value })} placeholder="Your business name" className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                    </div>
                  </>
                )}
                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-1">Email</label>
                  <input type="email" required value={authForm.email} onChange={e => setAuthForm({ ...authForm, email: e.target.value })} placeholder="you@business.com" className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-1">Password</label>
                  <input type="password" required value={authForm.password} onChange={e => setAuthForm({ ...authForm, password: e.target.value })} placeholder="••••••••" className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                </div>
                {authError && (
                  <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl">
                    <AlertCircle size={16} /> {authError}
                  </div>
                )}
                <button type="submit" disabled={authStatus === 'loading'} className="btn-primary w-full justify-center disabled:opacity-50">
                  {authStatus === 'loading' ? 'Please wait...' : authMode === 'login' ? 'Sign In' : 'Create Vendor Account'}
                </button>
              </form>

              {authMode === 'login' && (
                <p className="text-center text-sm text-spa-gray mt-4">
                  Don't have an account?{' '}
                  <button onClick={() => setAuthMode('signup')} className="text-spa-purple font-medium hover:underline">Sign up free</button>
                </p>
              )}

              <div className="mt-6 pt-6 border-t border-spa-charcoal/5 text-center">
                <p className="text-xs text-spa-gray mb-3">Don't have a plan yet?</p>
                <Link to="/vendors" className="text-spa-purple text-sm font-medium flex items-center justify-center gap-1 hover:gap-2 transition-all">
                  View vendor plans <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const TierIcon = tierIcons[profile?.tier || 'Starter'];

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'events', label: 'My Events', icon: Calendar },
    { id: 'subscription', label: 'Subscription', icon: Settings },
  ];

  return (
    <div className="w-full pt-20 min-h-screen bg-spa-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl text-spa-charcoal">
              {profile?.business_name || 'Your Business'}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${tierColors[profile?.tier || 'Starter']}`}>
                {profile?.tier || 'Starter'} Plan
              </span>
              <span className="text-sm text-spa-gray">{user.email}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-spa-gray hover:text-spa-charcoal transition-colors text-sm">
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.id ? 'bg-spa-purple text-white' : 'bg-white text-spa-charcoal hover:bg-spa-purple/10'}`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Profile Views', value: '—', icon: Eye, note: 'Coming soon' },
                { label: 'Events Joined', value: myEvents.length, icon: Calendar, note: eventLimits[profile?.tier || 'Starter'] },
                { label: 'Inquiries', value: '—', icon: Users, note: 'Coming soon' },
                { label: 'Listing Status', value: profile ? 'Active' : 'Incomplete', icon: TrendingUp, note: profile ? 'Visible to mamas' : 'Complete your profile' },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-elegant">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-spa-gray">{stat.label}</span>
                    <stat.icon size={18} className="text-spa-purple" />
                  </div>
                  <p className="font-serif text-3xl text-spa-charcoal">{stat.value}</p>
                  <p className="text-xs text-spa-gray mt-1">{stat.note}</p>
                </div>
              ))}
            </div>

            {/* Profile completion prompt */}
            {!profile?.business_name && (
              <div className="bg-spa-purple/10 border border-spa-purple/20 rounded-2xl p-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <AlertCircle size={20} className="text-spa-purple flex-shrink-0" />
                  <div>
                    <p className="font-medium text-spa-charcoal">Complete your profile</p>
                    <p className="text-sm text-spa-gray">Add your business details so mamas can find you.</p>
                  </div>
                </div>
                <button onClick={() => setActiveTab('profile')} className="btn-primary flex-shrink-0">
                  Set Up Profile <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* Quick actions */}
            <div className="grid sm:grid-cols-2 gap-4">
              <button onClick={() => setActiveTab('profile')} className="bg-white rounded-2xl p-6 shadow-elegant text-left hover:shadow-elegant-hover transition-all group">
                <User size={20} className="text-spa-purple mb-3" />
                <h3 className="font-medium text-spa-charcoal group-hover:text-spa-purple transition-colors">Edit Business Profile</h3>
                <p className="text-sm text-spa-gray mt-1">Update your listing info, photos, and contact details.</p>
              </button>
              <button onClick={() => setActiveTab('events')} className="bg-white rounded-2xl p-6 shadow-elegant text-left hover:shadow-elegant-hover transition-all group">
                <Calendar size={20} className="text-spa-purple mb-3" />
                <h3 className="font-medium text-spa-charcoal group-hover:text-spa-purple transition-colors">View My Events</h3>
                <p className="text-sm text-spa-gray mt-1">See events you've joined and manage your table.</p>
              </button>
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl shadow-elegant p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl text-spa-charcoal">Business Profile</h2>
              {!editing ? (
                <button onClick={() => setEditing(true)} className="flex items-center gap-2 px-4 py-2 bg-spa-lavender rounded-full text-sm font-medium text-spa-charcoal hover:bg-spa-purple/10 transition-colors">
                  <Edit2 size={16} /> Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => setEditing(false)} className="flex items-center gap-2 px-4 py-2 border border-spa-charcoal/20 rounded-full text-sm text-spa-charcoal hover:bg-spa-lavender transition-colors">
                    <X size={16} /> Cancel
                  </button>
                  <button onClick={handleSaveProfile} disabled={saveStatus === 'saving'} className="flex items-center gap-2 px-4 py-2 bg-spa-purple text-white rounded-full text-sm font-medium hover:bg-spa-purple/90 transition-colors disabled:opacity-50">
                    <Check size={16} /> {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </div>

            {saveStatus === 'saved' && (
              <div className="flex items-center gap-2 text-spa-purple bg-spa-purple/10 px-4 py-3 rounded-xl mb-6 text-sm">
                <Check size={16} /> Profile saved successfully!
              </div>
            )}

            {/* Photo placeholder */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-spa-charcoal mb-3">Business Photos</label>
              <div className="grid grid-cols-4 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square bg-spa-lavender rounded-xl flex items-center justify-center cursor-pointer hover:bg-spa-purple/10 transition-colors group">
                    <Camera size={20} className="text-spa-gray group-hover:text-spa-purple transition-colors" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-spa-gray mt-2">Photo uploads coming soon — contact us to add your photos manually.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-spa-charcoal mb-1">Business Name</label>
                {editing ? (
                  <input type="text" value={formData.business_name} onChange={e => setFormData({ ...formData, business_name: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                ) : (
                  <p className="px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal">{profile?.business_name || '—'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-spa-charcoal mb-1">Category</label>
                {editing ? (
                  <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30">
                    <option value="">Select category...</option>
                    {vendorCategories.map(c => <option key={c}>{c}</option>)}
                  </select>
                ) : (
                  <p className="px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal">{profile?.category || '—'}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-spa-charcoal mb-1">Description</label>
                {editing ? (
                  <textarea rows={4} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Tell mamas about your business..." className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30 resize-none" />
                ) : (
                  <p className="px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal min-h-[100px]">{profile?.description || '—'}</p>
                )}
              </div>
              {[
                { key: 'location', label: 'Location', icon: MapPin, placeholder: 'e.g., High Point, NC' },
                { key: 'phone', label: 'Phone', icon: Phone, placeholder: '(555) 123-4567' },
                { key: 'website', label: 'Website', icon: Globe, placeholder: 'https://yourbusiness.com' },
                { key: 'instagram', label: 'Instagram', icon: Instagram, placeholder: '@yourbusiness' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-spa-charcoal mb-1 flex items-center gap-1">
                    <field.icon size={14} /> {field.label}
                  </label>
                  {editing ? (
                    <input type="text" value={(formData as any)[field.key]} onChange={e => setFormData({ ...formData, [field.key]: e.target.value })} placeholder={field.placeholder} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                  ) : (
                    <p className="px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal">{(profile as any)?.[field.key] || '—'}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EVENTS TAB */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-spa-charcoal">My Events</h2>
              <Link to="/events" className="btn-primary">
                <Plus size={16} /> Join an Event
              </Link>
            </div>

            <div className="bg-spa-purple/10 border border-spa-purple/20 rounded-2xl p-4 flex items-center gap-3">
              <TierIcon size={18} className="text-spa-purple flex-shrink-0" />
              <p className="text-sm text-spa-purple font-medium">
                Your {profile?.tier || 'Starter'} plan includes {eventLimits[profile?.tier || 'Starter']}.
                {profile?.tier !== 'Enterprise' && (
                  <button onClick={() => setActiveTab('subscription')} className="ml-2 underline">Upgrade for more →</button>
                )}
              </p>
            </div>

            {myEvents.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-elegant p-12 text-center">
                <Calendar size={32} className="text-spa-purple/30 mx-auto mb-4" />
                <h3 className="font-serif text-xl text-spa-charcoal mb-2">No events yet</h3>
                <p className="text-spa-gray mb-6">Join an event to showcase your products to local mamas.</p>
                <Link to="/events" className="btn-primary inline-flex">
                  Browse Events <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {myEvents.map((event: any) => (
                  <div key={event.id} className="bg-white rounded-2xl shadow-elegant p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-serif text-lg text-spa-charcoal">{event.title}</h3>
                      <span className="text-xs px-3 py-1 bg-spa-purple/10 text-spa-purple rounded-full whitespace-nowrap">{event.type}</span>
                    </div>
                    <div className="space-y-1 text-sm text-spa-gray">
                      <p className="flex items-center gap-2"><Calendar size={14} className="text-spa-purple" /> {event.date} · {event.time}</p>
                      <p className="flex items-center gap-2"><MapPin size={14} className="text-spa-purple" /> {event.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SUBSCRIPTION TAB */}
        {activeTab === 'subscription' && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl text-spa-charcoal">Subscription</h2>

            {/* Current plan */}
            <div className="bg-white rounded-2xl shadow-elegant p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-spa-purple/10 flex items-center justify-center">
                  <TierIcon size={22} className="text-spa-purple" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-spa-charcoal">{profile?.tier || 'Starter'} Plan</h3>
                  <p className="text-sm text-spa-gray">{eventLimits[profile?.tier || 'Starter']}</p>
                </div>
                <span className="ml-auto px-4 py-1.5 bg-spa-purple/10 text-spa-purple text-sm font-medium rounded-full">Active</span>
              </div>
              <p className="text-sm text-spa-gray mb-6">
                To upgrade, cancel, or manage your billing, visit the Stripe customer portal. Changes take effect immediately.
              </p>
              <a
                href="https://billing.stripe.com/p/login/test_00w00000000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex"
              >
                Manage Billing <ArrowRight size={16} />
              </a>
            </div>

            {/* Upgrade options */}
            {profile?.tier !== 'Enterprise' && (
              <div className="bg-spa-purple rounded-2xl p-8 text-white">
                <h3 className="font-serif text-2xl mb-2">Upgrade your plan</h3>
                <p className="text-white/70 mb-6">Get more visibility, more events, and more mamas finding your business.</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {profile?.tier === 'Starter' && (
                    <a href="https://buy.stripe.com/test_9B6cN6adKfhg5EZ7xp2go01" target="_blank" rel="noopener noreferrer" className="bg-white text-spa-purple px-6 py-3 rounded-full font-medium hover:bg-spa-cream transition-colors flex items-center justify-center gap-2">
                      Upgrade to Professional — $79/mo <ArrowRight size={16} />
                    </a>
                  )}
                  <a href="https://buy.stripe.com/test_8x24gA71y0mm6J304X2go02" target="_blank" rel="noopener noreferrer" className="border-2 border-white/30 text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                    Upgrade to Enterprise — $149/mo <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
