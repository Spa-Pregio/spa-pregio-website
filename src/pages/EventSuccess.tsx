import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Check, Calendar, ArrowRight, AlertCircle } from 'lucide-react';

const SUPABASE_FUNCTIONS_URL = 'https://reompjeeiurwnbpbfhyj.supabase.co/functions/v1';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlb21wamVlaXVyd25icGJmaHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4MjkxMjcsImV4cCI6MjA1NTQwNTEyN30.oanFsHGxJnXLOIJmLHYQKBMFgkCBenabPTsORNbdkwA';

export default function EventSuccess() {
  const [params] = useSearchParams();
  const eventId = params.get('event_id');
  const sessionId = params.get('session_id');
  const [status, setStatus] = useState<'confirming' | 'done' | 'error'>('confirming');

  useEffect(() => {
    if (!sessionId) {
      setStatus('done');
      return;
    }
    confirmPayment();
  }, [sessionId]);

  const confirmPayment = async () => {
    try {
      const response = await fetch(`${SUPABASE_FUNCTIONS_URL}/confirm-event-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ session_id: sessionId }),
      });
      const data = await response.json();
      if (data.success) {
        setStatus('done');
      } else {
        console.error('Confirm payment error:', data.error);
        setStatus('error');
      }
    } catch (err) {
      console.error('Confirm payment exception:', err);
      setStatus('error');
    }
  };

  return (
    <div className="w-full pt-20 min-h-screen bg-spa-cream flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 text-center">
        <div className="w-24 h-24 rounded-full bg-spa-purple/10 flex items-center justify-center mx-auto mb-6">
          <Check size={42} className="text-spa-purple" strokeWidth={2.5} />
        </div>
        <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Payment Confirmed</span>
        <h1 className="font-serif text-4xl text-spa-charcoal mt-3 mb-4 leading-tight">
          You're going!
        </h1>
        <p className="text-spa-gray leading-relaxed mb-3">
          Your ticket purchase was successful. Check your email for a confirmation receipt from Stripe.
        </p>
        <p className="text-sm text-spa-gray/70 mb-10">
          Didn't get an email? Check your spam folder or contact us at hello@spa-pregio.com
        </p>

        {status === 'error' && (
          <div className="flex items-center gap-2 text-amber-700 text-sm bg-amber-50 px-4 py-3 rounded-xl mb-6 text-left">
            <AlertCircle size={16} className="flex-shrink-0" />
            Your payment went through, but we had trouble finalizing your spot. We've been notified — contact hello@spa-pregio.com if you don't hear from us soon.
          </div>
        )}

        <div className="bg-white rounded-2xl p-6 shadow-elegant mb-8">
          <div className="flex items-center gap-3 text-spa-charcoal">
            <div className="w-10 h-10 rounded-full bg-spa-purple/10 flex items-center justify-center flex-shrink-0">
              <Calendar size={18} className="text-spa-purple" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-spa-charcoal">
                {status === 'confirming' ? 'Finalizing your ticket...' : 'Your ticket is confirmed'}
              </p>
              <p className="text-xs text-spa-gray mt-0.5">A receipt has been sent to your email</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {eventId && (
            <Link
              to={`/events/${eventId}`}
              className="btn-outline justify-center"
            >
              Back to Event
            </Link>
          )}
          <Link to="/events" className="btn-primary justify-center">
            Browse More Events <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
