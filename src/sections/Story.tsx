import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const image = imageRef.current;

    if (!section || !card || !image) return;

    const ctx = gsap.context(() => {
      // Card animation
      gsap.fromTo(
        card,
        { y: '6vh', opacity: 0 },
        {
          y: 0,
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

      // Image parallax
      gsap.fromTo(
        image,
        { y: '2vh' },
        {
          y: '-2vh',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 lg:py-28 bg-spa-lavender z-40"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          ref={cardRef}
          className="relative bg-white rounded-[28px] overflow-hidden card-shadow"
        >
          <div className="grid lg:grid-cols-2">
            {/* Image Side */}
            <div ref={imageRef} className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px] overflow-hidden">
              <img
                src="/images/story_photo.jpg"
                alt="Behind the design"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 lg:to-white/40" />
            </div>

            {/* Content Side */}
            <div className="flex flex-col justify-center p-8 lg:p-12 xl:p-16">
              <div className="w-12 h-12 rounded-full bg-spa-pink/10 flex items-center justify-center mb-6">
                <Heart size={24} className="text-spa-pink" />
              </div>

              <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] leading-tight text-spa-plum">
                Designed by a mom,<br />
                <span className="text-spa-pink">for moms.</span>
              </h2>

              <p className="mt-6 text-spa-muted leading-relaxed">
                Spa-Pregio started with one baby shower and a printer. Now it's a growing collection of thoughtful details—so you can spend less time planning and more time celebrating.
              </p>

              <p className="mt-4 text-spa-muted leading-relaxed">
                Every kit is designed with love, tested by real moms, and made to make your special moments even more memorable.
              </p>

              <a
                href="#"
                className="inline-flex items-center gap-2 mt-8 text-spa-pink font-medium hover:gap-3 transition-all duration-300"
              >
                Read our story
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
