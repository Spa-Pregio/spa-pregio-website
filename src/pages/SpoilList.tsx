import { useState } from "react";

const TAG = "ihh25-20";
const amzLink = (asin: string) =>
  `https://www.amazon.com/dp/${asin}?tag=${TAG}`;

interface Product {
  asin: string;
  name: string;
  description: string;
  badge?: string;
}

interface Section {
  id: string;
  title: string;
  italic: string;
  tagline: string;
  accent: string;
  products: Product[];
}

const BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  "Fan Favorite":       { bg: "rgba(209,154,198,0.15)", text: "#C47AB0" },
  "Registry Must-Have": { bg: "rgba(190,216,180,0.2)",  text: "#6A9E5A" },
  "We Love This":       { bg: "rgba(201,169,110,0.15)", text: "#A07830" },
  "The Splurge":        { bg: "rgba(200,184,232,0.2)",  text: "#8B6CB8" },
};

const SECTIONS: Section[] = [
  {
    id: "spoil_mama",
    title: "Spoil",
    italic: "Mama",
    tagline: "Because she deserves every single thing on this list.",
    accent: "#D09AC6",
    products: [
      {
        asin: "B09JK9NTK1",
        name: "Maternity Nightgown & Robe Set",
        description: "Soft, beautiful, and perfect for the hospital bag. She'll wear this through labor, delivery, and every 3am feeding after.",
        badge: "Registry Must-Have",
      },
      {
        asin: "B0BY1KYM4P",
        name: "QTECLOR Maternity Robe with Swaddle Set",
        description: "A robe AND a matching swaddle blanket — the sweetest set for mama and baby's first photos together.",
        badge: "We Love This",
      },
      {
        asin: "B071RCMQNG",
        name: "Palmer's Cocoa Butter Stretch Mark Cream",
        description: "The belly butter every pregnant woman swears by. Rich, nourishing, and it actually works. A baby shower staple.",
        badge: "Fan Favorite",
      },
      {
        asin: "B0CWLHKQNT",
        name: "Momcozy KleanPal Pro Bottle Washer & Sterilizer",
        description: "All-in-one bottle washer, sterilizer, and dryer. The gift that saves her hours every single week.",
        badge: "The Splurge",
      },
      {
        asin: "B0DKHCWJ5G",
        name: "Momcozy Portable Milk Warmer",
        description: "Warms milk on the go — in the car, at the restaurant, anywhere. New mamas are obsessed with this one.",
        badge: "Fan Favorite",
      },
      {
        asin: "B0DJ6BPWCN",
        name: "Jeryswet Diaper Bag Backpack",
        description: "Waterproof, spacious, and stylish enough to carry anywhere. The diaper bag that doesn't look like a diaper bag.",
        badge: "We Love This",
      },
      {
        asin: "B09W363MVD",
        name: "Ritual Prenatal Vitamins",
        description: "The prenatal vitamin everyone is talking about. Clean ingredients, no fillers, gentle on an empty stomach. Non-GMO and vegan.",
        badge: "Fan Favorite",
      },
      {
        asin: "B000JVCBBG",
        name: "Earth Mama Organic Nipple Butter",
        description: "Lanolin-free, organic, and safe for baby. The breastfeeding must-have that belongs in every new mama's nightstand.",
        badge: "Registry Must-Have",
      },
      {
        asin: "B014G3ZY5W",
        name: "New Chapter Essential Prenatal Multivitamin",
        description: "Whole-food fermented prenatal with Omega-3s. Gentle enough to take on an empty stomach — a huge win in the first trimester.",
      },
      {
        asin: "B001GXEHL8",
        name: "Clearblue Plus Pregnancy Test",
        description: "The one she'll screenshot and send to everyone she loves. Clear, reliable, and worth every penny for that moment.",
        badge: "Fan Favorite",
      },
      {
        asin: "B00DOJG6RA",
        name: "Easy@Home Ovulation & Pregnancy Test Strips",
        description: "50 ovulation strips + 20 pregnancy tests. The bundle every woman trying to conceive needs in her drawer right now.",
        badge: "We Love This",
      },
      {
        asin: "B07BZR9SMC",
        name: "Traditional Medicinals Morning Sickness Tea & Lozenges",
        description: "All-natural ginger relief for morning sickness. A thoughtful, practical gift for the first trimester struggle.",
      },
      {
        asin: "B0BXD4SRYL",
        name: "Pregnancy Journal & Memory Book",
        description: "A keepsake she'll treasure forever — bump photos, ultrasound pockets, weekly reflections. The most sentimental gift on this list.",
        badge: "We Love This",
      },
    ],
  },
];

