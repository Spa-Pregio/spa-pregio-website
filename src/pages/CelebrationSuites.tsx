import { Link, useSearchParams } from "react-router-dom";

interface Suite {
  id: string;
  type: string;
  title: string;
  italic: string;
  accent: string;
  overlayDark: string;
  overlayBottom: string;
  tagline: string;
  description: string;
  includes: string[];
  payhip: string;
}

const SUITES: Suite[] = [
  {
    id: "baby_shower",
    type: "baby-shower",
    title: "Baby",
    italic: "Shower",
    accent: "from-spa-lavender to-spa-blush",
    overlayDark: "from-spa-purple/20",
    overlayBottom: "to-spa-blush/30",
    tagline: "A beautiful gathering to celebrate the mama-to-be.",
    description:
      "A spa-inspired digital planning suite designed to help you host a meaningful, elevated baby shower with ease.",
    includes: [
      "Planning guidance",
      "Decor inspiration",
      "Activity ideas",
      "Host support tools",
    ],
    payhip: "https://payhip.com/b/lZ6WG",
  },
  {
    id: "gender_reveal",
    type: "gender-reveal",
    title: "Gender",
    italic: "Reveal",
    accent: "from-spa-blush to-spa-lavender",
    overlayDark: "from-spa-pink/20",
    overlayBottom: "to-spa-lavender/30",
    tagline: "Reveal the moment with softness, joy, and intention.",
    description:
      "A curated digital suite to help you create a memorable gender reveal experience with beauty and ease.",
    includes: [
      "Reveal planning ideas",
      "Styling inspiration",
      "Celebration details",
      "Host guidance",
    ],
    payhip: "https://payhip.com/b/jLSWB",
  },
  {
    id: "sip_and_see",
    type: "sip-and-see",
    title: "Sip",
    italic: "& See",
    accent: "from-spa-cream to-spa-blush",
    overlayDark: "from-spa-charcoal/10",
    overlayBottom: "to-spa-pink/20",
    tagline: "Welcome baby with warmth, beauty, and connection.",
    description:
      "A digital planning suite for hosting a gentle, beautiful sip-and-see gathering with loved ones.",
    includes: [
      "Event planning support",
      "Decor inspiration",
      "Hosting ideas",
      "Gathering guidance",
    ],
    payhip: "https://payhip.com/b/WbdBP",
  },
  {
    id: "pregnancy_announcement",
    type: "pregnancy-announcement",
    title: "Pregnancy",
    italic: "Announcement",
    accent: "from-spa-lavender to-spa-cream",
    overlayDark: "from-spa-purple/15",
    overlayBottom: "to-spa-cream/20",
    tagline: "Share your news in an elevated, memorable way.",
    description:
      "A beautiful digital suite for announcing your pregnancy with intention, softness, and style.",
    includes: [
      "Announcement inspiration",
      "Creative ideas",
      "Planning support",
      "Meaningful presentation tools",
    ],
    payhip: "https://payhip.com/b/j6hfL",
  },
  {
    id: "push_present_pampering",
    type: "push-present-pampering",
    title: "Push Present",
    italic: "& Pampering",
    accent: "from-spa-blush to-spa-cream",
    overlayDark: "from-spa-pink/15",
    overlayBottom: "to-spa-cream/30",
    tagline: "Honor motherhood with softness, rest, and love.",
    description:
      "A nurturing digital suite designed around pampering, celebration, and making mama feel deeply seen.",
    includes: [
      "Pampering inspiration",
      "Gift ideas",
      "Celebration planning support",
      "Intentional experience guidance",
    ],
    payhip: "https://payhip.com/b/Ldkxz",
  },
];

const TYPE_LABELS: Record<string, string> = {
  "baby-shower": "Baby Shower",
  "gender-reveal": "Gender Reveal",
  "sip-and-see": "Sip & See",
  "pregnancy-announcement": "Pregnancy Announcement",
  "push-present-pampering": "Push Present & Pampering",
};

