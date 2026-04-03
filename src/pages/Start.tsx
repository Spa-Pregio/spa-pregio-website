import { useNavigate } from "react-router-dom";

export default function Start() {
  const navigate = useNavigate();

  const handleSelect = (type: string) => {
    navigate(`/suites?type=${type}`);
  };

  return (
    <div className="min-h-screen bg-spa-cream flex items-center justify-center px-6">
      <div className="max-w-4xl w-full text-center">

        <h1 className="text-5xl font-bold text-spa-charcoal mb-6 font-serif">
          What Are You Celebrating?
        </h1>

        <p className="text-spa-gray mb-12">
          Choose your moment and we’ll guide you to the perfect experience.
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          <button onClick={() => handleSelect("baby-shower")} className="p-6 rounded-2xl bg-white shadow hover:shadow-lg">
            Baby Shower
          </button>

          <button onClick={() => handleSelect("gender-reveal")} className="p-6 rounded-2xl bg-white shadow hover:shadow-lg">
            Gender Reveal
          </button>

          <button onClick={() => handleSelect("sip-and-see")} className="p-6 rounded-2xl bg-white shadow hover:shadow-lg">
            Sip & See
          </button>

          <button onClick={() => handleSelect("pregnancy-announcement")} className="p-6 rounded-2xl bg-white shadow hover:shadow-lg">
            Pregnancy Announcement
          </button>

          <button onClick={() => handleSelect("push-present-pampering")} className="p-6 rounded-2xl bg-white shadow hover:shadow-lg md:col-span-2">
            Push Present & Pampering
          </button>

        </div>
      </div>
    </div>
  );
}
