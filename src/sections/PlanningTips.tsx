import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const tips = [
  'Start with a color story—then everything clicks.',
  'Print a day early; give yourself buffer time.',
  'Keep favors simple: a candle + a tag goes far.',
  'Delegate one task so you can actually enjoy the party.',
];

export default function PlanningTips() {
  const sectionRef = useRef<HTMLElement>(null);
  const tipsCardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const tipsCard = tipsCardRef.current;
    const image = imageRef.current;

    if (!section || !tipsCard || !image) return;

    const tipItems = tipsCard.querySelectorAll('.tip-item');

    const ctx = gsap.context(() => {
      // Tips card animation
      gsap.fromTo(
        tipsCard,
        { x: '-5vw', opacity: 0 },
        {
          x: 0,
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

      // Image animation
      gsap.fromTo(
        image,
        { x: '5vw', opacity: 0 },
        {
          x: 0,
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

      // Tip items stagger
      tipItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          { x: '-2vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: tipsCard,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
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
      id="tips"
      className="relative w-full py-20 lg:py-28 bg-spa-lavender z-40"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Tips Card */}
          <div
            ref={tipsCardRef}
            className="bg-white rounded-[28px] p-8 lg:p-10 card-shadow"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-spa-pink/10 flex items-center justify-center">
                <Lightbulb size={24} className="text-spa-pink" />
              </div>
              <h2 className="font-serif text-[clamp(28px,3vw,40px)] text-spa-plum">
                Planning tips
              </h2>
            </div>

            <div className="space-y-4">
              {tips.map((tip, index) => (
                <div
                  key={index}
                  className="tip-item flex items-start gap-4 p-4 rounded-2xl bg-spa-lavender/50 hover:bg-spa-lavender transition-colors duration-300"
                >
                  <div className="w-6 h-6 rounded-full bg-spa-pink flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={14} className="text-white" />
                  </div>
                  <p className="text-spa-plum leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 mt-8 text-spa-pink font-medium hover:gap-3 transition-all duration-300"
            >
              Read the full guide
              <ArrowRight size={18} />
            </a>
          </div>

          {/* Image Card */}
          <div
            ref={imageRef}
            className="relative rounded-[28px] overflow-hidden card-shadow min-h-[300px] lg:min-h-full"
          >
            <img
              src="/images/tips_photo.jpg"
              alt="Planning tips"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-spa-plum/30 via-transparent to-transparent" />
            
            {/* Floating Badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4">
              <p className="text-sm text-spa-muted">
                "The checklist made everything so much easier. I actually enjoyed planning my shower!"
              </p>
              <p className="text-sm font-medium text-spa-plum mt-2">— Sarah, 30 weeks</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
