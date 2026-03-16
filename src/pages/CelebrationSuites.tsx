import React from 'react';
import { ArrowRight, Check, Download, Palette, FileText, Clock, Star, Sparkles } from 'lucide-react';

// Elegant SVG illustrations for each suite card
const SuiteIllustrations: Record<string, () => React.ReactElement> = {
  'The Baby Shower Suite™': () => (
    <svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="180" fill="#F5EEF8" />
      {/* Soft background circle */}
      <circle cx="140" cy="90" r="70" fill="#EDD9F0" opacity="0.5" />
      {/* Large peony bloom center */}
      <ellipse cx="140" cy="85" rx="28" ry="26" fill="#D09AC6" opacity="0.9" />
      <ellipse cx="140" cy="85" rx="20" ry="18" fill="#C87BB8" opacity="0.8" />
      <ellipse cx="140" cy="85" rx="12" ry="11" fill="#B85FAA" opacity="0.7" />
      {/* Petals outer ring */}
      <ellipse cx="113" cy="72" rx="14" ry="10" fill="#D09AC6" opacity="0.7" transform="rotate(-30 113 72)" />
      <ellipse cx="167" cy="72" rx="14" ry="10" fill="#D09AC6" opacity="0.7" transform="rotate(30 167 72)" />
      <ellipse cx="112" cy="100" rx="14" ry="10" fill="#D09AC6" opacity="0.7" transform="rotate(30 112 100)" />
      <ellipse cx="168" cy="100" rx="14" ry="10" fill="#D09AC6" opacity="0.7" transform="rotate(-30 168 100)" />
      <ellipse cx="140" cy="58" rx="14" ry="10" fill="#D09AC6" opacity="0.7" />
      <ellipse cx="140" cy="112" rx="14" ry="10" fill="#D09AC6" opacity="0.7" />
      {/* Leaves */}
      <ellipse cx="100" cy="110" rx="18" ry="8" fill="#9B7CB6" opacity="0.4" transform="rotate(-45 100 110)" />
      <ellipse cx="180" cy="110" rx="18" ry="8" fill="#9B7CB6" opacity="0.4" transform="rotate(45 180 110)" />
      <ellipse cx="95" cy="75" rx="14" ry="6" fill="#9B7CB6" opacity="0.35" transform="rotate(-60 95 75)" />
      <ellipse cx="185" cy="75" rx="14" ry="6" fill="#9B7CB6" opacity="0.35" transform="rotate(60 185 75)" />
      {/* Small accent blooms */}
      <circle cx="82" cy="90" r="10" fill="#EDD9F0" opacity="0.8" />
      <circle cx="82" cy="90" r="6" fill="#D09AC6" opacity="0.7" />
      <circle cx="198" cy="90" r="10" fill="#EDD9F0" opacity="0.8" />
      <circle cx="198" cy="90" r="6" fill="#D09AC6" opacity="0.7" />
      {/* Decorative dots */}
      <circle cx="65" cy="60" r="3" fill="#9B7CB6" opacity="0.4" />
      <circle cx="215" cy="60" r="3" fill="#9B7CB6" opacity="0.4" />
      <circle cx="70" cy="125" r="2" fill="#D09AC6" opacity="0.5" />
      <circle cx="210" cy="125" r="2" fill="#D09AC6" opacity="0.5" />
      {/* Bottom ribbon */}
      <path d="M100 155 Q140 145 180 155" stroke="#9B7CB6" strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M115 158 Q140 150 165 158" stroke="#D09AC6" strokeWidth="1" fill="none" opacity="0.4" />
    </svg>
  ),

  'The Gender Reveal Suite™': () => (
    <svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="180" fill="#FDF0F5" />
      {/* Soft glow */}
      <circle cx="140" cy="85" r="65" fill="#F8D7E8" opacity="0.6" />
      {/* Elegant ribbon bow - left loop */}
      <path d="M140 85 C120 65 85 55 80 75 C75 95 110 100 140 85Z" fill="#D09AC6" opacity="0.9" />
      <path d="M140 85 C125 70 95 62 92 78 C89 92 118 97 140 85Z" fill="#C87BB8" opacity="0.7" />
      {/* Right loop */}
      <path d="M140 85 C160 65 195 55 200 75 C205 95 170 100 140 85Z" fill="#D09AC6" opacity="0.9" />
      <path d="M140 85 C155 70 185 62 188 78 C191 92 162 97 140 85Z" fill="#C87BB8" opacity="0.7" />
      {/* Bottom left tail */}
      <path d="M140 85 C130 100 105 120 100 140" stroke="#D09AC6" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.8" />
      <path d="M140 85 C128 102 103 122 98 142" stroke="#C87BB8" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.5" />
      {/* Bottom right tail */}
      <path d="M140 85 C150 100 175 120 180 140" stroke="#D09AC6" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.8" />
      <path d="M140 85 C152 102 177 122 182 142" stroke="#C87BB8" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.5" />
      {/* Center knot */}
      <ellipse cx="140" cy="85" rx="14" ry="12" fill="#9B7CB6" opacity="0.9" />
      <ellipse cx="140" cy="85" rx="8" ry="7" fill="#7B5EA0" opacity="0.8" />
      {/* Sparkle accents */}
      <circle cx="75" cy="50" r="3" fill="#9B7CB6" opacity="0.5" />
      <circle cx="205" cy="50" r="3" fill="#9B7CB6" opacity="0.5" />
      <circle cx="60" cy="90" r="2" fill="#D09AC6" opacity="0.6" />
      <circle cx="220" cy="90" r="2" fill="#D09AC6" opacity="0.6" />
      <circle cx="80" cy="130" r="2.5" fill="#9B7CB6" opacity="0.4" />
      <circle cx="200" cy="130" r="2.5" fill="#9B7CB6" opacity="0.4" />
      {/* Star sparkles */}
      <path d="M55 70 L57 65 L59 70 L64 72 L59 74 L57 79 L55 74 L50 72Z" fill="#D09AC6" opacity="0.6" />
      <path d="M221 70 L223 65 L225 70 L230 72 L225 74 L223 79 L221 74 L216 72Z" fill="#D09AC6" opacity="0.6" />
    </svg>
  ),

  'The Announcement Suite™': () => (
    <svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="180" fill="#F8F3FB" />
      {/* Soft radial glow */}
      <radialGradient id="announcementGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#EDD9F0" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#F8F3FB" stopOpacity="0" />
      </radialGradient>
      <circle cx="140" cy="85" r="80" fill="url(#announcementGlow)" />
      {/* Envelope base */}
      <rect x="70" y="65" width="140" height="90" rx="6" fill="white" opacity="0.95" stroke="#D09AC6" strokeWidth="1.5" />
      {/* Envelope flap open */}
      <path d="M70 65 L140 105 L210 65Z" fill="#EDD9F0" opacity="0.9" stroke="#D09AC6" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M70 65 L140 95 L210 65" fill="#E8C8E8" opacity="0.6" />
      {/* Letter peeking out */}
      <rect x="90" y="45" width="100" height="75" rx="4" fill="white" stroke="#D09AC6" strokeWidth="1" opacity="0.95" />
      {/* Letter content lines */}
      <line x1="103" y1="62" x2="177" y2="62" stroke="#9B7CB6" strokeWidth="2" opacity="0.3" />
      <line x1="103" y1="72" x2="177" y2="72" stroke="#9B7CB6" strokeWidth="1.5" opacity="0.2" />
      <line x1="103" y1="81" x2="160" y2="81" stroke="#9B7CB6" strokeWidth="1.5" opacity="0.2" />
      {/* Heart seal */}
      <path d="M140 56 C140 53 136 50 133 53 C130 56 133 60 140 64 C147 60 150 56 147 53 C144 50 140 53 140 56Z" fill="#D09AC6" opacity="0.9" />
      {/* Floating stars/sparkles around */}
      <path d="M58 55 L60 49 L62 55 L68 57 L62 59 L60 65 L58 59 L52 57Z" fill="#9B7CB6" opacity="0.5" />
      <path d="M218 48 L220 43 L222 48 L227 50 L222 52 L220 57 L218 52 L213 50Z" fill="#D09AC6" opacity="0.5" />
      <circle cx="62" cy="120" r="3" fill="#D09AC6" opacity="0.4" />
      <circle cx="218" cy="120" r="3" fill="#9B7CB6" opacity="0.4" />
      <circle cx="55" cy="85" r="2" fill="#9B7CB6" opacity="0.3" />
      <circle cx="225" cy="85" r="2" fill="#D09AC6" opacity="0.3" />
      {/* Small dots scattered */}
      <circle cx="80" cy="145" r="2" fill="#D09AC6" opacity="0.3" />
      <circle cx="200" cy="145" r="2" fill="#9B7CB6" opacity="0.3" />
      <circle cx="140" cy="148" r="2" fill="#D09AC6" opacity="0.25" />
    </svg>
  ),

  'The Push Present & Pampering Suite™': () => (
    <svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="180" fill="#FBF5F0" />
      {/* Warm soft glow */}
      <circle cx="140" cy="85" r="70" fill="#F5E6DC" opacity="0.7" />
      {/* Gift box base */}
      <rect x="95" y="100" width="90" height="60" rx="4" fill="#9B7CB6" opacity="0.85" />
      <rect x="95" y="100" width="90" height="60" rx="4" fill="white" opacity="0.1" />
      {/* Gift box lid */}
      <rect x="88" y="88" width="104" height="20" rx="4" fill="#7B5EA0" opacity="0.9" />
      {/* Ribbon vertical */}
      <rect x="133" y="88" width="14" height="72" fill="#D09AC6" opacity="0.9" />
      {/* Ribbon horizontal on lid */}
      <rect x="88" y="93" width="104" height="10" fill="#D09AC6" opacity="0.8" />
      {/* Bow left loop */}
      <path d="M140 88 C125 72 100 68 98 80 C96 90 120 90 140 88Z" fill="#EDD9F0" opacity="0.95" />
      <path d="M140 88 C128 75 108 73 107 82 C106 89 125 89 140 88Z" fill="#D09AC6" opacity="0.6" />
      {/* Bow right loop */}
      <path d="M140 88 C155 72 180 68 182 80 C184 90 160 90 140 88Z" fill="#EDD9F0" opacity="0.95" />
      <path d="M140 88 C152 75 172 73 173 82 C174 89 155 89 140 88Z" fill="#D09AC6" opacity="0.6" />
      {/* Bow center */}
      <ellipse cx="140" cy="88" rx="9" ry="7" fill="#9B7CB6" opacity="0.9" />
      {/* Candle left */}
      <rect x="68" y="105" width="12" height="40" rx="3" fill="#EDD9F0" opacity="0.9" stroke="#D09AC6" strokeWidth="1" />
      <path d="M74 105 C72 98 76 95 74 90" stroke="#D09AC6" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="74" cy="90" rx="4" ry="6" fill="#F5C842" opacity="0.8" />
      <ellipse cx="74" cy="91" rx="2" ry="3" fill="#F5A020" opacity="0.9" />
      {/* Candle right */}
      <rect x="200" y="110" width="12" height="35" rx="3" fill="#EDD9F0" opacity="0.9" stroke="#D09AC6" strokeWidth="1" />
      <path d="M206 110 C204 103 208 100 206 95" stroke="#D09AC6" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="206" cy="95" rx="4" ry="6" fill="#F5C842" opacity="0.8" />
      <ellipse cx="206" cy="96" rx="2" ry="3" fill="#F5A020" opacity="0.9" />
      {/* Small rose left */}
      <circle cx="72" cy="82" r="8" fill="#D09AC6" opacity="0.7" />
      <circle cx="72" cy="82" r="5" fill="#C87BB8" opacity="0.8" />
      <circle cx="72" cy="82" r="2.5" fill="#9B7CB6" opacity="0.9" />
      {/* Small rose right */}
      <circle cx="208" cy="88" r="8" fill="#D09AC6" opacity="0.7" />
      <circle cx="208" cy="88" r="5" fill="#C87BB8" opacity="0.8" />
      <circle cx="208" cy="88" r="2.5" fill="#9B7CB6" opacity="0.9" />
      {/* Stars */}
      <circle cx="110" cy="65" r="2" fill="#9B7CB6" opacity="0.4" />
      <circle cx="170" cy="65" r="2" fill="#D09AC6" opacity="0.4" />
      <circle cx="140" cy="58" r="2.5" fill="#9B7CB6" opacity="0.3" />
    </svg>
  ),

  'The Sip & See Suite™': () => (
    <svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="180" fill="#F2F8F5" />
      {/* Soft background */}
      <circle cx="140" cy="85" r="70" fill="#E0F0E8" opacity="0.6" />
      {/* Teacup saucer */}
      <ellipse cx="140" cy="138" rx="55" ry="10" fill="#D09AC6" opacity="0.4" />
      <ellipse cx="140" cy="135" rx="48" ry="8" fill="#EDD9F0" opacity="0.8" />
      {/* Teacup body */}
      <path d="M100 100 Q98 135 140 135 Q182 135 180 100Z" fill="white" opacity="0.95" stroke="#D09AC6" strokeWidth="1.5" />
      {/* Cup rim */}
      <ellipse cx="140" cy="100" rx="40" ry="8" fill="white" opacity="0.95" stroke="#D09AC6" strokeWidth="1.5" />
      {/* Tea surface */}
      <ellipse cx="140" cy="100" rx="36" ry="6" fill="#E8D5B0" opacity="0.6" />
      {/* Steam wisps */}
      <path d="M125 95 C123 85 127 80 125 70" stroke="#9B7CB6" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" />
      <path d="M140 93 C138 83 142 77 140 67" stroke="#9B7CB6" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" />
      <path d="M155 95 C153 85 157 80 155 70" stroke="#9B7CB6" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" />
      {/* Cup handle */}
      <path d="M180 108 C200 108 200 128 180 128" stroke="#D09AC6" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Floral on cup */}
      <circle cx="130" cy="118" r="7" fill="#D09AC6" opacity="0.5" />
      <circle cx="130" cy="118" r="4" fill="#9B7CB6" opacity="0.6" />
      <circle cx="148" cy="122" r="5" fill="#D09AC6" opacity="0.4" />
      <circle cx="148" cy="122" r="3" fill="#9B7CB6" opacity="0.5" />
      {/* Florals top left */}
      <circle cx="80" cy="72" r="12" fill="#EDD9F0" opacity="0.8" />
      <circle cx="80" cy="72" r="8" fill="#D09AC6" opacity="0.7" />
      <circle cx="80" cy="72" r="4" fill="#9B7CB6" opacity="0.8" />
      <ellipse cx="68" cy="65" rx="8" ry="5" fill="#D09AC6" opacity="0.5" transform="rotate(-30 68 65)" />
      <ellipse cx="92" cy="65" rx="8" ry="5" fill="#D09AC6" opacity="0.5" transform="rotate(30 92 65)" />
      {/* Florals top right */}
      <circle cx="200" cy="68" r="12" fill="#EDD9F0" opacity="0.8" />
      <circle cx="200" cy="68" r="8" fill="#D09AC6" opacity="0.7" />
      <circle cx="200" cy="68" r="4" fill="#9B7CB6" opacity="0.8" />
      <ellipse cx="188" cy="61" rx="8" ry="5" fill="#D09AC6" opacity="0.5" transform="rotate(-30 188 61)" />
      <ellipse cx="212" cy="61" rx="8" ry="5" fill="#D09AC6" opacity="0.5" transform="rotate(30 212 61)" />
      {/* Leaf accents */}
      <ellipse cx="65" cy="90" rx="12" ry="5" fill="#7BAF8C" opacity="0.35" transform="rotate(-50 65 90)" />
      <ellipse cx="215" cy="85" rx="12" ry="5" fill="#7BAF8C" opacity="0.35" transform="rotate(50 215 85)" />
      {/* Dots */}
      <circle cx="60" cy="115" r="2.5" fill="#D09AC6" opacity="0.4" />
      <circle cx="220" cy="115" r="2.5" fill="#D09AC6" opacity="0.4" />
      <circle cx="140" cy="52" r="2" fill="#9B7CB6" opacity="0.3" />
    </svg>
  ),
};

