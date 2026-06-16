import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
  Users, DollarSign, CheckCircle, Clock, X, Check,
  ChevronDown, ChevronUp, ArrowRight, Gift, Store, Plus, MapPin, Phone, Globe, Lock
} from 'lucide-react';

type Affiliate = {
  id: string;
  full_name: string;
  email: string;
  referral_code: string;
  status: string;
  paypal_email: string | null;
  venmo_handle: string | null;
  zelle_info: string | null;
  commission_rate_monthly: number;
  commission_rate_lifetime: number;
  created_at: string;
};

type AffiliateStats = {
  affiliate_id: string;
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
  affiliate_id: string;
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
  affiliate_id: string;
  suite_name: string;
  sale_amount: number;
  commission_amount: number;
  status: string;
  created_at: string;
  payhip_order_id?: string;
};

type VendorListing = {
  id: string;
  user_id: string | null;
  business_name: string;
  category: string | null;
  description: string | null;
  location: string | null;
  phone: string | null;
  website: string | null;
  instagram: string | null;
  facebook: string | null;
  tiktok: string | null;
  business_type: string | null;
  service_area: string | null;
  ideal_client: string | null;
  current_reach: string | null;
  motivation: string | null;
  subscription_type: string | null;
  founding_member: boolean;
  status: string;
  email: string | null;
  created_at: string;
};

type AdminTab = 'sisters' | 'vendors';
type SisterTab = 'pending' | 'active' | 'all';
type VendorTab = 'pending' | 'active' | 'all';

const ADMIN_PASSWORD = (import.meta as any).env?.VITE_ADMIN_PASSWORD || 'spa-admin-2024';

