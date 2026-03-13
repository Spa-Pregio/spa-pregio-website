import { useState } from 'react';
import { Mail, Instagram, Facebook, Send, CheckCircle, AlertCircle } from 'lucide-react';

const FORMSPREE_URL = 'https://formspree.io/f/xaqpwggd';

export default function Contact() {
  const [formData, setFormData] = useState({ from_name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.from_name || !formData.email || !formData.message) return;
    setStatus('sending');
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: JSON.stringify({
          name: formData.from_name,
          email: formData.email,
          message: formData.message,
        }),
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ from_name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

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

      {/* Contact Form */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto space-y-6">

          {/* Contact Form Card */}
          <div className="bg-white rounded-2xl p-8 border border-spa-purple/10 shadow-sm">
            <p className="text-xs uppercase tracking-widest text-spa-purple mb-1">Send a Message</p>
            <h2 className="font-serif text-2xl text-spa-charcoal mb-6">We'll get back to you within 1–2 business days.</h2>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
                <CheckCircle size={40} className="text-green-500" />
                <p className="font-serif text-xl text-spa-charcoal">Message Received!</p>
                <p className="text-spa-gray text-sm">Thank you for reaching out. We'll be in touch soon. 💜</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 text-xs uppercase tracking-widest text-spa-purple underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-spa-purple mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleChange}
                    placeholder="e.g. Jessica Williams"
                    className="w-full px-4 py-3 rounded-xl border border-spa-purple/20 bg-spa-cream text-spa-charcoal placeholder-spa-gray/50 focus:outline-none focus:border-spa-purple/50 transition-colors duration-200 text-sm"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-spa-purple mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. jessica@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-spa-purple/20 bg-spa-cream text-spa-charcoal placeholder-spa-gray/50 focus:outline-none focus:border-spa-purple/50 transition-colors duration-200 text-sm"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-spa-purple mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-spa-purple/20 bg-spa-cream text-spa-charcoal placeholder-spa-gray/50 focus:outline-none focus:border-spa-purple/50 transition-colors duration-200 text-sm resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle size={16} />
                    <span>Something went wrong. Please try again or email us directly.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending' || !formData.from_name || !formData.email || !formData.message}
                  className="w-full flex items-center justify-center gap-2 bg-spa-purple text-white py-4 rounded-xl font-medium tracking-wide hover:bg-spa-purple/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Email */}
          <a
            href="mailto:support@spa-pregio.com"
            className="flex items-center gap-5 bg-white rounded-2xl p-7 border border-spa-purple/10 hover:border-spa-purple/30 hover:shadow-md transition-all duration-200 group"
          >
            <div className="w-14 h-14 rounded-full bg-spa-lavender flex items-center justify-center group-hover:bg-spa-purple transition-colors duration-200">
              <Mail size={22} className="text-spa-charcoal group-hover:text-white transition-colors duration-200" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-spa-purple mb-1">Email Us Directly</p>
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
              <p className="font-serif text-xl text-spa-charcoal">Spa-Pregio</p>
              <p className="text-sm text-spa-gray mt-1">Follow us for updates and celebrations.</p>
            </div>
          </a>

        </div>
      </section>
    </main>
  );
}
