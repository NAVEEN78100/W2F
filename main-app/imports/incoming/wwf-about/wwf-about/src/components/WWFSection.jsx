import React from "react";
import { motion } from "framer-motion";

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

        {/* W 2 F Images */}
        <div className="mb-24 min-h-[40vh] flex items-center justify-center">
          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8">
            {/* W Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94], repeat: Infinity, repeatDelay: 4 }}
              viewport={{ once: false, amount: 0.5 }}
              className="flex-shrink-0 flex items-center justify-center scale-105"
            >
              <img
                src="/w.png"
                alt="W"
                width="140"
                height="145"
                className="w-20 sm:w-32 md:w-40 lg:w-48 h-20 sm:h-32 md:h-40 lg:h-48 object-contain"
              />
            </motion.div>

            {/* 2 Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.8, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94], repeat: Infinity, repeatDelay: 4 }}
              viewport={{ once: false, amount: 0.5 }}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <img
                src="/2.png"
                alt="2"
                width="140"
                height="140"
                className="w-20 sm:w-32 md:w-40 lg:w-48 h-20 sm:h-32 md:h-40 lg:h-48 object-contain"
              />
            </motion.div>

            {/* F Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.8, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94], repeat: Infinity, repeatDelay: 4 }}
              viewport={{ once: false, amount: 0.5 }}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <img
                src="/f.png"
                alt="F"
                width="140"
                height="140"
                className="w-20 sm:w-32 md:w-40 lg:w-48 h-20 sm:h-32 md:h-40 lg:h-48 object-contain"
              />
            </motion.div>
          </div>
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
            © 2025 | Wander With Food (W2F) connects food lovers with unique culinary experiences across cities. Discover, explore, and taste your way through local favorites and hidden gems.
          </p>
          <p>
            W2F is built to help people find great food, support local vendors, and turn every meal into an experience worth sharing.
          </p>
        </div>
      </div>
    </section>
  );
}