const suites = [
  {
    name: 'The Celebration Suite™',
    subtitle: 'Luxury Baby Shower Planning Collection',
    price: 27,
    url: 'https://payhip.com/b/4w08K',
    badge: 'Flagship Suite',
    badgeColor: 'bg-spa-purple',
    featured: true,
    description: 'The original. The one that started it all. A fully editable luxury planning system that takes the stress out of celebrating and puts the joy back in. This is not just a template — it\'s a structured experience.',
    includes: [
      'Minimalist Invitation Template',
      'Lifestyle Invitation Template',
      'RSVP Card',
      'Baby Shower Planning Checklist',
      'Guest Tracker',
      'Budget Planner',
    ],
  },
  {
    name: 'The Baby Shower Suite™',
    subtitle: 'Complete Baby Shower Planning Collection',
    price: 27,
    url: 'https://payhip.com/b/lZ6WG',
    badge: 'Available Now',
    badgeColor: 'bg-spa-purple',
    featured: false,
    description: 'She deserves a shower as beautiful as the journey she\'s on. From the first invitation to the last gift unwrapped — every detail covered so the only thing left to do is celebrate.',
    includes: [
      'Customizable Invitation & RSVP Card',
      'Planning Timeline',
      'Complete Celebration Checklist',
      'Guest Tracker & RSVP Organizer',
      'Budget Planner',
      'Vendor Selection Guide',
      'Theme & Decor Inspiration',
      'Keepsake & Memory Pages',
    ],
  },
  {
    name: 'The Gender Reveal Suite™',
    subtitle: 'Complete Gender Reveal Planning Collection',
    price: 27,
    url: 'https://payhip.com/b/jLSWB',
    badge: 'Available Now',
    badgeColor: 'bg-spa-purple',
    featured: false,
    description: 'Build the suspense. Capture the joy. Make it unforgettable. Your complete planning companion for the moment that changes everything.',
    includes: [
      'Customizable Invitation & RSVP Card',
      'Step-by-Step Planning Timeline',
      'Complete Reveal Checklist',
      'Guest Tracker & RSVP Organizer',
      'Budget Planner',
      'Vendor Selection Guide',
      'Theme & Decor Inspiration',
      'Keepsake & Memory Pages',
    ],
  },
  {
    name: 'The Announcement Suite™',
    subtitle: 'Pregnancy Announcement Planning Collection',
    price: 27,
    url: 'https://payhip.com/b/j6hfL',
    badge: 'Available Now',
    badgeColor: 'bg-spa-purple',
    featured: false,
    description: 'You have the most beautiful secret in the world — and you\'re ready to share it. Plan every detail of your reveal with intention, from telling family first to crafting the post that stops everyone\'s scroll.',
    includes: [
      'Welcome Guide & How to Use',
      'Planning Timeline',
      'Complete Announcement Checklist',
      'Budget Tracker',
      'Vendor Selection Guide',
      'Theme & Photo Inspiration',
      'Contact & Reaction Tracker',
      'Keepsake Pages + Letter to Baby',
    ],
  },
  {
    name: 'The Push Present & Pampering Suite™',
    subtitle: 'Mama Celebration & Gifting Collection',
    price: 27,
    url: 'https://payhip.com/b/Ldkxz',
    badge: 'Available Now',
    badgeColor: 'bg-spa-purple',
    featured: false,
    description: 'She carried life. She showed up with everything she had. Now it\'s time to honor her. The only planning guide designed specifically for celebrating the mama.',
    includes: [
      'Gifting Timeline Through Postpartum',
      'Push Present Planning Checklist',
      'Pampering Experience Planner',
      'Home Self-Care Setup Guide',
      'Budget Planner',
      'Vendor Selection Guide',
      'Spa & Wellness Inspiration',
      'Keepsake Pages + Love Letter to Herself',
    ],
  },
  {
    name: 'The Sip & See Suite™',
    subtitle: 'Baby Welcome Gathering Collection',
    price: 27,
    url: 'https://payhip.com/b/WbdBP',
    badge: 'Available Now',
    badgeColor: 'bg-spa-purple',
    featured: false,
    description: 'Baby is here. The world is ready to meet them. Your complete planning guide for a gathering that feels as soft, warm, and beautiful as the moment itself.',
    includes: [
      'Customizable Invitation & RSVP Card',
      'Planning Timeline After Baby Arrives',
      'Complete Celebration Checklist',
      'Guest Tracker & RSVP Organizer',
      'Budget Planner',
      'Vendor Selection Guide',
      'Theme & Decor Inspiration',
      'Keepsake Pages + Letter to Baby',
    ],
  },
];

