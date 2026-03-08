export default function Terms() {
  return (
    <main className="min-h-screen bg-spa-cream">
      {/* Hero */}
      <section className="bg-white border-b border-spa-purple/10 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-spa-purple mb-3">Legal</p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-spa-charcoal mb-4">
            Terms of Service
          </h1>
          <p className="text-spa-gray">Last updated: March 8, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-10">

          <div className="bg-white rounded-2xl p-8 border border-spa-purple/10">
            <p className="text-spa-gray leading-relaxed">
              Welcome to Spa-Pregio. By accessing this website or purchasing any of our
              products, you agree to be bound by these Terms of Service. Please read them
              carefully. If you do not agree, please do not use our site or services.
            </p>
          </div>

          <TermsSection title="1. Use of This Website">
            <p>
              This website is intended for personal, non-commercial use. You agree not to
              misuse, copy, or exploit any content on this site for unauthorized purposes.
              All content — including text, images, graphics, and product materials — is the
              property of Spa-Pregio and protected by applicable intellectual property laws.
            </p>
          </TermsSection>

          <TermsSection title="2. Digital Products">
            <p>
              All products sold through Spa-Pregio are <strong>digital downloads</strong>.
              Upon purchase, you will receive access to your product via Payhip.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>No refunds</strong> — Due to the digital nature of our products, all
                sales are final. We encourage you to review product descriptions thoroughly
                before purchasing.
              </li>
              <li>
                <strong>Personal use only</strong> — Products are licensed for your personal
                use and may not be resold, redistributed, or shared without written permission
                from Spa-Pregio.
              </li>
              <li>
                <strong>Access</strong> — You will receive a download link via email through
                Payhip. Please save your files upon receipt, as access links may expire.
              </li>
            </ul>
          </TermsSection>

          <TermsSection title="3. Suite Sisters™ Affiliate Program">
            <p>
              The Suite Sisters™ program allows approved ambassadors to earn commission by
              referring customers to Spa-Pregio products. By joining the program, you agree to:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Represent Spa-Pregio honestly and in alignment with our brand values</li>
              <li>Not use misleading, deceptive, or spammy promotional tactics</li>
              <li>
                Understand that commission rates and program terms may be updated with
                reasonable notice
              </li>
              <li>
                Acknowledge that Spa-Pregio reserves the right to remove any affiliate from
                the program for violations of these terms
              </li>
            </ul>
            <p className="mt-3">
              Commission payments are processed through Payhip's affiliate system. Spa-Pregio
              is not responsible for delays caused by Payhip's payout schedule.
            </p>
          </TermsSection>

          <TermsSection title="4. Intellectual Property">
            <p>
              The Spa-Pregio name and logo are registered trademarks. The "Celebration Suite
              Movement," "Suite Sisters™," and all associated branding are proprietary to
              Spa-Pregio. Unauthorized use of our trademarks or brand assets is strictly
              prohibited.
            </p>
          </TermsSection>

          <TermsSection title="5. Disclaimer of Warranties">
            <p>
              Our products and website are provided "as is." Spa-Pregio makes no warranties,
              expressed or implied, regarding the completeness, accuracy, or fitness for a
              particular purpose of any product or content. Use of our products is at your
              own discretion.
            </p>
          </TermsSection>

          <TermsSection title="6. Limitation of Liability">
            <p>
              To the fullest extent permitted by law, Spa-Pregio shall not be liable for any
              indirect, incidental, or consequential damages arising from your use of this
              website or our digital products.
            </p>
          </TermsSection>

          <TermsSection title="7. Governing Law">
            <p>
              These Terms are governed by the laws of the State of North Carolina, without
              regard to its conflict of law provisions.
            </p>
          </TermsSection>

          <TermsSection title="8. Changes to These Terms">
            <p>
              We reserve the right to update these Terms at any time. Changes will be reflected
              by the "Last updated" date above. Continued use of the site after changes
              constitutes your acceptance of the revised Terms.
            </p>
          </TermsSection>

          <TermsSection title="9. Contact Us">
            <p>
              Questions about these Terms? Reach us at{' '}
              <a href="mailto:support@spa-pregio.com" className="text-spa-purple underline">
                support@spa-pregio.com
              </a>.
            </p>
          </TermsSection>

        </div>
      </section>
    </main>
  );
}

function TermsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-spa-purple/10">
      <h2 className="font-serif text-xl font-semibold text-spa-charcoal mb-4">{title}</h2>
      <div className="text-spa-gray leading-relaxed space-y-3">{children}</div>
    </div>
  );
}
