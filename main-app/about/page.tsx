"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Users, Target, Award, Globe, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function AboutPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  const heroY = useTransform(scrollY, [0, 500], [0, -150])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const services = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Building",
      description: "Connecting food lovers and creating vibrant culinary communities",
      color: "from-orange-400 to-red-500",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Restaurant Discovery",
      description: "Helping you find the perfect dining experience for every occasion",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality Assurance",
      description: "Ensuring every meal meets our high standards of excellence",
      color: "from-green-400 to-blue-500",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      description: "Bringing diverse culinary experiences from around the world",
      color: "from-purple-400 to-pink-500",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-orange-500">
              WWF
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-800 hover:text-orange-500 font-medium transition-colors">
                Home
              </Link>
              <Link href="/explore" className="text-gray-800 hover:text-orange-500 font-medium transition-colors">
                Explore
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-1 text-orange-500 font-medium">
                    <span>Company</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow-xl border-0 rounded-xl">
                  <DropdownMenuItem className="hover:bg-orange-50">
                    <Link href="/about">About Us</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-orange-50">
                    <Link href="/blogs">Blogs</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-orange-50">
                    <Link href="/partner">Partner with Us</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-orange-50">
                    <Link href="/contact">Enquire</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-800 hover:text-orange-500" disabled>
                Log in
              </Button>
              <Button className="bg-orange-500 text-white hover:bg-orange-600 rounded-full px-6" disabled>
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center px-6"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="text-center z-10 max-w-4xl mx-auto text-white">
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About WWF
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We're passionate about connecting people through food, creating memorable dining experiences, and building a
            community of food lovers worldwide.
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button className="bg-white text-orange-500 hover:bg-yellow-50 rounded-full px-8 py-4 text-lg font-semibold">
              Learn More
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                At Wander With Food, we believe that great food brings people together. Our mission is to make
                discovering, ordering, and enjoying amazing food as simple and delightful as possible.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Connect food lovers with amazing restaurants</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Support local businesses and communities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Create memorable culinary experiences</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full h-96 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center">
                <div className="text-6xl">🍽️</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section with Animation */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-6">What We Do</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive solutions for food discovery, ordering, and community building.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center text-white mb-6`}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BINI Partnership Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-12 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6">A Product by BINI</h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                WWF is proudly developed by BINI, a company dedicated to creating innovative solutions that bring people
                together through technology and shared experiences.
              </p>
              <Button className="bg-white text-purple-500 hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-semibold">
                <span>Explore BINI</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">WWF</h3>
              <p className="text-gray-400">Wander With Food - Your culinary companion</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2">
                <Link href="/about" className="text-gray-400 hover:text-white block">
                  About Us
                </Link>
                <Link href="/blogs" className="text-gray-400 hover:text-white block">
                  Blogs
                </Link>
                <Link href="/partner" className="text-gray-400 hover:text-white block">
                  Partner with Us
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <Link href="/contact" className="text-gray-400 hover:text-white block">
                  Contact
                </Link>
                <Link href="/feedback" className="text-gray-400 hover:text-white block">
                  Feedback
                </Link>
                <Link href="/support" className="text-gray-400 hover:text-white block">
                  Help Center
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="space-y-2">
                <a href="#" className="text-gray-400 hover:text-white block">
                  Instagram
                </a>
                <a href="#" className="text-gray-400 hover:text-white block">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-white block">
                  Twitter
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 WWF - Wander With Food. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
