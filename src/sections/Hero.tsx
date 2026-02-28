import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const card = cardRef.current;

    if (!section || !content || !card) return;

    const headline = content.querySelector('.hero-headline');
    const subheadline = content.querySelector('.hero-subheadline');
    const cta = content.querySelector('.hero-cta');
    const trust = content.querySelector('.hero-trust');

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([headline, subheadline, cta, trust], { opacity: 0, y: 24 });
      gsap.set(card, { opacity: 0, scale: 0.98 });

      // Entrance animation on page load - clean and subtle
      const loadTl = gsap.timeline({ delay: 0.2 });

      loadTl
        .to(card, { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' })
        .to(headline, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .to(subheadline, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .to(cta, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.25')
        .to(trust, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2');

      // Scroll-driven exit animation - more subtle
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.5,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.to([headline, subheadline, cta, trust], {
              opacity: 1,
              y: 0,
              duration: 0.3,
            });
            gsap.to(card, { opacity: 1, scale: 1, duration: 0.3 });
          },
        },
      });

      // EXIT phase (75% - 100%) - gentle fade out
      scrollTl
        .fromTo(
          card,
          { opacity: 1, y: 0 },
          { opacity: 0, y: -40, ease: 'power2.in' },
          0.75
        )
        .fromTo(
          [headline, subheadline, cta, trust],
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.78
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-[600px] overflow-hidden bg-spa-lavender"
    >
      {/* Background Blob */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[90vw] h-[90vh] gradient-blob rounded-full blur-3xl opacity-60" />
      </div>

      {/* Hero Card */}
      <div
        ref={cardRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] sm:w-[min(90vw,1100px)] lg:h-[min(55vh,520px)] rounded-2xl lg:rounded-[28px] overflow-hidden card-shadow"
      >
        {/* Background Image */}
        <img
          src="/images/hero_ribbon.jpg"
          alt="Elegant satin ribbons"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Gradient Overlay - stronger on mobile for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/40 sm:from-white/90 sm:via-white/60 sm:to-transparent" />

        {/* Content */}
        <div
          ref={contentRef}
          className="relative h-full flex flex-col justify-center px-6 sm:px-[6%] lg:px-[8%] py-8 lg:py-0"
        >
          {/* Headline */}
          <div className="hero-headline max-w-full sm:max-w-[50%] lg:max-w-[44%]">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(40px,4.5vw,64px)] leading-[1.05] text-spa-plum tracking-tight">
              Beautiful baby<br className="hidden sm:block" /> showers,<br />
              <span className="text-spa-pink">simplified.</span>
            </h1>
          </div>

          {/* Subheadline */}
          <p className="hero-subheadline mt-4 sm:mt-6 max-w-full sm:max-w-[45%] lg:max-w-[38%] text-spa-muted text-sm sm:text-base lg:text-lg leading-relaxed">
            Printable party kits, spa-day ideas, and local meetups—curated for moms-to-be.
          </p>

          {/* CTA Button */}
          <a
            href="#kits"
            className="hero-cta btn-primary inline-flex items-center justify-center sm:justify-start gap-2 w-full sm:w-fit mt-6 sm:mt-8 text-sm sm:text-base"
          >
            Get the free starter kit
          </a>

          {/* Trust Line */}
          <div className="hero-trust flex items-center gap-2 mt-6 sm:mt-0 sm:absolute sm:bottom-[10%] sm:left-[6%] lg:left-[8%] text-sm text-spa-muted">
            <Sparkles size={16} className="text-spa-pink flex-shrink-0" />
            <span>Join 12,000+ moms</span>
          </div>
        </div>
      </div>
    </section>
  );
}
