'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import ScrollFloatImages from '@/components/ScrollFloatImages'
import { Button } from '@/components/ui/button'
import { Building2, Shield, Users, Plus, Instagram, Twitter, Facebook, Youtube, Linkedin, Star, ChefHat } from 'lucide-react'

export default function PartnersFooter() {
  const [expandedFooterItem, setExpandedFooterItem] = useState<string | null>(null)

  return (
    <>
      {/* Main Footer Section - White Background */}
      <footer className="bg-white py-12 sm:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8 sm:mb-12">
            <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
              {/* Partner with us */}
              <div className="border-2 border-orange-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-orange-50 to-yellow-50">
                <div 
                  className="p-4 sm:p-5 hover:bg-orange-100/50 transition-all cursor-pointer"
                  onClick={() => setExpandedFooterItem(expandedFooterItem === 'partner' ? null : 'partner')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-orange-600 font-semibold text-base sm:text-lg">Partner with us</span>
                    </div>
                    <Plus className={`w-5 h-5 sm:w-6 sm:h-6 text-orange-500 transition-transform duration-300 ${expandedFooterItem === 'partner' ? 'rotate-45' : ''}`} />
                  </div>
                </div>
                <AnimatePresence>
                  {expandedFooterItem === 'partner' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 sm:px-5 pb-5 bg-white/80 backdrop-blur-sm"
                    >
                      <div className="pt-4 border-t border-orange-200">
                        <p className="text-gray-700 mb-5 text-sm sm:text-base leading-relaxed">
                          Join our network of restaurant partners and reach thousands of food enthusiasts. Grow your business with WWF's powerful platform and increase your visibility in the local dining scene.
                        </p>
                        <Link href="http://localhost:3000/company/partners-react">
                          <Button className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                            Partner with us →
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Report a problem */}
              <div className="border-2 border-red-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-red-50 to-orange-50">
                <div 
                  className="p-4 sm:p-5 hover:bg-red-100/50 transition-all cursor-pointer"
                  onClick={() => setExpandedFooterItem(expandedFooterItem === 'problem' ? null : 'problem')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-red-600 font-semibold text-base sm:text-lg">Report a problem</span>
                    </div>
                    <Plus className={`w-5 h-5 sm:w-6 sm:h-6 text-red-500 transition-transform duration-300 ${expandedFooterItem === 'problem' ? 'rotate-45' : ''}`} />
                  </div>
                </div>
                <AnimatePresence>
                  {expandedFooterItem === 'problem' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 sm:px-5 pb-5 bg-white/80 backdrop-blur-sm"
                    >
                      <div className="pt-4 border-t border-red-200">
                        <p className="text-gray-700 mb-5 text-sm sm:text-base leading-relaxed">
                          We're here to help! If you've encountered an issue or have concerns about our service, please share your feedback with us. Your input helps us improve the WWF experience for everyone.
                        </p>
                        <Link href="http://localhost:3000/feedback">
                          <Button className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                            Send Feedback →
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Help Center */}
              <div className="border-2 border-blue-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-50 to-cyan-50">
                <div 
                  className="p-4 sm:p-5 hover:bg-blue-100/50 transition-all cursor-pointer"
                  onClick={() => setExpandedFooterItem(expandedFooterItem === 'help' ? null : 'help')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-blue-600 font-semibold text-base sm:text-lg">Help Center</span>
                    </div>
                    <Plus className={`w-5 h-5 sm:w-6 sm:h-6 text-blue-500 transition-transform duration-300 ${expandedFooterItem === 'help' ? 'rotate-45' : ''}`} />
                  </div>
                </div>
                <AnimatePresence>
                  {expandedFooterItem === 'help' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 sm:px-5 pb-5 bg-white/80 backdrop-blur-sm"
                    >
                      <div className="pt-4 border-t border-blue-200">
                        <p className="text-gray-700 mb-5 text-sm sm:text-base leading-relaxed">
                          Find answers to frequently asked questions, learn how to use WWF features, and get support for any issues you may encounter. Our help center has everything you need.
                        </p>
                        <Link href="http://localhost:3000/support">
                          <Button className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                            Visit Help Center →
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Main Footer Content - 4 Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 pt-8">
            {/* WWF Column */}
            <div className="space-y-4">
              <h3 className="text-black font-bold text-2xl">WWF</h3>
              <p className="text-gray-500 text-sm">Wander With Food - Your culinary companion</p>
            </div>

            {/* Company Column */}
            <div className="space-y-4">
              <h3 className="text-orange-500 font-semibold text-lg">Company</h3>
              <div className="space-y-3">
                <Link href="/about" className="block text-orange-500 hover:text-orange-600 transition-colors text-sm">
                  About Us
                </Link>
                <Link href="/blogs" className="block text-orange-500 hover:text-orange-600 transition-colors text-sm">
                  Blogs
                </Link>
                <Link href="/partner" className="block text-orange-500 hover:text-orange-600 transition-colors text-sm">
                  Partner with Us
                </Link>
              </div>
            </div>

            {/* Support Column */}
            <div className="space-y-4">
              <h3 className="text-orange-500 font-semibold text-lg">Support</h3>
              <div className="space-y-3">
                <Link href="/contact" className="block text-orange-500 hover:text-orange-600 transition-colors text-sm">
                  Contact
                </Link>
                <Link href="/feedback" className="block text-orange-500 hover:text-orange-600 transition-colors text-sm">
                  Feedback
                </Link>
                <Link href="/support" className="block text-orange-500 hover:text-orange-600 transition-colors text-sm">
                  Help Center
                </Link>
              </div>
            </div>

            {/* Connect Column */}
            <div className="space-y-4">
              <h3 className="text-orange-500 font-semibold text-lg">Connect</h3>
              <div className="space-y-3">
                <Link href="https://instagram.com/wanderwithfood" className="block text-orange-500 hover:text-orange-600 transition-colors text-sm">
                  Instagram
                </Link>
                <Link href="https://facebook.com/wanderwithfood" className="block text-orange-500 hover:text-orange-600 transition-colors text-sm">
                  Facebook
                </Link>
                <Link href="https://x.com/wanderwithfood" className="block text-orange-500 hover:text-orange-600 transition-colors text-sm">
                  Twitter
                </Link>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-8"></div>

          {/* Bottom Section with Certifications and Social Media */}
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 py-8">
            {/* Certification Badges */}
            <div className="flex items-center space-x-6 opacity-60">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-gray-500" />
              </div>
              <div className="text-xs text-gray-500 font-medium text-center">
                <div>FOOD SAFETY</div>
                <div>CERTIFIED</div>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-gray-500 text-center text-sm flex-grow">
              © 2024 WWF - Wander With Food. All rights reserved.
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-3">
              <Link
                href="https://instagram.com/wanderwithfood"
                className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://x.com/wanderwithfood"
                className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://facebook.com/wanderwithfood"
                className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://youtube.com/wanderwithfood"
                className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com/company/wanderwithfood"
                className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* W 2 F Section - Black Background */}
      <section className="bg-black py-20 relative overflow-hidden">
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
          <ScrollFloatImages
            animationDuration={2.2}
            ease="back.inOut(2)"
            scrollStart="top bottom+=70%"
            scrollEnd="bottom top+=10%"
            stagger={0.1}
            scrub={2.0}
            containerClassName="mb-24 min-h-[40vh] flex items-center justify-center"
          >
            <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8">
              {/* W Image */}
              <div className="scroll-float-image-item flex-shrink-0 flex items-center justify-center scale-[1.2]">
                <Image
                  src="/w.png"
                  alt="W"
                  width={170}
                  height={175}
                  className="!w-28 sm:!w-40 md:!w-48 lg:!w-56 !h-28 sm:!h-40 md:!h-48 lg:!h-56 object-contain"
                />
              </div>

              {/* 2 Image */}
              <div className="scroll-float-image-item flex-shrink-0 flex items-center justify-center">
                <Image
                  src="/2.png"
                  alt="2"
                  width={140}
                  height={140}
                  className="!w-20 sm:!w-32 md:!w-40 lg:!w-48 !h-20 sm:!h-32 md:!h-40 lg:!h-48 object-contain"
                />
              </div>

              {/* F Image */}
              <div className="scroll-float-image-item flex-shrink-0 flex items-center justify-center">
                <Image
                  src="/f.png"
                  alt="F"
                  width={140}
                  height={140}
                  className="!w-20 sm:!w-32 md:!w-40 lg:!w-48 !h-20 sm:!h-32 md:!h-40 lg:!h-48 object-contain"
                />
              </div>
            </div>
          </ScrollFloatImages>

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
                <p className="text-white/80 text-sm">Protecting endangered species and their habitats worldwide</p>
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
                <p className="text-white/80 text-sm">Preserving ocean ecosystems and marine biodiversity</p>
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
                <p className="text-white/80 text-sm">Fighting climate change through sustainable solutions</p>
              </div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xs">♻️</span>
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
    </>
  )
}
