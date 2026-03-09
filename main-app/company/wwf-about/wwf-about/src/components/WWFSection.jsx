import React from "react";
import { motion } from "framer-motion";
import SplitText from "./SplitText"; // Make sure you have this component in your project

export default function WWFSection() {
  return (
    <section className="bg-gray-900 py-24 relative overflow-hidden min-h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Language Selector and Made By */}
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2 text-gray-400">
            <div className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center">
              <span className="text-xs">🌐</span>
            </div>
            <span className="text-sm">EN</span>
          </div>
          <div className="text-gray-400 text-sm">
            Made by <span className="text-orange-500 font-semibold tracking-widest">BINI</span>
          </div>
        </div>

        {/* WWF Blur Text */}
        <div className="mb-24 min-h-[40vh] flex items-center justify-center">
          <SplitText
  text="WWF"
  className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-black text-orange-500 leading-none tracking-tighter"
  delay={400}
  duration={0.8}
  ease="easeOut"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  textAlign="center"
  tag="h1"
  onLetterAnimationComplete={() => console.log("WWF letters animation completed!")}
/>

        </div>

        {/* WWF Event Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Wildlife Protection Card */}
          <motion.div
            className="relative rounded-3xl overflow-hidden h-64 bg-gradient-to-br from-red-800 via-red-700 to-red-900 p-8 flex flex-col justify-between text-white shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-3xl">🦁</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Wildlife Protection</h3>
              <p className="text-white/80 text-sm">
                Protecting endangered species and their habitats worldwide
              </p>
            </div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xs">🌍</span>
                </div>
                <span className="text-sm font-medium">Global Initiative</span>
              </div>
            </div>
          </motion.div>

          {/* Marine Conservation Card */}
          <motion.div
            className="relative rounded-3xl overflow-hidden h-64 bg-gradient-to-br from-green-700 via-teal-600 to-blue-700 p-8 flex flex-col justify-between text-white shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-3xl">🐋</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Marine Conservation</h3>
              <p className="text-white/80 text-sm">
                Preserving ocean ecosystems and marine biodiversity
              </p>
            </div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xs">🌊</span>
                </div>
                <span className="text-sm font-medium">Ocean Protection</span>
              </div>
            </div>
          </motion.div>

          {/* Climate Action Card */}
          <motion.div
            className="relative rounded-3xl overflow-hidden h-64 bg-gradient-to-br from-orange-600 via-red-500 to-pink-600 p-8 flex flex-col justify-between text-white shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Climate Action</h3>
              <p className="text-white/80 text-sm">
                Fighting climate change through sustainable solutions
              </p>
            </div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xs">♻</span>
                </div>
                <span className="text-sm font-medium">Sustainability</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Text */}
        <div className="text-gray-400 text-sm max-w-4xl mx-auto leading-relaxed">
          <p className="mb-4">
            © 2025 | World Wildlife Fund is dedicated to protecting wildlife and their habitats worldwide. WWF
            operates in over 100 countries and is supported by millions of members globally.
          </p>
          <p>
            WWF is committed to conservation, research, and advocacy to ensure a sustainable future for our planet.
            Join us in our mission to create a world where people and nature thrive together.
          </p>
        </div>
      </div>
    </section>
  );
}
