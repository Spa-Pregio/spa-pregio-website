import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Send, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;

    if (!section || !panel) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel,
        { scale: 0.98, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="newsletter"
      className="relative w-full py-20 lg:py-28 bg-spa-lavender z-40"
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <div
          ref={panelRef}
          className="bg-white rounded-[28px] p-8 lg:p-12 card-shadow text-center"
        >
          <div className="w-16 h-16 rounded-full bg-spa-pink/10 flex items-center justify-center mx-auto mb-6">
            <Mail size={28} className="text-spa-pink" />
          </div>

          <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] leading-tight text-spa-plum">
            Get fresh inspiration<br />
            <span className="text-spa-pink">weekly.</span>
          </h2>

          <p className="mt-4 text-spa-muted max-w-md mx-auto leading-relaxed">
            New kits, meetup invites, and spa-night ideas—delivered gently.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full px-5 py-4 rounded-full bg-spa-lavender border-2 border-transparent focus:border-spa-pink focus:outline-none transition-colors duration-300 text-spa-plum placeholder:text-spa-muted"
                  required
                  disabled={isSubmitted}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitted}
                className={`px-6 py-4 rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                  isSubmitted
                    ? 'bg-green-500 text-white'
                    : 'btn-primary'
                }`}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle size={18} />
                    Subscribed!
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Subscribe
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="mt-4 text-sm text-spa-muted">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
