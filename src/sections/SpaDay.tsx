import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Music, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function SpaDay() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;

    if (!section || !card) return;

    const image = card.querySelector('.spa-image');
    const content = card.querySelector('.spa-content');

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(card, { opacity: 0, y: 40 });
      gsap.set(image, { opacity: 0, x: -30 });
      gsap.set(content?.children || [], { opacity: 0, y: 20 });

      // Scroll-driven animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'top 25%',
          scrub: 0.5,
        },
      });

      // Entrance
      scrollTl
        .to(card, { opacity: 1, y: 0, ease: 'power2.out' }, 0)
        .to(image, { opacity: 1, x: 0, ease: 'power2.out' }, 0.1)
        .to(content?.children || [], { 
          opacity: 1, 
          y: 0, 
          stagger: 0.05, 
          ease: 'power2.out' 
        }, 0.15);

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="spa"
      className="relative w-full py-16 sm:py-20 lg:py-28 bg-spa-lavender z-30"
    >
      {/* Background Blob */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[40vw] h-[60vh] pointer-events-none opacity-30">
        <div className="w-full h-full bg-spa-purple/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Spa Card */}
        <div
          ref={cardRef}
          className="relative bg-white rounded-2xl lg:rounded-[28px] overflow-hidden card-shadow"
        >
          <div className="grid lg:grid-cols-2">
            {/* Image Side */}
            <div className="spa-image relative aspect-[4/3] lg:aspect-auto lg:min-h-[400px] xl:min-h-[500px]">
              <img
                src="/images/spa_photo.jpg"
                alt="Spa day inspiration"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Content Side */}
            <div className="spa-content flex flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-12 border-t lg:border-t-0 lg:border-l border-spa-plum/5">
              {/* Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-spa-pink/10 flex items-center justify-center mb-4 sm:mb-6">
                <Sparkles size={20} className="text-spa-pink sm:w-6 sm:h-6" />
              </div>

              {/* Headline */}
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl leading-tight text-spa-plum">
                Spa days<br />
                <span className="text-spa-pink">for two.</span>
              </h2>

              {/* Body */}
              <p className="mt-4 text-spa-muted leading-relaxed">
                Simple rituals, soothing playlists, and printable spa-night menus—because you deserve a breather.
              </p>

              {/* CTAs */}
              <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                <a
                  href="#"
                  className="btn-primary inline-flex items-center justify-center sm:justify-start gap-2 w-full sm:w-fit"
                >
                  <Sparkles size={18} />
                  Plan a spa night
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center sm:justify-start gap-2 text-spa-muted hover:text-spa-pink transition-colors duration-200"
                >
                  <Music size={18} />
                  Browse the playlist
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