// ─── Product Card ────────────────────────────────────────────────
function ProductCard({ product, accent }: { product: Product; accent: string }) {
  const [hovered, setHovered] = useState(false);
  const badge = product.badge ? BADGE_COLORS[product.badge] : null;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#FFFFFF" : "#FDFBF8",
        border: `1px solid ${hovered ? accent : "rgba(155,124,182,0.12)"}`,
        borderRadius: "18px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 20px 48px rgba(155,124,182,0.16)"
          : "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      {/* Amazon product image via Associates image API */}
      <div style={{
        width: "100%", height: "220px",
        position: "relative", overflow: "hidden",
        background: `linear-gradient(135deg, ${accent}14 0%, ${accent}06 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <img
          src={`https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=${product.asin}&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=${TAG}`}
          alt={product.name}
          style={{
            width: "100%", height: "100%",
            objectFit: "contain",
            padding: "12px",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
          onError={(e) => {
            const img = e.currentTarget;
            if (!img.dataset.tried) {
              img.dataset.tried = "1";
              img.src = `https://images-na.ssl-images-amazon.com/images/P/${product.asin}.01._SL250_.jpg`;
            }
          }}
        />
        {badge && (
          <div style={{
            position: "absolute", top: "12px", left: "12px",
            background: badge.bg,
            backdropFilter: "blur(8px)",
            color: badge.text,
            fontSize: "9px", letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "'Jost',sans-serif", fontWeight: 400,
            padding: "5px 12px", borderRadius: "100px",
          }}>
            {product.badge}
          </div>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: "22px 22px 20px", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
        <h3 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "19px", fontWeight: 400,
          color: "#2D1F3D", margin: 0, lineHeight: 1.25,
        }}>
          {product.name}
        </h3>
        <p style={{
          fontFamily: "'Jost',sans-serif", fontWeight: 200,
          fontSize: "12.5px", lineHeight: 1.7,
          color: "rgba(60,35,80,0.62)",
          margin: 0, flex: 1,
        }}>
          {product.description}
        </p>
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          marginTop: "8px", paddingTop: "14px",
          borderTop: "1px solid rgba(155,124,182,0.1)",
        }}>
          <span style={{
            fontFamily: "'Jost',sans-serif", fontWeight: 300,
            fontSize: "10px", letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(60,35,80,0.38)",
          }}>
            See price on Amazon
          </span>
          <a
            href={amzLink(product.asin)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              padding: "9px 20px",
              background: hovered
                ? "linear-gradient(135deg,#C9A96E,#B8924A)"
                : "rgba(201,169,110,0.12)",
              color: hovered ? "#0f0a18" : "#9B6830",
              borderRadius: "100px",
              fontFamily: "'Jost',sans-serif", fontWeight: 400,
              fontSize: "10px", letterSpacing: "0.22em",
              textTransform: "uppercase", textDecoration: "none",
              transition: "all 0.25s",
              whiteSpace: "nowrap",
            }}
          >
            Shop →
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────
function SpoilSection({ section }: { section: Section }) {
  return (
    <div style={{ marginBottom: "80px" }}>
      <div style={{ marginBottom: "36px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
          <div style={{ width: "32px", height: "1px", background: section.accent, opacity: 0.7 }} />
          <span style={{
            color: section.accent, fontFamily: "'Jost',sans-serif",
            fontWeight: 300, fontSize: "9.5px",
            letterSpacing: "0.42em", textTransform: "uppercase",
          }}>Curated for you</span>
        </div>
        <h2 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontWeight: 300, fontSize: "clamp(42px,5vw,58px)",
          color: "#2D1F3D", lineHeight: 0.95,
          letterSpacing: "-0.01em", margin: "0 0 12px",
        }}>
          {section.title}<br />
          <em style={{ color: "#C9A96E" }}>{section.italic}</em>
        </h2>
        <p style={{
          fontFamily: "'Jost',sans-serif", fontWeight: 200,
          fontSize: "14px", color: "rgba(60,35,80,0.6)",
          letterSpacing: "0.04em", margin: 0,
        }}>
          {section.tagline}
        </p>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "20px",
      }}>
        {section.products.map(p => (
          <ProductCard key={p.asin} product={p} accent={section.accent} />
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────
export default function SpoilList() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(165deg, #FAF6F9 0%, #F5EFF7 40%, #FDF8F0 75%, #FAF4EF 100%)",
      fontFamily: "'Jost',sans-serif",
    }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap"
        rel="stylesheet"
      />

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "88px 24px 72px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "14px", marginBottom: "28px" }}>
          <div style={{ width: "36px", height: "1px", background: "#C9A96E", opacity: 0.5 }} />
          <span style={{
            color: "#9B7CB6", fontFamily: "'Jost',sans-serif", fontWeight: 300,
            fontSize: "9.5px", letterSpacing: "0.45em", textTransform: "uppercase",
          }}>Spa-Pregio™ Picks</span>
          <div style={{ width: "36px", height: "1px", background: "#C9A96E", opacity: 0.5 }} />
        </div>
        <h1 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontWeight: 300, fontSize: "clamp(52px,8vw,88px)",
          color: "#2D1F3D", lineHeight: 0.95,
          letterSpacing: "-0.02em", margin: "0 0 24px",
        }}>
          The<br />
          <em style={{ color: "#C9A96E" }}>Spoil List</em>
        </h1>
        <p style={{
          fontFamily: "'Jost',sans-serif", fontWeight: 200,
          fontSize: "clamp(14px,2vw,17px)", lineHeight: 1.8,
          color: "rgba(60,35,80,0.62)", maxWidth: "480px",
          margin: "0 auto 16px", letterSpacing: "0.04em",
        }}>
          Everything we're obsessed with — for mama, for baby,
          and for the celebration. Curated with love, linked for convenience.
        </p>
        <p style={{
          fontFamily: "'Jost',sans-serif", fontWeight: 300,
          color: "rgba(60,35,80,0.38)", fontSize: "10.5px",
          letterSpacing: "0.12em", margin: 0,
        }}>
          This page contains Amazon affiliate links. We earn a small commission
          at no extra cost to you — every purchase supports Spa-Pregio. 🌸
        </p>
      </div>

      {/* Sections */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 60px" }}>
        {SECTIONS.map(section => (
          <SpoilSection key={section.id} section={section} />
        ))}
      </div>

      {/* More sections coming soon */}
      <div style={{
        textAlign: "center", padding: "48px 24px 40px",
        borderTop: "1px solid rgba(155,124,182,0.12)",
      }}>
        <p style={{
          color: "rgba(60,35,80,0.4)", fontSize: "10px",
          letterSpacing: "0.3em", textTransform: "uppercase",
          fontFamily: "'Jost',sans-serif", marginBottom: "12px",
        }}>Coming soon</p>
        <p style={{
          fontFamily: "'Cormorant Garamond',serif", fontWeight: 300,
          fontSize: "clamp(18px,3vw,24px)",
          color: "rgba(60,35,80,0.55)", lineHeight: 1.6,
          maxWidth: "380px", margin: "0 auto",
        }}>
          Spoil Baby · Spoil the Party · What about Dad?
        </p>
      </div>

      {/* Bottom */}
      <div style={{
        textAlign: "center", padding: "40px 24px 80px",
      }}>
        <p style={{
          fontFamily: "'Cormorant Garamond',serif", fontWeight: 300,
          fontSize: "clamp(18px,3vw,22px)",
          color: "rgba(60,35,80,0.6)", lineHeight: 1.7,
          maxWidth: "380px", margin: "0 auto 22px",
        }}>
          Have a product you think belongs on this list?
        </p>
        <a
          href="mailto:hello@spa-pregio.com?subject=Spoil List Suggestion"
          style={{
            color: "#9B7CB6", fontFamily: "'Jost',sans-serif", fontWeight: 300,
            fontSize: "11px", letterSpacing: "0.3em",
            textTransform: "uppercase", textDecoration: "none",
            borderBottom: "1px solid rgba(155,124,182,0.35)",
            paddingBottom: "2px",
          }}
        >
          Tell us about it →
        </a>
      </div>
    </div>
  );
}
