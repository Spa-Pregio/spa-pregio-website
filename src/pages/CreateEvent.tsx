import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import {
  ArrowRight, ArrowLeft, Check, X, Plus, Upload, ImageIcon,
  Lock, Globe, AlertCircle, Store, Sparkles, Eye, EyeOff,
} from 'lucide-react';

const SUPABASE_STORAGE_URL = 'https://reompjeeiurwnbpbfhyj.supabase.co/storage/v1/object/public/event-images';

const stockImages = [
  { id: 'gathering', url: '/images/gathering_large.jpg', label: 'Gathering' },
  { id: 'meetup', url: '/images/meetup_gallery_main.jpg', label: 'Meetup' },
  { id: 'celebrate', url: '/images/celebrate_bright.jpg', label: 'Celebration' },
  { id: 'connect', url: '/images/connect_bright.jpg', label: 'Connect' },
  { id: 'spa', url: '/images/spa_bright.jpg', label: 'Spa & Wellness' },
  { id: 'venue', url: '/images/venue_bright.jpg', label: 'Venue' },
  { id: 'experience_celebrate', url: '/images/experience_celebrate.jpg', label: 'Experience' },
  { id: 'experience_connect', url: '/images/experience_connect.jpg', label: 'Connection' },
  { id: 'hero_ribbon', url: '/images/hero_ribbon.jpg', label: 'Elegant' },
];

const eventTypes = ['Vendor Market', 'Brunch', 'Virtual', 'Workshop', 'Tea', 'Wellness', 'Gathering'];
const ticketTypeOptions = ['General Admission', 'VIP Table', 'Vendor Table', 'Buffet Add-on', 'Plated Dinner Add-on'];

type Step = 'auth' | 'basics' | 'image' | 'visibility' | 'vendor' | 'review' | 'success';

const emptyEventForm = {
  title: '',
  date: '',
  time: '',
  location: '',
  type: 'Gathering',
  description: '',
  max_attendees: '',
  is_free: true,
  tickets: [] as { type: string; price: string; description: string }[],
  is_private: false,
  host_website: '',
  host_phone: '',
};

