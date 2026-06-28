import { Link } from "react-router-dom";
import EnterpriseBanner from "../components/EnterpriseBanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-spa-cream font-sans">

      {/* HERO */}
      <section className="relative overflow-hidden bg-spa-cream">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center px-6 py-16 md:py-24">

          {/* Text */}
          <div className="text-center md:text-left">
            <span className="inline-block mb-4 text-xs tracking-[0.25em] uppercase text-spa-purple font-semibold">
              The Celebration Suite Movement
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-spa-charcoal leading-[1.08] mb-6 font-serif">
              Where expecting moms celebrate together —
              <br className="hidden md:block" />
              <span className="italic text-spa-pink"> and a whole community shows up.</span>
            </h1>

            <p className="text-lg text-spa-gray max-w-md mx-auto md:mx-0 mb-10 leading-relaxed">
              You don't have to do pregnancy alone. And you shouldn't.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/suites"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-spa-purple text-white text-sm font-semibold tracking-wide shadow-elegant hover:bg-[#7d5fa0] transition-colors"
              >
                Shop Celebration Suites
              </Link>
              <Link
                to="/find-vendors"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white border border-spa-purple text-spa-purple text-sm font-semibold tracking-wide hover:bg-spa-blush transition-colors"
              >
                Find Local Vendors
              </Link>
            </div>
          </div>

          {/* Photo */}
          <div className="relative">
            <div className="absolute -left-4 -top-4 w-full h-full bg-gradient-to-br from-spa-blush to-spa-light rounded-t-[140px] rounded-b-3xl" />
            <div className="relative overflow-hidden rounded-t-[130px] rounded-b-3xl shadow-elegant">
              <img
                src="/images/hero-mom.jpg"
                alt="Expectant mother in a Spa-Pregio robe, hands resting on her belly"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute bottom-6 -left-3 bg-white px-5 py-3 rounded-full shadow-elegant font-serif italic text-spa-purple text-base">
              <span className="not-italic font-semibold text-spa-charcoal">Real moms.</span> Real celebrations.
            </div>
          </div>

        </div>
      </section>

      {/* TWO PATHS */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

          <div className="rounded-3xl bg-spa-blush p-10 flex flex-col">
            <h2 className="text-2xl font-bold text-spa-charcoal mb-3 font-serif">
              For Moms & Hosts
            </h2>

            <p className="text-spa-gray leading-relaxed mb-6 flex-1">
              Planning a baby shower, gender reveal, sip-and-see, or push present?
              Start your celebration and we’ll guide you every step of the way.
            </p>

            <div className="flex flex-col gap-3">
              <Link to="/suites" className="text-center px-6 py-3 rounded-full bg-spa-purple text-white text-sm font-semibold hover:bg-[#7d5fa0] transition-colors">
                Shop Celebration Suites
              </Link>
              <Link to="/about" className="text-center px-6 py-3 rounded-full border border-spa-purple text-spa-purple text-sm font-semibold hover:bg-spa-blush transition-colors">
                Meet the Movement
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-spa-light p-10 flex flex-col">
            <h2 className="text-2xl font-bold text-spa-charcoal mb-3 font-serif">
              For Vendors & Partners
            </h2>

            <p className="text-spa-gray leading-relaxed mb-6 flex-1">
              Connect with hosts actively planning celebrations in your community
              and grow your business through Spa-Pregio™.
            </p>

            <div className="flex flex-col gap-3">
              <Link to="/vendors" className="text-center px-6 py-3 rounded-full bg-spa-charcoal text-white text-sm font-semibold hover:bg-[#555] transition-colors">
                Become a Vendor Partner
              </Link>
              <Link to="/ambassadors" className="text-center px-6 py-3 rounded-full border border-spa-charcoal text-spa-charcoal text-sm font-semibold hover:bg-spa-light transition-colors">
                Become a Suite Sister
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (UPDATED) */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs tracking-[0.25em] uppercase text-spa-purple font-semibold">
              Simple by Design
            </span>
            <h2 className="text-4xl font-bold text-spa-charcoal mt-3 font-serif">
              How Spa-Pregio Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose Your Celebration",
                desc: "Start with the milestone you’re planning.",
              },
              {
                step: "02",
                title: "Select Your Suite",
                desc: "Pick a curated experience designed for your moment.",
              },
              {
                step: "03",
                title: "Launch Your Event",
                desc: "Create your event, invite guests, and bring it to life.",
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

          <div className="text-center mt-12">
            <Link to="/suites" className="inline-block px-8 py-4 rounded-full bg-spa-purple text-white text-sm font-semibold shadow-elegant hover:bg-[#7d5fa0] transition-colors">
              Start Your Celebration
            </Link>
          </div>
        </div>
      </section>

      <EnterpriseBanner />

    </div>
  );
}
