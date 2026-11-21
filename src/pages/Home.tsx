import { Link } from "react-router-dom";
import { Sparkles, CalendarHeart, Users } from "lucide-react";
import EnterpriseBanner from "../components/EnterpriseBanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-spa-cream font-sans pt-16 lg:pt-20">

      {/* HERO */}
      <section className="relative overflow-hidden bg-spa-cream">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center px-6 py-12 md:py-20">

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

            <p className="text-lg text-spa-gray max-w-md mx-auto md:mx-0 mb-8 leading-relaxed">
              Curated digital celebration suites, mama-friendly local vendors, and community events—all in one place.
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
      <section className="pt-14 pb-8 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

          <div className="rounded-3xl bg-spa-blush p-8 sm:p-10 flex flex-col">
            <h2 className="text-2xl font-bold text-spa-charcoal mb-3 font-serif">
              For Moms &amp; Hosts
            </h2>

            <p className="text-spa-gray leading-relaxed mb-6 flex-1">
              Planning a baby shower, gender reveal, sip-and-see, or push present?
              Pick a digital celebration suite, invite guests, and book trusted local pros in minutes.
            </p>

            <div className="flex flex-col gap-3">
              <Link to="/suites" className="text-center px-6 py-3 rounded-full bg-spa-purple text-white text-sm font-semibold hover:bg-[#7d5fa0] transition-colors">
                Shop Celebration Suites
              </Link>
              <Link to="/events" className="text-center px-6 py-3 rounded-full border border-spa-purple text-spa-purple text-sm font-semibold hover:bg-white/60 transition-colors">
                Browse Local Events
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-spa-light p-8 sm:p-10 flex flex-col">
            <h2 className="text-2xl font-bold text-spa-charcoal mb-3 font-serif">
              For Vendors &amp; Partners
            </h2>

            <p className="text-spa-gray leading-relaxed mb-6 flex-1">
              Claim your free local directory profile, post mom-to-be events and workshops,
              and connect with expecting families actively planning in your city.
            </p>

            <div className="flex flex-col gap-3">
              <Link to="/vendors" className="text-center px-6 py-3 rounded-full bg-spa-charcoal text-white text-sm font-semibold hover:bg-[#555] transition-colors">
                Claim or List Your Business
              </Link>
              <Link to="/ambassadors" className="text-center px-6 py-3 rounded-full border border-spa-charcoal text-spa-charcoal text-sm font-semibold hover:bg-white/60 transition-colors">
                Become a Suite Sister™
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="pt-10 pb-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto border-t border-stone-100 pt-14">
          <div className="text-center mb-12">
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
                desc: "Start with the milestone you’re planning—shower, reveal, or pampering day.",
              },
              {
                step: "02",
                title: "Select Your Suite",
                desc: "Pick a digital celebration suite and connect with mama-friendly local vendors.",
              },
              {
                step: "03",
                title: "Launch Your Event",
                desc: "Publish your event page, invite guests, and bring your celebration to life.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center px-4">
                <div className="text-5xl sm:text-6xl font-bold text-spa-pink mb-4 leading-none font-serif">
                  {step}
                </div>
                <h3 className="text-lg font-bold text-spa-charcoal mb-2">
                  {title}
                </h3>
                <p className="text-spa-gray leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/suites" className="inline-block px-8 py-4 rounded-full bg-spa-purple text-white text-sm font-semibold shadow-elegant hover:bg-[#7d5fa0] transition-colors">
              Start Your Celebration
            </Link>
          </div>
        </div>
      </section>

      {/* PLATFORM PILLARS */}
      <section className="py-14 px-6 bg-spa-cream/60 border-t border-stone-200/60">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
            <div className="w-10 h-10 rounded-full bg-spa-lavender flex items-center justify-center text-spa-purple mb-4">
              <Sparkles size={18} />
            </div>
            <h3 className="font-serif text-lg font-semibold text-spa-charcoal mb-1.5">
              Digital Celebration Suites
            </h3>
            <p className="text-sm text-spa-gray leading-relaxed">
              Ready-to-launch digital invites, shower themes, and planning kits designed for modern hosts.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
            <div className="w-10 h-10 rounded-full bg-spa-blush flex items-center justify-center text-spa-pink mb-4">
              <CalendarHeart size={18} />
            </div>
            <h3 className="font-serif text-lg font-semibold text-spa-charcoal mb-1.5">
              Local Vendors &amp; Events
            </h3>
            <p className="text-sm text-spa-gray leading-relaxed">
              Discover vetted prenatal spas, bakers, and event venues—or RSVP to local mom-to-be gatherings.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
            <div className="w-10 h-10 rounded-full bg-spa-lavender flex items-center justify-center text-spa-purple mb-4">
              <Users size={18} />
            </div>
            <h3 className="font-serif text-lg font-semibold text-spa-charcoal mb-1.5">
              Suite Sisters™ Community
            </h3>
            <p className="text-sm text-spa-gray leading-relaxed">
              Earn commissions by sharing digital suites and inviting favorite local businesses to join.
            </p>
          </div>
        </div>
      </section>

      <EnterpriseBanner />

    </div>
  );
}
