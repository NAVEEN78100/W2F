import React, { useEffect, useRef } from "react";
// import BottomNav from "../components/BottomNav";
import { motion, useScroll, useTransform } from "framer-motion";
import CallToActionFooter from "../components/CallToActionFooter";
import WWFSection from "../components/WWFSection";
import TestimonialsSection from "../components/TestimonialsSection";

// Import badges
import AppleBadge from "../assets/apple-badge.svg";
import GoogleBadge from "../assets/google-play-badge.png";

// ✅ Card Component (Updated with spacing from edges)
function ScrollCard({ card, index, total, scrollYProgress }) {
  const start = index / total;
  const end = (index + 1) / total;

  const y = useTransform(scrollYProgress, [start, end], [250, -250]);
  const opacity = useTransform(
    scrollYProgress,
    [start - 0.15, start, end, end + 0.15],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{ y, opacity }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className={`absolute w-full px-6 flex ${
        index % 2 === 0 ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`bg-white rounded-xl shadow-2xl max-w-md p-6 ${
          index % 2 === 0 ? "mr-12" : "ml-12"
        }`}
      >
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h3 className="text-xl font-bold text-gray-800">{card.title}</h3>
        <p className="text-gray-600">{card.description}</p>
      </div>
    </motion.div>
  );
}

export default function AboutUs() {
  const cards = [
    {
      id: 1,
      title: "Discover Restaurants",
      description:
        "Find hidden foodie gems nearby and enjoy unique dining experiences.",
      image:
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 2,
      title: "Support Home Bakers",
      description: "Love in every bite — fresh, homemade, and baked locally.",
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 3,
      title: "Sustain Local Food Culture",
      description:
        "Keep traditions alive with local recipes and homegrown ingredients.",
      image:
        "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 4,
      title: "Celebrate Local Chefs",
      description:
        "Discover passionate chefs in your neighborhood and enjoy dishes crafted with creativity and love.",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80",
    },
  ];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        className="h-screen flex flex-col justify-center items-center text-white text-center px-6 relative"
        style={{ backgroundColor: "rgb(71, 198, 231)" }}
      >
        <span className="uppercase tracking-widest text-sm bg-white/20 px-4 py-1 rounded-full mb-6">
          A flagship product by BINI
        </span>

        <h1 className="text-6xl font-extrabold mb-6">Your Next-Gen App</h1>

        <p className="max-w-3xl text-xl leading-relaxed mb-8">
          Wander With Food by BINI redefines your culinary experience in any
          town. Your go-to food guide to explore the best eat outs and hidden
          gems in your city. Upgrade to Wander With Food!
        </p>

        {/* Store Badges */}
        <div className="flex gap-4 mb-12">
          <a
            href="https://apps.apple.com/your-app-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={AppleBadge}
              alt="Download on the App Store"
              className="h-12"
            />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=your.app.id"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={GoogleBadge}
              alt="Get it on Google Play"
              className="h-12"
            />
          </a>
        </div>

        {/* Stats */}
        <div className="absolute bottom-6 left-6 text-left">
          <h3 className="text-3xl font-bold">500+</h3>
          <p className="text-lg">Restaurants</p>
        </div>
        <div className="absolute bottom-6 right-6 text-right">
          <h3 className="text-3xl font-bold">10K+</h3>
          <p className="text-lg">Active Users</p>
        </div>
      </section>

      {/* White Section with Sticky Heading + Scroll Cards */}
      <section ref={containerRef} className="relative h-[500vh] bg-white">
        {/* Heading stays fixed */}
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-center z-20">
          <h2 className="text-5xl font-extrabold text-gray-800 mb-6">
            Uniquely Yours
          </h2>
          <button
            className="bg-[#FF3B2E] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#e13226] transition duration-300"
            onClick={() => window.open("https://bini.com", "_blank")}
          >
            Visit BINI →
          </button>
        </div>

        {/* Animated cards */}
        <div className="sticky top-0 h-screen flex items-center justify-center">
          {cards.map((card, index) => (
            <ScrollCard
              key={card.id}
              card={card}
              index={index}
              total={cards.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </section>
      {/* <TestimonialsSection /> */}
      <CallToActionFooter />
      <WWFSection />
      {/* <BottomNav /> */}
    </div>
  );
}
