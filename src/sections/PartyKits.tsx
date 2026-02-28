import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, ShoppingBag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const kits = [
  {
    id: 1,
    name: 'Blush Bloom Party Set',
    description: 'Banners, toppers, invites',
    price: '$18',
    image: '/images/kit_grid_01.jpg',
    isNew: true,
  },
  {
    id: 2,
    name: 'Lavender Brunch Bundle',
    description: 'Menus, place cards, garland',
    price: '$22',
    image: '/images/kit_grid_02.jpg',
    isNew: false,
  },
  {
    id: 3,
    name: 'Minimal Monogram Pack',
    description: 'Clean typography, neutral palette',
    price: '$16',
    image: '/images/kit_grid_03.jpg',
    isNew: false,
  },
  {
    id: 4,
    name: 'Garden Tea Favor Set',
    description: 'Favor tags, wrap labels, stickers',
    price: '$14',
    image: '/images/kit_grid_04.jpg',
    isNew: false,
  },
  {
    id: 5,
    name: 'Midnight Floral Invite',
    description: 'Statement invite + envelope liner',
    price: '$12',
    image: '/images/kit_grid_05.jpg',
    isNew: false,
  },
  {
    id: 6,
    name: 'DIY Balloon Garland Guide',
    description: 'Step-by-step + shopping list',
    price: 'Free',
    image: '/images/kit_grid_06.jpg',
    isNew: false,
    isFree: true,
  },
];

export default function PartyKits() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

    const cards = grid.querySelectorAll('.kit-card');

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        header,
        { y: '4vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // Cards animation
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: '8vh', scale: 0.98, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="kits"
      className="relative w-full py-20 lg:py-28 bg-spa-lavender z-40"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-12 lg:mb-16">
          <h2 className="font-serif text-[clamp(32px,4vw,52px)] leading-tight text-spa-plum">
            Printable <span className="text-spa-pink">party kits</span>
          </h2>
          <p className="mt-4 text-spa-muted max-w-lg leading-relaxed">
            Everything you need to host without the stress—just print, cut, and celebrate.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {kits.map((kit) => (
            <div
              key={kit.id}
              className="kit-card group relative bg-white rounded-[24px] overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={kit.image}
                  alt={kit.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {kit.isNew && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-spa-pink text-white text-xs font-medium rounded-full">
                    New
                  </span>
                )}
                {kit.isFree && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-spa-purple text-white text-xs font-medium rounded-full">
                    Free
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl text-spa-plum group-hover:text-spa-pink transition-colors duration-300">
                  {kit.name}
                </h3>
                <p className="mt-1 text-sm text-spa-muted">
                  {kit.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-serif text-2xl text-spa-plum">
                    {kit.price}
                  </span>
                  <button className="flex items-center gap-2 px-4 py-2 bg-spa-lavender text-spa-plum text-sm font-medium rounded-full hover:bg-spa-pink hover:text-white transition-all duration-300">
                    {kit.isFree ? (
                      <>
                        <Download size={16} />
                        Download
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={16} />
                        Add to cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
