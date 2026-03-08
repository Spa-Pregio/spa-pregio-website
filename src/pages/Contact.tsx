import { Mail, Instagram, Facebook } from 'lucide-react';

export default function Contact() {
  return (
    <main className="min-h-screen bg-spa-cream">
      {/* Hero */}
      <section className="bg-white border-b border-spa-purple/10 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-spa-purple mb-3">Get in Touch</p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-spa-charcoal mb-4">
            We'd Love to Hear from You
          </h1>
          <p className="text-spa-gray text-lg max-w-xl mx-auto">
            Have a question about a Celebration Suite, the Suite Sisters™ program, or anything
            else? Reach out — we're here for you.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto space-y-6">

          {/* Email */}
          <a
            href="mailto:support@spa-pregio.com"
            className="flex items-center gap-5 bg-white rounded-2xl p-7 border border-spa-purple/10 hover:border-spa-purple/30 hover:shadow-md transition-all duration-200 group"
          >
            <div className="w-14 h-14 rounded-full bg-spa-lavender flex items-center justify-center group-hover:bg-spa-purple transition-colors duration-200">
              <Mail size={22} className="text-spa-charcoal group-hover:text-white transition-colors duration-200" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-spa-purple mb-1">Email Us</p>
              <p className="font-serif text-xl text-spa-charcoal">support@spa-pregio.com</p>
              <p className="text-sm text-spa-gray mt-1">We typically respond within 1–2 business days.</p>
            </div>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/spapregio/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-5 bg-white rounded-2xl p-7 border border-spa-purple/10 hover:border-spa-purple/30 hover:shadow-md transition-all duration-200 group"
          >
            <div className="w-14 h-14 rounded-full bg-spa-lavender flex items-center justify-center group-hover:bg-spa-purple transition-colors duration-200">
              <Instagram size={22} className="text-spa-charcoal group-hover:text-white transition-colors duration-200" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-spa-purple mb-1">Instagram</p>
              <p className="font-serif text-xl text-spa-charcoal">@spapregio</p>
              <p className="text-sm text-spa-gray mt-1">DMs are open — say hello!</p>
            </div>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/profile.php?id=61584954395375"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-5 bg-white rounded-2xl p-7 border border-spa-purple/10 hover:border-spa-purple/30 hover:shadow-md transition-all duration-200 group"
          >
            <div className="w-14 h-14 rounded-full bg-spa-lavender flex items-center justify-center group-hover:bg-spa-purple transition-colors duration-200">
              <Facebook size={22} className="text-spa-charcoal group-hover:text-white transition-colors duration-200" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-spa-purple mb-1">Facebook</p>
              <p className="font-serif text-xl text-spa-charcoal">Spa-Pregio®</p>
              <p className="text-sm text-spa-gray mt-1">Follow us for updates and celebrations.</p>
            </div>
          </a>

        </div>
      </section>
    </main>
  );
}
