import { Link, useSearchParams } from "react-router-dom";

interface Suite {
  id: string;
  type: string;
  title: string;
  italic: string;
  tagline: string;
  summary: string;
  description: string;
  includes: string[];
  payhip: string;
  image?: string;
}

const SUITES: Suite[] = [
  {
    id: "baby_shower",
    type: "baby-shower",
    title: "Baby",
    italic: "Shower",
    tagline: "A spa-inspired celebration for the mama-to-be.",
    summary:
      "Designed for hosts who want a beautiful, intentional baby shower that feels elevated, nurturing, and meaningful.",
    description:
      "The Baby Shower Suite helps you create a warm, beautiful gathering centered on celebrating motherhood with softness, detail, and connection.",
    includes: [
      "Planning guidance",
      "Decor inspiration",
      "Host support tools",
      "Celebration ideas",
    ],
    payhip: "https://payhip.com/b/lZ6WG",
    image: "/images/suites/baby-shower.jpg",
  },
  {
    id: "gender_reveal",
    type: "gender-reveal",
    title: "Gender",
    italic: "Reveal",
    tagline: "A memorable reveal experience, designed with intention.",
    summary:
      "Created for families who want a reveal that feels beautiful, polished, and emotionally meaningful.",
    description:
      "The Gender Reveal Suite helps you build a moment that feels joyful, elevated, and worthy of the memory you’re creating.",
    includes: [
      "Reveal planning ideas",
      "Styling inspiration",
      "Host guidance",
      "Celebration details",
    ],
    payhip: "https://payhip.com/b/jLSWB",
    image: "/images/suites/gender-reveal.jpg",
  },
  {
    id: "sip_and_see",
    type: "sip-and-see",
    title: "Sip",
    italic: "& See",
    tagline: "Welcome baby with warmth, beauty, and connection.",
    summary:
      "Perfect for a softer, more intimate gathering where loved ones come together to meet and celebrate baby.",
    description:
      "The Sip & See Suite is designed to help you host a beautiful welcome gathering that feels calm, thoughtful, and genuinely special.",
    includes: [
      "Gathering guidance",
      "Hosting ideas",
      "Decor inspiration",
      "Planning support",
    ],
    payhip: "https://payhip.com/b/WbdBP",
    image: "/images/suites/sip-and-see.jpg",
  },
  {
    id: "pregnancy_announcement",
    type: "pregnancy-announcement",
    title: "Pregnancy",
    italic: "Announcement",
    tagline: "Share your news beautifully.",
    summary:
      "For mamas and families who want to announce a pregnancy in a way that feels elevated, memorable, and heartfelt.",
    description:
      "The Pregnancy Announcement Suite helps turn your announcement into a beautiful experience rather than just a quick share.",
    includes: [
      "Announcement inspiration",
      "Creative ideas",
      "Planning guidance",
      "Meaningful presentation tools",
    ],
    payhip: "https://payhip.com/b/j6hfL",
    image: "/images/suites/pregnancy-announcement.jpg",
  },
  {
    id: "push_present_pampering",
    type: "push-present-pampering",
    title: "Push Present",
    italic: "& Pampering",
    tagline: "Honor motherhood with softness, rest, and love.",
    summary:
      "Made for celebrating the mother herself with appreciation, beauty, and nurturing energy.",
    description:
      "The Push Present & Pampering Suite centers the mama and creates a celebration around care, gratitude, and intentional pampering.",
    includes: [
      "Pampering inspiration",
      "Gift ideas",
      "Planning support",
      "Experience guidance",
    ],
    payhip: "https://payhip.com/b/Ldkxz",
    image: "/images/suites/push-present-pampering.jpg",
  },
];

const TYPE_LABELS: Record<string, string> = {
  "baby-shower": "Baby Shower",
  "gender-reveal": "Gender Reveal",
  "sip-and-see": "Sip & See",
  "pregnancy-announcement": "Pregnancy Announcement",
  "push-present-pampering": "Push Present & Pampering",
};

function BackgroundImage({
  image,
  alt,
}: {
  image?: string;
  alt: string;
}) {
  if (!image) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-spa-lavender via-spa-cream to-spa-blush" />
    );
  }

  return (
    <img
      src={image}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}

