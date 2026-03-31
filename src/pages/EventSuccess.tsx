import { useSearchParams, Link } from 'react-router-dom';
import { Check, Calendar, ArrowRight } from 'lucide-react';

export default function EventSuccess() {
  const [params] = useSearchParams();
  const eventId = params.get('event_id');

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

        <div className="bg-white rounded-2xl p-6 shadow-elegant mb-8">
          <div className="flex items-center gap-3 text-spa-charcoal">
            <div className="w-10 h-10 rounded-full bg-spa-purple/10 flex items-center justify-center flex-shrink-0">
              <Calendar size={18} className="text-spa-purple" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-spa-charcoal">Your ticket is confirmed</p>
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
