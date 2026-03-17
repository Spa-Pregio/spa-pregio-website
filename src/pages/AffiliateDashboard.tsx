import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
  Copy, Check, TrendingUp, MousePointer, Users, DollarSign,
  Clock, CheckCircle, ArrowRight, ExternalLink, AlertCircle,
  Gift, Store, Zap, BarChart2
} from 'lucide-react';

type AffiliateStats = {
  affiliate_id: string;
  full_name: string;
  referral_code: string;
  status: string;
  total_clicks: number;
  total_conversions: number;
  conversion_rate: number;
  pending_earnings: number;
  confirmed_earnings: number;
  total_paid: number;
  total_earned: number;
};

type Referral = {
  id: string;
  vendor_name: string;
  tier: string;
  subscription_type: string;
  sale_amount: number;
  commission_amount: number;
  status: string;
  created_at: string;
};

type SuiteCommission = {
  id: string;
  suite_name: string;
  sale_amount: number;
  commission_amount: number;
  commission_rate: number;
  status: string;
  created_at: string;
  payhip_order_id?: string;
};

type Payout = {
  id: string;
  amount: number;
  payment_method: string;
  paid_at: string;
  notes: string;
};

type Affiliate = {
  id: string;
  referral_code: string;
  status: string;
  paypal_email: string | null;
  venmo_handle: string | null;
  zelle_info: string | null;
};

type Tab = 'overview' | 'vendors' | 'suites' | 'payouts';

