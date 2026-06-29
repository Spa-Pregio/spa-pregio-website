import { useState, useRef, useCallback, useEffect } from 'react';
import { 
  ArrowRight, Check, Star, Users, MapPin, Store,
  Image, Type, Palette, Eye, Download, Search, X, Zap, Clock, CheckCircle, Upload, Save
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlb21wamVlaXVyd25icGJmaHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4MjkxMjcsImV4cCI6MjA1NTQwNTEyN30.oanFsHGxJnXLOIJmLHYQKBMFgkCBenabPTsORNbdkwA';
const SUPABASE_FUNCTIONS_URL = 'https://reompjeeiurwnbpbfhyj.supabase.co/functions/v1';

const vendorCategories = [
  { name: 'Maternity Boutiques', description: 'Clothing, accessories, and essentials for expectant mothers', icon: Store, examples: ['Dresses', 'Nursing wear', 'Jewelry', 'Bags'] },
  { name: 'Local Crafters', description: 'Handmade items for nursery and baby', icon: Store, examples: ['Knitted blankets', 'Wooden toys', 'Ceramics', 'Artwork'] },
  { name: 'Spas & Wellness', description: 'Prenatal massage, facials, and wellness services', icon: Users, examples: ['Prenatal massage', 'Facials', 'Yoga classes', 'Meditation'] },
  { name: 'Photographers', description: 'Maternity, newborn, and family photography', icon: Image, examples: ['Maternity shoots', 'Newborn photos', 'Family portraits', 'Event coverage'] },
  { name: 'Caterers & Bakers', description: 'Food and desserts for celebrations', icon: Store, examples: ['Custom cakes', 'Catering', 'Dessert tables', 'Specialty diets'] },
  { name: 'Event Venues', description: 'Spaces for baby showers and celebrations', icon: MapPin, examples: ['Country clubs', 'Restaurants', 'Hotels', 'Private estates'] },
  { name: 'Florists', description: 'Bouquets, centerpieces, and event florals', icon: Store, examples: ['Centerpieces', 'Bouquets', 'Installations', 'Corsages'] },
  { name: 'Party Planners', description: 'Full-service event planning and coordination', icon: Store, examples: ['Full planning', 'Day-of coordination', 'Styling', 'Vendors'] },
  { name: 'Realtors', description: 'Home buying and family relocation specialists', icon: MapPin, examples: ['First-time buyers', 'Family homes', 'Relocation', 'Nursery-ready homes'] },
  { name: 'Pediatricians', description: 'Child health and newborn care providers', icon: Users, examples: ['Newborn care', 'Well visits', 'Vaccinations', 'Child development'] },
  { name: 'OB-GYN & Midwives', description: 'Prenatal and maternal healthcare providers', icon: Users, examples: ['Prenatal care', 'Birth planning', 'Postpartum care', 'Midwifery'] },
  { name: 'Doulas', description: 'Birth and postpartum support for mothers', icon: Users, examples: ['Birth doulas', 'Postpartum doulas', 'Childbirth education', 'Breastfeeding support'] },
  { name: 'Lactation Consultants', description: 'Breastfeeding guidance and support', icon: Users, examples: ['Latch support', 'Milk supply', 'Pumping guidance', 'Weaning support'] },
  { name: 'Postpartum Support', description: 'Recovery and wellness services for new mothers', icon: Users, examples: ['Meal delivery', 'Night nurses', 'Mental health', 'Physical therapy'] },
  { name: 'Family Therapists & Counselors', description: 'Mental health and relationship support for growing families', icon: Users, examples: ['Couples therapy', 'Prenatal anxiety', 'Postpartum depression', 'Family counseling'] },
  { name: 'Insurance Agents', description: 'Life, health, and family protection planning', icon: Store, examples: ['Life insurance', 'Health coverage', 'Baby planning', 'Family policies'] },
  { name: 'House Cleaning Services', description: 'Home cleaning and organization for growing families', icon: Store, examples: ['Deep cleaning', 'Newborn prep', 'Move-in cleaning', 'Regular maintenance'] },
  { name: 'Estate Planning & Attorneys', description: 'Wills, trusts, and family financial protection', icon: Store, examples: ['Wills & trusts', 'Guardianship', 'Life planning', 'Asset protection'] },
];

const freeTier = {
  name: 'Basic', price: 0, period: 'forever',
  description: 'Get listed and get found — no credit card needed',
  features: ['Business name & category', 'City & state location', 'One contact method (phone or website)', 'Logo or business photo', 'Appears in local search results'],
  cta: 'Create Free Listing', popular: false, badge: 'Free', eventAccess: 'Directory listing only',
};

const pricingTiers = [
  { name: 'Starter', price: 29, period: 'month', description: 'Perfect for individual vendors just starting out', features: ['Everything in Basic', 'Full business profile page', 'Photo gallery (up to 15 images)', 'Website & social links', 'Basic analytics'], cta: 'Get Started', popular: false, badge: 'Founding Member Rate', stripeLink: 'https://buy.stripe.com/8x23cwgC8d987N79Fx2go00', eventAccess: 'Up to 2 events/month' },
  { name: 'Professional', price: 79, period: 'month', description: 'Enhanced visibility with event participation', features: ['Everything in Starter', 'Featured placement in category', '"Verified" badge on profile', 'Priority in search results', 'Event vendor opportunities', 'Customer reviews & ratings', 'Advanced analytics dashboard'], cta: 'Become a Partner', popular: true, badge: 'Most Popular', stripeLink: 'https://buy.stripe.com/9B6cN6adKfhg5EZ7xp2go01', eventAccess: 'Up to 5 events/month' },
  { name: 'Enterprise', price: 149, period: 'month', description: 'Maximum exposure for established businesses', features: ['Everything in Professional', 'Homepage featured banner placement', 'Custom ad designer with profile save', 'Rotating homepage slideshow feature', 'Multiple location listings', 'Exclusive event sponsorships', 'Dedicated account manager'], cta: 'Upgrade to Enterprise', popular: false, badge: 'Unlimited Events', stripeLink: 'https://buy.stripe.com/8x24gA71y0mm6J304X2go02', eventAccess: 'Unlimited events' },
];

const foundingTiers = [
  { name: 'Starter', monthlyPrice: 29, lifetimePrice: 199, description: 'Lock in full Starter access — one payment, forever.', features: ['Everything in Starter plan', 'Founding Member badge', 'Never pay monthly', 'Price locked before platform grows'], popular: false, stripeLink: 'https://buy.stripe.com/7sYdRa0DaedcebvcRJ2go03' },
  { name: 'Professional', monthlyPrice: 79, lifetimePrice: 499, description: 'Full Professional access — pay once, own it forever.', features: ['Everything in Professional plan', 'Founding Member badge', 'Never pay monthly', 'Price locked before platform grows'], popular: true, stripeLink: 'https://buy.stripe.com/14A00kfy4edcebv3h92go04' },
  { name: 'Enterprise', monthlyPrice: 149, lifetimePrice: 999, description: 'Maximum exposure — one investment, unlimited access.', features: ['Everything in Enterprise plan', 'Founding Member badge', 'Never pay monthly', 'Price locked before platform grows'], popular: false, stripeLink: 'https://buy.stripe.com/4gMfZibhOd98aZjdVN2go05' },
];

const adSizes = [
  { name: 'Sidebar', dimensions: '300 x 600', width: 300, height: 600, previewW: 150, previewH: 300 },
  { name: 'Banner', dimensions: '728 x 90', width: 728, height: 90, previewW: 364, previewH: 45 },
  { name: 'Square', dimensions: '300 x 250', width: 300, height: 250, previewW: 150, previewH: 125 },
  { name: 'Hero', dimensions: '1200 x 400', width: 1200, height: 400, previewW: 300, previewH: 100 },
];

const vendorCategoryOptions = [
  'Maternity Boutiques', 'Local Crafters', 'Spas & Wellness', 'Photographers', 'Caterers & Bakers',
  'Event Venues', 'Florists', 'Party Planners', 'Realtors', 'Pediatricians', 'OB-GYN & Midwives',
  'Doulas', 'Lactation Consultants', 'Postpartum Support', 'Family Therapists & Counselors',
  'Insurance Agents', 'Estate Planning & Attorneys', 'House Cleaning Services', 'Other',
];

type ModalTier = { name: string; price?: number; lifetimePrice?: number; period?: string; description: string; stripeLink?: string; eventAccess?: string; isLifetime?: boolean; isFree?: boolean; };
type FreeListingForm = { business_name: string; category: string; city: string; state: string; contact_type: 'phone' | 'website'; contact_value: string; owner_name: string; email: string; };

export default function ForVendors() {
  const [showAdDesigner, setShowAdDesigner] = useState(false);

  // Capture a Suite Sister's referral code if the vendor arrived via her link,
  // so we can stamp it onto Stripe checkout for attribution.
  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get('ref');
    if (ref) { try { localStorage.setItem('sp_vendor_ref', ref); } catch { /* ignore */ } }
  }, []);
  const [selectedSize, setSelectedSize] = useState(adSizes[0]);
  const [adText, setAdText] = useState({ headline: '', description: '', cta: 'Learn More' });
  const [adPhoto, setAdPhoto] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<ModalTier | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFreeListingModal, setShowFreeListingModal] = useState(false);
  const [freeListingForm, setFreeListingForm] = useState<FreeListingForm>({ business_name: '', category: 'Spas & Wellness', city: '', state: '', contact_type: 'website', contact_value: '', owner_name: '', email: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [adSaving, setAdSaving] = useState(false);
  const [adSaveStatus, setAdSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle');

  // Logo upload state
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoUploading, setLogoUploading] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const photoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAdPhoto(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setLogoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const renderAdToCanvas = useCallback(async (): Promise<HTMLCanvasElement> => {
    const canvas = document.createElement('canvas');
    canvas.width = selectedSize.width;
    canvas.height = selectedSize.height;
    const ctx = canvas.getContext('2d')!;
    const isShort = canvas.height < 150;

    ctx.fillStyle = '#F8F6FA';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#9B7CB6';
    ctx.fillRect(0, 0, canvas.width, Math.max(6, canvas.height * 0.04));

    if (adPhoto) {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      await new Promise<void>(resolve => { img.onload = () => resolve(); img.onerror = () => resolve(); img.src = adPhoto; });
      const photoH = isShort ? canvas.height : Math.floor(canvas.height * 0.55);
      ctx.drawImage(img, 0, 0, canvas.width, photoH);
    } else {
      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0, '#D09AC6'); grad.addColorStop(1, '#9B7CB6');
      ctx.fillStyle = grad;
      const photoH = isShort ? canvas.height : Math.floor(canvas.height * 0.55);
      ctx.fillRect(0, 0, canvas.width, photoH);
    }

    if (!isShort) {
      const textY = Math.floor(canvas.height * 0.55);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, textY, canvas.width, canvas.height - textY);
      const pad = Math.max(12, canvas.width * 0.04);
      let y = textY + pad + 14;
      ctx.fillStyle = '#2C2C2C';
      ctx.font = `bold ${Math.max(14, canvas.width * 0.05)}px Georgia, serif`;
      ctx.fillText(adText.headline || 'Your Business Name', pad, y);
      y += Math.max(18, canvas.width * 0.06);
      if (adText.description) {
        ctx.fillStyle = '#888888';
        ctx.font = `${Math.max(10, canvas.width * 0.03)}px Arial, sans-serif`;
        const words = adText.description.split(' ');
        let line = '';
        const maxW = canvas.width - pad * 2;
        for (const word of words) {
          const test = line + word + ' ';
          if (ctx.measureText(test).width > maxW && line) { ctx.fillText(line, pad, y); line = word + ' '; y += Math.max(14, canvas.width * 0.04); if (y > canvas.height - 40) break; }
          else line = test;
        }
        if (line) ctx.fillText(line, pad, y);
        y += Math.max(16, canvas.width * 0.05);
      }
      const btnW = Math.min(140, canvas.width * 0.4);
      const btnH = Math.max(28, canvas.height * 0.06);
      const btnY = canvas.height - btnH - pad;
      ctx.fillStyle = '#9B7CB6';
      ctx.beginPath();
      ctx.roundRect(pad, btnY, btnW, btnH, btnH / 2);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `bold ${Math.max(10, canvas.width * 0.03)}px Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(adText.cta, pad + btnW / 2, btnY + btnH * 0.65);
      ctx.textAlign = 'left';
    }

    ctx.strokeStyle = '#9B7CB620';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
    return canvas;
  }, [selectedSize, adText, adPhoto]);

  const downloadCanvas = (canvas: HTMLCanvasElement) => {
    const link = document.createElement('a');
    link.download = `spa-pregio-ad-${selectedSize.name.toLowerCase()}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleDownload = useCallback(async () => {
    setAdSaving(true);
    try { const canvas = await renderAdToCanvas(); downloadCanvas(canvas); } catch (err) { console.error(err); }
    setAdSaving(false);
  }, [renderAdToCanvas]);

  const handleSaveToProfile = useCallback(async () => {
    setAdSaving(true);
    setAdSaveStatus('idle');
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const canvas = await renderAdToCanvas();

      if (user) {
        const blob: Blob = await new Promise(resolve => canvas.toBlob(b => resolve(b!), 'image/png'));
        const fileName = `ad-${user.id}-${Date.now()}.png`;
        const { error: uploadError } = await supabase.storage.from('event-images').upload(fileName, blob, { upsert: true });
        if (!uploadError) {
          const imageUrl = `https://reompjeeiurwnbpbfhyj.supabase.co/storage/v1/object/public/event-images/${fileName}`;
          await supabase.from('vendor_profiles').update({ ad_image: imageUrl, ad_headline: adText.headline, ad_description: adText.description, ad_cta: adText.cta }).eq('user_id', user.id);
          setAdSaveStatus('saved');
        }
      } else {
        setAdSaveStatus('error');
      }

      downloadCanvas(canvas);
    } catch (err) { console.error('Save error:', err); setAdSaveStatus('error'); }
    setAdSaving(false);
  }, [renderAdToCanvas, adText]);

  const handleSelectMonthlyTier = (tier: typeof pricingTiers[0]) => { setSelectedTier({ ...tier, isLifetime: false, isFree: false }); setShowConfirmModal(true); };
  const handleSelectFreeTier = () => setShowFreeListingModal(true);
  const handleSelectFoundingTier = (tier: typeof foundingTiers[0]) => { setSelectedTier({ name: `${tier.name} — Founding Lifetime`, lifetimePrice: tier.lifetimePrice, description: tier.description, stripeLink: tier.stripeLink, isLifetime: true, isFree: false }); setShowConfirmModal(true); };
  const handleProceedToCheckout = () => {
    if (selectedTier?.stripeLink) {
      let ref: string | null = new URLSearchParams(window.location.search).get('ref');
      if (!ref) { try { ref = localStorage.getItem('sp_vendor_ref'); } catch { ref = null; } }
      const sep = selectedTier.stripeLink.includes('?') ? '&' : '?';
      const url = ref
        ? `${selectedTier.stripeLink}${sep}client_reference_id=${encodeURIComponent(ref)}`
        : selectedTier.stripeLink;
      window.open(url, '_blank');
    }
    setShowConfirmModal(false);
  };

  const handleFreeListingSubmit = async () => {
    if (!freeListingForm.business_name || !freeListingForm.city || !freeListingForm.state || !freeListingForm.contact_value || !freeListingForm.email) {
      setSubmitError('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    setSubmitError('');

    // Upload logo if provided
    let logoUrl: string | null = null;
    if (logoFile) {
      setLogoUploading(true);
      const ext = logoFile.name.split('.').pop();
      const fileName = `vendor-logo-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from('event-images')
        .upload(fileName, logoFile, { cacheControl: '3600', upsert: false });
      if (!uploadError) {
        logoUrl = `https://reompjeeiurwnbpbfhyj.supabase.co/storage/v1/object/public/event-images/${fileName}`;
      }
      setLogoUploading(false);
    }

    const { error } = await supabase.from('vendors').insert({
      business_name: freeListingForm.business_name,
      category: freeListingForm.category,
      city: freeListingForm.city,
      state: freeListingForm.state,
      contact_type: freeListingForm.contact_type,
      contact_value: freeListingForm.contact_value,
      owner_name: freeListingForm.owner_name || null,
      email: freeListingForm.email,
      plan: 'free',
      status: 'pending',
      logo_url: logoUrl,
    });

    setSubmitting(false);

    if (error) {
      setSubmitError('Something went wrong. Please try again.');
    } else {
      // Send vendor welcome email (non-blocking)
      try {
        await fetch(`${SUPABASE_FUNCTIONS_URL}/send-transactional-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            type: 'vendor_welcome',
            to: freeListingForm.email,
            businessName: freeListingForm.business_name,
            ownerName: freeListingForm.owner_name || freeListingForm.business_name,
            category: freeListingForm.category,
            city: freeListingForm.city,
            state: freeListingForm.state,
          }),
        });
      } catch (emailErr) {
        console.error('Vendor welcome email error:', emailErr);
      }
      setSubmitSuccess(true);
    }
  };

  const resetFreeListingModal = () => {
    setShowFreeListingModal(false);
    setSubmitSuccess(false);
    setSubmitError('');
    setLogoFile(null);
    setLogoPreview(null);
    if (logoInputRef.current) logoInputRef.current.value = '';
    setFreeListingForm({ business_name: '', category: 'Spas & Wellness', city: '', state: '', contact_type: 'website', contact_value: '', owner_name: '', email: '' });
  };

  return (
    <div className="w-full pt-20">

      {/* Hero */}
      <section className="w-full py-16 lg:py-24 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">For Vendors</span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-spa-charcoal leading-tight mt-4">Reach expectant mothers in <span className="text-spa-purple">your area.</span></h1>
            <p className="mt-6 text-lg text-spa-gray leading-relaxed">Join Spa-Pregio's directory and get discovered by local mamas actively shopping for maternity products and services.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a href="#pricing" className="btn-primary">List Your Business <ArrowRight size={18} /></a>
              <button onClick={() => setShowAdDesigner(true)} className="btn-outline"><Eye size={18} /> Try Ad Designer</button>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Categories */}
      <section className="w-full py-16 lg:py-20 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Vendor Categories</span>
            <h2 className="section-title mt-4">What can you <span className="text-spa-purple">sell?</span></h2>
            <p className="mt-4 text-spa-gray max-w-2xl mx-auto">Click any category to find local vendors in your area — or list your own business below.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vendorCategories.map((category, index) => (
              <a key={index} href={`/find-vendors?category=${encodeURIComponent(category.name)}`}
                className="elegant-card p-6 group cursor-pointer hover:border-spa-purple/30 transition-all block">
                <div className="w-12 h-12 rounded-full bg-spa-purple/10 flex items-center justify-center mb-4 group-hover:bg-spa-purple transition-colors"><category.icon size={22} className="text-spa-purple group-hover:text-white transition-colors" /></div>
                <h3 className="font-serif text-lg text-spa-charcoal mb-2">{category.name}</h3>
                <p className="text-spa-gray text-sm mb-4">{category.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">{category.examples.map((e, i) => <span key={i} className="text-xs px-2 py-1 bg-spa-lavender rounded-full text-spa-gray">{e}</span>)}</div>
                <p className="text-xs text-spa-purple font-medium flex items-center gap-1 group-hover:gap-2 transition-all">Find local vendors →</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Pricing */}
      <section id="pricing" className="w-full py-16 lg:py-20 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-6">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Pricing</span>
            <h2 className="section-title mt-4">Choose your <span className="text-spa-purple">plan.</span></h2>
            <p className="mt-4 text-spa-gray max-w-xl mx-auto">Start free and upgrade anytime. Founding member rates are locked in for early vendors.</p>
          </div>
          <div className="bg-spa-purple/10 border border-spa-purple/20 rounded-2xl p-4 max-w-2xl mx-auto mb-12 text-center">
            <p className="text-spa-purple text-sm font-medium">All paid plans include event access — Enterprise members get <strong>unlimited</strong> events and homepage banner placement.</p>
          </div>
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="relative rounded-2xl p-8 bg-white border-2 border-dashed border-spa-purple/30">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-spa-charcoal/40 text-white text-xs font-medium uppercase tracking-wider rounded-full">Free</span>
              <h3 className="font-serif text-2xl mt-2 text-spa-charcoal">{freeTier.name}</h3>
              <p className="mt-2 text-sm text-spa-gray">{freeTier.description}</p>
              <div className="mt-6"><span className="font-serif text-4xl text-spa-charcoal">$0</span><span className="text-sm text-spa-gray"> / forever</span></div>
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-spa-purple/10 text-spa-purple"><Store size={12} /> {freeTier.eventAccess}</div>
              <ul className="mt-6 space-y-3">{freeTier.features.map((f, i) => <li key={i} className="flex items-start gap-3"><Check size={18} className="flex-shrink-0 mt-0.5 text-spa-purple" /><span className="text-sm text-spa-gray">{f}</span></li>)}</ul>
              <button onClick={handleSelectFreeTier} className="w-full mt-8 py-3 rounded-full font-medium transition-colors border-2 border-spa-purple text-spa-purple hover:bg-spa-purple hover:text-white">{freeTier.cta}</button>
            </div>
            {pricingTiers.map((tier, index) => (
              <div key={index} className={`relative rounded-2xl p-8 ${tier.popular ? 'bg-spa-purple text-white' : 'bg-white'}`}>
                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-white text-xs font-medium uppercase tracking-wider rounded-full ${tier.popular ? 'bg-spa-pink' : 'bg-spa-charcoal/60'}`}>{tier.badge}</span>
                <h3 className={`font-serif text-2xl mt-2 ${tier.popular ? 'text-white' : 'text-spa-charcoal'}`}>{tier.name}</h3>
                <p className={`mt-2 text-sm ${tier.popular ? 'text-white/70' : 'text-spa-gray'}`}>{tier.description}</p>
                <div className="mt-6"><span className={`font-serif text-4xl ${tier.popular ? 'text-white' : 'text-spa-charcoal'}`}>${tier.price}</span><span className={`text-sm ${tier.popular ? 'text-white/70' : 'text-spa-gray'}`}>/{tier.period}</span></div>
                <div className={`mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${tier.popular ? 'bg-white/20 text-white' : 'bg-spa-purple/10 text-spa-purple'}`}><Store size={12} /> {tier.eventAccess}</div>
                <ul className="mt-6 space-y-3">{tier.features.map((f, i) => <li key={i} className="flex items-start gap-3"><Check size={18} className={`flex-shrink-0 mt-0.5 ${tier.popular ? 'text-spa-pink' : 'text-spa-purple'}`} /><span className={`text-sm ${tier.popular ? 'text-white/80' : 'text-spa-gray'}`}>{f}</span></li>)}</ul>
                <button onClick={() => handleSelectMonthlyTier(tier)} className={`w-full mt-8 py-3 rounded-full font-medium transition-colors ${tier.popular ? 'bg-white text-spa-purple hover:bg-spa-cream' : 'bg-spa-purple text-white hover:bg-spa-purple/90'}`}>{tier.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founding Lifetime */}
      <section id="founding" className="w-full py-16 lg:py-20 bg-spa-charcoal">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-4">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-pink">Limited Time Offer</span>
            <h2 className="font-serif text-3xl lg:text-4xl text-white mt-4">Founding Vendor <span className="text-spa-pink">Lifetime Access</span></h2>
            <p className="mt-4 text-white/60 max-w-xl mx-auto">One payment. No monthly fees. Ever. Limited to the first <strong className="text-white">100 vendors</strong> sitewide.</p>
          </div>
          <div className="flex items-center justify-center gap-2 mb-10">
            <div className="flex items-center gap-2 bg-spa-pink/20 border border-spa-pink/40 rounded-full px-5 py-2"><Clock size={14} className="text-spa-pink" /><span className="text-spa-pink text-sm font-medium">Founding pricing closes at 100 vendors — claim yours now</span></div>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {foundingTiers.map((tier, index) => (
              <div key={index} className={`relative rounded-2xl p-8 ${tier.popular ? 'bg-spa-purple' : 'bg-white/5 border border-white/10'}`}>
                {tier.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-spa-pink text-white text-xs font-medium uppercase tracking-wider rounded-full">Best Value</span>}
                <div className="flex items-center gap-2 mb-1"><Zap size={16} className="text-spa-pink" /><h3 className="font-serif text-2xl text-white">{tier.name}</h3></div>
                <p className={`text-sm mt-1 ${tier.popular ? 'text-white/70' : 'text-white/50'}`}>{tier.description}</p>
                <div className="mt-6 flex items-end gap-3"><div><span className="font-serif text-4xl text-white">${tier.lifetimePrice}</span><span className="text-white/50 text-sm ml-1">one-time</span></div><div className="pb-1"><span className="text-white/40 text-xs line-through">${tier.monthlyPrice}/mo</span></div></div>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-spa-pink/20 text-spa-pink border border-spa-pink/30">Save ${(tier.monthlyPrice * 12) - tier.lifetimePrice > 0 ? (tier.monthlyPrice * 12) - tier.lifetimePrice : tier.monthlyPrice * 6}+ vs first year monthly</div>
                <ul className="mt-6 space-y-3">{tier.features.map((f, i) => <li key={i} className="flex items-start gap-3"><Check size={18} className="flex-shrink-0 mt-0.5 text-spa-pink" /><span className="text-sm text-white/70">{f}</span></li>)}</ul>
                <button onClick={() => handleSelectFoundingTier(tier)} className={`w-full mt-8 py-3 rounded-full font-medium transition-colors ${tier.popular ? 'bg-white text-spa-purple hover:bg-spa-cream' : 'bg-spa-pink text-white hover:bg-spa-pink/90'}`}>Claim Founding Rate — ${tier.lifetimePrice}</button>
              </div>
            ))}
          </div>
          <p className="text-center text-white/30 text-xs mt-8">Founding Lifetime Access includes all features of the corresponding monthly plan. One-time payment processed securely via Stripe.</p>
        </div>
      </section>

      {/* Be First CTA */}
      <section className="w-full py-16 lg:py-20 bg-spa-blush">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Early Opportunity</span>
          <h2 className="section-title mt-4">Be the first vendor <span className="text-spa-purple">in your city.</span></h2>
          <p className="mt-4 text-spa-gray leading-relaxed max-w-2xl mx-auto">Spa-Pregio is growing fast. Early vendors get premium placement, founding member rates, and first access to every mama searching in their area.</p>
          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            {[{ icon: Star, title: 'Founding Member Badge', desc: 'Stand out as one of the first vendors to join the movement.' }, { icon: MapPin, title: 'Top of Local Search', desc: 'Early listings get priority placement in their city and category.' }, { icon: Users, title: 'Direct Mama Access', desc: 'Connect with expectant mothers actively looking for what you offer.' }].map(perk => (
              <div key={perk.title} className="bg-white rounded-2xl p-6 shadow-elegant text-left"><perk.icon size={24} className="text-spa-purple mb-3" /><h3 className="font-serif text-lg text-spa-charcoal mb-2">{perk.title}</h3><p className="text-sm text-spa-gray leading-relaxed">{perk.desc}</p></div>
            ))}
          </div>
          <a href="#pricing" className="btn-primary mt-10 mx-auto inline-flex">Claim Your Spot <ArrowRight size={18} /></a>
        </div>
      </section>

      {/* Ad Designer Section */}
      <section className="w-full py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Ad Designer</span>
              <h2 className="section-title mt-4">Create beautiful <span className="text-spa-purple">advertisements.</span></h2>
              <p className="mt-4 text-spa-gray leading-relaxed">Design stunning, on-brand ads in minutes. Enterprise vendors get their ads featured on the homepage slideshow.</p>
              <div className="mt-8 space-y-4">
                {[{ icon: Upload, text: 'Upload your product photos' }, { icon: Type, text: 'Customize headlines and copy' }, { icon: Palette, text: 'Spa-Pregio branded design' }, { icon: Eye, text: 'Real-time preview' }, { icon: Download, text: 'Download + save to your profile' }].map((item, i) => (
                  <div key={i} className="flex items-center gap-3"><item.icon size={20} className="text-spa-purple" /><span className="text-spa-charcoal">{item.text}</span></div>
                ))}
              </div>
              <button onClick={() => setShowAdDesigner(true)} className="btn-primary mt-8"><Eye size={18} /> Try the Ad Designer</button>
            </div>
            <div className="relative">
              <div className="elegant-card p-6">
                <div className="aspect-[4/3] bg-spa-lavender rounded-xl flex items-center justify-center"><div className="text-center"><Palette size={48} className="text-spa-purple mx-auto mb-4" /><p className="text-spa-gray">Ad Designer Preview</p></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-16 lg:py-20 bg-spa-purple">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl text-white">Ready to grow your <span className="text-spa-pink">business?</span></h2>
          <p className="mt-4 text-white/70 leading-relaxed">Get in front of local mamas who are ready to buy.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href="#pricing" className="bg-white text-spa-purple px-6 py-3 rounded-full font-medium hover:bg-spa-cream transition-colors inline-flex items-center gap-2">Start Free <ArrowRight size={18} /></a>
            <a href="#founding" className="bg-spa-pink text-white px-6 py-3 rounded-full font-medium hover:bg-spa-pink/90 transition-colors inline-flex items-center gap-2"><Zap size={18} /> Claim Founding Rate</a>
          </div>
        </div>
      </section>

      {/* FREE LISTING MODAL */}
      {showFreeListingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spa-charcoal/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={32} className="text-green-600" /></div>
                <h3 className="font-serif text-2xl text-spa-charcoal mb-3">Listing Submitted!</h3>
                <p className="text-spa-gray leading-relaxed mb-2">Thank you for listing <strong>{freeListingForm.business_name}</strong> on Spa-Pregio.</p>
                <p className="text-spa-gray text-sm leading-relaxed mb-8">Your listing is pending review. Check your email for next steps — we'll be in touch within 24–48 hours.</p>
                <button onClick={resetFreeListingModal} className="btn-primary mx-auto inline-flex">Done <ArrowRight size={16} /></button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div><h3 className="font-serif text-2xl text-spa-charcoal">Create Free Listing</h3><p className="text-spa-gray text-sm mt-1">Your business will appear in our local vendor directory.</p></div>
                  <button onClick={resetFreeListingModal} className="w-8 h-8 rounded-full bg-spa-lavender flex items-center justify-center text-spa-gray hover:text-spa-charcoal transition-colors flex-shrink-0"><X size={18} /></button>
                </div>
                <div className="space-y-4">
                  <div><label className="block text-sm font-medium text-spa-charcoal mb-2">Business Name <span className="text-spa-pink">*</span></label><input type="text" placeholder="Your business name" value={freeListingForm.business_name} onChange={e => setFreeListingForm({ ...freeListingForm, business_name: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" /></div>
                  <div><label className="block text-sm font-medium text-spa-charcoal mb-2">Category <span className="text-spa-pink">*</span></label><select value={freeListingForm.category} onChange={e => setFreeListingForm({ ...freeListingForm, category: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30">{vendorCategoryOptions.map(c => <option key={c}>{c}</option>)}</select></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-spa-charcoal mb-2">City <span className="text-spa-pink">*</span></label><input type="text" placeholder="City" value={freeListingForm.city} onChange={e => setFreeListingForm({ ...freeListingForm, city: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" /></div>
                    <div><label className="block text-sm font-medium text-spa-charcoal mb-2">State <span className="text-spa-pink">*</span></label><input type="text" placeholder="NC" maxLength={2} value={freeListingForm.state} onChange={e => setFreeListingForm({ ...freeListingForm, state: e.target.value.toUpperCase() })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" /></div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-2">Contact Method <span className="text-spa-pink">*</span></label>
                    <div className="flex gap-3 mb-3">{(['website', 'phone'] as const).map(type => <button key={type} onClick={() => setFreeListingForm({ ...freeListingForm, contact_type: type, contact_value: '' })} className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors capitalize ${freeListingForm.contact_type === type ? 'bg-spa-purple text-white' : 'bg-spa-lavender text-spa-charcoal hover:bg-spa-purple/10'}`}>{type}</button>)}</div>
                    <input type={freeListingForm.contact_type === 'phone' ? 'tel' : 'url'} placeholder={freeListingForm.contact_type === 'phone' ? '(555) 555-5555' : 'https://yourwebsite.com'} value={freeListingForm.contact_value} onChange={e => setFreeListingForm({ ...freeListingForm, contact_value: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
                  </div>
                  <div><label className="block text-sm font-medium text-spa-charcoal mb-2">Your Name</label><input type="text" placeholder="First and last name" value={freeListingForm.owner_name} onChange={e => setFreeListingForm({ ...freeListingForm, owner_name: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" /></div>

                  {/* Logo upload */}
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-2">
                      Business Logo or Photo <span className="text-spa-gray font-normal text-xs">(optional — appears on your listing card)</span>
                    </label>
                    <input ref={logoInputRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                    {logoPreview ? (
                      <div className="relative rounded-xl overflow-hidden aspect-[3/1]">
                        <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => { setLogoFile(null); setLogoPreview(null); if (logoInputRef.current) logoInputRef.current.value = ''; }}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center text-spa-charcoal hover:text-red-500 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => logoInputRef.current?.click()}
                        className="w-full p-4 border-2 border-dashed border-spa-purple/20 rounded-xl bg-spa-lavender hover:border-spa-purple/40 transition-colors flex items-center gap-3"
                      >
                        <div className="w-9 h-9 rounded-full bg-spa-purple/10 flex items-center justify-center flex-shrink-0">
                          <Upload size={16} className="text-spa-purple" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-spa-charcoal">Upload your logo</p>
                          <p className="text-xs text-spa-gray">JPG, PNG or WEBP — makes your listing stand out</p>
                        </div>
                      </button>
                    )}
                  </div>

                  <div><label className="block text-sm font-medium text-spa-charcoal mb-2">Email Address <span className="text-spa-pink">*</span></label><input type="email" placeholder="you@yourbusiness.com" value={freeListingForm.email} onChange={e => setFreeListingForm({ ...freeListingForm, email: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" /></div>
                  {submitError && <p className="text-red-500 text-sm">{submitError}</p>}
                  <p className="text-xs text-spa-gray">Your listing will be reviewed before going live. You'll receive a confirmation email with next steps.</p>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={resetFreeListingModal} className="flex-1 px-6 py-3 border border-spa-charcoal/20 rounded-full text-spa-charcoal hover:bg-spa-lavender transition-colors text-sm font-medium">Cancel</button>
                  <button onClick={handleFreeListingSubmit} disabled={submitting || logoUploading} className="flex-1 btn-primary justify-center disabled:opacity-50">
                    {logoUploading ? 'Uploading logo...' : submitting ? 'Submitting...' : 'Submit Free Listing'} <ArrowRight size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* PLAN CONFIRMATION MODAL */}
      {showConfirmModal && selectedTier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spa-charcoal/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6"><h3 className="font-serif text-2xl text-spa-charcoal">Confirm Your Plan</h3><button onClick={() => setShowConfirmModal(false)} className="w-8 h-8 rounded-full bg-spa-lavender flex items-center justify-center text-spa-gray hover:text-spa-charcoal transition-colors"><X size={18} /></button></div>
            <div className="bg-spa-lavender rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-2"><h4 className="font-serif text-xl text-spa-charcoal">{selectedTier.name}</h4><span className="text-spa-purple font-medium">{selectedTier.isLifetime ? `$${selectedTier.lifetimePrice} one-time` : `$${selectedTier.price}/mo`}</span></div>
              <p className="text-sm text-spa-gray mb-4">{selectedTier.description}</p>
              {selectedTier.eventAccess && <div className="flex items-center gap-2 text-sm text-spa-purple font-medium"><Store size={14} /> {selectedTier.eventAccess}</div>}
            </div>
            <p className="text-sm text-spa-gray mb-6 text-center">{selectedTier.isLifetime ? "You'll be taken to Stripe's secure checkout for a one-time payment." : "You'll be taken to Stripe's secure checkout to complete your subscription."}</p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirmModal(false)} className="flex-1 px-6 py-3 border border-spa-charcoal/20 rounded-full text-spa-charcoal hover:bg-spa-lavender transition-colors text-sm font-medium">Go Back</button>
              <button onClick={handleProceedToCheckout} className="flex-1 btn-primary justify-center">Proceed to Checkout <ArrowRight size={16} /></button>
            </div>
          </div>
        </div>
      )}

      {/* AD DESIGNER MODAL */}
      {showAdDesigner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spa-charcoal/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 lg:p-8">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif text-2xl text-spa-charcoal">Ad Designer</h3>
                <button onClick={() => setShowAdDesigner(false)} className="w-8 h-8 rounded-full bg-spa-lavender flex items-center justify-center text-spa-gray hover:text-spa-charcoal transition-colors"><X size={18} /></button>
              </div>
              <p className="text-xs text-spa-gray mb-6">Enterprise vendors: saved ads appear on the homepage featured slideshow</p>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-2">Ad Size</label>
                    <div className="grid grid-cols-2 gap-2">
                      {adSizes.map(size => (
                        <button key={size.name} onClick={() => setSelectedSize(size)} className={`p-3 rounded-xl text-left transition-colors ${selectedSize.name === size.name ? 'bg-spa-purple text-white' : 'bg-spa-lavender text-spa-charcoal hover:bg-spa-purple/10'}`}>
                          <p className="font-medium">{size.name}</p>
                          <p className={`text-xs ${selectedSize.name === size.name ? 'text-white/70' : 'text-spa-gray'}`}>{size.dimensions}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-2">Photo</label>
                    <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                    {adPhoto ? (
                      <div className="relative rounded-xl overflow-hidden aspect-video">
                        <img src={adPhoto} alt="Ad photo" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => { setAdPhoto(null); if (photoInputRef.current) photoInputRef.current.value = ''; }} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center text-spa-charcoal hover:text-red-500 transition-colors"><X size={14} /></button>
                        <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/40 rounded-lg"><p className="text-white text-xs">Photo uploaded ✓</p></div>
                      </div>
                    ) : (
                      <button type="button" onClick={() => photoInputRef.current?.click()} className="w-full p-6 border-2 border-dashed border-spa-purple/20 rounded-xl bg-spa-lavender hover:border-spa-purple/40 transition-colors flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-spa-purple/10 flex items-center justify-center"><Upload size={20} className="text-spa-purple" /></div>
                        <p className="text-sm font-medium text-spa-charcoal">Upload a photo</p>
                        <p className="text-xs text-spa-gray">JPG, PNG or WEBP</p>
                      </button>
                    )}
                  </div>

                  <div><label className="block text-sm font-medium text-spa-charcoal mb-2">Headline</label><input type="text" placeholder="Your business name or tagline" value={adText.headline} onChange={e => setAdText({ ...adText, headline: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" /></div>
                  <div><label className="block text-sm font-medium text-spa-charcoal mb-2">Description</label><textarea rows={3} placeholder="Brief description of your services..." value={adText.description} onChange={e => setAdText({ ...adText, description: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30 resize-none" /></div>
                  <div><label className="block text-sm font-medium text-spa-charcoal mb-2">Call to Action</label><select value={adText.cta} onChange={e => setAdText({ ...adText, cta: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30">{['Learn More', 'Book Now', 'Shop Now', 'Get a Quote', 'Contact Us'].map(opt => <option key={opt}>{opt}</option>)}</select></div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-2">Preview</label>
                  <div className="bg-spa-lavender rounded-xl p-4 flex items-center justify-center min-h-[400px]">
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg" style={{ width: selectedSize.previewW, height: selectedSize.previewH }}>
                      {adPhoto ? (
                        <img src={adPhoto} alt="Preview" className="w-full object-cover" style={{ height: selectedSize.name === 'Banner' ? '100%' : '55%' }} />
                      ) : (
                        <div className="bg-gradient-to-r from-spa-pink/30 to-spa-purple/30 flex items-center justify-center" style={{ height: selectedSize.name === 'Banner' ? '100%' : '55%' }}>
                          <Image size={20} className="text-spa-purple/50" />
                        </div>
                      )}
                      {selectedSize.name !== 'Banner' && (
                        <div className="p-2">
                          <p className="font-serif text-xs text-spa-charcoal font-medium truncate">{adText.headline || 'Your Business Name'}</p>
                          <p className="text-spa-gray mt-0.5 line-clamp-2" style={{ fontSize: '9px' }}>{adText.description || 'Your business description...'}</p>
                          <button className="mt-1.5 px-2 py-0.5 bg-spa-purple text-white rounded-full" style={{ fontSize: '8px' }}>{adText.cta}</button>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-spa-gray mt-2 text-center">Preview scaled — download will be full resolution ({selectedSize.dimensions}px)</p>
                </div>
              </div>

              {adSaveStatus === 'saved' && (
                <div className="mt-6 flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-xl text-sm"><CheckCircle size={16} /> Ad saved to your profile and downloaded!</div>
              )}
              {adSaveStatus === 'error' && (
                <div className="mt-6 flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-3 rounded-xl text-sm"><X size={16} /> Not logged in — ad was downloaded but not saved to profile.</div>
              )}

              <div className="flex gap-3 mt-6">
                <button onClick={handleSaveToProfile} disabled={adSaving} className="flex-1 btn-primary justify-center disabled:opacity-50">
                  <Save size={18} /> {adSaving ? 'Saving...' : 'Save to Profile & Download'}
                </button>
                <button onClick={handleDownload} disabled={adSaving} className="flex items-center gap-2 px-5 py-3 border border-spa-charcoal/20 rounded-full text-spa-charcoal hover:bg-spa-lavender transition-colors text-sm font-medium disabled:opacity-50">
                  <Download size={16} /> Download Only
                </button>
                <button onClick={() => setShowAdDesigner(false)} className="px-5 py-3 border border-spa-charcoal/20 rounded-full text-spa-charcoal hover:bg-spa-lavender transition-colors text-sm">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
