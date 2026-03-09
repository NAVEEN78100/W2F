"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Coffee, Home, UtensilsCrossed, CheckCircle, Star } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function PartnerPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    location: "",
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const partnerCategories = [
    {
      id: "star-dines",
      title: "Star Dines",
      description: "Premium restaurants and fine dining establishments",
      icon: <Star className="w-12 h-12" />,
      color: "from-yellow-400 to-orange-500",
      requirements: [
        "Minimum 4.5 star rating",
        "Professional kitchen setup",
        "Licensed food establishment",
        "Quality service standards",
        "Experienced culinary team",
      ],
    },
    {
      id: "resto-bars",
      title: "Resto Bars",
      description: "Restaurants with bar service and casual dining",
      icon: <UtensilsCrossed className="w-12 h-12" />,
      color: "from-purple-400 to-pink-500",
      requirements: [
        "Valid liquor license",
        "Restaurant and bar setup",
        "Minimum 4.0 star rating",
        "Diverse menu offerings",
        "Trained bartending staff",
      ],
    },
    {
      id: "hangout-spots",
      title: "Hangout Spots",
      description: "Casual dining and social gathering places",
      icon: <Coffee className="w-12 h-12" />,
      color: "from-green-400 to-blue-500",
      requirements: [
        "Comfortable seating area",
        "Wi-Fi connectivity",
        "Casual dining menu",
        "Social atmosphere",
        "Extended operating hours",
      ],
    },
    {
      id: "homebakers",
      title: "Home Bakers",
      description: "Home-based baking and dessert specialists",
      icon: <Home className="w-12 h-12" />,
      color: "from-pink-400 to-red-500",
      requirements: [
        "Food safety certification",
        "Home kitchen compliance",
        "Specialty baking skills",
        "Quality ingredients sourcing",
        "Delivery capability",
      ],
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    alert("Thank you for your interest! We'll contact you soon.")
    setFormData({ name: "", contact: "", location: "" })
  }

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
      <section className="pt-32 pb-20 bg-gradient-to-br from-orange-400 to-red-500">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            className="text-6xl md:text-7xl font-bold text-white mb-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Partner With Us
          </motion.h1>
          <motion.p
            className="text-xl text-white/90 max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join our growing network of food partners and reach more customers than ever before. Choose your category
            and start your journey with WWF.
          </motion.p>
        </div>
      </section>

      {/* Partner Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Choose Your Category</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the category that best describes your business and see if you meet our partnership requirements.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {partnerCategories.map((category, index) => (
              <motion.div
                key={category.id}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                  selectedCategory === category.id ? "border-orange-500" : "border-transparent"
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div
                  className={`w-20 h-20 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-white mb-6 mx-auto`}
                >
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{category.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{category.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Eligibility Criteria */}
          {selectedCategory && (
            <motion.div
              className="bg-gray-50 rounded-3xl p-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-4xl font-bold text-gray-800 mb-6">
                    {partnerCategories.find((cat) => cat.id === selectedCategory)?.title} Requirements
                  </h3>
                  <p className="text-xl text-gray-600 mb-8">
                    To ensure the best experience for our customers, we have specific requirements for each category.
                  </p>

                  <div className="space-y-4">
                    {partnerCategories
                      .find((cat) => cat.id === selectedCategory)
                      ?.requirements.map((requirement, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{requirement}</span>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h4 className="text-2xl font-bold text-gray-800 mb-6">Apply Now</h4>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                      <Input
                        type="tel"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        placeholder="Your phone number"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <Input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Your business location"
                        required
                        className="w-full"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg">
                      Submit Application
                    </Button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
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