export default function CelebrationSuites() {
  const [searchParams] = useSearchParams();
  const selectedType = searchParams.get("type");

  const filteredSuites = selectedType
    ? SUITES.filter((suite) => suite.type === selectedType)
    : SUITES;

  const selectedSuite =
    filteredSuites.length === 1 ? filteredSuites[0] : null;

  if (selectedSuite) {
    return (
      <div className="min-h-screen bg-spa-cream font-sans">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <BackgroundImage
            image={selectedSuite.image}
            alt={`${selectedSuite.title} ${selectedSuite.italic}`}
          />

          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/60" />

          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white">
            <span className="inline-block mb-4 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-xs tracking-[0.25em] uppercase font-semibold">
              {TYPE_LABELS[selectedSuite.type]}
            </span>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4 font-serif">
              {selectedSuite.title}{" "}
              <span className="italic">{selectedSuite.italic}</span>
            </h1>

            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-4 text-white/95">
              {selectedSuite.tagline}
            </p>

            <p className="text-base md:text-lg max-w-2xl mx-auto mb-8 text-white/85 leading-relaxed">
              {selectedSuite.summary}
            </p>

            <div className="max-w-2xl mx-auto mb-10">
              <p className="text-sm md:text-base text-white/85 leading-relaxed">
                {selectedSuite.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={selectedSuite.payhip}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-spa-charcoal text-sm font-semibold shadow-elegant hover:opacity-95 transition"
              >
                Purchase This Suite
              </a>

              <Link
                to="/suites"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white text-white text-sm font-semibold hover:bg-white/10 transition"
              >
                View All Suites
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs tracking-[0.25em] uppercase text-spa-purple font-semibold">
              What This Suite Includes
            </span>

            <h2 className="text-4xl font-bold text-spa-charcoal mt-3 mb-10 font-serif">
              Everything You Need to Plan Beautifully
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 text-left">
              {selectedSuite.includes.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-spa-light bg-spa-cream px-5 py-4 text-spa-charcoal font-medium"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-10">
              <a
                href={selectedSuite.payhip}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-spa-purple text-white text-sm font-semibold hover:bg-[#7d5fa0] transition-colors"
              >
                Get This Suite
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-spa-cream font-sans">
      <section className="relative overflow-hidden bg-gradient-to-br from-spa-lavender via-spa-cream to-spa-blush py-24 px-6 text-center">
        <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-spa-pink opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-spa-purple opacity-10 blur-3xl" />

        <div className="relative max-w-4xl mx-auto">
          <span className="inline-block mb-4 text-xs tracking-[0.25em] uppercase text-spa-purple font-semibold">
            Celebration Suites
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-spa-charcoal leading-tight mb-6 font-serif">
            Choose the Suite
            <br />
            <span className="italic text-spa-purple">That Fits Your Moment</span>
          </h1>

          <p className="text-lg text-spa-gray max-w-2xl mx-auto mb-10 leading-relaxed">
            Browse the full Spa-Pregio™ suite collection and choose the experience
            that best fits the celebration you’re planning.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/start"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-spa-purple text-white text-sm font-semibold tracking-wide shadow-elegant hover:bg-[#7d5fa0] transition-colors"
            >
              Start My Celebration
            </Link>

            <Link
              to="/events"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-spa-purple text-spa-purple text-sm font-semibold tracking-wide hover:bg-spa-purple hover:text-white transition-colors"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {SUITES.map((suite) => (
            <div
              key={suite.id}
              className="rounded-3xl overflow-hidden bg-white shadow-elegant border border-spa-light flex flex-col"
            >
              <div className="relative h-56">
                <BackgroundImage
                  image={suite.image}
                  alt={`${suite.title} ${suite.italic}`}
                />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-3xl font-bold font-serif">
                    {suite.title} <span className="italic">{suite.italic}</span>
                  </h3>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <p className="text-spa-gray leading-relaxed mb-6">
                  {suite.summary}
                </p>

                <div className="mt-auto flex flex-col gap-3">
                  <Link
                    to={`/suites?type=${suite.type}`}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-spa-purple text-spa-purple text-sm font-semibold hover:bg-spa-purple hover:text-white transition-colors"
                  >
                    View Suite
                  </Link>

                  <a
                    href={suite.payhip}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-spa-purple text-white text-sm font-semibold hover:bg-[#7d5fa0] transition-colors"
                  >
                    Purchase Suite
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