export default function AdminAffiliates() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
      setPasswordInput('');
    }
  };

  if (!authenticated) {
    return (
      <div className="w-full pt-20 min-h-screen bg-spa-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-elegant p-10 max-w-sm w-full text-center">
          <div className="w-16 h-16 rounded-full bg-spa-purple/10 flex items-center justify-center mx-auto mb-6">
            <Lock size={28} className="text-spa-purple" />
          </div>
          <h1 className="font-serif text-2xl text-spa-charcoal mb-2">Admin Access</h1>
          <p className="text-spa-gray text-sm mb-8">Enter your admin password to continue.</p>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              value={passwordInput}
              onChange={e => setPasswordInput(e.target.value)}
              placeholder="Admin password"
              autoFocus
              className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30 text-center tracking-widest"
            />
            {passwordError && (
              <p className="text-red-500 text-sm">Incorrect password. Try again.</p>
            )}
            <button type="submit" className="btn-primary w-full justify-center">
              Enter Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}

function AdminDashboard() {
  const [adminTab, setAdminTab] = useState<AdminTab>('sisters');
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [stats, setStats] = useState<Record<string, AffiliateStats>>({});
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [suiteCommissions, setSuiteCommissions] = useState<SuiteCommission[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [sisterTab, setSisterTab] = useState<SisterTab>('pending');
  const [payoutModal, setPayoutModal] = useState<Affiliate | null>(null);
  const [addReferralModal, setAddReferralModal] = useState<Affiliate | null>(null);
  const [addSuiteModal, setAddSuiteModal] = useState<Affiliate | null>(null);
  const [payoutForm, setPayoutForm] = useState({ amount: '', method: 'venmo', reference: '', notes: '' });
  const [referralForm, setReferralForm] = useState({ vendor_name: '', tier: 'Starter', subscription_type: 'monthly', sale_amount: '29' });
  const [suiteForm, setSuiteForm] = useState({ suite_name: 'Baby Shower Suite™', sale_amount: '27', payhip_order_id: '' });
  const [vendors, setVendors] = useState<VendorListing[]>([]);
  const [vendorTab, setVendorTab] = useState<VendorTab>('pending');
  const [vendorExpanded, setVendorExpanded] = useState<string | null>(null);
  const [denyModal, setDenyModal] = useState<VendorListing | null>(null);
  const [denyReason, setDenyReason] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadAll(); }, []);

  async function loadAll() {
    setLoading(true);
    const { data: affs } = await supabase.from('affiliates').select('*').order('created_at', { ascending: false });
    if (affs) setAffiliates(affs);
    const { data: statsData } = await supabase.from('affiliate_stats').select('*');
    if (statsData) {
      const map: Record<string, AffiliateStats> = {};
      statsData.forEach((s: AffiliateStats) => { map[s.affiliate_id] = s; });
      setStats(map);
    }
    const { data: refs } = await supabase.from('affiliate_referrals').select('*').order('created_at', { ascending: false });
    if (refs) setReferrals(refs);
    const { data: suites } = await supabase.from('affiliate_suite_commissions').select('*').order('created_at', { ascending: false });
    if (suites) setSuiteCommissions(suites);
    const { data: vends } = await supabase.from('vendors').select('*').order('created_at', { ascending: false });
    if (vends) setVendors(vends);
    setLoading(false);
  }

  async function updateSisterStatus(id: string, status: string) {
    await supabase.from('affiliates').update({ status }).eq('id', id);
    loadAll();
  }

  async function confirmReferral(id: string) {
    await supabase.from('affiliate_referrals').update({ status: 'confirmed', confirmed_at: new Date().toISOString() }).eq('id', id);
    loadAll();
  }

  async function confirmSuiteCommission(id: string) {
    await supabase.from('affiliate_suite_commissions').update({ status: 'confirmed', confirmed_at: new Date().toISOString() }).eq('id', id);
    loadAll();
  }

  async function handlePayout() {
    if (!payoutModal) return;
    setSaving(true);
    const confirmedRefs = referrals.filter(r => r.affiliate_id === payoutModal.id && r.status === 'confirmed');
    const confirmedSuites = suiteCommissions.filter(s => s.affiliate_id === payoutModal.id && s.status === 'confirmed');
    const { data: payout } = await supabase.from('affiliate_payouts').insert({
      affiliate_id: payoutModal.id,
      amount: parseFloat(payoutForm.amount),
      payment_method: payoutForm.method,
      payment_reference: payoutForm.reference || null,
      notes: payoutForm.notes || null,
    }).select().single();
    if (payout) {
      if (confirmedRefs.length > 0) {
        await supabase.from('affiliate_payout_referrals').insert(confirmedRefs.map(r => ({ payout_id: payout.id, referral_id: r.id })));
        await supabase.from('affiliate_referrals').update({ status: 'paid', paid_at: new Date().toISOString() }).in('id', confirmedRefs.map(r => r.id));
      }
      if (confirmedSuites.length > 0) {
        await supabase.from('affiliate_suite_commissions').update({ status: 'paid', paid_at: new Date().toISOString() }).in('id', confirmedSuites.map(s => s.id));
      }
    }
    setSaving(false);
    setPayoutModal(null);
    setPayoutForm({ amount: '', method: 'venmo', reference: '', notes: '' });
    loadAll();
  }

  async function handleAddReferral() {
    if (!addReferralModal) return;
    setSaving(true);
    const saleAmount = parseFloat(referralForm.sale_amount);
    const isLifetime = referralForm.subscription_type === 'lifetime';
    const rate = isLifetime ? addReferralModal.commission_rate_lifetime : addReferralModal.commission_rate_monthly;
    await supabase.from('affiliate_referrals').insert({
      affiliate_id: addReferralModal.id,
      vendor_name: referralForm.vendor_name,
      tier: referralForm.tier,
      subscription_type: referralForm.subscription_type,
      sale_amount: saleAmount,
      commission_amount: saleAmount * rate,
      status: 'pending',
    });
    setSaving(false);
    setAddReferralModal(null);
    setReferralForm({ vendor_name: '', tier: 'Starter', subscription_type: 'monthly', sale_amount: '29' });
    loadAll();
  }

  async function handleAddSuiteCommission() {
    if (!addSuiteModal) return;
    setSaving(true);
    const saleAmount = parseFloat(suiteForm.sale_amount);
    await supabase.from('affiliate_suite_commissions').insert({
      affiliate_id: addSuiteModal.id,
      suite_name: suiteForm.suite_name,
      sale_amount: saleAmount,
      commission_amount: saleAmount * 0.30,
      commission_rate: 0.30,
      status: 'pending',
      payhip_order_id: suiteForm.payhip_order_id || null,
    });
    setSaving(false);
    setAddSuiteModal(null);
    setSuiteForm({ suite_name: 'Baby Shower Suite™', sale_amount: '27', payhip_order_id: '' });
    loadAll();
  }

  async function approveVendor(id: string) {
    await supabase.from('vendors').update({ status: 'active' }).eq('id', id);
    loadAll();
  }

  async function denyVendor(id: string) {
    await supabase.from('vendors').update({ status: 'denied' }).eq('id', id);
    setDenyModal(null);
    setDenyReason('');
    loadAll();
  }

  async function removeVendor(id: string) {
    await supabase.from('vendors').update({ status: 'removed' }).eq('id', id);
    loadAll();
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function statusBadge(status: string) {
    if (status === 'paid' || status === 'active') return 'bg-green-100 text-green-700';
    if (status === 'confirmed') return 'bg-blue-100 text-blue-700';
    if (status === 'denied' || status === 'removed' || status === 'paused') return 'bg-red-100 text-red-700';
    return 'bg-amber-100 text-amber-700';
  }

  function friendlyBusinessType(val: string | null) {
    if (!val) return '—';
    const map: Record<string, string> = {
      spa_wellness: 'Spa, Wellness & Beauty', photography: 'Photography / Videography',
      baby_products: 'Baby & Maternity Products', food_nutrition: 'Food, Meal Prep & Nutrition',
      events_gifting: 'Event Planning & Gifting', other: 'Other Family Services',
    };
    return map[val] || val;
  }

  function friendlyServiceArea(val: string | null) {
    if (!val) return '—';
    return { local: 'Local / In-person', online: 'Online / Virtual', both: 'Both' }[val] || val;
  }

  function friendlyIdealClient(val: string | null) {
    if (!val) return '—';
    const map: Record<string, string> = {
      expecting: 'Expecting Mothers', postpartum: 'New Moms (Postpartum)',
      families: 'Families with Young Children', all: 'All of the Above',
    };
    return map[val] || val;
  }

  function friendlyMotivation(val: string | null) {
    if (!val) return '—';
    const map: Record<string, string> = {
      visibility: 'More Visibility', referrals: 'Trusted Referral Network',
      giving_back: 'Give Back to Mothers', all: 'All of the Above',
    };
    return map[val] || val;
  }

  const pendingSisters = affiliates.filter(a => a.status === 'pending');
  const activeSisters = affiliates.filter(a => a.status === 'active');
  const filteredSisters = sisterTab === 'pending' ? pendingSisters : sisterTab === 'active' ? activeSisters : affiliates;
  const pendingVendors = vendors.filter(v => ['pending', 'pending_signup', 'pending_review'].includes(v.status));
  const activeVendors = vendors.filter(v => v.status === 'active');
  const filteredVendors = vendorTab === 'pending' ? pendingVendors : vendorTab === 'active' ? activeVendors : vendors;
  const totalPending = Object.values(stats).reduce((sum, s) => sum + (s.pending_earnings || 0), 0);
  const totalConfirmed = Object.values(stats).reduce((sum, s) => sum + (s.confirmed_earnings || 0), 0);
  const totalPaid = Object.values(stats).reduce((sum, s) => sum + (s.total_paid || 0), 0);
  const suitePendingTotal = suiteCommissions.filter(s => s.status === 'pending').reduce((sum, s) => sum + s.commission_amount, 0);
  const suiteConfirmedTotal = suiteCommissions.filter(s => s.status === 'confirmed').reduce((sum, s) => sum + s.commission_amount, 0);

  if (loading) {
    return (
      <div className="w-full pt-20 min-h-screen bg-spa-cream flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-spa-purple/30 border-t-spa-purple rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full pt-20 min-h-screen bg-spa-cream">
      <section className="w-full py-12 bg-spa-charcoal">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="text-spa-pink text-sm uppercase tracking-[0.15em]">Admin</span>
          <h1 className="font-serif text-3xl text-white mt-2">Platform Management</h1>
          <p className="text-white/50 text-sm mt-1">Vendors · Suite Sisters · Commissions · Payouts</p>
        </div>
      </section>

      <div className="w-full bg-white border-b border-spa-light sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex gap-1">
            {([['sisters', `Suite Sisters (${affiliates.length})`], ['vendors', `Vendor Applications (${vendors.length})`]] as [AdminTab, string][]).map(([id, label]) => (
              <button key={id} onClick={() => setAdminTab(id)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${adminTab === id ? 'border-spa-purple text-spa-purple' : 'border-transparent text-spa-gray hover:text-spa-charcoal'}`}>
                {label}
                {id === 'sisters' && pendingSisters.length > 0 && <span className="ml-2 px-1.5 py-0.5 bg-amber-400 text-white text-xs rounded-full">{pendingSisters.length}</span>}
                {id === 'vendors' && pendingVendors.length > 0 && <span className="ml-2 px-1.5 py-0.5 bg-amber-400 text-white text-xs rounded-full">{pendingVendors.length}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-10">

        {adminTab === 'vendors' && (
          <>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { label: 'Total Applications', value: vendors.length, sub: 'All time', icon: Store },
                { label: 'Pending Review', value: pendingVendors.length, sub: 'Need approval', icon: Clock },
                { label: 'Active Listings', value: activeVendors.length, sub: 'Live on site', icon: CheckCircle },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-elegant">
                  <div className="w-10 h-10 rounded-full bg-spa-purple/10 flex items-center justify-center mb-4"><s.icon size={20} className="text-spa-purple" /></div>
                  <p className="text-spa-gray text-sm">{s.label}</p>
                  <p className="font-serif text-3xl text-spa-charcoal mt-1">{s.value}</p>
                  <p className="text-xs text-spa-gray mt-1">{s.sub}</p>
                </div>
              ))}
            </div>

            {pendingVendors.length > 0 && (
              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0"><Clock size={20} className="text-amber-600" /></div>
                <div className="flex-1">
                  <p className="font-medium text-spa-charcoal">{pendingVendors.length} vendor application{pendingVendors.length > 1 ? 's' : ''} waiting for approval</p>
                  <p className="text-sm text-spa-gray">{pendingVendors.map(v => v.business_name).join(', ')}</p>
                </div>
                <button onClick={() => setVendorTab('pending')} className="flex-shrink-0 flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-700 transition-colors">Review Now <ArrowRight size={14} /></button>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-elegant overflow-hidden">
              <div className="px-8 py-5 border-b border-spa-light flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="font-serif text-2xl text-spa-charcoal">Vendor Applications</h2>
                <div className="flex gap-1 bg-spa-cream rounded-full p-1">
                  {([['pending', `Pending (${pendingVendors.length})`], ['active', `Active (${activeVendors.length})`], ['all', `All (${vendors.length})`]] as [VendorTab, string][]).map(([id, label]) => (
                    <button key={id} onClick={() => setVendorTab(id)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${vendorTab === id ? 'bg-spa-purple text-white' : 'text-spa-gray hover:text-spa-charcoal'}`}>{label}</button>
                  ))}
                </div>
              </div>
              {filteredVendors.length === 0 ? (
                <div className="px-8 py-16 text-center"><Store size={40} className="text-spa-purple/30 mx-auto mb-4" /><p className="text-spa-gray">{vendorTab === 'pending' ? 'No pending applications — all caught up.' : 'No vendor applications yet.'}</p></div>
              ) : (
                <div className="divide-y divide-spa-light">
                  {filteredVendors.map(vendor => {
                    const isExpanded = vendorExpanded === vendor.id;
                    return (
                      <div key={vendor.id}>
                        <div className="px-8 py-5 flex flex-col sm:flex-row sm:items-center gap-4 cursor-pointer hover:bg-spa-cream/50 transition-colors" onClick={() => setVendorExpanded(isExpanded ? null : vendor.id)}>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 flex-wrap">
                              <p className="font-medium text-spa-charcoal">{vendor.business_name}</p>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge(vendor.status)}`}>{vendor.status}</span>
                              {['pending', 'pending_signup', 'pending_review'].includes(vendor.status) && <span className="text-xs text-amber-600 font-medium animate-pulse">Needs approval</span>}
                            </div>
                            <p className="text-sm text-spa-gray mt-0.5">{friendlyBusinessType(vendor.business_type)} · {vendor.location || '—'} · {formatDate(vendor.created_at)}</p>
                          </div>
                          {isExpanded ? <ChevronUp size={18} className="text-spa-gray flex-shrink-0" /> : <ChevronDown size={18} className="text-spa-gray flex-shrink-0" />}
                        </div>
                        {isExpanded && (
                          <div className="bg-spa-cream/50 px-8 py-6 border-t border-spa-light space-y-5">
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                              <div className="bg-white rounded-xl p-4"><p className="text-spa-gray text-xs mb-1">Business Name</p><p className="font-medium text-spa-charcoal">{vendor.business_name}</p></div>
                              <div className="bg-white rounded-xl p-4"><p className="text-spa-gray text-xs mb-1">Business Type</p><p className="font-medium text-spa-charcoal">{friendlyBusinessType(vendor.business_type)}</p></div>
                              <div className="bg-white rounded-xl p-4"><p className="text-spa-gray text-xs mb-1">Location</p><p className="font-medium text-spa-charcoal flex items-center gap-1"><MapPin size={13} className="text-spa-purple" />{vendor.location || '—'}</p></div>
                              <div className="bg-white rounded-xl p-4"><p className="text-spa-gray text-xs mb-1">Service Area</p><p className="font-medium text-spa-charcoal">{friendlyServiceArea(vendor.service_area)}</p></div>
                              <div className="bg-white rounded-xl p-4"><p className="text-spa-gray text-xs mb-1">Ideal Client</p><p className="font-medium text-spa-charcoal">{friendlyIdealClient(vendor.ideal_client)}</p></div>
                              <div className="bg-white rounded-xl p-4"><p className="text-spa-gray text-xs mb-1">Motivation</p><p className="font-medium text-spa-charcoal">{friendlyMotivation(vendor.motivation)}</p></div>
                              <div className="bg-white rounded-xl p-4"><p className="text-spa-gray text-xs mb-1">Email</p><p className="font-medium text-spa-charcoal">{vendor.email || '—'}</p></div>
                              {vendor.phone && <div className="bg-white rounded-xl p-4"><p className="text-spa-gray text-xs mb-1">Phone</p><p className="font-medium text-spa-charcoal flex items-center gap-1"><Phone size={13} className="text-spa-purple" />{vendor.phone}</p></div>}
                              {vendor.website && <div className="bg-white rounded-xl p-4"><p className="text-spa-gray text-xs mb-1">Website</p><a href={vendor.website} target="_blank" rel="noopener noreferrer" className="font-medium text-spa-purple flex items-center gap-1 hover:underline"><Globe size={13} />{vendor.website}</a></div>}
                              {vendor.instagram && <div className="bg-white rounded-xl p-4"><p className="text-spa-gray text-xs mb-1">Instagram</p><p className="font-medium text-spa-charcoal">{vendor.instagram}</p></div>}
                            </div>
                            <div className="flex flex-wrap gap-3">
                              {['pending', 'pending_signup', 'pending_review'].includes(vendor.status) && (
                                <>
                                  <button onClick={() => approveVendor(vendor.id)} className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors shadow-sm"><Check size={15} /> Approve Listing</button>
                                  <button onClick={() => setDenyModal(vendor)} className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 transition-colors"><X size={15} /> Deny</button>
                                </>
                              )}
                              {vendor.status === 'active' && <button onClick={() => removeVendor(vendor.id)} className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 transition-colors"><X size={14} /> Remove Listing</button>}
                              {['denied', 'removed'].includes(vendor.status) && <button onClick={() => approveVendor(vendor.id)} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors"><Check size={14} /> Reactivate</button>}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}

        {adminTab === 'sisters' && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Users, label: 'Total Sisters', value: affiliates.length, sub: `${pendingSisters.length} pending approval` },
                { icon: Clock, label: 'Pending Earnings', value: formatCurrency(totalPending + suitePendingTotal), sub: 'Vendor + Suite' },
                { icon: CheckCircle, label: 'Confirmed Owed', value: formatCurrency(totalConfirmed + suiteConfirmedTotal), sub: 'Ready to pay out' },
                { icon: DollarSign, label: 'Total Paid Out', value: formatCurrency(totalPaid), sub: 'All time' },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-elegant">
                  <div className="w-10 h-10 rounded-full bg-spa-purple/10 flex items-center justify-center mb-4"><s.icon size={20} className="text-spa-purple" /></div>
                  <p className="text-spa-gray text-sm">{s.label}</p>
                  <p className="font-serif text-3xl text-spa-charcoal mt-1">{s.value}</p>
                  <p className="text-xs text-spa-gray mt-1">{s.sub}</p>
                </div>
              ))}
            </div>

            {pendingSisters.length > 0 && (
              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0"><Clock size={20} className="text-amber-600" /></div>
                <div className="flex-1">
                  <p className="font-medium text-spa-charcoal">{pendingSisters.length} application{pendingSisters.length > 1 ? 's' : ''} waiting for your approval</p>
                  <p className="text-sm text-spa-gray">{pendingSisters.map(p => p.full_name).join(', ')}</p>
                </div>
                <button onClick={() => setSisterTab('pending')} className="flex-shrink-0 flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-700 transition-colors">Review Now <ArrowRight size={14} /></button>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-elegant overflow-hidden">
              <div className="px-8 py-5 border-b border-spa-light flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="font-serif text-2xl text-spa-charcoal">Sisters</h2>
                <div className="flex gap-1 bg-spa-cream rounded-full p-1">
                  {([['pending', `Pending (${pendingSisters.length})`], ['active', `Active (${activeSisters.length})`], ['all', `All (${affiliates.length})`]] as [SisterTab, string][]).map(([id, label]) => (
                    <button key={id} onClick={() => setSisterTab(id)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${sisterTab === id ? 'bg-spa-purple text-white' : 'text-spa-gray hover:text-spa-charcoal'}`}>{label}</button>
                  ))}
                </div>
              </div>
              {filteredSisters.length === 0 ? (
                <div className="px-8 py-16 text-center"><Users size={40} className="text-spa-purple/30 mx-auto mb-4" /><p className="text-spa-gray">{sisterTab === 'pending' ? 'No pending applications.' : 'No Suite Sisters yet.'}</p></div>
              ) : (
                <div className="divide-y divide-spa-light">
                  {filteredSisters.map((aff) => {
                    const s = stats[aff.id];
                    const affRefs = referrals.filter(r => r.affiliate_id === aff.id);
                    const affSuites = suiteCommissions.filter(sc => sc.affiliate_id === aff.id);
                    const confirmedTotal = (s?.confirmed_earnings || 0) + affSuites.filter(sc => sc.status === 'confirmed').reduce((sum, sc) => sum + sc.commission_amount, 0);
                    const isExpanded = expanded === aff.id;
                    return (
                      <div key={aff.id}>
                        <div className="px-8 py-5 flex flex-col sm:flex-row sm:items-center gap-4 cursor-pointer hover:bg-spa-cream/50 transition-colors" onClick={() => setExpanded(isExpanded ? null : aff.id)}>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 flex-wrap">
                              <p className="font-medium text-spa-charcoal">{aff.full_name}</p>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge(aff.status)}`}>{aff.status}</span>
                              {aff.status === 'pending' && <span className="text-xs text-amber-600 font-medium animate-pulse">Needs approval</span>}
                            </div>
                            <p className="text-sm text-spa-gray mt-0.5">{aff.email} · <span className="font-mono text-spa-purple">{aff.referral_code}</span> · {formatDate(aff.created_at)}</p>
                          </div>
                          <div className="flex items-center gap-6 text-sm">
                            <div className="text-center"><p className="text-spa-gray text-xs">Vendors</p><p className="font-medium text-spa-charcoal">{s?.total_conversions || 0}</p></div>
                            <div className="text-center"><p className="text-spa-gray text-xs">Suites</p><p className="font-medium text-spa-charcoal">{affSuites.length}</p></div>
                            <div className="text-center"><p className="text-spa-gray text-xs">Owed</p><p className="font-medium text-spa-purple">{formatCurrency(confirmedTotal)}</p></div>
                            <div className="text-center"><p className="text-spa-gray text-xs">Paid</p><p className="font-medium text-green-600">{formatCurrency(s?.total_paid || 0)}</p></div>
                          </div>
                          {isExpanded ? <ChevronUp size={18} className="text-spa-gray" /> : <ChevronDown size={18} className="text-spa-gray" />}
                        </div>
                        {isExpanded && (
                          <div className="bg-spa-cream/50 px-8 py-6 border-t border-spa-light space-y-6">
                            <div className="flex flex-wrap gap-3">
                              {aff.status === 'pending' && (<><button onClick={() => updateSisterStatus(aff.id, 'active')} className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors shadow-sm"><Check size={15} /> Approve Sister</button><button onClick={() => updateSisterStatus(aff.id, 'denied')} className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 transition-colors"><X size={15} /> Deny</button></>)}
                              {aff.status === 'active' && <button onClick={() => updateSisterStatus(aff.id, 'paused')} className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 transition-colors"><X size={14} /> Pause</button>}
                              {aff.status === 'paused' && <button onClick={() => updateSisterStatus(aff.id, 'active')} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors"><Check size={14} /> Reactivate</button>}
                              <button onClick={() => setAddReferralModal(aff)} className="flex items-center gap-2 px-4 py-2 bg-spa-purple text-white rounded-full text-sm font-medium hover:bg-spa-purple/90 transition-colors"><Plus size={14} /> Add Vendor Referral</button>
                              <button onClick={() => setAddSuiteModal(aff)} className="flex items-center gap-2 px-4 py-2 bg-spa-pink text-white rounded-full text-sm font-medium hover:bg-spa-pink/90 transition-colors"><Plus size={14} /> Add Suite Commission</button>
                              {confirmedTotal > 0 && <button onClick={() => { setPayoutModal(aff); setPayoutForm({ ...payoutForm, amount: String(confirmedTotal.toFixed(2)) }); }} className="flex items-center gap-2 px-4 py-2 bg-spa-charcoal text-white rounded-full text-sm font-medium hover:bg-spa-charcoal/90 transition-colors"><DollarSign size={14} /> Record Payout ({formatCurrency(confirmedTotal)})</button>}
                            </div>
                            {(aff.paypal_email || aff.venmo_handle || aff.zelle_info) && (
                              <div className="grid sm:grid-cols-3 gap-3 text-sm">
                                {aff.paypal_email && <div className="bg-white rounded-xl p-4"><p className="text-spa-gray text-xs mb-1">PayPal</p><p className="text-spa-charcoal">{aff.paypal_email}</p></div>}
                                {aff.venmo_handle && <div className="bg-white rounded-xl p-4"><p className="text-spa-gray text-xs mb-1">Venmo</p><p className="text-spa-charcoal">{aff.venmo_handle}</p></div>}
                                {aff.zelle_info && <div className="bg-white rounded-xl p-4"><p className="text-spa-gray text-xs mb-1">Zelle</p><p className="text-spa-charcoal">{aff.zelle_info}</p></div>}
                              </div>
                            )}
                            {affRefs.length > 0 && (
                              <div>
                                <div className="flex items-center gap-2 mb-3"><Store size={16} className="text-spa-purple" /><h4 className="font-medium text-spa-charcoal text-sm">Vendor Referrals ({affRefs.length})</h4></div>
                                <div className="bg-white rounded-xl overflow-hidden">
                                  <table className="w-full text-sm">
                                    <thead className="bg-spa-cream"><tr>{['Vendor', 'Tier', 'Type', 'Sale', 'Commission', 'Status', 'Date', ''].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-medium text-spa-gray uppercase tracking-wider">{h}</th>)}</tr></thead>
                                    <tbody className="divide-y divide-spa-light">
                                      {affRefs.map(ref => (
                                        <tr key={ref.id} className="hover:bg-spa-cream/50 transition-colors">
                                          <td className="px-4 py-3 font-medium text-spa-charcoal">{ref.vendor_name}</td>
                                          <td className="px-4 py-3 text-spa-gray">{ref.tier}</td>
                                          <td className="px-4 py-3 text-spa-gray capitalize">{ref.subscription_type}</td>
                                          <td className="px-4 py-3 text-spa-charcoal">{formatCurrency(ref.sale_amount)}</td>
                                          <td className="px-4 py-3 font-medium text-spa-purple">{formatCurrency(ref.commission_amount)}</td>
                                          <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge(ref.status)}`}>{ref.status}</span></td>
                                          <td className="px-4 py-3 text-spa-gray">{formatDate(ref.created_at)}</td>
                                          <td className="px-4 py-3">{ref.status === 'pending' && <button onClick={() => confirmReferral(ref.id)} className="text-xs text-blue-600 hover:underline font-medium">Confirm</button>}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}
                            {affSuites.length > 0 && (
                              <div>
                                <div className="flex items-center gap-2 mb-3"><Gift size={16} className="text-spa-pink" /><h4 className="font-medium text-spa-charcoal text-sm">Suite Commissions ({affSuites.length})</h4></div>
                                <div className="bg-white rounded-xl overflow-hidden">
                                  <table className="w-full text-sm">
                                    <thead className="bg-spa-cream"><tr>{['Suite', 'Sale', 'Commission', 'Status', 'Date', ''].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-medium text-spa-gray uppercase tracking-wider">{h}</th>)}</tr></thead>
                                    <tbody className="divide-y divide-spa-light">
                                      {affSuites.map(sc => (
                                        <tr key={sc.id} className="hover:bg-spa-cream/50 transition-colors">
                                          <td className="px-4 py-3 font-medium text-spa-charcoal">{sc.suite_name}</td>
                                          <td className="px-4 py-3 text-spa-charcoal">{formatCurrency(sc.sale_amount)}</td>
                                          <td className="px-4 py-3 font-medium text-spa-pink">{formatCurrency(sc.commission_amount)}</td>
                                          <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge(sc.status)}`}>{sc.status}</span></td>
                                          <td className="px-4 py-3 text-spa-gray">{formatDate(sc.created_at)}</td>
                                          <td className="px-4 py-3">{sc.status === 'pending' && <button onClick={() => confirmSuiteCommission(sc.id)} className="text-xs text-blue-600 hover:underline font-medium">Confirm</button>}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {denyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spa-charcoal/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-4"><h3 className="font-serif text-2xl text-spa-charcoal">Deny Application</h3><button onClick={() => setDenyModal(null)} className="w-8 h-8 rounded-full bg-spa-lavender flex items-center justify-center text-spa-gray hover:text-spa-charcoal"><X size={18} /></button></div>
            <p className="text-sm text-spa-gray mb-6">Denying <strong>{denyModal.business_name}</strong>.</p>
            <textarea rows={3} placeholder="Reason for denial (optional)" value={denyReason} onChange={e => setDenyReason(e.target.value)} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30 resize-none mb-6" />
            <div className="flex gap-3">
              <button onClick={() => setDenyModal(null)} className="flex-1 px-6 py-3 border border-spa-charcoal/20 rounded-full text-spa-charcoal hover:bg-spa-lavender transition-colors text-sm font-medium">Cancel</button>
              <button onClick={() => denyVendor(denyModal.id)} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 transition-colors"><X size={16} /> Deny Application</button>
            </div>
          </div>
        </div>
      )}

      {addReferralModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spa-charcoal/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-2"><h3 className="font-serif text-2xl text-spa-charcoal">Add Vendor Referral</h3><button onClick={() => setAddReferralModal(null)} className="w-8 h-8 rounded-full bg-spa-lavender flex items-center justify-center text-spa-gray hover:text-spa-charcoal"><X size={18} /></button></div>
            <p className="text-sm text-spa-gray mb-6">For <strong>{addReferralModal.full_name}</strong></p>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-spa-charcoal mb-2">Vendor Name *</label><input type="text" placeholder="Business name" value={referralForm.vendor_name} onChange={e => setReferralForm({ ...referralForm, vendor_name: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" /></div>
              <div><label className="block text-sm font-medium text-spa-charcoal mb-2">Tier</label><select value={referralForm.tier} onChange={e => setReferralForm({ ...referralForm, tier: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30">{['Starter', 'Professional', 'Enterprise'].map(t => <option key={t}>{t}</option>)}</select></div>
              <div><label className="block text-sm font-medium text-spa-charcoal mb-2">Type</label><select value={referralForm.subscription_type} onChange={e => setReferralForm({ ...referralForm, subscription_type: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"><option value="monthly">Monthly</option><option value="lifetime">Founding Lifetime</option></select></div>
              <div><label className="block text-sm font-medium text-spa-charcoal mb-2">Sale Amount ($)</label><input type="number" value={referralForm.sale_amount} onChange={e => setReferralForm({ ...referralForm, sale_amount: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" /></div>
              <div className="bg-spa-lavender rounded-xl p-4 text-sm"><p className="text-spa-gray">Commission ({referralForm.subscription_type === 'lifetime' ? '15%' : '10%'})</p><p className="font-serif text-2xl text-spa-purple mt-1">{formatCurrency(parseFloat(referralForm.sale_amount || '0') * (referralForm.subscription_type === 'lifetime' ? 0.15 : 0.10))}</p></div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setAddReferralModal(null)} className="flex-1 px-6 py-3 border border-spa-charcoal/20 rounded-full text-spa-charcoal hover:bg-spa-lavender transition-colors text-sm font-medium">Cancel</button>
              <button onClick={handleAddReferral} disabled={!referralForm.vendor_name || saving} className="flex-1 btn-primary justify-center disabled:opacity-50">{saving ? 'Saving...' : 'Add Referral'} <ArrowRight size={16} /></button>
            </div>
          </div>
        </div>
      )}

      {addSuiteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spa-charcoal/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-2"><h3 className="font-serif text-2xl text-spa-charcoal">Add Suite Commission</h3><button onClick={() => setAddSuiteModal(null)} className="w-8 h-8 rounded-full bg-spa-lavender flex items-center justify-center text-spa-gray hover:text-spa-charcoal"><X size={18} /></button></div>
            <p className="text-sm text-spa-gray mb-6">For <strong>{addSuiteModal.full_name}</strong> · 30% commission</p>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-spa-charcoal mb-2">Suite Name *</label><select value={suiteForm.suite_name} onChange={e => setSuiteForm({ ...suiteForm, suite_name: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30">{['Baby Shower Suite™', 'Gender Reveal Suite™', 'Sip & See Suite™', 'Push Present & Pampering Suite™', 'Pregnancy Announcement Suite™', 'The Celebration Suite™ (Flagship)'].map(s => <option key={s}>{s}</option>)}</select></div>
              <div><label className="block text-sm font-medium text-spa-charcoal mb-2">Sale Amount ($)</label><input type="number" value={suiteForm.sale_amount} onChange={e => setSuiteForm({ ...suiteForm, sale_amount: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" /></div>
              <div><label className="block text-sm font-medium text-spa-charcoal mb-2">Payhip Order ID (optional)</label><input type="text" placeholder="From Payhip dashboard" value={suiteForm.payhip_order_id} onChange={e => setSuiteForm({ ...suiteForm, payhip_order_id: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" /></div>
              <div className="bg-spa-lavender rounded-xl p-4 text-sm"><p className="text-spa-gray">Commission (30%)</p><p className="font-serif text-2xl text-spa-pink mt-1">{formatCurrency(parseFloat(suiteForm.sale_amount || '0') * 0.30)}</p></div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setAddSuiteModal(null)} className="flex-1 px-6 py-3 border border-spa-charcoal/20 rounded-full text-spa-charcoal hover:bg-spa-lavender transition-colors text-sm font-medium">Cancel</button>
              <button onClick={handleAddSuiteCommission} disabled={!suiteForm.suite_name || saving} className="flex-1 btn-primary justify-center disabled:opacity-50">{saving ? 'Saving...' : 'Add Commission'} <ArrowRight size={16} /></button>
            </div>
          </div>
        </div>
      )}

      {payoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spa-charcoal/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-2"><h3 className="font-serif text-2xl text-spa-charcoal">Record Payout</h3><button onClick={() => setPayoutModal(null)} className="w-8 h-8 rounded-full bg-spa-lavender flex items-center justify-center text-spa-gray hover:text-spa-charcoal"><X size={18} /></button></div>
            <p className="text-sm text-spa-gray mb-6">For <strong>{payoutModal.full_name}</strong></p>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-spa-charcoal mb-2">Amount ($)</label><input type="number" value={payoutForm.amount} onChange={e => setPayoutForm({ ...payoutForm, amount: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" /></div>
              <div><label className="block text-sm font-medium text-spa-charcoal mb-2">Payment Method</label><select value={payoutForm.method} onChange={e => setPayoutForm({ ...payoutForm, method: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"><option value="venmo">Venmo</option><option value="paypal">PayPal</option><option value="zelle">Zelle</option></select></div>
              <div><label className="block text-sm font-medium text-spa-charcoal mb-2">Reference / Confirmation #</label><input type="text" placeholder="Optional" value={payoutForm.reference} onChange={e => setPayoutForm({ ...payoutForm, reference: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" /></div>
              <div><label className="block text-sm font-medium text-spa-charcoal mb-2">Notes</label><textarea rows={2} placeholder="Optional" value={payoutForm.notes} onChange={e => setPayoutForm({ ...payoutForm, notes: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30 resize-none" /></div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setPayoutModal(null)} className="flex-1 px-6 py-3 border border-spa-charcoal/20 rounded-full text-spa-charcoal hover:bg-spa-lavender transition-colors text-sm font-medium">Cancel</button>
              <button onClick={handlePayout} disabled={!payoutForm.amount || saving} className="flex-1 btn-primary justify-center disabled:opacity-50">{saving ? 'Saving...' : 'Record Payout'} <ArrowRight size={16} /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
