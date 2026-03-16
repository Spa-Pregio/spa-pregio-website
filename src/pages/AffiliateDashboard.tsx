import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
  Copy, Check, TrendingUp, MousePointer, Users, DollarSign,
  Clock, CheckCircle, ArrowRight, ExternalLink, AlertCircle
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

export default function AffiliateDashboard() {
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
  const [stats, setStats] = useState<AffiliateStats | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [notAffiliate, setNotAffiliate] = useState(false);
  const [applyForm, setApplyForm] = useState({ full_name: '', paypal_email: '', venmo_handle: '', zelle_info: '' });
  const [applying, setApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    const { data: aff } = await supabase
      .from('affiliates')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!aff) {
      setNotAffiliate(true);
      setLoading(false);
      return;
    }

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
      .toLowerCase()
      .replace(/\s+/g, '')
      .slice(0, 12) + Math.floor(Math.random() * 1000);

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
    if (!error) {
      setApplySuccess(true);
      setTimeout(() => loadDashboard(), 1500);
    }
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

  function statusColor(status: string) {
    if (status === 'paid') return 'bg-green-100 text-green-700';
    if (status === 'confirmed') return 'bg-blue-100 text-blue-700';
    return 'bg-amber-100 text-amber-700';
  }

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

  // Not yet a Suite Sister — apply form
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
                  Earn 10% recurring commission on every vendor you refer, plus 15% on founding lifetime packages.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-elegant space-y-5">
                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-2">Your Full Name *</label>
                  <input
                    type="text"
                    placeholder="First and Last Name"
                    value={applyForm.full_name}
                    onChange={(e) => setApplyForm({ ...applyForm, full_name: e.target.value })}
                    className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-2">PayPal Email (for payouts)</label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={applyForm.paypal_email}
                    onChange={(e) => setApplyForm({ ...applyForm, paypal_email: e.target.value })}
                    className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-2">Venmo Handle</label>
                  <input
                    type="text"
                    placeholder="@yourhandle"
                    value={applyForm.venmo_handle}
                    onChange={(e) => setApplyForm({ ...applyForm, venmo_handle: e.target.value })}
                    className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-spa-charcoal mb-2">Zelle (phone or email)</label>
                  <input
                    type="text"
                    placeholder="Phone or email on Zelle"
                    value={applyForm.zelle_info}
                    onChange={(e) => setApplyForm({ ...applyForm, zelle_info: e.target.value })}
                    className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                  />
                </div>
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

  return (
    <div className="w-full pt-20 min-h-screen bg-spa-cream">

      {/* Header */}
      <section className="w-full py-12 bg-spa-purple">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-spa-pink text-sm uppercase tracking-[0.15em]">Suite Sisters™ Portal</span>
              <h1 className="font-serif text-3xl text-white mt-2">
                Welcome back, {stats?.full_name?.split(' ')[0] || 'Sister'} 💜
              </h1>
              {affiliate?.status === 'pending' && (
                <div className="flex items-center gap-2 mt-3 bg-amber-400/20 border border-amber-400/30 rounded-full px-4 py-1.5">
                  <AlertCircle size={14} className="text-amber-300" />
                  <span className="text-amber-300 text-xs font-medium">Application pending review — your link is ready once approved</span>
                </div>
              )}
            </div>
            <div className="bg-white/10 rounded-2xl p-4 min-w-[280px]">
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

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-10">

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: MousePointer, label: 'Total Clicks', value: stats?.total_clicks || 0, format: 'number', color: 'text-spa-purple' },
            { icon: Users, label: 'Vendors Referred', value: stats?.total_conversions || 0, format: 'number', color: 'text-spa-purple' },
            { icon: TrendingUp, label: 'Conversion Rate', value: stats?.conversion_rate || 0, format: 'percent', color: 'text-spa-purple' },
            { icon: DollarSign, label: 'Total Earned', value: stats?.total_earned || 0, format: 'currency', color: 'text-spa-purple' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-elegant">
              <div className="w-10 h-10 rounded-full bg-spa-purple/10 flex items-center justify-center mb-4">
                <stat.icon size={20} className={stat.color} />
              </div>
              <p className="text-spa-gray text-sm">{stat.label}</p>
              <p className="font-serif text-3xl text-spa-charcoal mt-1">
                {stat.format === 'currency'
                  ? formatCurrency(stat.value as number)
                  : stat.format === 'percent'
                  ? `${stat.value}%`
                  : stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Earnings Breakdown */}
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: Clock, label: 'Pending', sublabel: 'Within 30-day hold', value: stats?.pending_earnings || 0, bg: 'bg-amber-50', border: 'border-amber-200', iconColor: 'text-amber-500' },
            { icon: CheckCircle, label: 'Confirmed', sublabel: 'Ready to request', value: stats?.confirmed_earnings || 0, bg: 'bg-blue-50', border: 'border-blue-200', iconColor: 'text-blue-500' },
            { icon: DollarSign, label: 'Paid Out', sublabel: 'All time', value: stats?.total_paid || 0, bg: 'bg-green-50', border: 'border-green-200', iconColor: 'text-green-500' },
          ].map((item, i) => (
            <div key={i} className={`${item.bg} border ${item.border} rounded-2xl p-6`}>
              <div className="flex items-center gap-3 mb-3">
                <item.icon size={20} className={item.iconColor} />
                <div>
                  <p className="font-medium text-spa-charcoal">{item.label}</p>
                  <p className="text-xs text-spa-gray">{item.sublabel}</p>
                </div>
              </div>
              <p className="font-serif text-3xl text-spa-charcoal">{formatCurrency(item.value)}</p>
            </div>
          ))}
        </div>

        {/* Commission Rates */}
        <div className="bg-white rounded-2xl p-8 shadow-elegant">
          <h2 className="font-serif text-2xl text-spa-charcoal mb-6">Your Commission Rates</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-spa-lavender rounded-xl p-5">
              <p className="text-spa-purple font-medium text-sm uppercase tracking-wide mb-1">Monthly Vendor Referrals</p>
              <p className="font-serif text-4xl text-spa-charcoal">10%</p>
              <p className="text-spa-gray text-sm mt-2">Recurring every month the vendor stays active</p>
              <div className="mt-4 space-y-1 text-sm text-spa-gray">
                <p>Starter ($29/mo) → <span className="text-spa-purple font-medium">$2.90/mo</span></p>
                <p>Professional ($79/mo) → <span className="text-spa-purple font-medium">$7.90/mo</span></p>
                <p>Enterprise ($149/mo) → <span className="text-spa-purple font-medium">$14.90/mo</span></p>
              </div>
            </div>
            <div className="bg-spa-charcoal rounded-xl p-5">
              <p className="text-spa-pink font-medium text-sm uppercase tracking-wide mb-1">Founding Lifetime Referrals</p>
              <p className="font-serif text-4xl text-white">15%</p>
              <p className="text-white/60 text-sm mt-2">One-time payout on lifetime purchases</p>
              <div className="mt-4 space-y-1 text-sm text-white/60">
                <p>Founding Starter ($199) → <span className="text-spa-pink font-medium">$29.85</span></p>
                <p>Founding Pro ($499) → <span className="text-spa-pink font-medium">$74.85</span></p>
                <p>Founding Enterprise ($999) → <span className="text-spa-pink font-medium">$149.85</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Referral History */}
        <div className="bg-white rounded-2xl shadow-elegant overflow-hidden">
          <div className="px-8 py-6 border-b border-spa-light">
            <h2 className="font-serif text-2xl text-spa-charcoal">Referral History</h2>
          </div>
          {referrals.length === 0 ? (
            <div className="px-8 py-16 text-center">
              <Users size={40} className="text-spa-purple/30 mx-auto mb-4" />
              <p className="text-spa-gray">No referrals yet — share your link to get started!</p>
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
                  {referrals.map((ref) => (
                    <tr key={ref.id} className="hover:bg-spa-cream/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-spa-charcoal">{ref.vendor_name}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${tierColor(ref.tier)}`}>{ref.tier}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-spa-gray capitalize">{ref.subscription_type}</td>
                      <td className="px-6 py-4 text-sm text-spa-charcoal">{formatCurrency(ref.sale_amount)}</td>
                      <td className="px-6 py-4 text-sm font-medium text-spa-purple">{formatCurrency(ref.commission_amount)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(ref.status)}`}>{ref.status}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-spa-gray">{formatDate(ref.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

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
                  {payouts.map((payout) => (
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

        {/* Promo Tips */}
        <div className="bg-spa-purple rounded-2xl p-8">
          <h2 className="font-serif text-2xl text-white mb-6">Tips to Maximize Your Earnings</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: 'Target Local Vendors', tip: 'Reach out to spas, photographers, bakers, and florists in your city. They\'re actively looking for exposure to new mamas.' },
              { title: 'Push Founding Rates', tip: 'The $199/$499/$999 lifetime deals are a no-brainer for vendors. Lead with the savings — they never pay monthly again.' },
              { title: 'Share Your Link', tip: 'Add your referral link to your Instagram bio, TikTok, and Facebook groups where local vendors hang out.' },
            ].map((tip, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-5">
                <h3 className="font-serif text-lg text-white mb-2">{tip.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{tip.tip}</p>
              </div>
            ))}
          </div>
          <a
            href="/vendors"
            target="_blank"
            className="inline-flex items-center gap-2 bg-white text-spa-purple px-6 py-3 rounded-full font-medium hover:bg-spa-cream transition-colors mt-8"
          >
            <ExternalLink size={16} /> View Vendor Page
          </a>
        </div>

      </div>
    </div>
  );
}
