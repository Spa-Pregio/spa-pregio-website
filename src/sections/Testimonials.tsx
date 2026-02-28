import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    quote: 'I printed the banner at home and got so many compliments!',
    author: 'Maya',
    detail: '32 weeks',
    rating: 5,
  },
  {
    id: 2,
    quote: 'The spa-night playlist is now my go-to.',
    author: 'Jenna',
    detail: 'mom of 2',
    rating: 5,
  },
  {
    id: 3,
    quote: 'Finally, a meetup that feels real—not salesy.',
    author: 'Linh',
    detail: 'first-time mom',
    rating: 5,
  },
  {
    id: 4,
    quote: 'The starter kit saved me hours of Pinterest scrolling.',
    author: 'Aisha',
    detail: '28 weeks',
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const carousel = carouselRef.current;

    if (!section || !header || !carousel) return;

    const cards = carousel.querySelectorAll('.testimonial-card');

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        header,
        { y: '3vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: '6vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: carousel,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 lg:py-28 bg-spa-lavender z-40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 lg:mb-16">
          <h2 className="font-serif text-[clamp(32px,4vw,52px)] leading-tight text-spa-plum">
            What moms are <span className="text-spa-pink">saying</span>
          </h2>
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className="relative">
          {/* Cards Container */}
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide lg:overflow-visible lg:justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial-card flex-shrink-0 w-[min(320px,80vw)] snap-center bg-white rounded-[24px] p-6 lg:p-8 card-shadow transition-all duration-500 ${
                  index === activeIndex ? 'scale-100 opacity-100' : 'scale-95 opacity-70'
                }`}
              >
                {/* Quote Icon */}
                <div className="w-10 h-10 rounded-full bg-spa-pink/10 flex items-center justify-center mb-4">
                  <Quote size={20} className="text-spa-pink" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-spa-pink text-spa-pink" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-spa-plum text-lg leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-spa-pink to-spa-purple flex items-center justify-center text-white font-medium">
                    {testimonial.author[0]}
                  </div>
                  <div>
                    <p className="font-medium text-spa-plum">{testimonial.author}</p>
                    <p className="text-sm text-spa-muted">{testimonial.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows (Desktop) */}
          <div className="hidden lg:flex justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white card-shadow flex items-center justify-center text-spa-plum hover:bg-spa-pink hover:text-white transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white card-shadow flex items-center justify-center text-spa-plum hover:bg-spa-pink hover:text-white transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-8 bg-spa-pink'
                    : 'bg-spa-plum/20 hover:bg-spa-plum/40'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
