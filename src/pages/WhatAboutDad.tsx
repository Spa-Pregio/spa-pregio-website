import { useState } from "react";

// ─── Amazon Associates Tag ───────────────────────────────────────
const TAG = "ihh25-20";
const amzLink = (asin: string) =>
  `https://www.amazon.com/dp/${asin}?tag=${TAG}`;

// ─── Types ───────────────────────────────────────────────────────
interface Product {
  asin: string;
  name: string;
  description: string;
  price: string;
  badge?: string;
  imageUrl?: string;
}

interface Section {
  id: string;
  title: string;
  italic: string;
  tagline: string;
  accent: string;
  products: Product[];
}

// ─── Product Data ────────────────────────────────────────────────
// Replace ASINs + imageUrls with real Amazon products & photos
const SECTIONS: Section[] = [
  {
    id: "for_the_new_dad",
    title: "For the",
    italic: "New Dad",
    tagline: "He's figuring it out. Help him look good doing it.",
    accent: "#9B7CB6",
    products: [
      {
        asin: "XXXXXXXXXX",
        name: "Personalized Whiskey Glass",
        description: "Engraved with \"Dad\" and the baby's name. The kind of gift he'll keep forever.",
        price: "~$35",
        badge: "Fan Favorite",
        imageUrl: "",
      },
      {
        asin: "XXXXXXXXXX",
        name: "Leather Diaper Bag Backpack",
        description: "Finally — a diaper bag a dad will actually want to carry. Sleek, functional, handsome.",
        price: "~$75",
        badge: "We Love This",
        imageUrl: "",
      },
      {
        asin: "XXXXXXXXXX",
        name: "New Dad Survival Kit",
        description: "Everything he didn't know he needed. Makes a hilarious and heartfelt shower gift.",
        price: "~$45",
        badge: "Registry Must-Have",
        imageUrl: "",
      },
      {
        asin: "XXXXXXXXXX",
        name: "Engraved Money Clip",
        description: "A timeless keepsake to mark the moment he became a father.",
        price: "~$28",
        imageUrl: "",
      },
      {
        asin: "XXXXXXXXXX",
        name: "\"Dad\" Baseball Cap",
        description: "Soft, stylish, and perfectly on the nose. He'll wear it on every outing.",
        price: "~$22",
        imageUrl: "",
      },
      {
        asin: "XXXXXXXXXX",
        name: "Baby's First Year Photo Book",
        description: "A keepsake he'll actually sit down and look through. Make him cry — in a good way.",
        price: "~$40",
        badge: "The Splurge",
        imageUrl: "",
      },
    ],
  },
  {
    id: "dad_and_baby",
    title: "Dad",
    italic: "& Baby",
    tagline: "The matching set no one talks about enough.",
    accent: "#C9A96E",
    products: [
      {
        asin: "XXXXXXXXXX",
        name: "Matching Dad & Baby Outfit Set",
        description: "Coordinating looks for the first outing. The photos will be everything.",
        price: "~$48",
        badge: "We Love This",
        imageUrl: "",
      },
      {
        asin: "XXXXXXXXXX",
        name: "Baby Carrier for Dads",
        description: "Ergonomic, easy to clip, and designed with dads in mind. Hands-free and happy.",
        price: "~$90",
        badge: "Registry Must-Have",
        imageUrl: "",
      },
      {
        asin: "XXXXXXXXXX",
        name: "Dad & Baby Milestone Card Set",
        description: "Capture their firsts together — first nap, first bath, first bottle.",
        price: "~$22",
        imageUrl: "",
      },
      {
        asin: "XXXXXXXXXX",
        name: "Rocking Chair for the Nursery",
        description: "Because dads do bedtime too. Comfortable enough for both of them.",
        price: "~$220",
        badge: "The Splurge",
        imageUrl: "",
      },
    ],
  },
  {
    id: "celebrate_dad",
    title: "Celebrate",
    italic: "the Moment",
    tagline: "He paced that floor. He held her hand. He showed up.",
    accent: "#D09AC6",
    products: [
      {
        asin: "XXXXXXXXXX",
        name: "Personalized \"New Dad\" Tumbler",
        description: "Because coffee is his love language now. Keeps it hot through the 3am feeds.",
        price: "~$30",
        badge: "Fan Favorite",
        imageUrl: "",
      },
      {
        asin: "XXXXXXXXXX",
        name: "\"She Called, I Came\" Crew Neck",
        description: "The softest dad sweatshirt on Amazon. He'll live in it.",
        price: "~$38",
        imageUrl: "",
      },
      {
        asin: "XXXXXXXXXX",
        name: "Leather Photo Frame",
        description: "Warm, masculine, beautiful. Perfect for his desk or the nursery shelf.",
        price: "~$32",
        badge: "We Love This",
        imageUrl: "",
      },
      {
        asin: "XXXXXXXXXX",
        name: "Grill Set Gift Box",
        description: "His celebration. His rules. Let him grill about it.",
        price: "~$55",
        imageUrl: "",
      },
    ],
  },
];

const BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  "Fan Favorite":       { bg: "rgba(155,124,182,0.12)", text: "#7A5CAA" },
  "Registry Must-Have": { bg: "rgba(190,216,180,0.2)",  text: "#6A9E5A" },
  "We Love This":       { bg: "rgba(201,169,110,0.15)", text: "#A07830" },
  "The Splurge":        { bg: "rgba(209,154,198,0.15)", text: "#C47AB0" },
};

// ─── Product Card ────────────────────────────────────────────────
function ProductCard({ product, accent }: { product: Product; accent: string }) {
  const [hovered, setHovered] = useState(false);
  const badge = product.badge ? BADGE_COLORS[product.badge] : null;
  const hasImage = product.imageUrl && product.imageUrl.length > 0;

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
      {/* Product image */}
      <div style={{
        width: "100%",
        height: "220px",
        background: hasImage
          ? `url(${product.imageUrl}) center/cover no-repeat`
          : `linear-gradient(135deg, ${accent}18 0%, ${accent}08 100%)`,
        display: hasImage ? "block" : "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Badge overlay */}
        {badge && (
          <div style={{
            position: "absolute", top: "12px", left: "12px",
            background: badge.bg,
            backdropFilter: "blur(8px)",
            color: badge.text,
            fontSize: "9px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "'Jost',sans-serif",
            fontWeight: 400,
            padding: "5px 12px",
            borderRadius: "100px",
          }}>
            {product.badge}
          </div>
        )}
        {/* Placeholder when no image */}
        {!hasImage && (
          <p style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "13px", fontWeight: 300,
            color: `${accent}88`,
            letterSpacing: "0.1em",
            textAlign: "center",
            padding: "0 20px",
          }}>
            Add product image
          </p>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: "22px 22px 20px", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
        <h3 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "20px", fontWeight: 400,
          color: "#2D1F3D", margin: 0, lineHeight: 1.2,
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
          marginTop: "8px",
          paddingTop: "14px",
          borderTop: "1px solid rgba(155,124,182,0.1)",
        }}>
          <span style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "18px", fontWeight: 400,
            color: "#9B7CB6",
          }}>
            {product.price}
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
function DadSection({ section }: { section: Section }) {
  return (
    <div style={{ marginBottom: "80px" }}>
      <div style={{ marginBottom: "36px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
          <div style={{ width: "32px", height: "1px", background: section.accent, opacity: 0.7 }} />
          <span style={{
            color: section.accent, fontFamily: "'Jost',sans-serif",
            fontWeight: 300, fontSize: "9.5px",
            letterSpacing: "0.42em", textTransform: "uppercase",
          }}>Curated for him</span>
        </div>
        <h2 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontWeight: 300, fontSize: "clamp(40px,5vw,56px)",
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
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "20px",
      }}>
        {section.products.map((p, i) => (
          <ProductCard key={i} product={p} accent={section.accent} />
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────
export default function WhatAboutDad() {
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

      {/* ── Hero ── */}
      <div style={{ textAlign: "center", padding: "88px 24px 72px" }}>

        <div style={{
          display: "inline-flex", alignItems: "center", gap: "14px",
          marginBottom: "28px",
        }}>
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
          letterSpacing: "-0.02em", margin: "0 0 12px",
        }}>
          What about
        </h1>
        <h1 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontWeight: 300, fontSize: "clamp(52px,8vw,88px)",
          color: "#2D1F3D", lineHeight: 0.95,
          letterSpacing: "-0.02em", margin: "0 0 28px",
          fontStyle: "italic",
        }}>
          <em style={{ color: "#C9A96E" }}>Dad?</em>
        </h1>

        <p style={{
          fontFamily: "'Jost',sans-serif", fontWeight: 200,
          fontSize: "clamp(14px,2vw,17px)", lineHeight: 1.8,
          color: "rgba(60,35,80,0.62)", maxWidth: "500px",
          margin: "0 auto 20px", letterSpacing: "0.04em",
        }}>
          He paced the floor. He held her hand through every contraction.
          He ugly-cried in the delivery room and will deny it forever.
          He deserves something nice too.
        </p>

        {/* Shrimp ring callout */}
        <div style={{
          display: "inline-block",
          maxWidth: "480px",
          margin: "0 auto 20px",
          padding: "20px 28px",
          background: "rgba(201,169,110,0.08)",
          border: "1px solid rgba(201,169,110,0.22)",
          borderRadius: "16px",
          textAlign: "left",
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "15px", fontWeight: 400,
            color: "#9B6830", lineHeight: 1.7,
            margin: "0 0 6px",
            fontStyle: "italic",
          }}>
            "He went out at 11pm for a shrimp ring. He DoorDashed snacks
            she didn't need. He made every craving run without a single complaint."
          </p>
          <p style={{
            fontFamily: "'Jost',sans-serif", fontWeight: 300,
            fontSize: "10.5px", letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(60,35,80,0.4)", margin: 0,
          }}>
            — The story behind Spa-Pregio™
          </p>
        </div>

        <p style={{
          fontFamily: "'Jost',sans-serif", fontWeight: 300,
          color: "rgba(60,35,80,0.38)", fontSize: "10.5px",
          letterSpacing: "0.12em", margin: 0,
        }}>
          This page contains Amazon affiliate links. We earn a small commission
          at no extra cost to you — every purchase supports Spa-Pregio. 🌸
        </p>
      </div>

      {/* ── Sections ── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 100px" }}>
        {SECTIONS.map(section => (
          <DadSection key={section.id} section={section} />
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <div style={{
        textAlign: "center",
        padding: "48px 24px 80px",
        borderTop: "1px solid rgba(155,124,182,0.12)",
      }}>
        <p style={{
          fontFamily: "'Cormorant Garamond',serif", fontWeight: 300,
          fontSize: "clamp(18px,3vw,24px)",
          color: "rgba(60,35,80,0.65)", lineHeight: 1.7,
          maxWidth: "420px", margin: "0 auto 10px",
        }}>
          Know a dad who deserves to be celebrated?
        </p>
        <p style={{
          fontFamily: "'Jost',sans-serif", fontWeight: 200,
          fontSize: "13px", color: "rgba(60,35,80,0.45)",
          maxWidth: "360px", margin: "0 auto 24px", lineHeight: 1.7,
        }}>
          Pair any gift from this page with one of our Celebration Suites
          for the full experience.
        </p>
        <a
          href="/celebration-suites"
          style={{
            display: "inline-block",
            padding: "14px 36px",
            border: "1.5px solid #9B7CB6",
            color: "#7A5CAA", borderRadius: "100px",
            fontFamily: "'Jost',sans-serif", fontWeight: 400,
            fontSize: "11px", letterSpacing: "0.3em",
            textTransform: "uppercase", textDecoration: "none",
            transition: "all 0.25s",
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "#9B7CB6";
            el.style.color = "#FDFCFA";
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "transparent";
            el.style.color = "#7A5CAA";
          }}
        >
          Shop Celebration Suites →
        </a>
      </div>

    </div>
  );
}
