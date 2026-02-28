import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;

    if (!section || !card) return;

    const image = card.querySelector('.product-image');
    const content = card.querySelector('.product-content');

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(card, { opacity: 0, y: 40 });
      gsap.set(image, { opacity: 0, x: -30 });
      gsap.set(content?.children || [], { opacity: 0, y: 20 });

      // Scroll-driven animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 20%',
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
      className="relative w-full py-16 sm:py-20 lg:py-28 bg-spa-lavender z-10"
    >
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #2A1F38 0, #2A1F38 1px, transparent 0, transparent 50%)`,
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Product Card */}
        <div
          ref={cardRef}
          className="relative bg-white rounded-2xl lg:rounded-[28px] overflow-hidden card-shadow"
        >
          <div className="grid lg:grid-cols-2">
            {/* Image Side */}
            <div className="product-image relative aspect-[4/3] lg:aspect-auto lg:min-h-[400px] xl:min-h-[500px]">
              <img
                src="/images/product_blush_bloom.jpg"
                alt="Blush Bloom Party Set"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Content Side */}
            <div className="product-content flex flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-12 border-t lg:border-t-0 lg:border-l border-spa-plum/5">
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-spa-muted">
                  Featured Kit
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-spa-pink/10 text-spa-pink text-xs font-medium rounded-full">
                  <Sparkles size={12} />
                  New
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl leading-tight text-spa-plum">
                Blush Bloom<br />Party Set
              </h2>

              {/* Body */}
              <p className="mt-4 text-spa-muted leading-relaxed">
                Invites, banners, cupcake toppers, and favor tags—print-ready and mom-approved.
              </p>

              {/* Price */}
              <p className="font-serif text-2xl sm:text-3xl text-spa-plum mt-6">$18</p>

              {/* CTA */}
              <a
                href="#kits"
                className="btn-primary inline-flex items-center justify-center sm:justify-start gap-2 w-full sm:w-fit mt-6"
              >
                <Download size={18} />
                Download now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
