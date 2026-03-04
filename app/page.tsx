"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Image from "next/image"
import ScrollFloat from "@/components/ScrollFloat"
import ScrollFloatImages from "@/components/ScrollFloatImages"
import VariableProximity from "@/components/VariableProximity"
import { useScroll } from "framer-motion"
import SplitText from "@/components/SplitText"
import TrueFocus from "@/components/TrueFocus"
import {
  Play,
  Apple,
  Star,
  Truck,
  MapPin,
  Heart,
  Clock,
  ChefHat,
  Search,
  Users,
  Shield,
  Home,
  Compass,
  Building2,
  Plus,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Linkedin,
} from "lucide-react"
import PhoneCardsAnimation from "@/components/PhoneCardsAnimation"
import TestimonialsSection from "@/components/TestimonialsSection"
import PhoneFrame from "@/components/PhoneFrame"
import AnimationSelector from "@/components/AnimationSelector"
import QRScanAnimation from "@/components/animations/QRScanAnimation"
import BrowseRestaurantsAnimation from "@/components/animations/BrowseRestaurantsAnimation"
import OffersAnimation from "@/components/animations/OffersAnimation"
import SwipeCardsAnimation from "@/components/animations/SwipeCardsAnimation"
import ComingSoonAnimation from "@/components/animations/ComingSoonAnimation"

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeAnimation, setActiveAnimation] = useState(1)
  const [elapsedMs, setElapsedMs] = useState(0)
  const [runNonce, setRunNonce] = useState(0)
  const [expandedFooterItem, setExpandedFooterItem] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollYProgress = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const featureCards = [
    {
      icon: <Search className="w-12 h-12" />,
      title: "Discover",
      description: "Find amazing restaurants and hidden culinary gems near you",
      color: "bg-gradient-to-br from-orange-400 to-red-500",
      emoji: "🔍",
    },
    {
      icon: <Truck className="w-12 h-12" />,
      title: "Order",
      description: "Get your favorite meals delivered fresh to your doorstep",
      color: "bg-gradient-to-br from-green-400 to-blue-500",
      emoji: "🚚",
    },
    {
      icon: <Star className="w-12 h-12" />,
      title: "Experience",
      description: "Rate, review and share your culinary adventures",
      color: "bg-gradient-to-br from-purple-400 to-pink-500",
      emoji: "⭐",
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Connect",
      description: "Join a community of food lovers and share recommendations",
      color: "bg-gradient-to-br from-blue-400 to-indigo-500",
      emoji: "👥",
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Trust",
      description: "Verified reviews and secure payments for peace of mind",
      color: "bg-gradient-to-br from-teal-400 to-cyan-500",
      emoji: "🛡️",
    },
  ]

  const appFeatures = [
    {
      id: 1,
      title: "Restaurant Discovery",
      subtitle: "Find hidden gems and popular spots near you with smart recommendations",
      icon: <MapPin className="w-16 h-16" />,
      emoji: "🗺️",
      bgColor: "#FCD34D",
    },
    {
      id: 2,
      title: "Quick Delivery",
      subtitle: "Get food delivered in 30 minutes or less with real-time tracking",
      icon: <Truck className="w-16 h-16" />,
      emoji: "⚡",
      bgColor: "#FCD34D",
    },
    {
      id: 3,
      title: "Save Favorites",
      subtitle: "Keep track of your favorite dishes and places for easy reordering",
      icon: <Heart className="w-16 h-16" />,
      emoji: "❤️",
      bgColor: "#FCD34D",
    },
    {
      id: 4,
      title: "Real-time Tracking",
      subtitle: "Track your order from kitchen to doorstep with live updates",
      icon: <Clock className="w-16 h-16" />,
      emoji: "⏰",
      bgColor: "#FCD34D",
    },
    {
      id: 5,
      title: "Chef Recommendations",
      subtitle: "Get personalized suggestions from top chefs and food experts",
      icon: <ChefHat className="w-16 h-16" />,
      emoji: "👨‍🍳",
      bgColor: "#FCD34D",
    },
  ]

  const wonderWithFoodWords = [
    {
      text: "Explore",
      color: "text-green-500",
      bgColor: "bg-green-500",
      emoji: "🔍",
      icon: "🗺️",
    },
    {
      text: "Review",
      color: "text-blue-500",
      bgColor: "bg-blue-500",
      emoji: "⭐",
      icon: "📝",
    },
    {
      text: "Rewards",
      color: "text-red-500",
      bgColor: "bg-red-500",
      emoji: "🎁",
      icon: "🏆",
    },
  ]

  const animations = [
    { id: 1, title: 'QR Scan & Rate', description: 'Scan QR codes at restaurants, view menus, and leave ratings with instant rewards', component: <QRScanAnimation />, duration: 17000 },
    { id: 2, title: 'Browse & Filter', description: 'Discover top-rated places in Coimbatore with powerful filtering options', component: <BrowseRestaurantsAnimation />, duration: 8500 },
    { id: 3, title: 'Exclusive Offers', description: 'View and share special offers from your favorite restaurants', component: <OffersAnimation />, duration: 9000 },
    { id: 4, title: 'Swipe to Save', description: 'Swipe right to wishlist dishes, swipe left to skip', component: <SwipeCardsAnimation />, duration: 12000 },
    { id: 5, title: 'Coming Soon', description: 'More exciting features on the way', component: <ComingSoonAnimation />, duration: 4000 },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % appFeatures.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const current = animations.find(a => a.id === activeAnimation)
    if (!current) return

    setElapsedMs(0)
    const start = Date.now()

    const progressInterval = setInterval(() => {
      setElapsedMs(Math.min(Date.now() - start, current.duration))
    }, 50)

    const timer = setTimeout(() => {
      setActiveAnimation(prev => (prev < animations.length ? prev + 1 : 1))
    }, current.duration)

    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
    }
  }, [activeAnimation, runNonce])

  const currentDuration = animations.find((a) => a.id === activeAnimation)?.duration ?? 1
  const animationProgress = Math.min(100, (elapsedMs / currentDuration) * 100)

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navigation - Simplified header without login/signup and nav items */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-center">
            <div className="scale-75 sm:scale-90 md:scale-100">
              <TrueFocus
                sentence="WANDER WITH FOOD"
                manualMode={false}
                blurAmount={2}
                borderColor="#FFC000"
                animationDuration={2}
                pauseBetweenAnimations={0.5}
              />
            </div>
          </div>
        </div>
      </motion.nav>

      <motion.div
        className="fixed bottom-4 sm:bottom-6 left-0 right-0 flex justify-center z-50"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="bg-white/90 backdrop-blur-md rounded-full px-3 sm:px-6 shadow-2xl border border-white/20 py-1">
          <div className="flex items-center space-x-2 sm:space-x-6">
            <Link
              href="/"
              className="flex flex-col items-center space-y-1 px-2 sm:px-4 py-2 rounded-full hover:bg-orange-100 transition-all duration-300 group"
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-orange-500 transition-colors" />
              <span className="text-xs font-medium text-gray-600 group-hover:text-orange-500 transition-colors hidden sm:block">
                Home
              </span>
            </Link>

            <Link
              href="/explore"
              className="flex flex-col items-center space-y-1 px-2 sm:px-4 py-2 rounded-full hover:bg-orange-100 transition-all duration-300 group"
            >
              <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-orange-500 transition-colors" />
              <span className="text-xs font-medium text-gray-600 group-hover:text-orange-500 transition-colors hidden sm:block">
                Explore
              </span>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex flex-col items-center space-y-1 px-2 sm:px-4 py-2 rounded-full hover:bg-orange-100 transition-all duration-300 group">
                  <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-orange-500 transition-colors" />
                  <span className="text-xs font-medium text-gray-600 group-hover:text-orange-500 transition-colors hidden sm:block">
                    Company
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-xl border-0 rounded-xl mb-2">
                <DropdownMenuItem asChild>
                  <Link href="/company/about" className="hover:bg-orange-50">
                    About Us
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/company/wwf-blogs/index.html" className="hover:bg-orange-50">
                    Blogs
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/company/partners-react" className="hover:bg-orange-50">
                    Partners
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/company/grievance" className="hover:bg-orange-50">
                    Grievance
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/feedback" className="hover:bg-orange-50">
                    Feedback
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6">
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover text-transparent"
          >
            <source
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Landing%20Page%20Animation-MPcOiXUNGqJjqBOIGvFCuR4l6dWxCz.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="flex items-start justify-start min-h-screen pb-16 sm:pb-20 pt-60 sm:pt-72 md:pt-80 lg:pt-96">
            {/* Left side - All content stacked */}
            <div className="space-y-6 sm:space-y-8 w-full lg:max-w-2xl" ref={containerRef}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <VariableProximity
                  label="Pocket friendly
