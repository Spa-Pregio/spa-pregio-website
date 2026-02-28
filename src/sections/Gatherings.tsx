import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar, ArrowRight, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    id: 1,
    name: 'Sunset Park Meetup',
    location: 'Brooklyn',
    date: 'Aug 12',
    type: 'in-person',
  },
  {
    id: 2,
    name: 'Mama Brunch Club',
    location: 'Austin',
    date: 'Aug 14',
    type: 'in-person',
  },
  {
    id: 3,
    name: 'Spa Night In',
    location: 'Virtual',
    date: 'Aug 18',
    type: 'virtual',
  },
  {
    id: 4,
    name: 'Baby Shower Swap',
    location: 'Seattle',
    date: 'Aug 20',
    type: 'in-person',
  },
];

export default function Gatherings() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const map = mapRef.current;
    const list = listRef.current;

    if (!section || !map || !list) return;

    const listItems = list.querySelectorAll('.event-item');

    const ctx = gsap.context(() => {
      // Map animation
      gsap.fromTo(
        map,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // List animation
      gsap.fromTo(
        list,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // List items stagger
      listItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          { y: '3vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: list,
              start: 'top 75%',
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
      id="gatherings"
      className="relative w-full py-20 lg:py-28 bg-spa-lavender z-40"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12">
          <h2 className="font-serif text-[clamp(32px,4vw,52px)] leading-tight text-spa-plum">
            Local <span className="text-spa-pink">gatherings</span>
          </h2>
          <p className="mt-4 text-spa-muted max-w-lg leading-relaxed">
            From park meetups to brunch circles—find your people.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Map Card */}
          <div
            ref={mapRef}
            className="lg:col-span-3 relative aspect-[4/3] lg:aspect-auto lg:min-h-[400px] rounded-[28px] overflow-hidden card-shadow bg-white"
          >
            {/* Stylized Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-spa-lavender via-white to-spa-pink/10">
              {/* Map Dots */}
              <div className="absolute inset-0">
                {/* Brooklyn */}
                <div className="absolute top-[35%] left-[75%] group">
                  <div className="relative">
                    <div className="w-4 h-4 bg-spa-pink rounded-full animate-pulse" />
                    <div className="absolute -inset-2 bg-spa-pink/20 rounded-full animate-ping" />
                  </div>
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="px-2 py-1 bg-spa-plum text-white text-xs rounded">Brooklyn</span>
                  </div>
                </div>
                {/* Austin */}
                <div className="absolute top-[60%] left-[45%] group">
                  <div className="relative">
                    <div className="w-4 h-4 bg-spa-purple rounded-full" />
                    <div className="absolute -inset-2 bg-spa-purple/20 rounded-full" />
                  </div>
                </div>
                {/* Seattle */}
                <div className="absolute top-[20%] left-[15%] group">
                  <div className="relative">
                    <div className="w-4 h-4 bg-spa-purple rounded-full" />
                    <div className="absolute -inset-2 bg-spa-purple/20 rounded-full" />
                  </div>
                </div>
                {/* Virtual */}
                <div className="absolute top-[45%] left-[60%] group">
                  <div className="relative">
                    <div className="w-4 h-4 bg-spa-pink/60 rounded-full border-2 border-dashed border-spa-pink" />
                  </div>
                </div>
              </div>
              
              {/* Map Labels */}
              <div className="absolute bottom-6 left-6 flex items-center gap-4 text-sm text-spa-muted">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-spa-pink rounded-full" />
                  <span>In-person</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-spa-purple rounded-full" />
                  <span>Virtual</span>
                </div>
              </div>
            </div>
          </div>

          {/* Event List Card */}
          <div
            ref={listRef}
            className="lg:col-span-2 bg-white rounded-[28px] p-6 lg:p-8 card-shadow"
          >
            <div className="flex items-center gap-2 mb-6">
              <Calendar size={20} className="text-spa-pink" />
              <h3 className="font-serif text-xl text-spa-plum">Upcoming Events</h3>
            </div>

            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="event-item flex items-center justify-between p-4 rounded-2xl bg-spa-lavender/50 hover:bg-spa-lavender transition-colors duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      event.type === 'virtual' ? 'bg-spa-purple/10' : 'bg-spa-pink/10'
                    }`}>
                      {event.type === 'virtual' ? (
                        <Users size={18} className="text-spa-purple" />
                      ) : (
                        <MapPin size={18} className="text-spa-pink" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-spa-plum group-hover:text-spa-pink transition-colors">
                        {event.name}
                      </p>
                      <p className="text-sm text-spa-muted">
                        {event.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-spa-pink">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#"
              className="flex items-center justify-center gap-2 mt-6 w-full py-3 bg-spa-plum text-white rounded-full hover:bg-spa-pink transition-colors duration-300"
            >
              <Users size={18} />
              Host your own
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
