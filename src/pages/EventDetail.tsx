import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import {
  MapPin,
  Calendar,
  Users,
  ArrowLeft,
  Check,
  Ticket,
  Utensils,
  DollarSign,
  AlertCircle,
  Link2,
  Store,
} from 'lucide-react';

const SUPABASE_FUNCTIONS_URL = 'https://reompjeeiurwnbpbfhyj.supabase.co/functions/v1';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlb21wamVlaXVyd25icGJmaHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4MjkxMjcsImV4cCI6MjA1NTQwNTEyN30.oanFsHGxJnXLOIJmLHYQKBMFgkCBenabPTsORNbdkwA';

function setMeta(property: string, content: string) {
  const attr = property.startsWith('og:') || property.startsWith('twitter:') ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement | null;

  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }

  el.setAttribute('content', content);
}

function injectEventMeta(event: any) {
  const eventUrl = `https://spa-pregio.com/events/${event.id}`;
  const image = event.image || 'https://spa-pregio.com/images/gathering_large.jpg';
  const description = event.description
    ? event.description.slice(0, 160)
    : `${event.type} · ${event.date}${event.time ? ' at ' + event.time : ''} · ${event.location}. Curated by Spa-PregioTM.`;

  document.title = `${event.title} — Spa-PregioTM`;
  setMeta('description', description);
  setMeta('og:title', event.title);
  setMeta('og:description', description);
  setMeta('og:image', image);
  setMeta('og:url', eventUrl);
  setMeta('og:type', 'website');
  setMeta('og:site_name', 'Spa-PregioTM');
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:site', '@spapregio');
  setMeta('twitter:title', event.title);
  setMeta('twitter:description', description);
  setMeta('twitter:image', image);
}

