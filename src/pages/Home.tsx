import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fdf9f6] font-sans">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fdf4ee] via-[#fdf9f6] to-[#f0ebe6] py-24 px-6 text-center">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#e8d5c4] opacity-30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-[#d4c5b5] opacity-20 blur-3xl" />

        <div className="relative max-w-3xl mx-auto">
          <span className="inline-block mb-4 text-xs tracking-[0.25em] uppercase text-[#9e7e65] font-semibold">
            The Celebration Suite Movement™
          </span>
          <h1
            className="text-5xl md:text-6xl font-bold text-[#3b2a1e] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Elevated Pregnancy Celebrations,{" "}
            <span className="italic text-[#9e7e65]">Designed With Intention</span>
          </h1>
          <p className="text-lg text-[#6b5044] max-w-xl mx-auto mb-10 leading-relaxed">
            Spa-Pregio™ Celebration Suites help families create beautiful,
            spa-inspired gatherings for every milestone — from baby showers to
            sip-and-sees and beyond.
          </p>

          {/* DUAL CTA — immediately signals two audiences */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/suites"
              className="px-8 py-4 rounded-full bg-[#9e7e65] text-white text-sm font-semibold tracking-wide shadow-md hover:bg-[#7d6250] transition-colors"
            >
              🌸 I'm Celebrating a Momma
            </Link>
            <Link
              to="/vendors"
              className="px-8 py-4 rounded-full border-2 border-[#9e7e65] text-[#9e7e65] text-sm font-semibold tracking-wide hover:bg-[#9e7e65] hover:text-white transition-colors"
            >
              💼 I'm a Vendor / Partner
            </Link>
          </div>
        </div>
      </section>

      {/* ── TWO PATHS — crystal-clear audience split ── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

          {/* Momma path */}
          <div className="rounded-3xl bg-[#fdf4ee] p-10 flex flex-col">
            <div className="text-4xl mb-4">🌸</div>
            <h2
              className="text-2xl font-bold text-[#3b2a1e] mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              For Moms & Hosts
            </h2>
            <p className="text-[#6b5044] leading-relaxed mb-6 flex-1">
              Planning a baby shower, gender reveal, sip-and-see, or push
              present? Our digital Celebration Suites give you everything you
              need to host a meaningful, spa-inspired gathering — starting at{" "}
              <strong>$27</strong>.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                to="/suites"
                className="text-center px-6 py-3 rounded-full bg-[#9e7e65] text-white text-sm font-semibold hover:bg-[#7d6250] transition-colors"
              >
                Explore Celebration Suites
              </Link>
              <Link
                to="/memberships"
                className="text-center px-6 py-3 rounded-full border border-[#9e7e65] text-[#9e7e65] text-sm font-semibold hover:bg-[#fdf4ee] transition-colors"
              >
                Join the Community
              </Link>
            </div>
          </div>

          {/* Vendor path */}
          <div className="rounded-3xl bg-[#f0ebe6] p-10 flex flex-col">
            <div className="text-4xl mb-4">💼</div>
            <h2
              className="text-2xl font-bold text-[#3b2a1e] mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              For Vendors & Partners
            </h2>
            <p className="text-[#6b5044] leading-relaxed mb-6 flex-1">
              Are you a doula, photographer, wellness pro, beauty professional,
              or event venue? Connect with hosts who are actively planning
              Spa-Pregio™ gatherings in your community.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                to="/vendors"
                className="text-center px-6 py-3 rounded-full bg-[#3b2a1e] text-white text-sm font-semibold hover:bg-[#5a3e2e] transition-colors"
              >
                Become a Vendor Partner
              </Link>
              <Link
                to="/ambassadors"
                className="text-center px-6 py-3 rounded-full border border-[#3b2a1e] text-[#3b2a1e] text-sm font-semibold hover:bg-[#f0ebe6] transition-colors"
              >
                Become a Suite Sister™
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IS SPA-PREGIO ── */}
      <section className="py-20 px-6 bg-[#fdf9f6]">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs tracking-[0.25em] uppercase text-[#9e7e65] font-semibold">
            Our Story
          </span>
          <h2
            className="text-4xl font-bold text-[#3b2a1e] mt-3 mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            A New Way to Celebrate Motherhood
          </h2>
          <p className="text-[#6b5044] leading-relaxed text-lg mb-4">
            Spa-Pregio™ is a trademarked celebration concept that blends the joy
            of pregnancy gatherings with the calm, nurturing atmosphere of a spa
            experience.
          </p>
          <p className="text-[#6b5044] leading-relaxed mb-8">
            Our Celebration Suites are beautifully designed digital planning
            kits that guide hosts through creating gatherings filled with
            meaningful connection, thoughtful details, and supportive community —
            whether in a living room, salon, wellness studio, or event venue.
          </p>
          <Link
            to="/about"
            className="inline-block px-8 py-3 rounded-full border-2 border-[#9e7e65] text-[#9e7e65] text-sm font-semibold hover:bg-[#9e7e65] hover:text-white transition-colors"
          >
            Meet the Founder
          </Link>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs tracking-[0.25em] uppercase text-[#9e7e65] font-semibold">
              Simple by Design
            </span>
            <h2
              className="text-4xl font-bold text-[#3b2a1e] mt-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              How Spa-Pregio Works
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose Your Celebration",
                desc: "Select a Celebration Suite designed for baby showers, gender reveals, sip-and-sees, push presents, and more.",
              },
              {
                step: "02",
                title: "Download Your Suite",
                desc: "Each suite includes planning materials, decor inspiration, activity ideas, and gathering guides — everything in one download.",
              },
              {
                step: "03",
                title: "Host Your Gathering",
                desc: "Bring loved ones together to celebrate motherhood through meaningful connection, gentle pampering, and supportive community.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center px-4">
                <div
                  className="text-6xl font-bold text-[#e8d5c4] mb-4 leading-none"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {step}
                </div>
                <h3 className="text-lg font-bold text-[#3b2a1e] mb-3">{title}</h3>
                <p className="text-[#6b5044] leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/suites"
              className="inline-block px-8 py-4 rounded-full bg-[#9e7e65] text-white text-sm font-semibold shadow-md hover:bg-[#7d6250] transition-colors"
            >
              Browse Celebration Suites — Starting at $27
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOSTING SPACES ── */}
      <section className="py-20 px-6 bg-[#fdf4ee]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs tracking-[0.25em] uppercase text-[#9e7e65] font-semibold">
            Gather Anywhere
          </span>
          <h2
            className="text-4xl font-bold text-[#3b2a1e] mt-3 mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Host a Spa-Pregio Gathering
          </h2>
          <p className="text-[#6b5044] mb-10 leading-relaxed">
            Spa-Pregio events can take place in many types of spaces — from cozy
            homes to beautiful venues.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["Homes", "Churches", "Wellness Studios", "Salons & Spas", "Event Venues", "Boutique Spaces"].map(
              (space) => (
                <span
                  key={space}
                  className="px-5 py-2 rounded-full bg-white border border-[#d4c5b5] text-[#6b5044] text-sm font-medium"
                >
                  {space}
                </span>
              )
            )}
          </div>
          <Link
            to="/suites"
            className="inline-block px-8 py-3 rounded-full bg-[#9e7e65] text-white text-sm font-semibold hover:bg-[#7d6250] transition-colors"
          >
            Start Planning Your Gathering
          </Link>
        </div>
      </section>

      {/* ── VENDOR PARTNERS ── */}
      <section className="py-20 px-6 bg-[#3b2a1e]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs tracking-[0.25em] uppercase text-[#c4a882] font-semibold">
            Vendor Network
          </span>
          <h2
            className="text-4xl font-bold text-white mt-3 mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Partner With Spa-Pregio™
          </h2>
          <p className="text-[#c4a882] leading-relaxed mb-10 max-w-xl mx-auto">
            We welcome vendors who support mothers and growing families —
            chiropractors, doulas, photographers, wellness practitioners,
            maternity boutiques, beauty professionals, and event venues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/vendors"
              className="px-8 py-4 rounded-full bg-[#9e7e65] text-white text-sm font-semibold hover:bg-[#c4a882] transition-colors"
            >
              Become a Vendor Partner
            </Link>
            <Link
              to="/ambassadors"
              className="px-8 py-4 rounded-full border-2 border-[#c4a882] text-[#c4a882] text-sm font-semibold hover:bg-[#c4a882] hover:text-[#3b2a1e] transition-colors"
            >
              Become a Suite Sister™
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs tracking-[0.25em] uppercase text-[#9e7e65] font-semibold">
              Questions
            </span>
            <h2
              className="text-4xl font-bold text-[#3b2a1e] mt-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-6">
            {[
              {
                q: "Are Spa-Pregio Celebration Suites digital?",
                a: "Yes. Suites are digital downloads designed to help hosts plan and organize gatherings with ease.",
              },
              {
                q: "Is Spa-Pregio a physical spa?",
                a: "No. Spa-Pregio is a celebration concept that brings spa-inspired elements into pregnancy gatherings.",
              },
              {
                q: "Can I host a Spa-Pregio event in my home?",
                a: "Absolutely. Many gatherings are hosted in homes, but they can also be held in churches, salons, wellness studios, or event venues.",
              },
              {
                q: "Can vendors participate in events?",
                a: "Yes. Vendors who support pregnancy, wellness, and families can join as partners through our Vendor Dashboard.",
              },
              {
                q: "Is Spa-Pregio available nationwide?",
                a: "Digital suites are available anywhere in the US. Vendor participation and local events will expand as the community grows.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-[#e8d5c4] pb-6">
                <h3 className="font-bold text-[#3b2a1e] mb-2">{q}</h3>
                <p className="text-[#6b5044] leading-relaxed text-sm">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#fdf4ee] to-[#f0ebe6] text-center">
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-4xl font-bold text-[#3b2a1e] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Celebrate Motherhood With Intention
          </h2>
          <p className="text-[#6b5044] mb-10 leading-relaxed">
            Whether you're planning a gathering or looking to support mothers in
            your community, Spa-Pregio™ offers a new way to celebrate life's
            most meaningful milestones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/suites"
              className="px-8 py-4 rounded-full bg-[#9e7e65] text-white text-sm font-semibold shadow-md hover:bg-[#7d6250] transition-colors"
            >
              Explore Celebration Suites
            </Link>
            <Link
              to="/memberships"
              className="px-8 py-4 rounded-full border-2 border-[#9e7e65] text-[#9e7e65] text-sm font-semibold hover:bg-[#9e7e65] hover:text-white transition-colors"
            >
              Join the Community
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
