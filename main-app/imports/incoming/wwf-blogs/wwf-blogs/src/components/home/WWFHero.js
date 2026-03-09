import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
function Stat({ k, v }) {
  return (
    <div>
      <p className="text-2xl font-bold">{k}</p>
      <p className="text-sm text-black/70">{v}</p>
    </div>
  );
}

export default function WWFHero() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFD200] via-[#FFE55A] to-[#FFC107]">
      {/* gradient blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full opacity-30 blur-3xl bg-white/30" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[32rem] h-[32rem] rounded-full opacity-30 blur-3xl bg-white/30" />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 grid md:grid-cols-2 gap-10">
        {/* Left: copy */}
        <div data-aos="fade-up" className="text-black">
          {/* Tiny badge */}
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-black" />
            Wander With Food
          </div>

          {/* Tagline – PDF says “Same tagline” */}
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Money, but better.
          </h1>

          <p className="mt-5 text-lg md:text-xl max-w-xl">
            Discover local flavors, support home bakers, and elevate everyday dining — all in one place.
          </p>

          {/* CTA row */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {/* Explore (active) */}
            <Link
              to="/explore"
              className="bg-black text-white rounded-xl px-5 py-3 font-semibold hover:opacity-90 transition"
            >
              Explore
            </Link>

            {/* Login/Sign up: show but “disabled/coming soon” per PDF */}
            <button
              className="rounded-xl px-5 py-3 font-semibold bg-white/70 text-gray-600 cursor-not-allowed"
              title="Coming soon"
            >
              Log in (soon)
            </button>
            <button
              className="rounded-xl px-5 py-3 font-semibold bg-white/70 text-gray-600 cursor-not-allowed"
              title="Coming soon"
            >
              Sign up (soon)
            </button>
          </div>

          {/* Store buttons */}
          <div className="mt-6 flex items-center gap-3">
            <a
              href="#"
              className="flex items-center gap-3 bg-black text-white rounded-xl px-4 py-3 hover:opacity-90 transition"
            >
              {/* minimal Apple icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.365 1.43c0 1.14-.45 2.17-1.2 2.95-.76.79-1.98 1.38-3.2 1.28-.1-1.12.5-2.2 1.25-2.98.8-.84 2.12-1.45 3.15-1.25zM20.89 17.23c-.69 1.58-1.02 2.24-1.92 3.62-1.25 1.9-2.91 4.26-5.04 4.3-1.96.04-2.57-1.27-4.79-1.27-2.22 0-2.9 1.24-4.85 1.31-1.95.07-3.44-2.06-4.7-3.94C-1.5 17.24-.53 11.81 2.4 10.02c1.27-.8 2.92-.9 4.6-.33 1 .34 1.86.77 2.6.77.7 0 1.79-.6 3.12-.82 2.19-.37 4.07.48 5.15 2.03-2.03 1.23-1.91 4.04.02 5.56z"/></svg>
              <span className="text-sm font-semibold">App Store</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 bg-black text-white rounded-xl px-4 py-3 hover:opacity-90 transition"
            >
              {/* minimal Play icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 22V2l18 10L3 22z"/></svg>
              <span className="text-sm font-semibold">Google Play</span>
            </a>
          </div>

          {/* Tiny note (PDF: “A Product by BINI” appears in footers, but we echo here subtly) */}
          <p className="mt-3 text-sm text-black/70">A Product by BINI</p>
        </div>

        {/* Right: hero visual */}
        <div className="relative" data-aos="fade-left">
          <div className="relative mx-auto w-[300px] md:w-[380px] h-[620px] md:h-[680px] rounded-[2.5rem] bg-white shadow-2xl border border-black/10 overflow-hidden">
            {/* phone notch */}
            <div className="absolute left-1/2 -translate-x-1/2 top-3 w-28 h-5 bg-black/90 rounded-b-2xl" />
            {/* looping “food” cards */}
            <div className="absolute inset-0 p-6">
              <div className="space-y-4 animate-[float_6s_ease-in-out_infinite]">
                <Card line1="Star Dines" line2="Reserve & enjoy" color="bg-red-500/10" />
                <Card line1="Home Bakers" line2="Fresh from home" color="bg-emerald-500/10" />
                <Card line1="Street Foods" line2="Local favourites" color="bg-blue-500/10" />
              </div>
            </div>
          </div>

          {/* floating chips */}
          <span className="absolute -left-6 md:-left-10 top-10 bg-black text-white text-xs px-3 py-1 rounded-full" data-aos="zoom-in" data-aos-delay="200">Simple</span>
          <span className="absolute right-0 md:-right-6 top-32 bg-white/80 text-black text-xs px-3 py-1 rounded-full" data-aos="zoom-in" data-aos-delay="300">Fast</span>
          <span className="absolute left-1/3 bottom-6 bg-white/80 text-black text-xs px-3 py-1 rounded-full" data-aos="zoom-in" data-aos-delay="400">Safe</span>
        </div>
      </div>

      {/* stats row */}
      <div className="border-t border-black/10 bg-white/60 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <Stat k="25+" v="Cities" />
          <Stat k="1k+" v="Vendors" />
          <Stat k="500+" v="Home Bakers" />
          <Stat k="24/7" v="Support" />
        </div>
      </div>
    </section>
  );
}

function Card({ line1, line2, color }) {
  return (
    <div className={`rounded-2xl p-5 ${color} border border-black/10 shadow`}>
      <p className="text-sm font-semibold">{line1}</p>
      <p className="text-xs text-black/70">{line2}</p>
    </div>
  );
}