function ShareRow({ event }: { event: any }) {
  const [copied, setCopied] = useState(false);
  const eventUrl = `https://spa-pregio.com/events/${event.id}`;
  const shareText = encodeURIComponent(
    `Join me at "${event.title}" — ${event.date} · ${event.location} · Curated by Spa-PregioTM`
  );
  const encodedUrl = encodeURIComponent(eventUrl);
  const encodedImage = encodeURIComponent(
    event.image || 'https://spa-pregio.com/images/gathering_large.jpg'
  );

  const platforms = [
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      bg: '#1877F2',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M9.5 3h1.5V1h-1.5C8.1 1 7 2.1 7 3.5V5H5.5v2H7v6h2V7h1.5l.5-2H9V3.5c0-.3.2-.5.5-.5z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      name: 'Pinterest',
      href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${shareText}&media=${encodedImage}`,
      bg: '#E60023',
      icon: (
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 1C4.1 1 1 4.1 1 8c0 2.9 1.7 5.4 4.1 6.6-.1-.8-.1-2 .2-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.7 1.3 1.5 0 .9-.6 2.3-.9 3.5-.2 1 .5 1.8 1.5 1.8 1.8 0 2.9-2.3 2.9-5.1 0-2.1-1.4-3.7-3.9-3.7-2.8 0-4.5 2.1-4.5 4.4 0 .8.2 1.4.6 1.8.1.1.1.2.1.3-.1.3-.2.9-.2.9 0 .1-.1.2-.2.1C3.8 9.7 3 8.3 3 6.7 3 3.9 5.4 1 8.3 1c2.9 0 4.7 2.1 4.7 4.4 0 3.4-1.9 5.9-4.6 5.9-1 0-1.9-.5-2.2-1.1l-.6 2.2c-.2.8-.7 1.7-1.1 2.3.8.3 1.7.4 2.5.4 3.9 0 7-3.1 7-7S11.9 1 8 1z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      name: 'X',
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`,
      bg: '#000000',
      icon: (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M2 2h4l2.5 3.5L11 2h3l-4.5 6L14 14h-4L7.5 10 5 14H2l4.5-6L2 2z" fill="white" />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      href: `https://www.tiktok.com/share?url=${encodedUrl}`,
      bg: '#010101',
      icon: (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path
            d="M13 1h-2.5v9.5a2 2 0 1 1-2-2 2 2 0 0 1 .5.1V6a4.5 4.5 0 1 0 4 4.5V5.5A6 6 0 0 0 13 6V1z"
            fill="white"
          />
        </svg>
      ),
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
    } catch {
      const el = document.createElement('textarea');
      el.value = eventUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-6 pt-6 border-t border-spa-charcoal/5">
      <p className="text-xs uppercase tracking-[0.12em] text-spa-gray mb-3 font-medium">
        Share this event
      </p>

      <div className="flex items-center gap-2 mb-3">
        {platforms.map((p) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            title={`Share on ${p.name}`}
            className="flex items-center justify-center w-9 h-9 rounded-full transition-opacity hover:opacity-80"
            style={{ background: p.bg }}
          >
            {p.icon}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 px-3 py-2 bg-spa-lavender rounded-xl text-xs text-spa-gray truncate font-mono">
          spa-pregio.com/events/{event.id}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-2 bg-spa-purple text-white text-xs font-medium rounded-xl whitespace-nowrap transition-colors hover:bg-spa-purple/90"
        >
          {copied ? (
            <>
              <Check size={13} /> Copied!
            </>
          ) : (
            <>
              <Link2 size={13} /> Copy link
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [event, setEvent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [rsvpCount, setRsvpCount] = useState(0);
  const [vendorTableCount, setVendorTableCount] = useState(0);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpStatus, setRsvpStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [vendorPaymentStatus, setVendorPaymentStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [selectedTickets, setSelectedTickets] = useState<Record<number, number>>({});

  useEffect(() => {
    window.scrollTo(0, 0);
    loadEvent();
    checkUser();
  }, [id]);

  useEffect(() => {
    if (searchParams.get('canceled') === 'true') {
      setPaymentStatus('error');
      window.history.replaceState({}, '', window.location.pathname);
    } else {
      setPaymentStatus('idle');
    }
  }, [searchParams]);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setCurrentUser(user);

    if (user) {
      setRsvpEmail(user.email || '');
      setRsvpName(user.user_metadata?.first_name || '');
    }
  };

  const loadEvent = async () => {
    if (!id) return;

    setLoading(true);
    setNotFound(false);

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    setEvent(data);
    injectEventMeta(data);

    const { data: rsvps } = await supabase
      .from('event_rsvps')
      .select('id, is_vendor')
      .eq('event_id', String(id));

    setRsvpCount((rsvps || []).filter((r: any) => !r.is_vendor).length);
    setVendorTableCount((rsvps || []).filter((r: any) => r.is_vendor).length);

    setLoading(false);
  };

  const getTotalPrice = () => {
    const tickets = Array.isArray(event?.tickets) ? event.tickets : [];

    return tickets.reduce(
      (total: number, ticket: any, index: number) =>
        total + Number(ticket?.price || 0) * (selectedTickets[index] || 0),
      0
    );
  };

  const handleFreeRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;

    setRsvpStatus('loading');

    const { error } = await supabase.from('event_rsvps').insert([
      {
        event_id: String(event.id),
        user_email: rsvpEmail,
        user_name: rsvpName,
        is_vendor: false,
      },
    ]);

    if (error) {
      console.error('Free RSVP error:', error);
      setRsvpStatus('error');
    } else {
      setRsvpStatus('success');
      setRsvpCount((c) => c + 1);
    }
  };

  const handlePaidCheckout = async () => {
    const total = getTotalPrice();

    if (!event || total === 0 || !rsvpEmail || !rsvpName) return;

    setPaymentStatus('loading');

    try {
      const ticketsPayload = (Array.isArray(event.tickets) ? event.tickets : [])
        .map((t: any, i: number) => ({
          type: t.type,
          price: t.price,
          description: t.description,
          quantity: selectedTickets[i] || 0,
        }))
        .filter((t: any) => t.quantity > 0);

      const response = await fetch(`${SUPABASE_FUNCTIONS_URL}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          event_id: event.id,
          event_title: event.title,
          tickets: ticketsPayload,
          connected_account_id: event.connected_account_id || '',
          customer_email: rsvpEmail,
          customer_name: rsvpName,
          is_vendor: false,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout error:', data.error);
        setPaymentStatus('error');
      }
    } catch (err) {
      console.error('Checkout exception:', err);
      setPaymentStatus('error');
    }
  };

  const handleVendorTableCheckout = async () => {
    if (!event || !rsvpEmail || !rsvpName || vendorTablesRemaining <= 0) return;

    setVendorPaymentStatus('loading');

    try {
      const response = await fetch(`${SUPABASE_FUNCTIONS_URL}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          event_id: event.id,
          event_title: `${event.title} — Vendor Table`,
          tickets: [
            {
              type: 'Vendor Table',
              price: Number(event.vendor_table_price || 0),
              description: `Vendor table at ${event.title}`,
              quantity: 1,
            },
          ],
          connected_account_id: event.connected_account_id || '',
          customer_email: rsvpEmail,
          customer_name: rsvpName,
          is_vendor: true,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Vendor checkout error:', data.error);
        setVendorPaymentStatus('error');
      }
    } catch (err) {
      console.error('Vendor checkout exception:', err);
      setVendorPaymentStatus('error');
    }
  };

  if (loading) {
    return (
      <div className="w-full pt-20 min-h-screen bg-spa-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-spa-purple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-spa-gray text-sm">Loading event...</p>
        </div>
      </div>
    );
  }

  if (notFound || !event) {
    return (
      <div className="w-full pt-20 min-h-screen bg-spa-cream flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <span className="text-5xl mb-4 block">🎉</span>
          <h2 className="font-serif text-3xl text-spa-charcoal mb-3">Event not found</h2>
          <p className="text-spa-gray mb-6">
            This event may have ended or the link may be incorrect.
          </p>
          <Link to="/events" className="btn-primary justify-center">
            <ArrowLeft size={18} /> Browse all events
          </Link>
        </div>
      </div>
    );
  }

  const tickets = Array.isArray(event?.tickets) ? event.tickets : [];
  const minPrice =
    tickets.length > 0 ? Math.min(...tickets.map((t: any) => Number(t?.price || 0))) : 0;
  const vendorTablesAvailable = Number(event.vendor_tables || 0);
  const vendorTablesRemaining = Math.max(vendorTablesAvailable - vendorTableCount, 0);
  const hasVendorTables =
    vendorTablesAvailable > 0 && Number(event.vendor_table_price || 0) > 0;

  return (
    <div className="w-full pt-20 min-h-screen bg-spa-cream">
      <div className="max-w-3xl mx-auto px-6 lg:px-12 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-spa-gray hover:text-spa-purple transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Back to events
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-12 pb-24">
        <div className="bg-white rounded-2xl overflow-hidden shadow-elegant">
          <div className="relative aspect-[16/7] overflow-hidden bg-spa-lavender">
            <img
              src={event.image || '/images/gathering_large.jpg'}
              alt={event.title}
              className="w-full h-full object-cover"
            />

            <div
              className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${
                event.is_free ? 'bg-green-500 text-white' : 'bg-spa-pink text-white'
              }`}
            >
              {event.is_free ? 'Free Event' : `From $${minPrice}`}
            </div>

            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-xs font-medium text-spa-purple tracking-wide">
                Spa-PregioTM
              </span>
            </div>
          </div>

          <div className="p-6 lg:p-10">
            <span className="text-xs uppercase tracking-[0.15em] text-spa-purple">
              {event.type}
            </span>

            <h1 className="font-serif text-3xl lg:text-4xl text-spa-charcoal mt-2 mb-5 leading-tight">
              {event.title}
            </h1>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-spa-gray">
                <Calendar size={16} className="text-spa-purple flex-shrink-0" />
                {event.date}
                {event.time ? ` · ${event.time}` : ''}
              </div>

              <div className="flex items-center gap-2 text-sm text-spa-gray">
                <MapPin size={16} className="text-spa-purple flex-shrink-0" />
                {event.location}
              </div>

              <div className="flex items-center gap-2 text-sm text-spa-gray">
                <Users size={16} className="text-spa-purple flex-shrink-0" />
                {rsvpCount} / {event.max_attendees || 50} attending
              </div>
            </div>

            {event.description && (
              <p className="text-spa-gray leading-relaxed mb-2">{event.description}</p>
            )}

            <ShareRow event={event} />

            {hasVendorTables && (
              <div className="mt-6 pt-6 border-t border-spa-charcoal/5">
                <div className="bg-spa-lavender rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h4 className="font-serif text-xl text-spa-charcoal flex items-center gap-2">
                        <Store size={18} className="text-spa-purple" />
                        Vendor Tables
                      </h4>
                      <p className="text-sm text-spa-gray mt-1">
                        Showcase your business at this event.
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-semibold text-spa-purple">
                        ${Number(event.vendor_table_price).toFixed(2)}
                      </p>
                      <p className="text-xs text-spa-gray">
                        {vendorTablesRemaining} of {vendorTablesAvailable} left
                      </p>
                    </div>
                  </div>

                  {!currentUser ? (
                    <div className="mt-4">
                      <p className="text-sm text-spa-gray mb-3">
                        Create a free account to reserve a vendor table.
                      </p>
                      <Link to="/join" className="btn-primary justify-center">
                        Create Free Account
                      </Link>
                    </div>
                  ) : (
                    <div className="mt-4 space-y-4">
                      {vendorPaymentStatus === 'error' && (
                        <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl">
                          <AlertCircle size={16} />
                          Payment failed. Please try again.
                        </div>
                      )}

                      <button
                        onClick={handleVendorTableCheckout}
                        disabled={
                          vendorTablesRemaining <= 0 || vendorPaymentStatus === 'loading'
                        }
                        className="btn-primary w-full justify-center disabled:opacity-50"
                      >
                        {vendorTablesRemaining <= 0
                          ? 'Vendor Tables Sold Out'
                          : vendorPaymentStatus === 'loading'
                          ? 'Redirecting to checkout...'
                          : `Reserve Vendor Table — $${Number(event.vendor_table_price).toFixed(2)}`}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-spa-charcoal/5">
              {!currentUser ? (
                <div className="text-center bg-spa-lavender rounded-2xl p-8">
                  <p className="text-spa-gray mb-4">
                    You need a free account to RSVP or purchase tickets.
                  </p>
                  <Link to="/join" className="btn-primary justify-center">
                    Create Free Account
                  </Link>
                </div>
              ) : rsvpStatus === 'success' ? (
                <div className="text-center py-8 bg-spa-lavender rounded-2xl">
                  <div className="w-14 h-14 rounded-full bg-spa-purple/10 flex items-center justify-center mx-auto mb-4">
                    <Check size={26} className="text-spa-purple" />
                  </div>
                  <h4 className="font-serif text-2xl text-spa-charcoal mb-1">You're in!</h4>
                  <p className="text-spa-gray text-sm">We'll see you at {event.title}.</p>
                </div>
              ) : event.is_free ? (
                <form onSubmit={handleFreeRsvp} className="space-y-4">
                  <h4 className="font-serif text-xl text-spa-charcoal flex items-center gap-2">
                    <Ticket size={18} className="text-spa-purple" /> RSVP — Free Event
                  </h4>

                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={rsvpEmail}
                      onChange={(e) => setRsvpEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                    />
                  </div>

                  {rsvpStatus === 'error' && (
                    <p className="text-red-500 text-sm">
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={rsvpStatus === 'loading'}
                    className="btn-primary w-full justify-center disabled:opacity-50"
                  >
                    {rsvpStatus === 'loading' ? 'Saving...' : 'Confirm RSVP — Free'}
                    <Check size={18} />
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <h4 className="font-serif text-xl text-spa-charcoal flex items-center gap-2">
                    <Ticket size={18} className="text-spa-purple" /> Select Tickets
                  </h4>

                  {tickets.map((ticket: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-spa-lavender rounded-xl"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          {(ticket.type || '').includes('Buffet') ||
                          (ticket.type || '').includes('Plated') ? (
                            <Utensils size={14} className="text-spa-purple" />
                          ) : (
                            <Ticket size={14} className="text-spa-purple" />
                          )}

                          <p className="font-medium text-spa-charcoal text-sm">{ticket.type}</p>
                        </div>

                        <p className="text-xs text-spa-gray mt-0.5 ml-5">
                          {ticket.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-medium text-spa-purple">
                          ${Number(ticket.price || 0)}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedTickets({
                                ...selectedTickets,
                                [index]: Math.max(0, (selectedTickets[index] || 0) - 1),
                              })
                            }
                            className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-spa-charcoal hover:bg-spa-purple hover:text-white transition-colors font-bold"
                          >
                            −
                          </button>

                          <span className="w-5 text-center text-sm font-medium">
                            {selectedTickets[index] || 0}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedTickets({
                                ...selectedTickets,
                                [index]: (selectedTickets[index] || 0) + 1,
                              })
                            }
                            className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-spa-charcoal hover:bg-spa-purple hover:text-white transition-colors font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {getTotalPrice() > 0 && (
                    <div className="bg-spa-purple/10 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-spa-charcoal">Total</span>
                        <span className="font-serif text-xl text-spa-purple">
                          ${getTotalPrice()}
                        </span>
                      </div>

                      <p className="text-xs text-spa-gray mt-1">
                        Includes 10% Spa-PregioTM platform fee
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={rsvpEmail}
                      onChange={(e) => setRsvpEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                    />
                  </div>

                  {paymentStatus === 'error' && (
                    <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl">
                      <AlertCircle size={16} />
                      Payment failed or was canceled. Please try again.
                    </div>
                  )}

                  <button
                    onClick={handlePaidCheckout}
                    disabled={getTotalPrice() === 0 || paymentStatus === 'loading'}
                    className="btn-primary w-full justify-center disabled:opacity-50"
                  >
                    {paymentStatus === 'loading'
                      ? 'Redirecting to checkout...'
                      : getTotalPrice() === 0
                      ? 'Select tickets above'
                      : `Pay $${getTotalPrice()}`}

                    {paymentStatus !== 'loading' && getTotalPrice() > 0 && (
                      <DollarSign size={18} />
                    )}
                  </button>

                  <p className="text-xs text-spa-gray text-center">
                    You'll be redirected to Stripe's secure checkout page.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
