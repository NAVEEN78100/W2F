import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Shield, Star, Users, ChefHat, Instagram, Twitter, Facebook, Youtube, Linkedin, Building2 } from "lucide-react";

export default function CallToActionFooter() {
  const [expandedFooterItem, setExpandedFooterItem] = useState(null);

  return (
    <>
      {/* Final Call-to-Action Section */}
      <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black leading-tight" style={{ color: "#FFD402" }}>
              1 million users,
              <span className="block">plus you.</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-medium" style={{ color: "#FFD402" }}>
              It only takes few seconds to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 sm:pt-8">
              <a href="#" className="block transition-all duration-300 ease-out hover:scale-105">
                <img
                  src="/app-store-official.svg"
                  alt="Download on the App Store"
                  width="155"
                  height="60"
                  className="h-[60px] w-[155px] object-contain"
                />
              </a>
              <a href="#" className="block transition-all duration-300 ease-out hover:scale-105">
                <img
                  src="/google-play-official.svg"
                  alt="Get it on Google Play"
                  width="155"
                  height="60"
                  className="h-[60px] w-[155px] object-contain"
                />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-white py-12 sm:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8 sm:mb-12">
            <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
              {/* Partner with us */}
              <div className="border-2 border-orange-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-orange-50 to-yellow-50">
                <div
                  className="p-4 sm:p-5 hover:bg-orange-100/50 transition-all cursor-pointer"
                  onClick={() => setExpandedFooterItem(expandedFooterItem === "partner" ? null : "partner")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-orange-600 font-semibold text-base sm:text-lg">Partner with us</span>
                    </div>
                    <Plus className={`w-5 h-5 sm:w-6 sm:h-6 text-orange-500 transition-transform duration-300 ${expandedFooterItem === "partner" ? "rotate-45" : ""}`} />
                  </div>
                </div>
                {expandedFooterItem === "partner" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 sm:px-5 pb-5 bg-white/80 backdrop-blur-sm"
                  >
                    <div className="pt-4 border-t border-orange-200">
                      <p className="text-gray-700 mb-5 text-sm sm:text-base leading-relaxed">
                        Join our network of restaurant partners and reach thousands of food enthusiasts. Grow your business with WWF's powerful platform and increase your visibility in the local dining scene.
                      </p>
                      <a href="http://localhost:3000/company/partners-react" className="inline-block">
                        <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-5 py-3 rounded-xl">
                          Partner with us →
                        </button>
                      </a>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Report a problem */}
              <div className="border-2 border-orange-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-red-50 to-orange-50">
                <div
                  className="p-4 sm:p-5 hover:bg-red-100/50 transition-all cursor-pointer"
                  onClick={() => setExpandedFooterItem(expandedFooterItem === "problem" ? null : "problem")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-red-600 font-semibold text-base sm:text-lg">Report a problem</span>
                    </div>
                    <Plus className={`w-5 h-5 sm:w-6 sm:h-6 text-red-500 transition-transform duration-300 ${expandedFooterItem === "problem" ? "rotate-45" : ""}`} />
                  </div>
                </div>
                {expandedFooterItem === "problem" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 sm:px-5 pb-5 bg-white/80 backdrop-blur-sm"
                  >
                    <div className="pt-4 border-t border-red-200">
                      <p className="text-gray-700 mb-5 text-sm sm:text-base leading-relaxed">
                        We're here to help! If you've encountered an issue or have concerns about our service, please share your feedback with us. Your input helps us improve the WWF experience for everyone.
                      </p>
                      <a href="http://localhost:3000/feedback" className="inline-block">
                        <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-5 py-3 rounded-xl">
                          Send Feedback →
                        </button>
                      </a>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Help Center */}
              <div className="border-2 border-orange-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-50 to-purple-50">
                <div
                  className="p-4 sm:p-5 hover:bg-blue-100/50 transition-all cursor-pointer"
                  onClick={() => setExpandedFooterItem(expandedFooterItem === "help" ? null : "help")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-blue-600 font-semibold text-base sm:text-lg">Help Center</span>
                    </div>
                    <Plus className={`w-5 h-5 sm:w-6 sm:h-6 text-blue-500 transition-transform duration-300 ${expandedFooterItem === "help" ? "rotate-45" : ""}`} />
                  </div>
                </div>
                {expandedFooterItem === "help" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 sm:px-5 pb-5 bg-white/80 backdrop-blur-sm"
                  >
                    <div className="pt-4 border-t border-blue-200">
                      <p className="text-gray-700 mb-5 text-sm sm:text-base leading-relaxed">
                        Find answers to frequently asked questions, learn how to use WWF features, and get support for any issues you may encounter.
                      </p>
                      <a href="http://localhost:3000/support" className="inline-block">
                        <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-5 py-3 rounded-xl">
                          Visit Help Center →
                        </button>
                      </a>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
            {/* Discover Column */}
            <div className="space-y-4">
              <h3 className="text-orange-500 font-semibold text-lg">Discover</h3>
              <div className="space-y-3">
                <a href="/restaurants" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  WWF Card
                </a>
                <a href="/delivery" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Delivery
                </a>
              </div>
            </div>

            {/* Company Column */}
            <div className="space-y-4">
              <h3 className="text-orange-500 font-semibold text-lg">Company</h3>
              <div className="space-y-3">
                <a href="/about" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  About
                </a>
                <a href="/newsroom" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Newsroom
                </a>
                <a href="/partnerships" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Partnerships
                </a>
                <a href="/media" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Media Assets
                </a>
              </div>
            </div>

            {/* Legal Column */}
            <div className="space-y-4">
              <h3 className="text-orange-500 font-semibold text-lg">Legal</h3>
              <div className="space-y-3">
                <a href="/cookie-policy" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Cookie Policy
                </a>
                <a href="/privacy" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Terms and Conditions
                </a>
                <a href="/disclaimers" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Disclaimers
                </a>
                <a href="/aml" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  AML Policy
                </a>
              </div>
            </div>

            {/* Help Column */}
            <div className="space-y-4">
              <h3 className="text-orange-500 font-semibold text-lg">Help</h3>
              <div className="space-y-3">
                <a href="/developers" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Developers
                </a>
                <a href="/faq" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  FAQ
                </a>
                <a href="/support" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Help Center
                </a>
                <a href="/releases" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Release Notes
                </a>
              </div>
            </div>
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