const howItWorks = [
  { icon: Download, step: '01', title: 'Purchase & Download', desc: 'Complete your purchase and instantly receive your digital access file.' },
  { icon: Palette, step: '02', title: 'Open & Personalize', desc: 'Fill in your event details digitally or print and complete by hand. No design experience needed.' },
  { icon: FileText, step: '03', title: 'Print or Share', desc: 'Export as PDF, print at home, or use digitally on any device.' },
  { icon: Clock, step: '04', title: 'Celebrate', desc: 'You\'re fully prepared. Now enjoy every moment of the celebration.' },
];

const featuredSuite = suites[0];
const remainingSuites = [
  suites.find(s => s.name === 'The Announcement Suite™')!,
  suites.find(s => s.name === 'The Gender Reveal Suite™')!,
  suites.find(s => s.name === 'The Baby Shower Suite™')!,
  suites.find(s => s.name === 'The Sip & See Suite™')!,
  suites.find(s => s.name === 'The Push Present & Pampering Suite™')!,
];

export default function CelebrationSuites() {
  return (
    <div className="w-full pt-20">

      {/* Hero */}
      <section className="w-full py-16 lg:py-24 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">The Celebration Suite Movement™</span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-spa-charcoal leading-tight mt-4">
            Every mama deserves an <span className="text-spa-purple">elevated</span> celebration.
          </h1>
          <p className="mt-6 text-lg text-spa-gray leading-relaxed max-w-2xl mx-auto">
            Six thoughtfully designed planning collections — one for every milestone on the journey to motherhood. Beautiful, editable, and made with love.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-spa-lavender px-5 py-2 rounded-full">
            <Sparkles size={14} className="text-spa-purple" />
            <span className="text-sm text-spa-purple font-medium">All suites $27 · Digital Download · Instant Access</span>
          </div>
        </div>
      </section>

      {/* Flagship Suite */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Where It All Began</span>
            <h2 className="section-title mt-4">The <span className="text-spa-purple">Flagship Suite.</span></h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-elegant">
                <img
                  src="/images/celebration_suite_mockup.png"
                  alt="The Celebration Suite™ — Luxury Baby Shower Planning Collection"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 bg-spa-purple text-white rounded-full text-sm font-semibold">✨ Flagship Suite</span>
              </div>
              <div className="absolute -bottom-5 -right-5 w-24 h-24 rounded-full bg-white shadow-elegant flex flex-col items-center justify-center border-2 border-spa-purple/20">
                <span className="text-xs text-spa-gray">Only</span>
                <span className="font-bold text-2xl text-spa-purple">$27</span>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-3xl text-spa-charcoal">{featuredSuite.name}</h3>
              <p className="text-spa-purple font-medium mt-1">{featuredSuite.subtitle}</p>
              <p className="text-spa-gray leading-relaxed mt-4">{featuredSuite.description}</p>

              <div className="mt-8">
                <p className="font-semibold text-spa-charcoal mb-4">✨ What's Included:</p>
                <ul className="space-y-2">
                  {featuredSuite.includes.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-spa-gray">
                      <Check size={16} className="text-spa-purple flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 p-4 bg-spa-lavender rounded-xl">
                <p className="text-xs text-spa-gray flex items-center gap-2">
                  <Star size={13} className="text-amber-400 fill-amber-400" />
                  Digital download. Print at home or complete digitally. No design experience needed.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href={featuredSuite.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary justify-center text-center"
                >
                  Get The Celebration Suite™ — $27
                  <ArrowRight size={18} />
                </a>
              </div>
              <p className="text-xs text-spa-gray mt-3">Instant access. Download immediately after purchase.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-16 lg:py-20 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Simple Process</span>
            <h2 className="section-title mt-4">How it <span className="text-spa-purple">works.</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white shadow-elegant flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-spa-purple" />
                  </div>
                  <p className="text-xs font-bold text-spa-purple tracking-widest mb-2">{step.step}</p>
                  <h3 className="font-serif text-lg text-spa-charcoal mb-2">{step.title}</h3>
                  <p className="text-sm text-spa-gray leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full Suite Collection */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-4">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">The Full Collection</span>
            <h2 className="section-title mt-4">Five suites. <span className="text-spa-purple">Every milestone.</span></h2>
            <p className="text-spa-gray mt-4 max-w-xl mx-auto">From the moment you share the news to the day the world meets your baby — there's a suite for every step of the journey.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {remainingSuites.map((suite) => {
              const Illustration = SuiteIllustrations[suite.name];
              return (
                <div key={suite.name} className="elegant-card group flex flex-col">
                  {/* Card header — elegant illustrated visual */}
                  <div className="rounded-t-2xl overflow-hidden h-44 relative">
                    {Illustration ? (
                      <Illustration />
                    ) : (
                      <div className="w-full h-full bg-spa-lavender" />
                    )}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 bg-spa-purple text-white rounded-full text-xs font-medium whitespace-nowrap">
                        {suite.badge}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-serif text-xl text-spa-charcoal">{suite.name}</h3>
                    <p className="text-spa-purple text-xs font-medium mt-1">{suite.subtitle}</p>
                    <p className="text-sm text-spa-gray leading-relaxed mt-3">{suite.description}</p>

                    <div className="mt-5 space-y-1.5 flex-1">
                      {suite.includes.slice(0, 5).map((item) => (
                        <div key={item} className="flex items-center gap-2 text-xs text-spa-gray">
                          <Check size={13} className="text-spa-purple flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                      {suite.includes.length > 5 && (
                        <div className="text-xs text-spa-purple font-medium pl-5">
                          + {suite.includes.length - 5} more included
                        </div>
                      )}
                    </div>

                    {/* Price + CTA */}
                    <div className="mt-6 pt-5 border-t border-spa-lavender">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs text-spa-gray">Digital Download</span>
                        <span className="font-bold text-2xl text-spa-purple">$27</span>
                      </div>
                      <a
                        href={suite.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full btn-primary justify-center text-center text-sm py-3"
                      >
                        Get This Suite — $27
                        <ArrowRight size={16} />
                      </a>
                      <p className="text-xs text-spa-gray text-center mt-2">Instant access after purchase</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bundle callout */}
      <section className="w-full py-16 lg:py-20 bg-spa-cream">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="bg-spa-lavender rounded-2xl p-8 lg:p-12 text-center">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">The Complete Journey</span>
            <h3 className="font-serif text-2xl lg:text-3xl text-spa-charcoal mt-4">
              Want to give her <span className="text-spa-purple">everything?</span>
            </h3>
            <p className="text-spa-gray mt-4 max-w-xl mx-auto leading-relaxed">
              Each suite is $27 on its own — or gift her the full Celebration Suite Movement™ collection and cover every milestone from announcement to baby's first hello.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://payhip.com/SpaPregio"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary justify-center"
              >
                Shop All Suites
                <ArrowRight size={18} />
              </a>
            </div>
            <p className="text-xs text-spa-gray mt-4">All suites $27 each · Digital download · Instant access · Print at home</p>
          </div>
        </div>
      </section>

      {/* Suite Sisters CTA */}
      <section className="w-full py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Suite Sisters™</span>
          <h3 className="font-serif text-2xl lg:text-3xl text-spa-charcoal mt-4">
            Love these suites? <span className="text-spa-purple">Share them and earn.</span>
          </h3>
          <p className="text-spa-gray mt-4 max-w-xl mx-auto leading-relaxed">
            Join the Suite Sisters™ affiliate program and earn 30% commission on every suite you share. Beautiful products that practically sell themselves.
          </p>
          <a
            href="/ambassadors"
            className="inline-flex items-center gap-2 mt-8 btn-primary justify-center"
          >
            Become a Suite Sister™
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-16 lg:py-20 bg-spa-purple">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl text-white">
            Ready to celebrate <span className="italic">her?</span>
          </h2>
          <p className="mt-4 text-white/70 leading-relaxed">
            Six suites. Every milestone. One movement built for the mama in your life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a
              href="https://payhip.com/b/4w08K"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-spa-purple px-8 py-4 rounded-full font-semibold hover:bg-spa-cream transition-colors"
            >
              Get The Celebration Suite™ — $27
              <ArrowRight size={18} />
            </a>
            <a
              href="https://payhip.com/SpaPregio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-colors border border-white/30"
            >
              Shop All Suites
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
