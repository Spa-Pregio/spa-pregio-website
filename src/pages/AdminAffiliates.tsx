import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
  Users, DollarSign, CheckCircle, Clock, X, Check,
  ChevronDown, ChevronUp, ArrowRight
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

export default function AdminAffiliates() {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [stats, setStats] = useState<Record<string, AffiliateStats>>({});
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [payoutModal, setPayoutModal] = useState<Affiliate | null>(null);
  const [addReferralModal, setAddReferralModal] = useState<Affiliate | null>(null);
  const [payoutForm, setPayoutForm] = useState({ amount: '', method: 'venmo', reference: '', notes: '' });
  const [referralForm, setReferralForm] = useState({
    vendor_name: '', tier: 'Starter', subscription_type: 'monthly', sale_amount: '29'
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadAll(); }, []);

  async function loadAll() {
    setLoading(true);

    const { data: affs } = await supabase
      .from('affiliates')
      .select('*')
      .order('created_at', { ascending: false });

    if (affs) setAffiliates(affs);

    const { data: statsData } = await supabase
      .from('affiliate_stats')
      .select('*');

    if (statsData) {
      const statsMap: Record<string, AffiliateStats> = {};
      statsData.forEach((s: AffiliateStats) => { statsMap[s.affiliate_id] = s; });
      setStats(statsMap);
    }

    const { data: refs } = await supabase
      .from('affiliate_referrals')
      .select('*')
      .order('created_at', { ascending: false });

    if (refs) setReferrals(refs);

    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from('affiliates').update({ status }).eq('id', id);
    loadAll();
  }

  async function confirmReferral(id: string) {
    await supabase
      .from('affiliate_referrals')
      .update({ status: 'confirmed', confirmed_at: new Date().toISOString() })
      .eq('id', id);
    loadAll();
  }

  async function handlePayout() {
    if (!payoutModal) return;
    setSaving(true);

    const confirmedRefs = referrals.filter(
      r => r.affiliate_id === payoutModal.id && r.status === 'confirmed'
    );

    const { data: payout } = await supabase
      .from('affiliate_payouts')
      .insert({
        affiliate_id: payoutModal.id,
        amount: parseFloat(payoutForm.amount),
        payment_method: payoutForm.method,
        payment_reference: payoutForm.reference || null,
        notes: payoutForm.notes || null,
      })
      .select()
      .single();

    if (payout && confirmedRefs.length > 0) {
      await supabase.from('affiliate_payout_referrals').insert(
        confirmedRefs.map(r => ({ payout_id: payout.id, referral_id: r.id }))
      );
      await supabase
        .from('affiliate_referrals')
        .update({ status: 'paid', paid_at: new Date().toISOString() })
        .in('id', confirmedRefs.map(r => r.id));
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
    const commissionRate = isLifetime
      ? addReferralModal.commission_rate_lifetime
      : addReferralModal.commission_rate_monthly;
    const commissionAmount = saleAmount * commissionRate;

    await supabase.from('affiliate_referrals').insert({
      affiliate_id: addReferralModal.id,
      vendor_name: referralForm.vendor_name,
      tier: referralForm.tier,
      subscription_type: referralForm.subscription_type,
      sale_amount: saleAmount,
      commission_amount: commissionAmount,
      status: 'pending',
    });

    setSaving(false);
    setAddReferralModal(null);
    setReferralForm({ vendor_name: '', tier: 'Starter', subscription_type: 'monthly', sale_amount: '29' });
    loadAll();
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  const totalPending = Object.values(stats).reduce((sum, s) => sum + (s.pending_earnings || 0), 0);
  const totalConfirmed = Object.values(stats).reduce((sum, s) => sum + (s.confirmed_earnings || 0), 0);
  const totalPaid = Object.values(stats).reduce((sum, s) => sum + (s.total_paid || 0), 0);

  if (loading) {
    return (
      <div className="w-full pt-20 min-h-screen bg-spa-cream flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-spa-purple/30 border-t-spa-purple rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full pt-20 min-h-screen bg-spa-cream">

      {/* Header */}
      <section className="w-full py-12 bg-spa-charcoal">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="text-spa-pink text-sm uppercase tracking-[0.15em]">Admin</span>
          <h1 className="font-serif text-3xl text-white mt-2">Suite Sisters™ Management</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-10">

        {/* Summary Stats */}
        <div className="grid sm:grid-cols-4 gap-6">
          {[
            { icon: Users, label: 'Total Sisters', value: affiliates.length, format: 'number' },
            { icon: Clock, label: 'Pending Earnings', value: totalPending, format: 'currency' },
            { icon: CheckCircle, label: 'Confirmed Owed', value: totalConfirmed, format: 'currency' },
            { icon: DollarSign, label: 'Total Paid Out', value: totalPaid, format: 'currency' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-elegant">
              <div className="w-10 h-10 rounded-full bg-spa-purple/10 flex items-center justify-center mb-4">
                <s.icon size={20} className="text-spa-purple" />
              </div>
              <p className="text-spa-gray text-sm">{s.label}</p>
              <p className="font-serif text-3xl text-spa-charcoal mt-1">
                {s.format === 'currency' ? formatCurrency(s.value as number) : s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Affiliates List */}
        <div className="bg-white rounded-2xl shadow-elegant overflow-hidden">
          <div className="px-8 py-6 border-b border-spa-light flex items-center justify-between">
            <h2 className="font-serif text-2xl text-spa-charcoal">Sisters</h2>
            <span className="text-spa-gray text-sm">{affiliates.length} total</span>
          </div>

          {affiliates.length === 0 ? (
            <div className="px-8 py-16 text-center">
              <Users size={40} className="text-spa-purple/30 mx-auto mb-4" />
              <p className="text-spa-gray">No Suite Sisters yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-spa-light">
              {affiliates.map((aff) => {
                const s = stats[aff.id];
                const affRefs = referrals.filter(r => r.affiliate_id === aff.id);
                const isExpanded = expanded === aff.id;

                return (
                  <div key={aff.id}>
                    {/* Sister Row */}
                    <div
                      className="px-8 py-5 flex flex-col sm:flex-row sm:items-center gap-4 cursor-pointer hover:bg-spa-cream/50 transition-colors"
                      onClick={() => setExpanded(isExpanded ? null : aff.id)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <p className="font-medium text-spa-charcoal">{aff.full_name}</p>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            aff.status === 'active' ? 'bg-green-100 text-green-700' :
                            aff.status === 'paused' ? 'bg-red-100 text-red-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>{aff.status}</span>
                        </div>
                        <p className="text-sm text-spa-gray mt-0.5">{aff.email} · code: <span className="font-mono text-spa-purple">{aff.referral_code}</span></p>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <p className="text-spa-gray text-xs">Clicks</p>
                          <p className="font-medium text-spa-charcoal">{s?.total_clicks || 0}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-spa-gray text-xs">Referred</p>
                          <p className="font-medium text-spa-charcoal">{s?.total_conversions || 0}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-spa-gray text-xs">Confirmed</p>
                          <p className="font-medium text-spa-purple">{formatCurrency(s?.confirmed_earnings || 0)}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-spa-gray text-xs">Paid</p>
                          <p className="font-medium text-green-600">{formatCurrency(s?.total_paid || 0)}</p>
                        </div>
                      </div>
                      {isExpanded ? <ChevronUp size={18} className="text-spa-gray" /> : <ChevronDown size={18} className="text-spa-gray" />}
                    </div>

                    {/* Expanded Detail */}
                    {isExpanded && (
                      <div className="bg-spa-cream/50 px-8 py-6 border-t border-spa-light space-y-6">

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3">
                          {aff.status === 'pending' && (
                            <button onClick={() => updateStatus(aff.id, 'active')} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors">
                              <Check size={14} /> Approve Sister
                            </button>
                          )}
                          {aff.status === 'active' && (
                            <button onClick={() => updateStatus(aff.id, 'paused')} className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 transition-colors">
                              <X size={14} /> Pause
                            </button>
                          )}
                          {aff.status === 'paused' && (
                            <button onClick={() => updateStatus(aff.id, 'active')} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors">
                              <Check size={14} /> Reactivate
                            </button>
                          )}
                          <button onClick={() => { setAddReferralModal(aff); }} className="flex items-center gap-2 px-4 py-2 bg-spa-purple text-white rounded-full text-sm font-medium hover:bg-spa-purple/90 transition-colors">
                            <ArrowRight size={14} /> Add Referral
                          </button>
                          {(s?.confirmed_earnings || 0) > 0 && (
                            <button onClick={() => { setPayoutModal(aff); setPayoutForm({ ...payoutForm, amount: String(s.confirmed_earnings) }); }} className="flex items-center gap-2 px-4 py-2 bg-spa-charcoal text-white rounded-full text-sm font-medium hover:bg-spa-charcoal/90 transition-colors">
                              <DollarSign size={14} /> Record Payout
                            </button>
                          )}
                        </div>

                        {/* Payout info */}
                        <div className="grid sm:grid-cols-3 gap-4 text-sm">
                          {aff.paypal_email && <div className="bg-white rounded-xl p-4"><p className="text-spa-gray text-xs mb-1">PayPal</p><p className="text-spa-charcoal">{aff.paypal_email}</p></div>}
                          {aff.venmo_handle && <div className="bg-white rounded-xl p-4"><p className="text-spa-gray text-xs mb-1">Venmo</p><p className="text-spa-charcoal">{aff.venmo_handle}</p></div>}
                          {aff.zelle_info && <div className="bg-white rounded-xl p-4"><p className="text-spa-gray text-xs mb-1">Zelle</p><p className="text-spa-charcoal">{aff.zelle_info}</p></div>}
                        </div>

                        {/* Referrals for this sister */}
                        {affRefs.length > 0 && (
                          <div className="bg-white rounded-xl overflow-hidden">
                            <table className="w-full text-sm">
                              <thead className="bg-spa-cream">
                                <tr>
                                  {['Vendor', 'Tier', 'Type', 'Sale', 'Commission', 'Status', 'Date', ''].map(h => (
                                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-spa-gray uppercase tracking-wider">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-spa-light">
                                {affRefs.map(ref => (
                                  <tr key={ref.id} className="hover:bg-spa-cream/50 transition-colors">
                                    <td className="px-4 py-3 font-medium text-spa-charcoal">{ref.vendor_name}</td>
                                    <td className="px-4 py-3 text-spa-gray">{ref.tier}</td>
                                    <td className="px-4 py-3 text-spa-gray capitalize">{ref.subscription_type}</td>
                                    <td className="px-4 py-3 text-spa-charcoal">{formatCurrency(ref.sale_amount)}</td>
                                    <td className="px-4 py-3 font-medium text-spa-purple">{formatCurrency(ref.commission_amount)}</td>
                                    <td className="px-4 py-3">
                                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        ref.status === 'paid' ? 'bg-green-100 text-green-700' :
                                        ref.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                                        'bg-amber-100 text-amber-700'
                                      }`}>{ref.status}</span>
                                    </td>
                                    <td className="px-4 py-3 text-spa-gray">{formatDate(ref.created_at)}</td>
                                    <td className="px-4 py-3">
                                      {ref.status === 'pending' && (
                                        <button onClick={() => confirmReferral(ref.id)} className="text-xs text-blue-600 hover:underline font-medium">Confirm</button>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
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
      </div>

      {/* Add Referral Modal */}
      {addReferralModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spa-charcoal/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-2xl text-spa-charcoal">Add Referral</h3>
              <button onClick={() => setAddReferralModal(null)} className="w-8 h-8 rounded-full bg-spa-lavender flex items-center justify-center text-spa-gray hover:text-spa-charcoal transition-colors">
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-spa-gray mb-6">Adding referral for <strong>{addReferralModal.full_name}</strong></p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-spa-charcoal mb-2">Vendor Name *</label>
                <input type="text" placeholder="Business name" value={referralForm.vendor_name} onChange={e => setReferralForm({ ...referralForm, vendor_name: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-spa-charcoal mb-2">Tier</label>
                <select value={referralForm.tier} onChange={e => setReferralForm({ ...referralForm, tier: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30">
                  {['Starter', 'Professional', 'Enterprise'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-spa-charcoal mb-2">Type</label>
                <select value={referralForm.subscription_type} onChange={e => setReferralForm({ ...referralForm, subscription_type: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30">
                  <option value="monthly">Monthly</option>
                  <option value="lifetime">Founding Lifetime</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-spa-charcoal mb-2">Sale Amount ($)</label>
                <input type="number" value={referralForm.sale_amount} onChange={e => setReferralForm({ ...referralForm, sale_amount: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
              </div>
              <div className="bg-spa-lavender rounded-xl p-4 text-sm">
                <p className="text-spa-gray">Commission ({referralForm.subscription_type === 'lifetime' ? '15%' : '10%'})</p>
                <p className="font-serif text-2xl text-spa-purple mt-1">
                  {formatCurrency(parseFloat(referralForm.sale_amount || '0') * (referralForm.subscription_type === 'lifetime' ? 0.15 : 0.10))}
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setAddReferralModal(null)} className="flex-1 px-6 py-3 border border-spa-charcoal/20 rounded-full text-spa-charcoal hover:bg-spa-lavender transition-colors text-sm font-medium">Cancel</button>
              <button onClick={handleAddReferral} disabled={!referralForm.vendor_name || saving} className="flex-1 btn-primary justify-center disabled:opacity-50">
                {saving ? 'Saving...' : 'Add Referral'} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payout Modal */}
      {payoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spa-charcoal/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-2xl text-spa-charcoal">Record Payout</h3>
              <button onClick={() => setPayoutModal(null)} className="w-8 h-8 rounded-full bg-spa-lavender flex items-center justify-center text-spa-gray hover:text-spa-charcoal transition-colors">
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-spa-gray mb-6">Recording payout for <strong>{payoutModal.full_name}</strong></p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-spa-charcoal mb-2">Amount ($)</label>
                <input type="number" value={payoutForm.amount} onChange={e => setPayoutForm({ ...payoutForm, amount: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-spa-charcoal mb-2">Payment Method</label>
                <select value={payoutForm.method} onChange={e => setPayoutForm({ ...payoutForm, method: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30">
                  <option value="venmo">Venmo</option>
                  <option value="paypal">PayPal</option>
                  <option value="zelle">Zelle</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-spa-charcoal mb-2">Reference / Confirmation #</label>
                <input type="text" placeholder="Optional" value={payoutForm.reference} onChange={e => setPayoutForm({ ...payoutForm, reference: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-spa-charcoal mb-2">Notes</label>
                <textarea rows={2} placeholder="Optional" value={payoutForm.notes} onChange={e => setPayoutForm({ ...payoutForm, notes: e.target.value })} className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30 resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setPayoutModal(null)} className="flex-1 px-6 py-3 border border-spa-charcoal/20 rounded-full text-spa-charcoal hover:bg-spa-lavender transition-colors text-sm font-medium">Cancel</button>
              <button onClick={handlePayout} disabled={!payoutForm.amount || saving} className="flex-1 btn-primary justify-center disabled:opacity-50">
                {saving ? 'Saving...' : 'Record Payout'} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
