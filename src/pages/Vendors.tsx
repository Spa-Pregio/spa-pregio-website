import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

const questions = [
  {
    id: "business_type",
    question: "What type of business or service do you offer?",
    options: [
      { label: "Spa, wellness, or beauty services", value: "spa_wellness" },
      { label: "Photography or videography", value: "photography" },
      { label: "Baby or maternity products", value: "baby_products" },
      { label: "Food, meal prep, or nutrition", value: "food_nutrition" },
      { label: "Event planning or gifting", value: "events_gifting" },
      { label: "Other family services", value: "other" },
    ],
  },
  {
    id: "service_area",
    question: "Where do you primarily serve clients?",
    options: [
      { label: "Locally / in-person", value: "local" },
      { label: "Online / virtual", value: "online" },
      { label: "Both", value: "both" },
    ],
  },
  {
    id: "ideal_client",
    question: "Who is your ideal client?",
    options: [
      { label: "Expecting mothers", value: "expecting" },
      { label: "New moms (postpartum)", value: "postpartum" },
      { label: "Families with young children", value: "families" },
      { label: "All of the above", value: "all" },
    ],
  },
  {
    id: "current_reach",
    question: "How do you currently reach new clients?",
    options: [
      { label: "Word of mouth", value: "word_of_mouth" },
      { label: "Social media", value: "social_media" },
      { label: "My own website", value: "website" },
      { label: "I'm just getting started", value: "starting" },
    ],
  },
  {
    id: "motivation",
    question: "What would connecting with Spa-Pregio™ mean for your business?",
    options: [
      { label: "More visibility to the right audience", value: "visibility" },
      { label: "A trusted referral network", value: "referrals" },
      { label: "A way to give back to mothers", value: "giving_back" },
      { label: "All of the above", value: "all" },
    ],
  },
];

type Answers = Record<string, string>;