export default function CelebrationSuites() {
  const [searchParams] = useSearchParams();
  const selectedType = searchParams.get("type");

  const filteredSuites = selectedType
    ? SUITES.filter((suite) => suite.type === selectedType)
    : SUITES;

  const selectedTypeLabel = selectedType
    ? TYPE_LABELS[selectedType] || "Your Celebration"
    : null;

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
            Beautifully Designed
            <br />
            <span className="italic text-spa-purple">For Every Milestone</span>
          </h1>

          <p className="text-lg text-spa-gray max-w-2xl mx-auto mb-10 leading-relaxed">
            Choose a Spa-Pregio™ Celebration Suite and begin creating a meaningful,
            spa-inspired experience for the mama you’re celebrating.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/start"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-spa-purple text-white text-sm font-semibold tracking-wide shadow-elegant hover:bg-[#7d5fa0] transition-colors"
            >
              Start My Celebration
            </Link>

            <Link
              to="/community"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-spa-purple text-spa-purple text-sm font-semibold tracking-wide hover:bg-spa-purple hover:text-white transition-colors"
            >
              Join the Community
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {selectedType && (
            <div className="max-w-4xl mx-auto text-center mb-12">
              <span className="text-xs tracking-[0.25em] uppercase text-spa-purple font-semibold">
                Curated for You
              </span>
              <h2 className="text-4xl font-bold text-spa-charcoal mt-3 mb-4 font-serif">
                {selectedTypeLabel}
              </h2>
              <p className="text-spa-gray leading-relaxed">
                We’ve filtered these suites to match the celebration you selected.
              </p>

              <div className="mt-6">
                <Link
                  to="/suites"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-spa-purple text-spa-purple text-sm font-semibold hover:bg-spa-purple hover:text-white transition-colors"
                >
                  View All Suites
                </Link>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredSuites.map((suite) => (
              <div
                key={suite.id}
                className="rounded-3xl overflow-hidden bg-white shadow-elegant hover:shadow-xl transition-all duration-300 flex flex-col border border-spa-light"
              >
                <div
                  className={`relative h-56 bg-gradient-to-br ${suite.accent} p-8 flex items-end`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${suite.overlayDark} ${suite.overlayBottom}`} />
                  <div className="relative z-10">
                    <span className="inline-block mb-3 px-3 py-1 rounded-full bg-white/80 text-spa-charcoal text-xs font-semibold uppercase tracking-wide">
                      Starting at $27
                    </span>
                    <h3 className="text-3xl font-bold text-spa-charcoal font-serif leading-tight">
                      {suite.title}{" "}
                      <span className="italic text-spa-purple">{suite.italic}</span>
                    </h3>
                    <p className="mt-2 text-sm text-spa-charcoal/80">
                      {suite.tagline}
                    </p>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <p className="text-spa-gray leading-relaxed mb-6">
                    {suite.description}
                  </p>

                  <div className="mb-8">
                    <h4 className="text-sm font-bold uppercase tracking-wide text-spa-charcoal mb-3">
                      Includes
                    </h4>
                    <ul className="space-y-2">
                      {suite.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-spa-gray"
                        >
                          <span className="mt-1 h-2 w-2 rounded-full bg-spa-purple flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto flex flex-col gap-3">
                    <a
                      href={suite.payhip}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full px-6 py-3 rounded-full bg-spa-purple text-white text-sm font-semibold hover:bg-[#7d5fa0] transition-colors"
                    >
                      Get This Suite
                    </a>

                    <Link
                      to="/events"
                      className="inline-flex items-center justify-center w-full px-6 py-3 rounded-full border border-spa-purple text-spa-purple text-sm font-semibold hover:bg-spa-purple hover:text-white transition-colors"
                    >
                      Create an Event
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredSuites.length === 0 && (
            <div className="max-w-3xl mx-auto text-center py-16">
              <h3 className="text-2xl font-bold text-spa-charcoal font-serif mb-4">
                No suites found for that selection
              </h3>
              <p className="text-spa-gray mb-6">
                Try browsing the full suite collection instead.
              </p>
              <Link
                to="/suites"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-spa-purple text-white text-sm font-semibold hover:bg-[#7d5fa0] transition-colors"
              >
                Browse All Suites
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 px-6 bg-spa-lavender">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs tracking-[0.25em] uppercase text-spa-purple font-semibold">
              Simple by Design
            </span>
            <h2 className="text-4xl font-bold text-spa-charcoal mt-3 font-serif">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose Your Celebration",
                desc: "Select the milestone you’re planning and let Spa-Pregio guide you.",
              },
              {
                step: "02",
                title: "Pick Your Suite",
                desc: "Choose the digital experience that best fits the moment you’re creating.",
              },
              {
                step: "03",
                title: "Bring It to Life",
                desc: "Use your suite to plan beautifully, gather loved ones, and celebrate with intention.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center px-4">
                <div className="text-6xl font-bold text-spa-pink mb-4 leading-none font-serif">
                  {step}
                </div>
                <h3 className="text-lg font-bold text-spa-charcoal mb-3">
                  {title}
                </h3>
                <p className="text-spa-gray leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-br from-spa-lavender to-spa-blush text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-spa-charcoal mb-4 font-serif">
            Celebrate Motherhood With Intention
          </h2>
          <p className="text-spa-gray mb-10 leading-relaxed">
            Start with a suite, then bring your gathering to life through thoughtful,
            beautiful planning.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/start"
              className="px-8 py-4 rounded-full bg-spa-purple text-white text-sm font-semibold shadow-elegant hover:bg-[#7d5fa0] transition-colors"
            >
              Start My Celebration
            </Link>

            <Link
              to="/events"
              className="px-8 py-4 rounded-full border-2 border-spa-purple text-spa-purple text-sm font-semibold hover:bg-spa-purple hover:text-white transition-colors"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
