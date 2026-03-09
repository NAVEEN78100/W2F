"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, MessageSquare, Bug, Zap, Star, Gift, Users, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function FeedbackPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
    rating: "",
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Feedback submitted:", formData)
    alert("Thank you for your feedback! We appreciate your input.")
    setFormData({
      name: "",
      email: "",
      category: "",
      subject: "",
      message: "",
      rating: "",
    })
    setShowForm(false)
  }

  const feedbackCategories = [
    {
      id: "general",
      title: "General Feedback",
      description: "Share your thoughts about WWF and help us improve",
      icon: <MessageSquare className="w-12 h-12" />,
      color: "from-blue-400 to-blue-600",
      benefits: [
        "Help shape the future of WWF",
        "Influence new features and improvements",
        "Be part of our community-driven development",
        "Get priority support for your suggestions",
      ],
    },
    {
      id: "bug-report",
      title: "Bug Bounty",
      description: "Report bugs and earn rewards for helping us improve",
      icon: <Bug className="w-12 h-12" />,
      color: "from-red-400 to-red-600",
      benefits: [
        "Earn cash rewards for valid bug reports",
        "Help make WWF more stable and reliable",
        "Get recognition in our Hall of Fame",
        "Priority access to beta features",
        "Direct communication with our dev team",
      ],
    },
    {
      id: "early-access",
      title: "Early Access Program",
      description: "Get exclusive early access to new features and updates",
      icon: <Zap className="w-12 h-12" />,
      color: "from-purple-400 to-purple-600",
      benefits: [
        "Be the first to try new features",
        "Exclusive beta testing opportunities",
        "Direct feedback channel to product team",
        "Special early adopter badge",
        "Influence product roadmap decisions",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Link
        href="/"
        className="fixed top-4 left-4 z-[70] group inline-flex items-center gap-2 rounded-full border border-yellow-400/70 bg-yellow-50/90 px-4 py-2 text-sm font-semibold text-yellow-900 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-100 hover:shadow-xl active:translate-y-0 active:scale-[0.98] dark:border-yellow-300/50 dark:bg-zinc-900/85 dark:text-yellow-200 dark:hover:bg-zinc-800"
      >
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-0.5">
          ←
        </span>
        <span>back to home</span>
      </Link>
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
                  <button className="flex items-center space-x-1 text-gray-800 hover:text-orange-500 font-medium transition-colors">
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
      <section className="pt-32 pb-20 bg-gradient-to-br from-purple-400 to-pink-500">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            className="text-6xl md:text-7xl font-bold text-white mb-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Your Voice Matters
          </motion.h1>
          <motion.p
            className="text-xl text-white/90 max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Help us make WWF better by sharing your feedback, reporting bugs, or joining our early access program. Your
            input shapes the future of food discovery.
          </motion.p>
        </div>
      </section>

      {/* Feedback Categories */}
      {!showForm && !selectedCategory && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold text-gray-800 mb-6">Choose Your Feedback Type</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Select the category that best describes how you'd like to contribute to WWF's improvement.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {feedbackCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className={`h-2 bg-gradient-to-r ${category.color}`} />
                  <div className="p-8">
                    <div
                      className={`w-20 h-20 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-white mb-6 mx-auto`}
                    >
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{category.title}</h3>
                    <p className="text-gray-600 text-center leading-relaxed mb-6">{category.description}</p>
                    <Button className="w-full bg-gray-800 hover:bg-gray-900 text-white">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Details */}
      {selectedCategory && !showForm && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            {feedbackCategories
              .filter((cat) => cat.id === selectedCategory)
              .map((category) => (
                <motion.div
                  key={category.id}
                  className="bg-white rounded-3xl shadow-xl p-12"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="text-center mb-12">
                    <div
                      className={`w-24 h-24 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-white mx-auto mb-6`}
                    >
                      {category.icon}
                    </div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">{category.title}</h2>
                    <p className="text-xl text-gray-600">{category.description}</p>
                  </div>

                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Benefits & Rewards</h3>
                    <div className="space-y-4">
                      {category.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div
                            className={`w-6 h-6 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center flex-shrink-0`}
                          >
                            <Star className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => setShowForm(true)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg"
                    >
                      Get Started
                    </Button>
                    <Button variant="outline" onClick={() => setSelectedCategory(null)} className="px-8 py-4 text-lg">
                      Back to Categories
                    </Button>
                  </div>
                </motion.div>
              ))}
          </div>
        </section>
      )}

      {/* Feedback Form */}
      {showForm && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              className="bg-white rounded-3xl shadow-xl p-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Submit Your Feedback</h2>
                <p className="text-xl text-gray-600">We value your input and will review your submission carefully.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      required
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select feedback category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Feedback</SelectItem>
                        <SelectItem value="bug-report">Bug Report</SelectItem>
                        <SelectItem value="early-access">Early Access Request</SelectItem>
                        <SelectItem value="feature-request">Feature Request</SelectItem>
                        <SelectItem value="improvement">Improvement Suggestion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Overall Rating</label>
                    <Select
                      value={formData.rating}
                      onValueChange={(value) => setFormData({ ...formData, rating: value })}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Rate your experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent</SelectItem>
                        <SelectItem value="4">⭐⭐⭐⭐ Good</SelectItem>
                        <SelectItem value="3">⭐⭐⭐ Average</SelectItem>
                        <SelectItem value="2">⭐⭐ Poor</SelectItem>
                        <SelectItem value="1">⭐ Very Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <Input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Brief subject of your feedback"
                    required
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Feedback *</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please provide detailed feedback, including steps to reproduce if reporting a bug..."
                    required
                    className="min-h-32"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 text-lg">
                    Submit Feedback
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="px-12 py-4 text-lg"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      {!showForm && !selectedCategory && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold text-gray-800 mb-6">Community Impact</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how our community feedback has helped shape WWF into a better platform.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: <MessageSquare className="w-8 h-8" />, number: "2,500+", label: "Feedback Received" },
                { icon: <Bug className="w-8 h-8" />, number: "150+", label: "Bugs Fixed" },
                { icon: <Users className="w-8 h-8" />, number: "500+", label: "Beta Testers" },
                { icon: <Gift className="w-8 h-8" />, number: "₹50K+", label: "Bug Bounty Paid" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

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
