/// <reference types="vite/client" />
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const questions = [
  {
    id: "trimester",
    question: "How far along are you in your journey?",
    options: [
      { label: "Just found out / First trimester", value: "first" },
      { label: "Second trimester", value: "second" },
      { label: "Third trimester", value: "third" },
      { label: "I'm newly postpartum", value: "postpartum" },
    ],
  },
  {
    id: "is_first_baby",
    question: "Is this your first baby?",
    options: [
      { label: "Yes, my first!", value: "first" },
      { label: "No, I've done this before", value: "experienced" },
      { label: "I'm expecting multiples", value: "multiples" },
    ],
  },
  {
    id: "needs",
    question: "What do you need most right now?",
    options: [
      { label: "Rest and relaxation ideas", value: "rest" },
      { label: "Help planning my baby shower / celebration", value: "planning" },
      { label: "Products and resources for my baby", value: "products" },
      { label: "Community and support from other moms", value: "community" },
    ],
  },
  {
    id: "support_source",
    question: "Who is your biggest support right now?",
    options: [
      { label: "My partner", value: "partner" },
      { label: "My mom / family", value: "family" },
      { label: "My friends", value: "friends" },
      { label: "Honestly, I'm figuring it out on my own", value: "solo" },
    ],
  },
  {
    id: "pain_point",
    question: "What feels most overwhelming?",
    options: [
      { label: "Knowing what I actually need", value: "overwhelmed_needs" },
      { label: "Affording everything", value: "finances" },
      { label: "Finding time for myself", value: "self_care" },
      { label: "All of the above", value: "all" },
    ],
  },
];

type Answers = Record<string, string>;

