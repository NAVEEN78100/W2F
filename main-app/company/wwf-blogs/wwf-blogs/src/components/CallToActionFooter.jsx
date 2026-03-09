import React from "react";
import { motion } from "framer-motion";
import { Apple, Play, Plus, Shield, Star, Users, ChefHat, Instagram, Twitter, Facebook, Youtube, Linkedin } from "lucide-react";

export default function CallToActionFooter() {
  return (
    <>
      {/* Final Call-to-Action Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-red-500 leading-tight">
              1 million users,
              <span className="block">plus you.</span>
            </h2>
            <p className="text-xl md:text-2xl text-red-500 max-w-2xl mx-auto leading-relaxed font-medium">
              It only takes few seconds to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3">
                <Apple className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs opacity-80">Download on the</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3">
                <Play className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs opacity-80">Get it on</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="max-w-2xl mx-auto space-y-4">
              {["Smart Phone", "Smart Watch", "Tablet / Computer"].map((item, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-orange-500 font-medium">{item}</span>
                    <Plus className="w-5 h-5 text-orange-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
            {[
              {
                title: "Get Started",
                links: [
                  { text: "Sign up", href: "/signup" },
                  { text: "Login", href: "/login" },
                ],
              },
              {
                title: "Discover",
                links: [
                  { text: "WWF Card", href: "/restaurants" },
                  { text: "Delivery", href: "/delivery" },
                ],
              },
              {
                title: "Company",
                links: [
                  { text: "About", href: "/about" },
                  { text: "Newsroom", href: "/newsroom" },
                  { text: "Partnerships", href: "/partnerships" },
                  { text: "Media Assets", href: "/media" },
                ],
              },
              {
                title: "Legal",
                links: [
                  { text: "Cookie Policy", href: "/cookie-policy" },
                  { text: "Privacy Policy", href: "/privacy" },
                  { text: "Terms and Conditions", href: "/terms" },
                  { text: "Disclaimers", href: "/disclaimers" },
                  { text: "AML Policy", href: "/aml" },
                ],
              },
              {
                title: "Help",
                links: [
                  { text: "Developers", href: "/developers" },
                  { text: "FAQ", href: "/faq" },
                  { text: "Support", href: "/support" },
                  { text: "Release Notes", href: "/releases" },
                ],
              },
            ].map((col, i) => (
              <div key={i} className="space-y-4">
                <h3 className="text-orange-500 font-semibold text-lg">{col.title}</h3>
                <div className="space-y-3">
                  {col.links.map((link, j) => (
                    <a
                      key={j}
                      href={link.href}
                      className="block text-orange-500 hover:text-orange-600 transition-colors"
                    >
                      {link.text}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Section with Certifications and Social Media */}
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 pt-8 border-t border-gray-200">
            {/* Certification Badges */}
            <div className="flex items-center space-x-6 opacity-60">
              {[Shield, Star, Users, ChefHat].map((Icon, i) => (
                <div key={i} className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-gray-500" />
                </div>
              ))}
              <div className="text-xs text-gray-500 font-medium">
                <div>FOOD SAFETY</div>
                <div>CERTIFIED</div>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-3">
              {[Instagram, Twitter, Facebook, Youtube, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
