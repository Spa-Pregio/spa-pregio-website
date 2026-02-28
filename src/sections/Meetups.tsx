import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Meetups() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const gallery = galleryRef.current;

    if (!section || !content || !gallery) return;

    const thumbs = gallery.querySelectorAll('.thumb-chip');

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(content.children, { opacity: 0, y: 30 });
      gsap.set(gallery, { opacity: 0, y: 40 });
      gsap.set(thumbs, { opacity: 0, y: 20 });

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
        .to(content.children, { 
          opacity: 1, 
          y: 0, 
          stagger: 0.08, 
          ease: 'power2.out' 
        }, 0)
        .to(gallery, { opacity: 1, y: 0, ease: 'power2.out' }, 0.1)
        .to(thumbs, { 
          opacity: 1, 
          y: 0, 
          stagger: 0.05, 
          ease: 'power2.out' 
        }, 0.2);

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="meetups"
      className="relative w-full py-16 sm:py-20 lg:py-28 bg-spa-lavender z-20"
    >
      {/* Background Blob */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[50vw] h-[60vh] pointer-events-none opacity-30">
        <div className="w-full h-full bg-spa-pink/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div ref={contentRef} className="order-2 lg:order-1">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight text-spa-plum">
              Meetups made<br />
              <span className="text-spa-pink">easy.</span>
            </h2>
            <p className="mt-4 sm:mt-6 text-spa-muted leading-relaxed max-w-md">
              Join local gatherings, share stories, and build your circle—one brunch at a time.
            </p>
            <a
              href="#gatherings"
              className="inline-flex items-center gap-2 mt-6 text-spa-pink font-medium hover:gap-3 transition-all duration-200"
            >
              <MapPin size={18} />
              Find an event near you
              <ArrowRight size={18} />
            </a>
          </div>

          {/* Right Content - Gallery */}
          <div ref={galleryRef} className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] rounded-2xl lg:rounded-[28px] overflow-hidden card-shadow">
              {/* Main Gallery Image */}
              <img
                src="/images/meetup_gallery_main.jpg"
                alt="Community meetup"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-spa-plum/50 via-transparent to-transparent" />

              {/* Caption */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-white/90 text-xs sm:text-sm">
                Recent moments from our community
              </div>

              {/* Thumbnail Chips */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex gap-2 sm:gap-3">
                <div className="thumb-chip w-14 h-14 sm:w-[72px] sm:h-[72px] rounded-xl sm:rounded-[14px] overflow-hidden border-2 border-white/80 shadow-lg">
                  <img
                    src="/images/meetup_thumb_01.jpg"
                    alt="Favor tag detail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="thumb-chip w-14 h-14 sm:w-[72px] sm:h-[72px] rounded-xl sm:rounded-[14px] overflow-hidden border-2 border-white/80 shadow-lg">
                  <img
                    src="/images/meetup_thumb_02.jpg"
                    alt="Cupcake topper"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="thumb-chip w-14 h-14 sm:w-[72px] sm:h-[72px] rounded-xl sm:rounded-[14px] overflow-hidden border-2 border-white/80 shadow-lg">
                  <img
                    src="/images/meetup_thumb_03.jpg"
                    alt="Floral arrangement"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