export default function Vendors() {
  const [phase, setPhase] = useState<"hero" | "quiz" | "details" | "account" | "done">("hero");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [businessName, setBusinessName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profileId, setProfileId] = useState<string | null>(null);

  const current = questions[step];
  const progress = (step / questions.length) * 100;

  function handleAnswer(value: string) {
    const updated = { ...answers, [current.id]: value };
    setAnswers(updated);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setPhase("details");
    }
  }

  async function handleDetails() {
    if (!businessName || !location) return;
    setLoading(true);
    setError("");
    try {
      const { data, error: dbErr } = await supabase
        .from("vendor_profiles")
        .insert([{ ...answers, business_name: businessName, location, status: "pending_signup" }])
        .select()
        .single();
      if (dbErr) throw dbErr;
      setProfileId(data.id);
      setPhase("account");
    } catch (e: any) {
      setError(e?.message || JSON.stringify(e) || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup() {
    if (!email || !password) return;
    setLoading(true);
    setError("");
    try {
      const { data: authData, error: authErr } = await supabase.auth.signUp({ email, password });
      if (authErr) throw authErr;
      if (profileId && authData.user) {
        await supabase
          .from("vendor_profiles")
          .update({ user_id: authData.user.id, email, status: "pending_review" })
          .eq("id", profileId);
      }
      setPhase("done");
    } catch (e: any) {
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .v-fade-in {
          animation: vFadeIn 0.6s ease forwards;
        }
        @keyframes vFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .v-option-btn {
          width: 100%;
          background: white;
          border: 1.5px solid #E5E0D8;
          border-radius: 12px;
          padding: 18px 24px;
          text-align: left;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-size: 15px;
          font-weight: 400;
          color: #2a2520;
          transition: all 0.2s ease;
          letter-spacing: 0.01em;
        }
        .v-option-btn:hover {
          border-color: #C9A96E;
          background: #FFFDF8;
          transform: translateX(4px);
        }

        .v-primary-btn {
          background: linear-gradient(135deg, #2a2520, #4a3f35);
          color: #C9A96E;
          border: none;
          border-radius: 4px;
          padding: 16px 48px;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 24px rgba(42, 37, 32, 0.2);
        }
        .v-primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(42, 37, 32, 0.3);
          background: linear-gradient(135deg, #3a3028, #5a4f45);
        }
        .v-primary-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .v-text-input {
          width: 100%;
          border: 1.5px solid #E5E0D8;
          border-radius: 6px;
          padding: 14px 18px;
          font-family: 'Jost', sans-serif;
          font-size: 15px;
          color: #2a2520;
          background: white;
          outline: none;
          transition: border-color 0.2s;
        }
        .v-text-input:focus {
          border-color: #C9A96E;
        }

        .v-progress-bar {
          height: 2px;
          background: #EDE8E0;
          overflow: hidden;
        }
        .v-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #C9A96E, #e8c98a);
          transition: width 0.5s ease;
        }
      `}</style>

      {/* HERO PHASE */}
      {phase === "hero" && (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <div style={{
            position: "relative",
            height: "55vh",
            background: "linear-gradient(160deg, #1a1510 0%, #2e2518 50%, #4a3c28 100%)",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            {/* Gold accent lines */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, transparent, #C9A96E, transparent)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "rgba(201, 169, 110, 0.3)" }} />
            <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", border: "1px solid rgba(201,169,110,0.08)", top: -150, right: -150 }} />
            <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "rgba(201,169,110,0.04)", bottom: -80, left: -60 }} />

            <div className="v-fade-in" style={{ textAlign: "center", padding: "0 32px", position: "relative", zIndex: 1 }}>
              <p style={{ color: "#C9A96E", fontFamily: "'Jost', sans-serif", letterSpacing: "0.25em", fontSize: 11, textTransform: "uppercase", marginBottom: 20 }}>
                Spa-Pregio™ Vendor Partnership
              </p>
              <h1 style={{ color: "white", fontSize: "clamp(32px, 5.5vw, 62px)", fontWeight: 300, lineHeight: 1.15, fontStyle: "italic", marginBottom: 16 }}>
                Reach the families<br />who need you most.
              </h1>
              <p style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Jost', sans-serif", fontSize: 15, fontWeight: 300, maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
                Join a curated directory of trusted businesses serving expecting mothers, new parents, and growing families.
              </p>
            </div>
          </div>

          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 24px",
            textAlign: "center"
          }}>
            {/* Value props */}
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center", marginBottom: 40 }}>
              {[
                { label: "Curated Directory", desc: "Listed alongside trusted, vetted businesses" },
                { label: "Warm Referrals", desc: "Connected to mothers actively searching" },
                { label: "Meaningful Reach", desc: "An audience that values what you offer" },
              ].map(item => (
                <div key={item.label} style={{ textAlign: "center", maxWidth: 160 }}>
                  <div style={{ width: 32, height: 1, background: "#C9A96E", margin: "0 auto 12px" }} />
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2a2520", marginBottom: 6 }}>{item.label}</p>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 13, color: "#9a8a7a", fontWeight: 300, lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              ))}
            </div>
            <button className="v-primary-btn" onClick={() => setPhase("quiz")}>
              Apply to Join
            </button>
            <p style={{ marginTop: 20, color: "#bbb", fontFamily: "'Jost', sans-serif", fontSize: 12, letterSpacing: "0.05em" }}>
              Takes 2 minutes · Free to apply
            </p>
          </div>
        </div>
      )}

      {/* QUIZ PHASE */}
      {phase === "quiz" && (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "24px 32px 0", maxWidth: 640, margin: "0 auto", width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, color: "#C9A96E", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                Spa-Pregio™
              </span>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, color: "#bbb" }}>
                {step + 1} of {questions.length}
              </span>
            </div>
            <div className="v-progress-bar">
              <div className="v-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="v-fade-in" key={step} style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "40px 24px",
            maxWidth: 640,
            margin: "0 auto",
            width: "100%"
          }}>
            <h2 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 400, color: "#1a1510", lineHeight: 1.3, marginBottom: 36, fontStyle: "italic" }}>
              {current.question}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {current.options.map((opt) => (
                <button key={opt.value} className="v-option-btn" onClick={() => handleAnswer(opt.value)}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DETAILS PHASE */}
      {phase === "details" && (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
          <div className="v-fade-in" style={{ maxWidth: 520, width: "100%", textAlign: "center" }}>
            <p style={{ color: "#C9A96E", fontFamily: "'Jost', sans-serif", letterSpacing: "0.2em", fontSize: 12, textTransform: "uppercase", marginBottom: 16 }}>
              Almost done
            </p>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 300, color: "#1a1510", fontStyle: "italic", marginBottom: 12 }}>
              Tell us about your business
            </h2>
            <p style={{ color: "#9a8a7a", fontFamily: "'Jost', sans-serif", fontSize: 14, marginBottom: 40, lineHeight: 1.6 }}>
              We're building your vendor profile now.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "left" }}>
              <div>
                <label style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, color: "#C9A96E", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Business Name</label>
                <input className="v-text-input" type="text" placeholder="Your business name" value={businessName} onChange={e => setBusinessName(e.target.value)} />
              </div>
              <div>
                <label style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, color: "#C9A96E", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>City, State</label>
                <input className="v-text-input" type="text" placeholder="e.g. Charlotte, NC" value={location} onChange={e => setLocation(e.target.value)} />
              </div>
            </div>
            {error && <p style={{ color: "#c0392b", fontFamily: "'Jost', sans-serif", fontSize: 13, marginTop: 16 }}>{error}</p>}
            <button className="v-primary-btn" style={{ marginTop: 36 }} onClick={handleDetails} disabled={loading || !businessName || !location}>
              {loading ? "Building your profile..." : "Continue"}
            </button>
          </div>
        </div>
      )}

      {/* ACCOUNT PHASE */}
      {phase === "account" && (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
          <div className="v-fade-in" style={{ maxWidth: 520, width: "100%", textAlign: "center" }}>
            <div style={{ width: 56, height: 56, border: "1px solid #C9A96E", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#C9A96E", fontSize: 20 }}>✦</span>
            </div>
            <p style={{ color: "#C9A96E", fontFamily: "'Jost', sans-serif", letterSpacing: "0.2em", fontSize: 12, textTransform: "uppercase", marginBottom: 16 }}>
              Your profile is ready
            </p>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, color: "#1a1510", fontStyle: "italic", marginBottom: 12 }}>
              Secure your listing
            </h2>
            <p style={{ color: "#9a8a7a", fontFamily: "'Jost', sans-serif", fontSize: 14, marginBottom: 40, lineHeight: 1.6 }}>
              Create your account to complete your application and manage your vendor profile.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "left" }}>
              <div>
                <label style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, color: "#C9A96E", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Business Email</label>
                <input className="v-text-input" type="email" placeholder="you@yourbusiness.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div>
                <label style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, color: "#C9A96E", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Create a Password</label>
                <input className="v-text-input" type="password" placeholder="At least 8 characters" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
            </div>
            {error && <p style={{ color: "#c0392b", fontFamily: "'Jost', sans-serif", fontSize: 13, marginTop: 16 }}>{error}</p>}
            <button className="v-primary-btn" style={{ marginTop: 36 }} onClick={handleSignup} disabled={loading || !email || !password}>
              {loading ? "Creating your account..." : "Complete Application"}
            </button>
            <p style={{ marginTop: 16, color: "#bbb", fontFamily: "'Jost', sans-serif", fontSize: 11, lineHeight: 1.6 }}>
              Your listing will be reviewed within 48 hours. We'll reach out by email.
            </p>
          </div>
        </div>
      )}

      {/* DONE PHASE */}
      {phase === "done" && (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
          <div className="v-fade-in" style={{ maxWidth: 520, width: "100%" }}>
            <div style={{ width: 56, height: 56, border: "1px solid #C9A96E", margin: "0 auto 32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#C9A96E", fontSize: 20 }}>✦</span>
            </div>
            <p style={{ color: "#C9A96E", fontFamily: "'Jost', sans-serif", letterSpacing: "0.2em", fontSize: 12, textTransform: "uppercase", marginBottom: 16 }}>
              Application received
            </p>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 300, color: "#1a1510", fontStyle: "italic", marginBottom: 16, lineHeight: 1.2 }}>
              Welcome to the directory, {businessName}.
            </h2>
            <p style={{ color: "#9a8a7a", fontFamily: "'Jost', sans-serif", fontSize: 15, lineHeight: 1.7, marginBottom: 40 }}>
              Your application is under review. We'll be in touch within 48 hours. Thank you for choosing to serve families through Spa-Pregio™.
            </p>
            <a href="/" style={{ textDecoration: "none" }}>
              <button className="v-primary-btn">Visit Spa-Pregio™</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