export default function AffiliateDashboard() {
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
  const [stats, setStats] = useState<AffiliateStats | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [suiteCommissions, setSuiteCommissions] = useState<SuiteCommission[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [notAffiliate, setNotAffiliate] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [applyForm, setApplyForm] = useState({ full_name: '', paypal_email: '', venmo_handle: '', zelle_info: '' });
  const [applying, setApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  useEffect(() => { loadDashboard(); }, []);

  async function loadDashboard() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    const { data: aff } = await supabase
      .from('affiliates')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!aff) { setNotAffiliate(true); setLoading(false); return; }
    setAffiliate(aff);

    const { data: statsData } = await supabase
      .from('affiliate_stats')
      .select('*')
      .eq('affiliate_id', aff.id)
      .single();
    if (statsData) setStats(statsData);

    const { data: refs } = await supabase
      .from('affiliate_referrals')
      .select('*')
      .eq('affiliate_id', aff.id)
      .order('created_at', { ascending: false });
    if (refs) setReferrals(refs);

    const { data: suites } = await supabase
      .from('affiliate_suite_commissions')
      .select('*')
      .eq('affiliate_id', aff.id)
      .order('created_at', { ascending: false });
    if (suites) setSuiteCommissions(suites);

    const { data: pays } = await supabase
      .from('affiliate_payouts')
      .select('*')
      .eq('affiliate_id', aff.id)
      .order('paid_at', { ascending: false });
    if (pays) setPayouts(pays);

    setLoading(false);
  }

  async function handleApply() {
    setApplying(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const referral_code = applyForm.full_name
      .toLowerCase().replace(/\s+/g, '').slice(0, 12) + Math.floor(Math.random() * 1000);

    const { error } = await supabase.from('affiliates').insert({
      user_id: user.id,
      full_name: applyForm.full_name,
      email: user.email,
      referral_code,
      paypal_email: applyForm.paypal_email || null,
      venmo_handle: applyForm.venmo_handle || null,
      zelle_info: applyForm.zelle_info || null,
      status: 'pending',
    });

    setApplying(false);
    if (!error) { setApplySuccess(true); setTimeout(() => loadDashboard(), 1500); }
  }

  function copyReferralLink() {
    if (!affiliate) return;
    const link = `${window.location.origin}/vendors?ref=${affiliate.referral_code}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function tierColor(tier: string) {
    if (tier.includes('Enterprise')) return 'bg-spa-charcoal text-white';
    if (tier.includes('Professional')) return 'bg-spa-purple text-white';
    return 'bg-spa-lavender text-spa-charcoal';
  }

  function statusBadge(status: string) {
    if (status === 'paid') return 'bg-green-100 text-green-700';
    if (status === 'confirmed') return 'bg-blue-100 text-blue-700';
    return 'bg-amber-100 text-amber-700';
  }

  // Computed totals
  const suitePending = suiteCommissions.filter(s => s.status === 'pending').reduce((sum, s) => sum + s.commission_amount, 0);
  const suiteConfirmed = suiteCommissions.filter(s => s.status === 'confirmed').reduce((sum, s) => sum + s.commission_amount, 0);
  const suitePaid = suiteCommissions.filter(s => s.status === 'paid').reduce((sum, s) => sum + s.commission_amount, 0);
  const suiteTotalEarned = suiteCommissions.reduce((sum, s) => sum + s.commission_amount, 0);
  const vendorTotalEarned = stats?.total_earned || 0;
  const combinedTotalEarned = vendorTotalEarned + suiteTotalEarned;

  if (loading) {
    return (
      <div className="w-full pt-20 min-h-screen bg-spa-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-spa-purple/30 border-t-spa-purple rounded-full animate-spin mx-auto mb-4" />
          <p className="text-spa-gray">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Apply form
  if (notAffiliate) {
    return (
      <div className="w-full pt-20 min-h-screen bg-spa-cream">
        <div className="max-w-lg mx-auto px-6 py-16">
          {applySuccess ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-spa-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32} className="text-spa-purple" />
              </div>
              <h2 className="font-serif text-3xl text-spa-charcoal mb-4">Application Submitted!</h2>
              <p className="text-spa-gray">We'll review your application and activate your account shortly. Welcome to the movement! 💜</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Suite Sisters™</span>
                <h1 className="font-serif text-4xl text-spa-charcoal mt-4">Join the Movement</h1>
                <p className="mt-4 text-spa-gray leading-relaxed">
                  Earn 30% on digital suite sales plus 10% recurring on every vendor you refer.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-elegant space-y-5">
                {[
                  { label: 'Your Full Name *', key: 'full_name', type: 'text', placeholder: 'First and Last Name' },
                  { label: 'PayPal Email (for payouts)', key: 'paypal_email', type: 'email', placeholder: 'you@email.com' },
                  { label: 'Venmo Handle', key: 'venmo_handle', type: 'text', placeholder: '@yourhandle' },
                  { label: 'Zelle (phone or email)', key: 'zelle_info', type: 'text', placeholder: 'Phone or email on Zelle' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-spa-charcoal mb-2">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={applyForm[field.key as keyof typeof applyForm]}
                      onChange={(e) => setApplyForm({ ...applyForm, [field.key]: e.target.value })}
                      className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                    />
                  </div>
                ))}
                <button
                  onClick={handleApply}
                  disabled={!applyForm.full_name || applying}
                  className="w-full btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {applying ? 'Submitting...' : 'Apply to Become a Suite Sister™'} <ArrowRight size={18} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  const referralLink = `${window.location.origin}/vendors?ref=${affiliate?.referral_code}`;

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'vendors', label: 'Vendor Referrals', icon: Store },
    { id: 'suites', label: 'Suite Commissions', icon: Gift },
    { id: 'payouts', label: 'Payouts', icon: DollarSign },
  ];

  return (
    <div className="w-full pt-20 min-h-screen bg-spa-cream">

      {/* Header */}
      <section className="w-full py-12 bg-spa-purple">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="text-spa-pink text-sm uppercase tracking-[0.15em]">Suite Sisters™ Portal</span>
              <h1 className="font-serif text-3xl text-white mt-2">
                Welcome back, {stats?.full_name?.split(' ')[0] || 'Sister'} 💜
              </h1>
              {affiliate?.status === 'pending' && (
                <div className="flex items-center gap-2 mt-3 bg-amber-400/20 border border-amber-400/30 rounded-full px-4 py-1.5 w-fit">
                  <AlertCircle size={14} className="text-amber-300" />
                  <span className="text-amber-300 text-xs font-medium">Application pending review — your link is ready once approved</span>
                </div>
              )}
              {affiliate?.status === 'active' && (
                <div className="flex items-center gap-2 mt-3 bg-green-400/20 border border-green-400/30 rounded-full px-4 py-1.5 w-fit">
                  <CheckCircle size={14} className="text-green-300" />
                  <span className="text-green-300 text-xs font-medium">Active — earning on both streams</span>
                </div>
              )}
            </div>
            <div className="bg-white/10 rounded-2xl p-4 min-w-[300px]">
              <p className="text-white/60 text-xs mb-2">Your referral link</p>
              <p className="text-white text-sm font-mono truncate mb-3">{referralLink}</p>
              <button
                onClick={copyReferralLink}
                className="w-full flex items-center justify-center gap-2 bg-white text-spa-purple px-4 py-2 rounded-full text-sm font-medium hover:bg-spa-cream transition-colors"
              >
                {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy Link</>}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="w-full bg-white border-b border-spa-light sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-spa-purple text-spa-purple'
                      : 'border-transparent text-spa-gray hover:text-spa-charcoal'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-10">

        {/* ── OVERVIEW TAB ── */}
        {activeTab === 'overview' && (
          <>
            {/* Combined Top Stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: MousePointer, label: 'Total Clicks', value: stats?.total_clicks || 0, format: 'number' },
                { icon: Users, label: 'Vendors Referred', value: stats?.total_conversions || 0, format: 'number' },
                { icon: Gift, label: 'Suite Sales', value: suiteCommissions.length, format: 'number' },
                { icon: DollarSign, label: 'Total Earned (All)', value: combinedTotalEarned, format: 'currency' },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-elegant">
                  <div className="w-10 h-10 rounded-full bg-spa-purple/10 flex items-center justify-center mb-4">
                    <stat.icon size={20} className="text-spa-purple" />
                  </div>
                  <p className="text-spa-gray text-sm">{stat.label}</p>
                  <p className="font-serif text-3xl text-spa-charcoal mt-1">
                    {stat.format === 'currency' ? formatCurrency(stat.value as number) : stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Two Stream Breakdown */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Vendor Stream */}
              <div className="bg-white rounded-2xl shadow-elegant overflow-hidden">
                <div className="bg-spa-purple px-6 py-4 flex items-center gap-3">
                  <Store size={20} className="text-white" />
                  <div>
                    <h3 className="font-serif text-lg text-white">Vendor Referrals</h3>
                    <p className="text-white/60 text-xs">10% recurring · 15% founding</p>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Pending', value: stats?.pending_earnings || 0, color: 'text-amber-600' },
                      { label: 'Confirmed', value: stats?.confirmed_earnings || 0, color: 'text-blue-600' },
                      { label: 'Paid Out', value: stats?.total_paid || 0, color: 'text-green-600' },
                    ].map((item, i) => (
                      <div key={i} className="bg-spa-cream rounded-xl p-4 text-center">
                        <p className="text-xs text-spa-gray mb-1">{item.label}</p>
                        <p className={`font-serif text-xl ${item.color}`}>{formatCurrency(item.value)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-spa-light">
                    <span className="text-spa-gray text-sm">Total earned from vendors</span>
                    <span className="font-serif text-xl text-spa-purple">{formatCurrency(vendorTotalEarned)}</span>
                  </div>
                  <button onClick={() => setActiveTab('vendors')} className="w-full text-sm text-spa-purple font-medium flex items-center justify-center gap-1 hover:gap-2 transition-all">
                    View referral history <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Suite Stream */}
              <div className="bg-white rounded-2xl shadow-elegant overflow-hidden">
                <div className="bg-spa-pink px-6 py-4 flex items-center gap-3">
                  <Gift size={20} className="text-white" />
                  <div>
                    <h3 className="font-serif text-lg text-white">Suite Commissions</h3>
                    <p className="text-white/60 text-xs">30% per digital suite sale · via Payhip</p>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Pending', value: suitePending, color: 'text-amber-600' },
                      { label: 'Confirmed', value: suiteConfirmed, color: 'text-blue-600' },
                      { label: 'Paid Out', value: suitePaid, color: 'text-green-600' },
                    ].map((item, i) => (
                      <div key={i} className="bg-spa-cream rounded-xl p-4 text-center">
                        <p className="text-xs text-spa-gray mb-1">{item.label}</p>
                        <p className={`font-serif text-xl ${item.color}`}>{formatCurrency(item.value)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-spa-light">
                    <span className="text-spa-gray text-sm">Total earned from suites</span>
                    <span className="font-serif text-xl text-spa-pink">{formatCurrency(suiteTotalEarned)}</span>
                  </div>
                  <button onClick={() => setActiveTab('suites')} className="w-full text-sm text-spa-pink font-medium flex items-center justify-center gap-1 hover:gap-2 transition-all">
                    View suite commissions <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Commission Rates Reference */}
            <div className="bg-white rounded-2xl p-8 shadow-elegant">
              <h2 className="font-serif text-2xl text-spa-charcoal mb-6">Your Commission Rates</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-spa-blush rounded-xl p-5 border-2 border-spa-pink">
                  <Gift size={20} className="text-spa-pink mb-3" />
                  <p className="text-spa-pink font-medium text-sm uppercase tracking-wide mb-1">Digital Suite Sales</p>
                  <p className="font-serif text-4xl text-spa-charcoal">30%</p>
                  <p className="text-spa-gray text-sm mt-2">Per Celebration Suite™ sold</p>
                  <p className="text-spa-pink font-medium text-sm mt-3">$27 sale → <strong>$8.10</strong></p>
                </div>
                <div className="bg-spa-lavender rounded-xl p-5 border-2 border-spa-purple">
                  <Store size={20} className="text-spa-purple mb-3" />
                  <p className="text-spa-purple font-medium text-sm uppercase tracking-wide mb-1">Monthly Vendor Referrals</p>
                  <p className="font-serif text-4xl text-spa-charcoal">10%</p>
                  <p className="text-spa-gray text-sm mt-2">Recurring every month they're active</p>
                  <div className="mt-3 space-y-1 text-xs text-spa-gray">
                    <p>Starter ($29) → <span className="text-spa-purple font-medium">$2.90/mo</span></p>
                    <p>Pro ($79) → <span className="text-spa-purple font-medium">$7.90/mo</span></p>
                    <p>Enterprise ($149) → <span className="text-spa-purple font-medium">$14.90/mo</span></p>
                  </div>
                </div>
                <div className="bg-spa-charcoal rounded-xl p-5 border-2 border-spa-charcoal">
                  <Zap size={20} className="text-spa-pink mb-3" />
                  <p className="text-spa-pink font-medium text-sm uppercase tracking-wide mb-1">Founding Lifetime Referrals</p>
                  <p className="font-serif text-4xl text-white">15%</p>
                  <p className="text-white/60 text-sm mt-2">One-time on lifetime purchases</p>
                  <div className="mt-3 space-y-1 text-xs text-white/60">
                    <p>Starter ($199) → <span className="text-spa-pink font-medium">$29.85</span></p>
                    <p>Pro ($499) → <span className="text-spa-pink font-medium">$74.85</span></p>
                    <p>Enterprise ($999) → <span className="text-spa-pink font-medium">$149.85</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-spa-purple rounded-2xl p-8">
              <h2 className="font-serif text-2xl text-white mb-6">Tips to Maximize Your Earnings</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { title: 'Share Suites First', tip: 'Mamas buy instantly. Drop your link in mom groups, TikTok, and IG stories. $8.10 per sale adds up fast.' },
                  { title: 'Target Local Vendors', tip: 'Reach out to spas, photographers, bakers, and florists. They\'re actively looking for exposure to new mamas.' },
                  { title: 'Push Founding Rates', tip: 'The lifetime deals are a no-brainer for vendors. Lead with the savings — they never pay monthly again.' },
                ].map((tip, i) => (
                  <div key={i} className="bg-white/10 rounded-xl p-5">
                    <h3 className="font-serif text-lg text-white mb-2">{tip.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{tip.tip}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="/suites" target="_blank" className="inline-flex items-center gap-2 bg-white text-spa-purple px-6 py-3 rounded-full font-medium hover:bg-spa-cream transition-colors text-sm">
                  <ExternalLink size={16} /> View Suites
                </a>
                <a href="/vendors" target="_blank" className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-colors text-sm">
                  <ExternalLink size={16} /> View Vendor Page
                </a>
              </div>
            </div>
          </>
        )}

        {/* ── VENDOR REFERRALS TAB ── */}
        {activeTab === 'vendors' && (
          <>
            {/* Vendor Stats */}
            <div className="grid sm:grid-cols-4 gap-6">
              {[
                { icon: TrendingUp, label: 'Conversion Rate', value: `${stats?.conversion_rate || 0}%`, raw: true },
                { icon: Clock, label: 'Pending', value: stats?.pending_earnings || 0, format: 'currency', color: 'text-amber-600' },
                { icon: CheckCircle, label: 'Confirmed', value: stats?.confirmed_earnings || 0, format: 'currency', color: 'text-blue-600' },
                { icon: DollarSign, label: 'Paid Out', value: stats?.total_paid || 0, format: 'currency', color: 'text-green-600' },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-elegant">
                  <div className="w-10 h-10 rounded-full bg-spa-purple/10 flex items-center justify-center mb-4">
                    <stat.icon size={20} className="text-spa-purple" />
                  </div>
                  <p className="text-spa-gray text-sm">{stat.label}</p>
                  <p className={`font-serif text-3xl mt-1 ${stat.color || 'text-spa-charcoal'}`}>
                    {stat.raw ? stat.value : formatCurrency(stat.value as number)}
                  </p>
                </div>
              ))}
            </div>

            {/* Referral Table */}
            <div className="bg-white rounded-2xl shadow-elegant overflow-hidden">
              <div className="px-8 py-6 border-b border-spa-light flex items-center justify-between">
                <h2 className="font-serif text-2xl text-spa-charcoal">Vendor Referral History</h2>
                <span className="text-spa-gray text-sm">{referrals.length} referrals</span>
              </div>
              {referrals.length === 0 ? (
                <div className="px-8 py-16 text-center">
                  <Store size={40} className="text-spa-purple/30 mx-auto mb-4" />
                  <p className="text-spa-gray">No vendor referrals yet — share your link to get started!</p>
                  <button onClick={copyReferralLink} className="btn-primary mt-6 mx-auto inline-flex">
                    <Copy size={16} /> Copy Your Link
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-spa-cream">
                      <tr>
                        {['Vendor', 'Tier', 'Type', 'Sale', 'Commission', 'Status', 'Date'].map(h => (
                          <th key={h} className="px-6 py-3 text-left text-xs font-medium text-spa-gray uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-spa-light">
                      {referrals.map(ref => (
                        <tr key={ref.id} className="hover:bg-spa-cream/50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-spa-charcoal">{ref.vendor_name}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${tierColor(ref.tier)}`}>{ref.tier}</span>
                          </td>
                          <td className="px-6 py-4 text-sm text-spa-gray capitalize">{ref.subscription_type}</td>
                          <td className="px-6 py-4 text-sm text-spa-charcoal">{formatCurrency(ref.sale_amount)}</td>
                          <td className="px-6 py-4 text-sm font-medium text-spa-purple">{formatCurrency(ref.commission_amount)}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge(ref.status)}`}>{ref.status}</span>
                          </td>
                          <td className="px-6 py-4 text-sm text-spa-gray">{formatDate(ref.created_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── SUITE COMMISSIONS TAB ── */}
        {activeTab === 'suites' && (
          <>
            {/* Suite Stats */}
            <div className="grid sm:grid-cols-4 gap-6">
              {[
                { icon: Gift, label: 'Total Sales', value: suiteCommissions.length, raw: true },
                { icon: Clock, label: 'Pending', value: suitePending, format: 'currency', color: 'text-amber-600' },
                { icon: CheckCircle, label: 'Confirmed', value: suiteConfirmed, format: 'currency', color: 'text-blue-600' },
                { icon: DollarSign, label: 'Paid Out', value: suitePaid, format: 'currency', color: 'text-green-600' },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-elegant">
                  <div className="w-10 h-10 rounded-full bg-spa-pink/10 flex items-center justify-center mb-4">
                    <stat.icon size={20} className="text-spa-pink" />
                  </div>
                  <p className="text-spa-gray text-sm">{stat.label}</p>
                  <p className={`font-serif text-3xl mt-1 ${stat.color || 'text-spa-charcoal'}`}>
                    {stat.raw ? stat.value : formatCurrency(stat.value as number)}
                  </p>
                </div>
              ))}
            </div>

            {/* Info Banner */}
            <div className="bg-spa-blush border-2 border-spa-pink rounded-2xl p-6 flex gap-4 items-start">
              <Gift size={24} className="text-spa-pink flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-spa-charcoal mb-1">How Suite Commissions Work</p>
                <p className="text-spa-gray text-sm leading-relaxed">
                  You earn <strong>30% ($8.10)</strong> on every Celebration Suite™ sold through your referral link. 
                  These are tracked via Payhip and synced here monthly. Commissions are confirmed after 30 days 
                  and paid via Venmo, PayPal, or Zelle.
                </p>
              </div>
            </div>

            {/* Suite Commissions Table */}
            <div className="bg-white rounded-2xl shadow-elegant overflow-hidden">
              <div className="px-8 py-6 border-b border-spa-light flex items-center justify-between">
                <h2 className="font-serif text-2xl text-spa-charcoal">Suite Commission History</h2>
                <span className="text-spa-gray text-sm">{suiteCommissions.length} sales</span>
              </div>
              {suiteCommissions.length === 0 ? (
                <div className="px-8 py-16 text-center">
                  <Gift size={40} className="text-spa-pink/30 mx-auto mb-4" />
                  <p className="text-spa-gray mb-2">No suite commissions yet.</p>
                  <p className="text-spa-gray text-sm">Share your link with mamas and earn 30% on every suite sale!</p>
                  <a
                    href="/suites"
                    target="_blank"
                    className="btn-primary mt-6 mx-auto inline-flex"
                  >
                    <ExternalLink size={16} /> Browse the Suites
                  </a>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-spa-cream">
                      <tr>
                        {['Suite Name', 'Sale Price', 'Commission (30%)', 'Status', 'Date', 'Order ID'].map(h => (
                          <th key={h} className="px-6 py-3 text-left text-xs font-medium text-spa-gray uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-spa-light">
                      {suiteCommissions.map(sc => (
                        <tr key={sc.id} className="hover:bg-spa-cream/50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-spa-charcoal">{sc.suite_name}</td>
                          <td className="px-6 py-4 text-sm text-spa-charcoal">{formatCurrency(sc.sale_amount)}</td>
                          <td className="px-6 py-4 text-sm font-medium text-spa-pink">{formatCurrency(sc.commission_amount)}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge(sc.status)}`}>{sc.status}</span>
                          </td>
                          <td className="px-6 py-4 text-sm text-spa-gray">{formatDate(sc.created_at)}</td>
                          <td className="px-6 py-4 text-xs text-spa-gray font-mono">{sc.payhip_order_id || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── PAYOUTS TAB ── */}
        {activeTab === 'payouts' && (
          <>
            {/* Ready to request banner */}
            {((stats?.confirmed_earnings || 0) + suiteConfirmed) > 0 && (
              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <DollarSign size={24} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-spa-charcoal">You have earnings ready to request!</p>
                    <p className="text-spa-gray text-sm">
                      Vendor: {formatCurrency(stats?.confirmed_earnings || 0)} · Suites: {formatCurrency(suiteConfirmed)}
                      {' · '}Total: <strong className="text-green-600">{formatCurrency((stats?.confirmed_earnings || 0) + suiteConfirmed)}</strong>
                    </p>
                  </div>
                </div>
                <a
                  href="mailto:hello@spa-pregio.com?subject=Payout Request - Suite Sisters™&body=Hi Angie! I'd like to request my payout. My referral code is: "
                  className="flex-shrink-0 flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Request Payout <ArrowRight size={14} />
                </a>
              </div>
            )}

            {/* Payout info cards */}
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { label: 'Total Pending (All)', value: (stats?.pending_earnings || 0) + suitePending, sublabel: 'Within 30-day hold', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
                { label: 'Ready to Request (All)', value: (stats?.confirmed_earnings || 0) + suiteConfirmed, sublabel: 'Confirmed earnings', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
                { label: 'Total Paid Out', value: (stats?.total_paid || 0) + suitePaid, sublabel: 'All time', color: 'text-green-600', bg: 'bg-green-50 border-green-200' },
              ].map((item, i) => (
                <div key={i} className={`${item.bg} border-2 rounded-2xl p-6`}>
                  <p className="font-medium text-spa-charcoal">{item.label}</p>
                  <p className="text-xs text-spa-gray mb-3">{item.sublabel}</p>
                  <p className={`font-serif text-3xl ${item.color}`}>{formatCurrency(item.value)}</p>
                </div>
              ))}
            </div>

            {/* Payment methods on file */}
            {(affiliate?.paypal_email || affiliate?.venmo_handle || affiliate?.zelle_info) && (
              <div className="bg-white rounded-2xl p-6 shadow-elegant">
                <h3 className="font-serif text-xl text-spa-charcoal mb-4">Payment Methods on File</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {affiliate.paypal_email && (
                    <div className="bg-spa-cream rounded-xl p-4">
                      <p className="text-xs text-spa-gray mb-1">PayPal</p>
                      <p className="text-spa-charcoal text-sm">{affiliate.paypal_email}</p>
                    </div>
                  )}
                  {affiliate.venmo_handle && (
                    <div className="bg-spa-cream rounded-xl p-4">
                      <p className="text-xs text-spa-gray mb-1">Venmo</p>
                      <p className="text-spa-charcoal text-sm">{affiliate.venmo_handle}</p>
                    </div>
                  )}
                  {affiliate.zelle_info && (
                    <div className="bg-spa-cream rounded-xl p-4">
                      <p className="text-xs text-spa-gray mb-1">Zelle</p>
                      <p className="text-spa-charcoal text-sm">{affiliate.zelle_info}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Payout History */}
            <div className="bg-white rounded-2xl shadow-elegant overflow-hidden">
              <div className="px-8 py-6 border-b border-spa-light">
                <h2 className="font-serif text-2xl text-spa-charcoal">Payout History</h2>
              </div>
              {payouts.length === 0 ? (
                <div className="px-8 py-12 text-center">
                  <DollarSign size={40} className="text-spa-purple/30 mx-auto mb-4" />
                  <p className="text-spa-gray">No payouts yet — earnings are paid once confirmed.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-spa-cream">
                      <tr>
                        {['Amount', 'Method', 'Date', 'Notes'].map(h => (
                          <th key={h} className="px-6 py-3 text-left text-xs font-medium text-spa-gray uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-spa-light">
                      {payouts.map(payout => (
                        <tr key={payout.id} className="hover:bg-spa-cream/50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-green-600">{formatCurrency(payout.amount)}</td>
                          <td className="px-6 py-4 text-sm text-spa-charcoal capitalize">{payout.payment_method || '—'}</td>
                          <td className="px-6 py-4 text-sm text-spa-gray">{formatDate(payout.paid_at)}</td>
                          <td className="px-6 py-4 text-sm text-spa-gray">{payout.notes || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