options in plenty"
                  fromFontVariationSettings="'wght' 400, 'wdth' 100"
                  toFontVariationSettings="'wght' 900, 'wdth' 125"
                  containerRef={containerRef as any}
                  radius={150}
                  falloff="exponential"
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight block whitespace-pre-line"
                  style={{
                    fontFamily: "'Inter Variable', 'Inter', system-ui, sans-serif",
                    fontFeatureSettings: '"ss01" 1, "ss02" 1',
                    textShadow: "0 0 30px rgba(255, 255, 255, 0.3)",
                    filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.2))",
                  }}
                />
              </motion.div>

              <motion.p
                className="text-lg sm:text-xl text-white/90 leading-relaxed"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.0, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {"Elevate your dining experience in a single tap "}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.0, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Link 
                  href="#" 
                  className="block transition-all duration-300 ease-out hover:scale-105"
                >
                  <Image
                    src="/google-play-official.svg"
                    alt="Get it on Google Play"
                    width={155}
                    height={60}
                    className="h-[60px] w-[155px] object-contain"
                  />
                </Link>
                <Link 
                  href="#" 
                  className="block transition-all duration-300 ease-out hover:scale-105"
                >
                  <Image
                    src="/app-store-official.svg"
                    alt="Download on the App Store"
                    width={155}
                    height={60}
                    className="h-[60px] w-[155px] object-contain"
                  />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-white relative">
        <div className="max-w-7xl mx-auto px-6 py-4 sm:py-8 md:py-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ScrollFloat
              animationDuration={1.2}
              ease="back.inOut(1.7)"
              scrollStart="top bottom-=20%"
              scrollEnd="center center"
              stagger={0.05}
              containerClassName="text-5xl md:text-6xl font-bold mb-6"
              textClassName="text-gray-800"
              style={{
              }}
            >
              Unify your food experience
            </ScrollFloat>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto font-semibold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              style={{
              }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              Everything you need for your culinary journey in one powerful app.
            </motion.p>
          </motion.div>
        </div>

        <div className="h-screen flex items-center justify-center overflow-hidden">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-none">
            <PhoneCardsAnimation featureCards={featureCards} />
          </div>
        </div>
      </section>

      {/* Wander With Food Section */}
      <section className="bg-white relative overflow-hidden h-full py-12 sm:py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8">
            {wonderWithFoodWords.map((word, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center space-x-6"
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {/* Icon Circle */}
                <motion.div
                  className={`w-20 h-20 ${word.bgColor} rounded-2xl flex items-center justify-center text-white shadow-xl`}
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.3 },
                  }}
                  animate={{
                    boxShadow: [
                      "0 10px 30px rgba(0,0,0,0.1)",
                      "0 20px 60px rgba(0,0,0,0.2)",
                      "0 10px 30px rgba(0,0,0,0.1)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <span className="text-2xl">{word.icon}</span>
                </motion.div>

                {/* Word Text */}
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  animate={{
                    textShadow: ["0 0 20px rgba(0,0,0,0.1)", "0 0 40px rgba(0,0,0,0.2)", "0 0 20px rgba(0,0,0,0.1)"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <span className={`block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold ${word.color} leading-none text-center`}>
                    {word.text}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Floating Food Background */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-6xl opacity-30"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + (i % 3) * 30}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  rotate: [0, 360],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 5,
                  ease: "easeInOut",
                }}
              >
                {["🍕", "🍔", "🍜", "🥗", "🍰", "🍱", "🥘", "🍳"][i]}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Phone Mockup Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-100 z-0"
            style={{ minHeight: "100%", minWidth: "100%" }}
          >
            <source
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Futuristic_City_Scooter_Journey-AMOUlXT7ufHvQxpQWeLe9UpQjk47WU.mp4"
              type="video/mp4"
            />
            {/* Fallback for browsers that don't support video */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-red-100"></div>
          </video>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="space-y-8">
              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Pocket Friendly Options in Plenty
              </motion.h2>

              <motion.p
                className="text-xl text-white/90 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Elevate your dining experience in a single tap. Join thousands of food lovers today.
              </motion.p>

              <motion.div
                className="inline-block"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Link href="/explore">
                  <Button className="bg-black text-white hover:bg-gray-800 rounded-xl px-8 py-4 text-lg transition-all duration-300 ease-out hover:scale-105">
                    Explore Restaurants
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 pt-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Link 
                  href="#" 
                  className="block transition-all duration-300 ease-out hover:scale-105"
                >
                  <Image
                    src="/google-play-official.svg"
                    alt="Get it on Google Play"
                    width={155}
                    height={60}
                    className="h-[60px] w-[155px] object-contain"
                  />
                </Link>
                <Link 
                  href="#" 
                  className="block transition-all duration-300 ease-out hover:scale-105"
                >
                  <Image
                    src="/app-store-official.svg"
                    alt="Download on the App Store"
                    width={155}
                    height={60}
                    className="h-[60px] w-[155px] object-contain"
                  />
                </Link>
              </motion.div>
            </div>

            {/* Right side - Phone mockup */}
            <div className="flex justify-center lg:justify-end">
              <motion.div
                className="relative w-64 h-[500px] bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="w-full h-full rounded-[2rem] bg-white relative overflow-hidden">
                  {/* Phone Status Bar */}
                  <div className="flex justify-between items-center px-4 py-2 text-gray-800 text-xs">
                    <span>9:41</span>
                    <div className="flex space-x-1">
                      <div className="w-3 h-1.5 bg-gray-800 rounded-sm"></div>
                      <div className="w-3 h-1.5 bg-gray-800 rounded-sm"></div>
                      <div className="w-4 h-1.5 bg-gray-800 rounded-sm"></div>
                    </div>
                  </div>

                  {/* Phone Content */}
                  <div className="px-4 py-6 h-full flex flex-col items-center justify-center">
                    <motion.div
                      className="text-center space-y-4"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="text-4xl mb-2">📱</div>
                      <h3 className="text-lg font-bold text-gray-800">WWF App</h3>
                      <p className="text-gray-600 text-sm">Your food journey</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      {/* Demo Section */}
      <section className="bg-gradient-to-br from-pink-500 via-orange-500 to-orange-400 flex items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 relative z-10">
          <div className="flex-1 text-white max-w-lg flex flex-col justify-center">
            <div className="mb-6">
              <div className="w-1 h-12 sm:h-16 bg-yellow-400 mb-3"></div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 leading-tight">{animations.find(a => a.id === activeAnimation)?.title.toUpperCase()}</h1>
              <p className="text-xs sm:text-sm md:text-base opacity-90 leading-relaxed">{animations.find(a => a.id === activeAnimation)?.description}</p>
            </div>

            <AnimationSelector
              animations={animations}
              activeAnimation={activeAnimation}
              onSelect={(id) => {
                setActiveAnimation(id)
                setElapsedMs(0)
                setRunNonce((prev) => prev + 1)
              }}
              progress={animationProgress}
            />
          </div>

          <div className="flex-shrink-0 w-full sm:w-auto flex justify-center lg:justify-end">
            <PhoneFrame>{animations.find(a => a.id === activeAnimation)?.component}</PhoneFrame>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* Final Call-to-Action Section */}
      <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
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
            <p className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-medium px-4" style={{ color: "#FFD402" }}>
              It only takes few seconds to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 sm:pt-8">
              <Link 
                href="#" 
                className="block transition-all duration-300 ease-out hover:scale-105"
              >
                <Image
                  src="/app-store-official.svg"
                  alt="Download on the App Store"
                  width={155}
                  height={60}
                  className="h-[60px] w-[155px] object-contain"
                />
              </Link>
              <Link 
                href="#" 
                className="block transition-all duration-300 ease-out hover:scale-105"
              >
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
              Made by <span className="text-orange-500 font-semibold tracking-widest">{"BINI"}</span>
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
