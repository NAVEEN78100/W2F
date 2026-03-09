"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import ScrollFloatImages from "@/components/ScrollFloatImages"
import { Button } from "@/components/ui/button"
import {
  Building2,
  Plus,
  Shield,
  Users,
  Star,
  ChefHat,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Linkedin,
} from "lucide-react"

export default function AboutPage() {
  const [expandedFooterItem, setExpandedFooterItem] = useState<string | null>(null)
  const cards = [
    {
      id: 1,
      title: "Discover Restaurants",
      description: "Find hidden foodie gems nearby and enjoy unique dining experiences.",
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
      description: "Keep traditions alive with local recipes and homegrown ingredients.",
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
  ]

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-white">
      <Link
        href="/"
        className="fixed top-4 left-4 z-[70] group inline-flex items-center gap-2 rounded-full border border-yellow-400/70 bg-yellow-50/90 px-4 py-2 text-sm font-semibold text-yellow-900 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-100 hover:shadow-xl active:translate-y-0 active:scale-[0.98] dark:border-yellow-300/50 dark:bg-zinc-900/85 dark:text-yellow-200 dark:hover:bg-zinc-800"
      >
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-0.5">
          ←
        </span>
        <span>back to home</span>
      </Link>
      {/* Hero Section */}
      <section
        className="h-screen flex flex-col justify-center items-center text-white text-center px-6 relative"
        style={{ backgroundColor: "#fdcc08" }}
      >
        <span className="uppercase tracking-widest text-sm bg-white/20 px-4 py-1 rounded-full mb-6">
          A flagship product by BINI
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">Your Next-Gen App</h1>

        <p className="max-w-3xl text-lg sm:text-xl leading-relaxed mb-8 text-white/90">
          Wander With Food by BINI redefines your culinary experience in any town. Your go-to food guide to explore the
          best eat outs and hidden gems in your city. Upgrade to Wander With Food!
        </p>

        <div className="flex gap-4 mb-12 flex-wrap justify-center">
          <a href="#" className="block transition-all duration-300 ease-out hover:scale-105">
            <Image
              src="/app-store-official.svg"
              alt="Download on the App Store"
              width={155}
              height={60}
              className="h-[60px] w-[155px] object-contain"
            />
          </a>
          <a href="#" className="block transition-all duration-300 ease-out hover:scale-105">
            <Image
              src="/google-play-official.svg"
              alt="Get it on Google Play"
              width={155}
              height={60}
              className="h-[60px] w-[155px] object-contain"
            />
          </a>
        </div>

        <div className="absolute bottom-6 left-6 text-left">
          <h3 className="text-3xl font-bold">500+</h3>
          <p className="text-lg">Restaurants</p>
        </div>
        <div className="absolute bottom-6 right-6 text-right">
          <h3 className="text-3xl font-bold">10K+</h3>
          <p className="text-lg">Active Users</p>
        </div>
      </section>

      {/* Sticky Heading + Scroll Cards */}
      <section ref={containerRef} className="relative h-[500vh] bg-white">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-center z-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6">Uniquely Yours</h2>
          <button
            className="bg-[#FF3B2E] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#e13226] transition duration-300"
            onClick={() => window.open("https://www.bini.co.in/", "_blank")}
          >
            Visit BINI →
          </button>
        </div>

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

      {/* Final Call-to-Action Section */}
      <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black leading-tight"
              style={{ color: "#FFD402" }}
            >
              1 million users,
              <span className="block">plus you.</span>
            </h2>
            <p
              className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-medium px-4"
              style={{ color: "#FFD402" }}
            >
              It only takes few seconds to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 sm:pt-8">
              <Link href="#" className="block transition-all duration-300 ease-out hover:scale-105">
                <Image
                  src="/app-store-official.svg"
                  alt="Download on the App Store"
                  width={155}
                  height={60}
                  className="h-[60px] w-[155px] object-contain"
                />
              </Link>
              <Link href="#" className="block transition-all duration-300 ease-out hover:scale-105">
                <Image
                  src="/google-play-official.svg"
                  alt="Get it on Google Play"
                  width={155}
                  height={60}
                  className="h-[60px] w-[155px] object-contain"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-white py-12 sm:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
                    <Plus
                      className={`w-5 h-5 sm:w-6 sm:h-6 text-orange-500 transition-transform duration-300 ${
                        expandedFooterItem === "partner" ? "rotate-45" : ""
                      }`}
                    />
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
                        Join our network of restaurant partners and reach thousands of food enthusiasts. Grow your business
                        with WWF&apos;s powerful platform and increase your visibility in the local dining scene.
                      </p>
                      <Link href="http://localhost:3000/company/partners-react">
                        <Button className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                          Partner with us →
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Report a problem */}
              <div className="border-2 border-red-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-red-50 to-orange-50">
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
                    <Plus
                      className={`w-5 h-5 sm:w-6 sm:h-6 text-red-500 transition-transform duration-300 ${
                        expandedFooterItem === "problem" ? "rotate-45" : ""
                      }`}
                    />
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
                        We&apos;re here to help! If you&apos;ve encountered an issue or have concerns about our service, please share
                        your feedback with us. Your input helps us improve the WWF experience for everyone.
                      </p>
                      <Link href="http://localhost:3000/feedback">
                        <Button className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                          Send Feedback →
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Help Center */}
              <div className="border-2 border-blue-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-50 to-cyan-50">
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
                    <Plus
                      className={`w-5 h-5 sm:w-6 sm:h-6 text-blue-500 transition-transform duration-300 ${
                        expandedFooterItem === "help" ? "rotate-45" : ""
                      }`}
                    />
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
                        Find answers to frequently asked questions, learn how to use WWF features, and get support for any
                        issues you may encounter. Our help center has everything you need.
                      </p>
                      <Link href="http://localhost:3000/support">
                        <Button className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                          Visit Help Center →
                        </Button>
                      </Link>
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
                <Link href="/restaurants" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  WWF Card
                </Link>
                <Link href="/delivery" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Delivery
                </Link>
              </div>
            </div>

            {/* Company Column */}
            <div className="space-y-4">
              <h3 className="text-orange-500 font-semibold text-lg">Company</h3>
              <div className="space-y-3">
                <Link href="/about" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  About
                </Link>
                <Link href="/newsroom" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Newsroom
                </Link>
                <Link href="/partnerships" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Partnerships
                </Link>
                <Link href="/media" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Media Assets
                </Link>
              </div>
            </div>

            {/* Legal Column */}
            <div className="space-y-4">
              <h3 className="text-orange-500 font-semibold text-lg">Legal</h3>
              <div className="space-y-3">
                <Link href="/cookie-policy" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Cookie Policy
                </Link>
                <Link href="/privacy" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Terms and Conditions
                </Link>
                <Link href="/disclaimers" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Disclaimers
                </Link>
                <Link href="/aml" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  AML Policy
                </Link>
              </div>
            </div>

            {/* Help Column */}
            <div className="space-y-4">
              <h3 className="text-orange-500 font-semibold text-lg">Help</h3>
              <div className="space-y-3">
                <Link href="/developers" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Developers
                </Link>
                <Link href="/faq" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  FAQ
                </Link>
                <Link href="/support" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Help Center
                </Link>
                <Link href="/releases" className="block text-orange-500 hover:text-orange-600 transition-colors">
                  Release Notes
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Section with Certifications and Social Media */}
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 pt-8 border-t border-gray-200">
            {/* Certification Badges */}
            <div className="flex items-center space-x-6 opacity-60">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-gray-500" />
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-gray-500" />
              </div>
              <div className="text-xs text-gray-500 font-medium">
                <div>FOOD SAFETY</div>
                <div>CERTIFIED</div>
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-gray-500" />
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-gray-500" />
              </div>
            </div>

            {/* Expanded Social Media Icons */}
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
                aria-label="X (Twitter)"
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
                href="https://threads.net/wanderwithfood"
                className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                aria-label="Threads"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.01v-.017C1.5 8.417 2.35 5.563 3.995 3.512 5.845 1.205 8.598.024 12.186 0h.014c3.588.024 6.341 1.205 8.191 3.512 1.645 2.051 2.495 4.905 2.495 8.481v.017c0 3.576-.85 6.43-2.495 8.481-1.85 2.304-4.603 3.485-8.191 3.509z" />
                  <path
                    d="M12 8.5c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5zm0 7c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"
                    fill="white"
                  />
                </svg>
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

      {/* WWF Section */}
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
    </div>
  )
}

function ScrollCard({
  card,
  index,
  total,
  scrollYProgress,
}: {
  card: { title: string; description: string; image: string }
  index: number
  total: number
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"]
}) {
  const start = index / total
  const end = (index + 1) / total

  const y = useTransform(scrollYProgress, [start, end], [250, -250])
  const opacity = useTransform(
    scrollYProgress,
    [start - 0.15, start, end, end + 0.15],
    [0, 1, 1, 0]
  )

  return (
    <motion.div
      style={{ y, opacity }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className={`absolute w-full px-6 flex ${index % 2 === 0 ? "justify-end" : "justify-start"}`}
    >
      <div className={`bg-white rounded-xl shadow-2xl max-w-md p-6 ${index % 2 === 0 ? "mr-12" : "ml-12"}`}>
        <img src={card.image} alt={card.title} className="w-full h-64 object-cover rounded-lg mb-4" />
        <h3 className="text-xl font-bold text-gray-800">{card.title}</h3>
        <p className="text-gray-600">{card.description}</p>
      </div>
    </motion.div>
  )
}