export default function ExpectingMom() {
  const [phase, setPhase] = useState<"hero" | "quiz" | "details" | "account" | "done">("hero");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profileId, setProfileId] = useState<string | null>(null);

  const current = questions[step];
  const progress = ((step) / questions.length) * 100;

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
    if (!name || !dueDate) return;
    setLoading(true);
    setError("");
    try {
      const { data, error: dbErr } = await supabase
        .from("mom_profiles")
        .insert([{ ...answers, name, due_date: dueDate, status: "pending_signup" }])
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
          .from("mom_profiles")
          .update({ user_id: authData.user.id, email, status: "active" })
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
    <div style={{ minHeight: "100vh", background: "#FDFCFA", fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .fade-in {
          animation: fadeIn 0.6s ease forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .option-btn {
          width: 100%;
          background: white;
          border: 1.5px solid #E8E0EE;
          border-radius: 12px;
          padding: 18px 24px;
          text-align: left;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-size: 15px;
          font-weight: 400;
          color: #3a2e40;
          transition: all 0.2s ease;
          letter-spacing: 0.01em;
        }
        .option-btn:hover {
          border-color: #9B7CB6;
          background: #FAF6FF;
          transform: translateX(4px);
        }

        .primary-btn {
          background: linear-gradient(135deg, #9B7CB6, #D09AC6);
          color: white;
          border: none;
          border-radius: 50px;
          padding: 16px 48px;
          font-family: 'Jost', sans-serif;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(155, 124, 182, 0.35);
        }
        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(155, 124, 182, 0.45);
        }
        .primary-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .text-input {
          width: 100%;
          border: 1.5px solid #E8E0EE;
          border-radius: 10px;
          padding: 14px 18px;
          font-family: 'Jost', sans-serif;
          font-size: 15px;
          color: #3a2e40;
          background: white;
          outline: none;
          transition: border-color 0.2s;
        }
        .text-input:focus {
          border-color: #9B7CB6;
        }

        .progress-bar {
          height: 3px;
          background: #F0EAF6;
          border-radius: 2px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #9B7CB6, #D09AC6);
          border-radius: 2px;
          transition: width 0.5s ease;
        }
      `}</style>

      {/* HERO PHASE */}
      {phase === "hero" && (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          {/* Hero Image */}
          <div style={{
            position: "relative",
            height: "75vh",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            {/* Full background photo */}
            <img
              src="/images/expecting-hero.png"
              alt="Expecting mother in Spa-Pregio robe"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }}
            />
            {/* Soft overlay so text stays readable */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(42,31,51,0.72) 0%, rgba(74,46,90,0.58) 50%, rgba(122,78,138,0.4) 100%)" }} />

            <div className="fade-in" style={{ textAlign: "center", padding: "0 24px", position: "relative", zIndex: 1 }}>
              <p style={{ color: "#D09AC6", fontFamily: "'Jost', sans-serif", letterSpacing: "0.2em", fontSize: 12, textTransform: "uppercase", marginBottom: 20 }}>
                A gift just for you
              </p>
              <h1 style={{ color: "white", fontSize: "clamp(36px, 6vw, 68px)", fontWeight: 300, lineHeight: 1.15, fontStyle: "italic", marginBottom: 16 }}>
                You deserve to be<br />celebrated, Mama.
              </h1>
              <p style={{ color: "rgba(255,255,255,0.88)", fontFamily: "'Jost', sans-serif", fontSize: 16, fontWeight: 300, maxWidth: 420, margin: "0 auto" }}>
                Answer a few questions and we'll create your personalized Celebration Suite preview — completely free.
              </p>
            </div>
          </div>

          {/* CTA Card */}
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 24px",
            textAlign: "center"
          }}>
            <div style={{ marginBottom: 32 }}>
              <div style={{ width: 40, height: 1, background: "#C9A96E", margin: "0 auto 24px" }} />
              <p style={{ color: "#7a6285", fontFamily: "'Jost', sans-serif", fontSize: 15, fontWeight: 300, maxWidth: 380, lineHeight: 1.7 }}>
                Join the Spa-Pregio™ movement — a community built to honor mothers at every stage of the journey.
              </p>
              <div style={{ width: 40, height: 1, background: "#C9A96E", margin: "24px auto 0" }} />
            </div>
            <button className="primary-btn" onClick={() => setPhase("quiz")}>
              Begin My Experience
            </button>
            <p style={{ marginTop: 20, color: "#bbb", fontFamily: "'Jost', sans-serif", fontSize: 12, letterSpacing: "0.05em" }}>
              Takes less than 2 minutes · No credit card needed
            </p>
          </div>
        </div>
      )}

      {/* QUIZ PHASE */}
      {phase === "quiz" && (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          {/* Top bar */}
          <div style={{ padding: "24px 32px 0", maxWidth: 600, margin: "0 auto", width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, color: "#9B7CB6", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Spa-Pregio™
              </span>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, color: "#bbb" }}>
                {step + 1} of {questions.length}
              </span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Question */}
          <div className="fade-in" key={step} style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "40px 24px",
            maxWidth: 600,
            margin: "0 auto",
            width: "100%"
          }}>
            <h2 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 400, color: "#2a1f33", lineHeight: 1.3, marginBottom: 36, fontStyle: "italic" }}>
              {current.question}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {current.options.map((opt) => (
                <button key={opt.value} className="option-btn" onClick={() => handleAnswer(opt.value)}>
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
          <div className="fade-in" style={{ maxWidth: 520, width: "100%", textAlign: "center" }}>
            <p style={{ color: "#C9A96E", fontFamily: "'Jost', sans-serif", letterSpacing: "0.2em", fontSize: 12, textTransform: "uppercase", marginBottom: 16 }}>
              Almost there
            </p>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 300, color: "#2a1f33", fontStyle: "italic", marginBottom: 12 }}>
              Tell us a little more about you
            </h2>
            <p style={{ color: "#9a8aa6", fontFamily: "'Jost', sans-serif", fontSize: 14, marginBottom: 40, lineHeight: 1.6 }}>
              We're personalizing your free suite preview right now.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "left" }}>
              <div>
                <label style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, color: "#9B7CB6", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Your First Name</label>
                <input className="text-input" type="text" placeholder="e.g. Sarah" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div>
                <label style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, color: "#9B7CB6", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Due Date (approximate is fine)</label>
                <input className="text-input" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
              </div>
            </div>
            {error && <p style={{ color: "#c0392b", fontFamily: "'Jost', sans-serif", fontSize: 13, marginTop: 16 }}>{error}</p>}
            <button className="primary-btn" style={{ marginTop: 36 }} onClick={handleDetails} disabled={loading || !name || !dueDate}>
              {loading ? "Preparing your suite..." : "Continue"}
            </button>
          </div>
        </div>
      )}

      {/* ACCOUNT PHASE */}
      {phase === "account" && (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
          <div className="fade-in" style={{ maxWidth: 520, width: "100%", textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg, #9B7CB6, #D09AC6)", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: 28 }}>✦</span>
            </div>
            <p style={{ color: "#C9A96E", fontFamily: "'Jost', sans-serif", letterSpacing: "0.2em", fontSize: 12, textTransform: "uppercase", marginBottom: 16 }}>
              Your profile is ready, {name}
            </p>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, color: "#2a1f33", fontStyle: "italic", marginBottom: 12 }}>
              One last step to unlock your free suite
            </h2>
            <p style={{ color: "#9a8aa6", fontFamily: "'Jost', sans-serif", fontSize: 14, marginBottom: 40, lineHeight: 1.6 }}>
              Create your password to access your personalized Celebration Suite preview and join the Spa-Pregio™ community.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "left" }}>
              <div>
                <label style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, color: "#9B7CB6", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Email Address</label>
                <input className="text-input" type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div>
                <label style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, color: "#9B7CB6", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Create a Password</label>
                <input className="text-input" type="password" placeholder="At least 8 characters" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
            </div>
            {error && <p style={{ color: "#c0392b", fontFamily: "'Jost', sans-serif", fontSize: 13, marginTop: 16 }}>{error}</p>}
            <button className="primary-btn" style={{ marginTop: 36 }} onClick={handleSignup} disabled={loading || !email || !password}>
              {loading ? "Creating your account..." : "Unlock My Free Suite"}
            </button>
            <p style={{ marginTop: 16, color: "#bbb", fontFamily: "'Jost', sans-serif", fontSize: 11, lineHeight: 1.6 }}>
              By continuing you agree to our Terms of Service. We will never share your information.
            </p>
          </div>
        </div>
      )}

      {/* DONE PHASE */}
      {phase === "done" && (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
          <div className="fade-in" style={{ maxWidth: 520, width: "100%" }}>
            <div style={{ fontSize: 48, marginBottom: 24 }}>✦</div>
            <p style={{ color: "#C9A96E", fontFamily: "'Jost', sans-serif", letterSpacing: "0.2em", fontSize: 12, textTransform: "uppercase", marginBottom: 16 }}>
              Welcome to the movement
            </p>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 300, color: "#2a1f33", fontStyle: "italic", marginBottom: 16, lineHeight: 1.2 }}>
              You are celebrated, {name}.
            </h2>
            <p style={{ color: "#9a8aa6", fontFamily: "'Jost', sans-serif", fontSize: 15, lineHeight: 1.7, marginBottom: 40 }}>
              Your free Celebration Suite preview is on its way to your inbox. Check your email — and welcome to Spa-Pregio™.
            </p>
            <a href="/" style={{ textDecoration: "none" }}>
              <button className="primary-btn">Explore Spa-Pregio™</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
