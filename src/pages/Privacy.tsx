export default function Privacy() {
  return (
    <main className="min-h-screen bg-spa-cream">
      {/* Hero */}
      <section className="bg-white border-b border-spa-purple/10 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-spa-purple mb-3">Legal</p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-spa-charcoal mb-4">
            Privacy Policy
          </h1>
          <p className="text-spa-gray">Last updated: June 1, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-10">

          <div className="bg-white rounded-2xl p-8 border border-spa-purple/10">
            <p className="text-spa-gray leading-relaxed">
              At Spa-Pregio®, your privacy matters deeply to us. This Privacy Policy explains what
              information we collect, how we use it, and how we protect it. By using our website
              or purchasing our products, you agree to the practices described here.
            </p>
          </div>

          <PolicySection title="1. Information We Collect">
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>Contact information</strong> — your name and email address when you reach
                out to us via our contact form or email.
              </li>
              <li>
                <strong>Purchase information</strong> — when you buy a digital product, your
                transaction is processed through Payhip. We receive your name, email, and order
                details. Payment card information is handled entirely by Payhip and is never
                stored on our systems.
              </li>
              <li>
                <strong>Usage data</strong> — basic analytics such as pages visited and time
                spent on the site, collected through third-party tools (such as Google Analytics,
                if enabled). This data is anonymized and aggregated.
              </li>
              <li>
                <strong>Cookies</strong> — small files placed on your device to improve your
                browsing experience. You may disable cookies in your browser settings, though
                some features of the site may not function as expected.
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="2. How We Use Your Information">
            <ul className="list-disc pl-5 space-y-2">
              <li>To fulfill and deliver your digital product purchases</li>
              <li>To respond to your questions and support requests</li>
              <li>To send product updates or promotional emails (you may unsubscribe at any time)</li>
              <li>To improve our website and product offerings</li>
              <li>To administer the Suite Sisters™ affiliate program</li>
            </ul>
            <p className="mt-4">
              We will never sell, rent, or trade your personal information to third parties for
              their marketing purposes.
            </p>
          </PolicySection>

          <PolicySection title="3. Third-Party Services">
            <p>
              We use trusted third-party platforms to operate our business. Each has its own
              privacy policy:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>Payhip</strong> — handles digital product delivery and payment processing.
                See <a href="https://payhip.com/privacy" target="_blank" rel="noopener noreferrer" className="text-spa-purple underline">Payhip's Privacy Policy</a>.
              </li>
              <li>
                <strong>EmailJS</strong> — powers our contact form. Your message is transmitted
                securely through their service.
              </li>
              <li>
                <strong>Social media platforms</strong> — if you interact with us on Instagram,
                TikTok, Pinterest, or Facebook, those platforms' own privacy policies apply.
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="4. Data Retention">
            <p>
              We retain your information only as long as necessary to provide our services and
              comply with legal obligations. If you'd like your data removed, please contact us
              at <a href="mailto:support@spa-pregio.com" className="text-spa-purple underline">support@spa-pregio.com</a> and we will honor your request promptly.
            </p>
          </PolicySection>

          <PolicySection title="5. Children's Privacy">
            <p>
              Spa-Pregio® is not directed to children under the age of 13. We do not knowingly
              collect personal information from minors. If you believe a child has provided us
              with personal data, please contact us immediately.
            </p>
          </PolicySection>

          <PolicySection title="6. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. When we do, we'll revise the
              "Last updated" date at the top of this page. We encourage you to review this page
              periodically.
            </p>
          </PolicySection>

          <PolicySection title="7. Contact Us">
            <p>
              If you have any questions about this Privacy Policy, please reach out to us at{' '}
              <a href="mailto:support@spa-pregio.com" className="text-spa-purple underline">
                support@spa-pregio.com
              </a>.
            </p>
          </PolicySection>

        </div>
      </section>
    </main>
  );
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-spa-purple/10">
      <h2 className="font-serif text-xl font-semibold text-spa-charcoal mb-4">{title}</h2>
      <div className="text-spa-gray leading-relaxed space-y-3">{children}</div>
    </div>
  );
}