export default function CreateEvent() {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [isVendor, setIsVendor] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [step, setStep] = useState<Step>('basics');
  const [form, setForm] = useState(emptyEventForm);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');
  const [createdEventId, setCreatedEventId] = useState<string | null>(null);

  // Inline auth state
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [authForm, setAuthForm] = useState({ email: '', password: '', first_name: '' });
  const [authStatus, setAuthStatus] = useState<'idle' | 'loading' | 'error' | 'verify'>('idle');
  const [authError, setAuthError] = useState('');

  // Image picker state
  const [selectedStockImage, setSelectedStockImage] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => { checkAuth(); }, []);

  async function checkAuth() {
    setCheckingAuth(true);
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    setUser(currentUser);

    if (currentUser) {
      const { data: vendorProfile } = await supabase
        .from('vendor_profiles')
        .select('id')
        .eq('user_id', currentUser.id)
        .maybeSingle();
      setIsVendor(Boolean(vendorProfile));
      setStep('basics');
    } else {
      setStep('auth');
    }
    setCheckingAuth(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ── Inline signup/login ──
  const handleInlineSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthStatus('loading');
    setAuthError('');
    const { error } = await supabase.auth.signUp({
      email: authForm.email,
      password: authForm.password,
      options: { data: { first_name: authForm.first_name, role: 'momma' } },
    });
    if (error) {
      setAuthError(error.message);
      setAuthStatus('error');
    } else {
      setAuthStatus('verify');
    }
  };

  const handleInlineLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthStatus('loading');
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({
      email: authForm.email,
      password: authForm.password,
    });
    if (error) {
      setAuthError(error.message);
      setAuthStatus('error');
    } else {
      setAuthStatus('idle');
      await checkAuth();
    }
  };

  // ── Image handling ──
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setSelectedStockImage(null);
  };

  const clearPhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const selectStock = (url: string) => {
    setSelectedStockImage(url);
    clearPhoto();
  };

  const uploadPhoto = async (): Promise<string | null> => {
    if (!photoFile) return null;
    setPhotoUploading(true);
    const ext = photoFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from('event-images').upload(fileName, photoFile, {
      cacheControl: '3600',
      upsert: false,
    });
    setPhotoUploading(false);
    if (error) { console.error('Upload error:', error); return null; }
    return `${SUPABASE_STORAGE_URL}/${fileName}`;
  };

  // ── Ticket builder ──
  const addTicket = () => setForm({ ...form, tickets: [...form.tickets, { type: 'General Admission', price: '', description: '' }] });
  const updateTicket = (i: number, field: string, value: string) => {
    const t = [...form.tickets]; t[i] = { ...t[i], [field]: value }; setForm({ ...form, tickets: t });
  };
  const removeTicket = (i: number) => setForm({ ...form, tickets: form.tickets.filter((_, idx) => idx !== i) });

  // ── Step navigation ──
  const goNext = () => {
    if (step === 'basics') setStep('image');
    else if (step === 'image') setStep('visibility');
    else if (step === 'visibility') setStep(isVendor ? 'vendor' : 'review');
    else if (step === 'vendor') setStep('review');
  };

  const goBack = () => {
    if (step === 'image') setStep('basics');
    else if (step === 'visibility') setStep('image');
    else if (step === 'vendor') setStep('visibility');
    else if (step === 'review') setStep(isVendor ? 'vendor' : 'visibility');
  };

  const basicsValid = form.title && form.date && form.time && form.location;

  // ── Submit ──
  const handleSubmit = async () => {
    if (!user) return;
    setSubmitStatus('loading');
    setSubmitError('');

    let imageUrl: string | null = selectedStockImage;
    if (photoFile) {
      imageUrl = await uploadPhoto();
      if (!imageUrl) {
        setSubmitStatus('error');
        setSubmitError('Photo upload failed. Please try again or choose a stock image.');
        return;
      }
    }

    const { data, error } = await supabase.from('events').insert([{
      title: form.title,
      date: form.date,
      time: form.time,
      location: form.location,
      type: form.type,
      description: form.description,
      max_attendees: form.max_attendees ? parseInt(form.max_attendees) : null,
      event_kind: isVendor ? 'vendor' : 'member',
      is_free: form.is_free,
      tickets: form.is_free ? [] : form.tickets,
      image: imageUrl,
      is_private: form.is_private,
      host_website: isVendor ? (form.host_website || null) : null,
      host_phone: isVendor ? (form.host_phone || null) : null,
      created_by: user.id,
    }]).select().single();

    if (error) {
      setSubmitStatus('error');
      setSubmitError(error.message || 'Something went wrong creating your event.');
      return;
    }

    setCreatedEventId(data.id);
    setStep('success');
    setSubmitStatus('idle');
  };

  const handleCopyShareLink = async () => {
    if (!createdEventId) return;
    const url = `https://spa-pregio.com/events/${createdEventId}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const el = document.createElement('textarea');
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const stepOrder: Step[] = isVendor
    ? ['basics', 'image', 'visibility', 'vendor', 'review']
    : ['basics', 'image', 'visibility', 'review'];
  const currentStepIndex = stepOrder.indexOf(step);

  if (checkingAuth) {
    return (
      <div className="w-full pt-20 min-h-screen bg-spa-cream flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-spa-purple border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full pt-20 min-h-screen bg-spa-cream">
      <div className="max-w-2xl mx-auto px-6 py-12">

        {/* ── AUTH STEP ── */}
        {step === 'auth' && (
          <div>
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-spa-purple/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles size={28} className="text-spa-purple" />
              </div>
              <h1 className="font-serif text-3xl text-spa-charcoal">Let's create your event</h1>
              <p className="text-spa-gray mt-2">
                First, sign in or create a free account — your event details won't be lost.
              </p>
            </div>

            {authStatus === 'verify' ? (
              <div className="bg-white rounded-2xl p-8 shadow-elegant text-center">
                <Check size={32} className="text-spa-purple mx-auto mb-4" />
                <h3 className="font-serif text-xl text-spa-charcoal mb-2">Check your email!</h3>
                <p className="text-spa-gray text-sm">
                  We sent a confirmation link to <strong>{authForm.email}</strong>. Once confirmed, come back here and sign in to continue creating your event.
                </p>
                <button
                  onClick={() => { setAuthMode('login'); setAuthStatus('idle'); }}
                  className="btn-primary mt-6 mx-auto inline-flex"
                >
                  I've confirmed — Sign In <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 shadow-elegant">
                <div className="flex gap-2 mb-6 p-1 bg-spa-lavender rounded-full">
                  <button
                    onClick={() => setAuthMode('signup')}
                    className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${authMode === 'signup' ? 'bg-white text-spa-charcoal shadow-sm' : 'text-spa-gray'}`}
                  >
                    Create Free Account
                  </button>
                  <button
                    onClick={() => setAuthMode('login')}
                    className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${authMode === 'login' ? 'bg-white text-spa-charcoal shadow-sm' : 'text-spa-gray'}`}
                  >
                    Sign In
                  </button>
                </div>

                <form onSubmit={authMode === 'signup' ? handleInlineSignup : handleInlineLogin} className="space-y-4">
                  {authMode === 'signup' && (
                    <div>
                      <label className="block text-sm font-medium text-spa-charcoal mb-1">Your Name</label>
                      <input
                        type="text" required
                        value={authForm.first_name}
                        onChange={(e) => setAuthForm({ ...authForm, first_name: e.target.value })}
                        placeholder="First name"
                        className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">Email</label>
                    <input
                      type="email" required
                      value={authForm.email}
                      onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                      placeholder="you@email.com"
                      className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">Password</label>
                    <input
                      type="password" required
                      value={authForm.password}
                      onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                    />
                  </div>
                  {authError && (
                    <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl">
                      <AlertCircle size={16} /> {authError}
                    </div>
                  )}
                  <button type="submit" disabled={authStatus === 'loading'} className="btn-primary w-full justify-center disabled:opacity-50">
                    {authStatus === 'loading' ? 'Please wait...' : authMode === 'signup' ? 'Create Account & Continue' : 'Sign In & Continue'}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ── STEP PROGRESS (shown once authenticated) ── */}
        {step !== 'auth' && step !== 'success' && (
          <div className="flex items-center gap-2 mb-8">
            {stepOrder.map((s, i) => (
              <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= currentStepIndex ? 'bg-spa-purple' : 'bg-spa-charcoal/10'}`} />
            ))}
          </div>
        )}

        {/* ── BASICS ── */}
        {step === 'basics' && (
          <div>
            <h1 className="font-serif text-3xl text-spa-charcoal mb-2">Tell us about your event</h1>
            <p className="text-spa-gray mb-8">The essentials — what, when, and where.</p>

            <div className="bg-white rounded-2xl p-8 shadow-elegant space-y-5">
              <div>
                <label className="block text-sm font-medium text-spa-charcoal mb-1">Event Name *</label>
                <input type="text" name="title" required value={form.title} onChange={handleChange} placeholder="e.g., Spring Baby Shower Brunch" className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-1">Date *</label>
                  <input type="date" name="date" required value={form.date} onChange={handleChange} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-1">Time *</label>
                  <input type="time" name="time" required value={form.time} onChange={handleChange} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-spa-charcoal mb-1">Location *</label>
                <input type="text" name="location" required value={form.location} onChange={handleChange} placeholder="e.g., High Point, NC or Virtual" className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-spa-charcoal mb-1">Event Type</label>
                <select name="type" value={form.type} onChange={handleChange} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30">
                  {eventTypes.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-spa-charcoal mb-1">Description</label>
                <textarea rows={3} name="description" value={form.description} onChange={handleChange} placeholder="Tell guests what to expect..." className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-spa-charcoal mb-1">Max Attendees</label>
                <input type="number" name="max_attendees" value={form.max_attendees} onChange={handleChange} placeholder="50" className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button onClick={goNext} disabled={!basicsValid} className="btn-primary disabled:opacity-50">
                Next: Choose a Photo <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── IMAGE ── */}
        {step === 'image' && (
          <div>
            <h1 className="font-serif text-3xl text-spa-charcoal mb-2">Add a photo</h1>
            <p className="text-spa-gray mb-8">Choose a stock image or upload your own.</p>

            <div className="bg-white rounded-2xl p-8 shadow-elegant space-y-6">
              <div>
                <label className="block text-sm font-medium text-spa-charcoal mb-3">Stock Images</label>
                <div className="grid grid-cols-3 gap-3">
                  {stockImages.map(img => (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => selectStock(img.url)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedStockImage === img.url ? 'border-spa-purple ring-2 ring-spa-purple/30' : 'border-transparent hover:border-spa-purple/30'}`}
                    >
                      <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                      {selectedStockImage === img.url && (
                        <div className="absolute inset-0 bg-spa-purple/20 flex items-center justify-center">
                          <div className="w-7 h-7 rounded-full bg-spa-purple flex items-center justify-center">
                            <Check size={16} className="text-white" />
                          </div>
                        </div>
                      )}
                      <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] text-center py-1">{img.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-spa-charcoal/10" />
                <span className="text-xs text-spa-gray uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-spa-charcoal/10" />
              </div>

              <div>
                <label className="block text-sm font-medium text-spa-charcoal mb-2">Upload Your Own</label>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                {photoPreview ? (
                  <div className="relative rounded-xl overflow-hidden aspect-[16/7]">
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    <button type="button" onClick={clearPhoto} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center text-spa-charcoal hover:text-red-500 transition-colors">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full p-6 border-2 border-dashed border-spa-purple/20 rounded-xl bg-spa-lavender hover:border-spa-purple/40 transition-colors flex flex-col items-center gap-2 text-center"
                  >
                    <div className="w-10 h-10 rounded-full bg-spa-purple/10 flex items-center justify-center">
                      <ImageIcon size={20} className="text-spa-purple" />
                    </div>
                    <p className="text-sm font-medium text-spa-charcoal">Upload a photo</p>
                    <p className="text-xs text-spa-gray">JPG, PNG or WEBP</p>
                    <span className="mt-1 inline-flex items-center gap-1 text-xs text-spa-purple font-medium">
                      <Upload size={12} /> Choose file
                    </span>
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={goBack} className="btn-outline"><ArrowLeft size={16} /> Back</button>
              <button onClick={goNext} className="btn-primary">Next: Visibility & Tickets <ArrowRight size={16} /></button>
            </div>
          </div>
        )}

        {/* ── VISIBILITY & TICKETS ── */}
        {step === 'visibility' && (
          <div>
            <h1 className="font-serif text-3xl text-spa-charcoal mb-2">Who's invited?</h1>
            <p className="text-spa-gray mb-8">Choose your event's privacy and whether you're charging for tickets.</p>

            <div className="bg-white rounded-2xl p-8 shadow-elegant space-y-6">
              <div>
                <label className="block text-sm font-medium text-spa-charcoal mb-3">Event Visibility</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, is_private: false })}
                    className={`p-5 rounded-xl border-2 text-left transition-colors ${!form.is_private ? 'border-spa-purple bg-spa-purple/5' : 'border-spa-charcoal/10'}`}
                  >
                    <Globe size={20} className={!form.is_private ? 'text-spa-purple' : 'text-spa-gray'} />
                    <p className="font-medium text-spa-charcoal mt-2">Public</p>
                    <p className="text-xs text-spa-gray mt-1">Listed on the Events page for anyone to discover.</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, is_private: true })}
                    className={`p-5 rounded-xl border-2 text-left transition-colors ${form.is_private ? 'border-spa-purple bg-spa-purple/5' : 'border-spa-charcoal/10'}`}
                  >
                    <Lock size={20} className={form.is_private ? 'text-spa-purple' : 'text-spa-gray'} />
                    <p className="font-medium text-spa-charcoal mt-2">Private</p>
                    <p className="text-xs text-spa-gray mt-1">Hidden from the Events page — only reachable by the link you share.</p>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-spa-lavender rounded-xl">
                <div>
                  <p className="font-medium text-spa-charcoal">Free Event</p>
                  <p className="text-xs text-spa-gray">Toggle off to add ticket pricing</p>
                </div>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, is_free: !form.is_free })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${form.is_free ? 'bg-spa-purple' : 'bg-spa-charcoal/20'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.is_free ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>

              {!form.is_free && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-spa-charcoal">Ticket Types</label>
                    <button type="button" onClick={addTicket} className="text-xs text-spa-purple font-medium flex items-center gap-1">
                      <Plus size={14} /> Add ticket type
                    </button>
                  </div>
                  {form.tickets.length === 0 && (
                    <p className="text-sm text-spa-gray text-center py-4 bg-spa-lavender rounded-xl">
                      No ticket types yet — click "Add ticket type" above
                    </p>
                  )}
                  {form.tickets.map((ticket, index) => (
                    <div key={index} className="bg-spa-lavender rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-spa-charcoal">Ticket {index + 1}</span>
                        <button type="button" onClick={() => removeTicket(index)} className="text-spa-gray hover:text-red-500 transition-colors"><X size={16} /></button>
                      </div>
                      <select value={ticket.type} onChange={e => updateTicket(index, 'type', e.target.value)} className="w-full px-3 py-2 bg-white rounded-lg text-spa-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-spa-purple/30">
                        {ticketTypeOptions.map(t => <option key={t}>{t}</option>)}
                      </select>
                      <div className="grid grid-cols-2 gap-2">
                        <input type="number" placeholder="Price ($)" value={ticket.price} onChange={e => updateTicket(index, 'price', e.target.value)} className="px-3 py-2 bg-white rounded-lg text-spa-charcoal text-sm focus:outline-none" />
                        <input type="text" placeholder="Description" value={ticket.description} onChange={e => updateTicket(index, 'description', e.target.value)} className="px-3 py-2 bg-white rounded-lg text-spa-charcoal text-sm focus:outline-none" />
                      </div>
                    </div>
                  ))}

                  <p className="text-xs text-spa-gray text-center">
                    Spa-Pregio collects ticket payments securely and pays out your earnings after the event — no setup needed on your end.
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={goBack} className="btn-outline"><ArrowLeft size={16} /> Back</button>
              <button onClick={goNext} className="btn-primary">
                {isVendor ? 'Next: Business Details' : 'Next: Review'} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── VENDOR-ONLY ── */}
        {step === 'vendor' && (
          <div>
            <h1 className="font-serif text-3xl text-spa-charcoal mb-2">Business details</h1>
            <p className="text-spa-gray mb-8">Since you're a vendor, you can show your website and phone number on your event listing.</p>

            <div className="bg-white rounded-2xl p-8 shadow-elegant space-y-5">
              <div className="flex items-center gap-2 text-spa-purple mb-2">
                <Store size={18} /> <span className="text-sm font-medium">Vendor Event</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-spa-charcoal mb-1">Website</label>
                <input type="text" name="host_website" value={form.host_website} onChange={handleChange} placeholder="https://yourbusiness.com" className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-spa-charcoal mb-1">Phone</label>
                <input type="text" name="host_phone" value={form.host_phone} onChange={handleChange} placeholder="(555) 123-4567" className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
              </div>
              <p className="text-xs text-spa-gray">Both are optional, but help guests reach you directly from your event page.</p>
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={goBack} className="btn-outline"><ArrowLeft size={16} /> Back</button>
              <button onClick={goNext} className="btn-primary">Next: Review <ArrowRight size={16} /></button>
            </div>
          </div>
        )}

        {/* ── REVIEW ── */}
        {step === 'review' && (
          <div>
            <h1 className="font-serif text-3xl text-spa-charcoal mb-2">Review your event</h1>
            <p className="text-spa-gray mb-8">Double-check everything looks right before you publish.</p>

            <div className="bg-white rounded-2xl shadow-elegant overflow-hidden">
              <div className="relative aspect-[16/7] bg-spa-lavender">
                {(selectedStockImage || photoPreview) ? (
                  <img src={photoPreview || selectedStockImage || ''} alt={form.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-spa-gray text-sm">No image selected</div>
                )}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-3 py-1 bg-white/90 rounded-full text-xs font-medium text-spa-charcoal">{form.type}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${form.is_private ? 'bg-spa-charcoal text-white' : 'bg-green-500 text-white'}`}>
                    {form.is_private ? <><EyeOff size={12} /> Private</> : <><Eye size={12} /> Public</>}
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h2 className="font-serif text-2xl text-spa-charcoal">{form.title}</h2>
                <p className="text-sm text-spa-gray">{form.date} · {form.time}</p>
                <p className="text-sm text-spa-gray">{form.location}</p>
                {form.description && <p className="text-sm text-spa-gray leading-relaxed">{form.description}</p>}
                {isVendor && (form.host_website || form.host_phone) && (
                  <div className="flex flex-wrap gap-4 text-sm text-spa-purple pt-2 border-t border-spa-charcoal/5">
                    {form.host_website && <span>{form.host_website}</span>}
                    {form.host_phone && <span>{form.host_phone}</span>}
                  </div>
                )}
                <div className="pt-2 border-t border-spa-charcoal/5">
                  {form.is_free ? (
                    <span className="text-green-600 font-medium text-sm">Free event</span>
                  ) : (
                    <div className="space-y-1">
                      {form.tickets.map((t, i) => (
                        <p key={i} className="text-sm text-spa-charcoal">{t.type} — ${t.price || '0'}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {submitStatus === 'error' && (
              <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl mt-4">
                <AlertCircle size={16} /> {submitError}
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button onClick={goBack} className="btn-outline"><ArrowLeft size={16} /> Back</button>
              <button onClick={handleSubmit} disabled={submitStatus === 'loading' || photoUploading} className="btn-primary disabled:opacity-50">
                {photoUploading ? 'Uploading photo...' : submitStatus === 'loading' ? 'Publishing...' : 'Publish Event'} <Check size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── SUCCESS ── */}
        {step === 'success' && createdEventId && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-spa-purple/10 flex items-center justify-center mx-auto mb-6">
              <Check size={28} className="text-spa-purple" />
            </div>
            <h1 className="font-serif text-3xl text-spa-charcoal mb-3">Your event is live!</h1>
            <p className="text-spa-gray mb-8">
              {form.is_private
                ? 'Since this is a private event, only people with the link below can find it.'
                : 'Your event is now listed on the Events page for the community to discover.'}
            </p>

            <div className="bg-white rounded-2xl p-6 shadow-elegant max-w-md mx-auto mb-8">
              <p className="text-xs text-spa-gray mb-2">Your event link</p>
              <p className="text-sm font-mono text-spa-charcoal truncate mb-4">{`https://spa-pregio.com/events/${createdEventId}`}</p>
              <button onClick={handleCopyShareLink} className="btn-primary w-full justify-center">
                {shareCopied ? <><Check size={16} /> Copied!</> : 'Copy Share Link'}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => navigate(`/events/${createdEventId}`)} className="btn-outline">View My Event</button>
              <button onClick={() => navigate('/events')} className="btn-outline">Back to Events</button>
            </div>
          </div>
        )}
      </div>
  );
}
